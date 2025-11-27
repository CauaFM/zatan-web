from datetime import datetime
from .database import db


class Contact(db.Model):
    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  
    mensagem = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    lido = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'tipo': self.tipo,
            'mensagem': self.mensagem,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'lido': self.lido
        }

    def __repr__(self):
        return f'<Contact {self.id} - {self.nome} - {self.tipo}>'


class QuizResult(db.Model):
    __tablename__ = 'quiz_results'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=True)  
    email = db.Column(db.String(200), nullable=True)  
    score = db.Column(db.Integer, nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    percentage = db.Column(db.Float, nullable=False)
    answers = db.Column(db.Text, nullable=True)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'score': self.score,
            'total_questions': self.total_questions,
            'percentage': self.percentage,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<QuizResult {self.id} - {self.score}/{self.total_questions}>'


class Zone(db.Model):
    __tablename__ = 'zones'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)  
    cor = db.Column(db.String(50), nullable=False)  
    descricao = db.Column(db.Text, nullable=True)
    regras = db.Column(db.Text, nullable=True)  
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    ativo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'tipo': self.tipo,
            'cor': self.cor,
            'descricao': self.descricao,
            'regras': self.regras,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'ativo': self.ativo,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def __repr__(self):
        return f'<Zone {self.id} - {self.nome} ({self.tipo})>'
