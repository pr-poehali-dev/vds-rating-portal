import json
import os
from datetime import datetime
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage provider reviews (create, list)
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        provider_id = body_data.get('provider_id')
        author = body_data.get('author', '').strip()
        text = body_data.get('text', '').strip()
        rating = body_data.get('rating', 5)
        
        if not provider_id or not author or not text:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing required fields'}),
                'isBase64Encoded': False
            }
        
        if not isinstance(rating, int) or rating < 1 or rating > 5:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Rating must be between 1 and 5'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO reviews (provider_id, author, text, rating, status) VALUES (%s, %s, %s, %s, 'pending') RETURNING id",
            (provider_id, author, text, rating)
        )
        review_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'review_id': review_id,
                'message': 'Review submitted for moderation'
            }),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        provider_id = params.get('provider_id')
        status = params.get('status', 'approved')
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if provider_id:
            cursor.execute(
                "SELECT id, provider_id, author, text, rating, created_at FROM reviews WHERE provider_id = %s AND status = %s ORDER BY created_at DESC",
                (provider_id, status)
            )
        else:
            cursor.execute(
                "SELECT id, provider_id, author, text, rating, created_at FROM reviews WHERE status = %s ORDER BY created_at DESC LIMIT 100",
                (status,)
            )
        
        reviews = cursor.fetchall()
        cursor.close()
        conn.close()
        
        reviews_list = []
        for review in reviews:
            reviews_list.append({
                'id': review['id'],
                'provider_id': review['provider_id'],
                'author': review['author'],
                'text': review['text'],
                'rating': review['rating'],
                'date': review['created_at'].strftime('%d %b %Y') if review['created_at'] else ''
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'reviews': reviews_list}),
            'isBase64Encoded': False
        }
    
    conn.close()
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
