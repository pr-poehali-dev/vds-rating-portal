'''
Business: Track and retrieve click statistics for provider links
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name, function_version
Returns: HTTP response dict with click statistics
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
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
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
        body_data = json.loads(event.get('body', '{}'))
        provider_id = body_data.get('provider_id')
        
        if not provider_id:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'provider_id is required'}),
                'isBase64Encoded': False
            }
        
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO provider_clicks (provider_id) VALUES (%s)",
                (provider_id,)
            )
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
        view = params.get('view', 'summary')
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            if view == 'daily':
                cur.execute("""
                    SELECT 
                        provider_id,
                        DATE(clicked_at) as date,
                        COUNT(*) as clicks
                    FROM provider_clicks
                    WHERE clicked_at >= CURRENT_DATE - 30
                    GROUP BY provider_id, DATE(clicked_at)
                    ORDER BY date DESC, provider_id
                """)
                
                daily_stats = cur.fetchall()
                
                result = []
                for row in daily_stats:
                    result.append({
                        'provider_id': row['provider_id'],
                        'date': row['date'].isoformat() if row['date'] else None,
                        'clicks': row['clicks']
                    })
                
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'daily_stats': result}),
                    'isBase64Encoded': False
                }
            
            else:
                cur.execute("""
                    SELECT 
                        provider_id,
                        COUNT(*) as clicks,
                        MIN(clicked_at) as first_click,
                        MAX(clicked_at) as last_click
                    FROM provider_clicks
                    GROUP BY provider_id
                    ORDER BY clicks DESC
                """)
                
                stats = cur.fetchall()
        
        conn.close()
        
        result = []
        for row in stats:
            result.append({
                'provider_id': row['provider_id'],
                'clicks': row['clicks'],
                'first_click': row['first_click'].isoformat() if row['first_click'] else None,
                'last_click': row['last_click'].isoformat() if row['last_click'] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'stats': result}),
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