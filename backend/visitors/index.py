'''
Business: Track and retrieve unique site visitors statistics
Args: event - dict with httpMethod, queryStringParameters
      context - object with attributes: request_id, function_name, function_version
Returns: HTTP response dict with visitor statistics
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database connection not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(dsn)
    
    if method == 'POST':
        user_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
        
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO site_visitors (user_ip, first_visit, last_visit, visit_count)
                VALUES (%s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
                ON CONFLICT (user_ip) 
                DO UPDATE SET 
                    last_visit = CURRENT_TIMESTAMP,
                    visit_count = site_visitors.visit_count + 1
            """, (user_ip,))
            conn.commit()
        
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True}),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        period = params.get('period', '30')
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            days = int(period) if period.isdigit() else 30
            
            cur.execute("""
                SELECT COUNT(DISTINCT user_ip) as total_unique_visitors
                FROM site_visitors
            """)
            total_result = cur.fetchone()
            
            cur.execute("""
                SELECT COUNT(DISTINCT user_ip) as unique_visitors
                FROM site_visitors
                WHERE first_visit >= CURRENT_DATE - %s
            """, (days,))
            period_result = cur.fetchone()
            
            cur.execute("""
                SELECT 
                    DATE(first_visit) as date,
                    COUNT(DISTINCT user_ip) as visitors
                FROM site_visitors
                WHERE first_visit >= CURRENT_DATE - %s
                GROUP BY DATE(first_visit)
                ORDER BY date DESC
            """, (days,))
            daily_stats = cur.fetchall()
        
        conn.close()
        
        daily_result = []
        for row in daily_stats:
            daily_result.append({
                'date': row['date'].isoformat() if row['date'] else None,
                'visitors': row['visitors']
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'total_unique_visitors': total_result['total_unique_visitors'] if total_result else 0,
                'period_unique_visitors': period_result['unique_visitors'] if period_result else 0,
                'daily_stats': daily_result
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
