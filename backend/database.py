"""
Configuração do banco de dados
"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    """Inicializa o banco de dados"""
    with app.app_context():
        db.create_all()
        print("✅ Banco de dados inicializado com sucesso!")



