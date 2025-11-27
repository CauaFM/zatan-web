"""
WSGI entrypoint utilizado em produção (Render/Gunicorn).
"""
from backend.app import create_app

app = create_app()

