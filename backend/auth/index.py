import json
import hashlib
import secrets
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Admin authentication with token generation
    Args: event - dict with httpMethod, body
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict with auth token
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
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
        username = body_data.get('username', '').strip()
        password = body_data.get('password', '').strip()
        
        if not username or not password:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing username or password'}),
                'isBase64Encoded': False
            }
        
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "SELECT id, username FROM admin_users WHERE username = %s AND password_hash = %s",
            (username, password_hash)
        )
        
        user = cursor.fetchone()
        
        if not user:
            cursor.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid credentials'}),
                'isBase64Encoded': False
            }
        
        token = secrets.token_urlsafe(32)
        
        cursor.execute(
            "INSERT INTO admin_tokens (user_id, token) VALUES (%s, %s) ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token, created_at = CURRENT_TIMESTAMP",
            (user['id'], token)
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'token': token,
                'username': user['username']
            }),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        auth_token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token')
        
        if not auth_token:
            conn.close()
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'No token provided'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "SELECT u.id, u.username FROM admin_tokens t JOIN admin_users u ON t.user_id = u.id WHERE t.token = %s AND t.created_at > NOW() - INTERVAL '7 days'",
            (auth_token,)
        )
        
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not user:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid or expired token'}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'valid': True,
                'username': user['username']
            }),
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
