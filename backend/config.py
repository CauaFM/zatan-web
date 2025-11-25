"""
Configurações do Backend ZATAN
"""
import os
from pathlib import Path

# Diretório base do projeto
BASE_DIR = Path(__file__).parent

# Configurações do Flask
SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
# No Google Cloud, sempre desabilitar DEBUG
DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true' and not os.environ.get('GAE_ENV')

# Configurações do Banco de Dados
# No Google Cloud, usar Cloud SQL ou manter SQLite para começar
_database_url = os.environ.get('DATABASE_URL')
if not _database_url:
    # SQLite para desenvolvimento ou uso básico no Cloud
    # Em produção, considere usar Cloud SQL
    if os.environ.get('GAE_ENV'):
        # No App Engine, usar /tmp para SQLite (única pasta gravável)
        _database_path = '/tmp/zatan.db'
    else:
        _database_path = str(BASE_DIR / "zatan.db")
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{_database_path}'
else:
    SQLALCHEMY_DATABASE_URI = _database_url
    
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Configurações de CORS
# Em produção, permite todas as origens (ajuste conforme necessário)
_cors_origins_env = os.environ.get('CORS_ORIGINS', '')
if _cors_origins_env:
    CORS_ORIGINS = [origin.strip() for origin in _cors_origins_env.split(',')]
else:
    # Desenvolvimento local
    CORS_ORIGINS = [
        'http://localhost:8000',
        'http://127.0.0.1:8000',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5000',
        'http://127.0.0.1:5000',
    ]
    # Em produção no Google Cloud, permitir todas as origens
    if os.environ.get('GAE_ENV') or os.environ.get('GOOGLE_CLOUD_PROJECT'):
        CORS_ORIGINS = ['*']

# Configurações de Email (opcional para envio de emails)
MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'True').lower() == 'true'
MAIL_USERNAME = os.environ.get('MAIL_USERNAME', '')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', '')

# Email de destino para contatos
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'contato@zatan.pe.gov.br')



