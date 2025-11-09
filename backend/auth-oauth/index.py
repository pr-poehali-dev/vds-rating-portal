import json
import os
from typing import Dict, Any
from urllib.parse import urlencode

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: OAuth авторизация через различные провайдеры (VK, Яндекс, Google, GitHub, Telegram)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с request_id, function_name
    Returns: HTTP response с URL для редиректа на OAuth провайдера
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        provider = body_data.get('provider')
        
        redirect_uri = 'https://vpsrating.ru/auth/callback'
        
        oauth_urls = {
            'vk': {
                'url': 'https://oauth.vk.com/authorize',
                'params': {
                    'client_id': os.environ.get('VK_CLIENT_ID'),
                    'redirect_uri': redirect_uri,
                    'display': 'page',
                    'scope': 'email',
                    'response_type': 'code',
                    'v': '5.131'
                }
            },
            'yandex': {
                'url': 'https://oauth.yandex.ru/authorize',
                'params': {
                    'client_id': os.environ.get('YANDEX_CLIENT_ID'),
                    'redirect_uri': redirect_uri,
                    'response_type': 'code'
                }
            },
            'google': {
                'url': 'https://accounts.google.com/o/oauth2/v2/auth',
                'params': {
                    'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
                    'redirect_uri': redirect_uri,
                    'response_type': 'code',
                    'scope': 'email profile',
                    'access_type': 'offline'
                }
            },
            'github': {
                'url': 'https://github.com/login/oauth/authorize',
                'params': {
                    'client_id': os.environ.get('GITHUB_CLIENT_ID'),
                    'redirect_uri': redirect_uri,
                    'scope': 'user:email'
                }
            },
            'telegram': {
                'url': 'https://oauth.telegram.org/auth',
                'params': {
                    'bot_id': os.environ.get('TELEGRAM_BOT_ID'),
                    'origin': 'https://vpsrating.ru',
                    'request_access': 'write',
                    'return_to': redirect_uri
                }
            }
        }
        
        if provider not in oauth_urls:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid provider'})
            }
        
        oauth_config = oauth_urls[provider]
        auth_url = f"{oauth_config['url']}?{urlencode(oauth_config['params'])}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'authUrl': auth_url})
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }
