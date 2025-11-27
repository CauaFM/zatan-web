"""
Rotas para formulário de contato/feedback
"""
from flask import Blueprint, request, jsonify
<<<<<<< HEAD
from database import db
from models import Contact
=======
from ..database import db
from ..models import Contact
>>>>>>> def128b (atualização)
from datetime import datetime
import re

contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')


def validate_email(email):
    """Valida formato de email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


@contact_bp.route('/', methods=['POST'])
def create_contact():
    """Cria um novo contato/feedback"""
    try:
        data = request.get_json()
        
        # Validações
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400
        
        nome = data.get('nome', '').strip()
        email = data.get('email', '').strip()
        tipo = data.get('tipo', '').strip()
        mensagem = data.get('mensagem', '').strip()
        
        # Validações de campos obrigatórios
        if not nome:
            return jsonify({'error': 'Nome é obrigatório'}), 400
        
        if not email:
            return jsonify({'error': 'Email é obrigatório'}), 400
        
        if not validate_email(email):
            return jsonify({'error': 'Email inválido'}), 400
        
        if not tipo:
            return jsonify({'error': 'Tipo de mensagem é obrigatório'}), 400
        
        tipos_validos = ['elogio', 'duvida', 'sugestao', 'denuncia']
        if tipo not in tipos_validos:
            return jsonify({'error': f'Tipo inválido. Tipos válidos: {", ".join(tipos_validos)}'}), 400
        
        if not mensagem:
            return jsonify({'error': 'Mensagem é obrigatória'}), 400
        
        # Criar contato
        contact = Contact(
            nome=nome,
            email=email,
            tipo=tipo,
            mensagem=mensagem
        )
        
        db.session.add(contact)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Mensagem enviada com sucesso! Obrigado pelo seu feedback.',
            'data': contact.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao processar mensagem: {str(e)}'}), 500


@contact_bp.route('/', methods=['GET'])
def list_contacts():
    """Lista todos os contatos (para admin)"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        tipo_filter = request.args.get('tipo', None)
        lido_filter = request.args.get('lido', None)
        
        query = Contact.query
        
        if tipo_filter:
            query = query.filter_by(tipo=tipo_filter)
        
        if lido_filter is not None:
            lido = lido_filter.lower() == 'true'
            query = query.filter_by(lido=lido)
        
        query = query.order_by(Contact.created_at.desc())
        
        pagination = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        return jsonify({
            'success': True,
            'data': [contact.to_dict() for contact in pagination.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': pagination.total,
                'pages': pagination.pages
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao listar contatos: {str(e)}'}), 500


@contact_bp.route('/<int:contact_id>', methods=['GET'])
def get_contact(contact_id):
    """Obtém um contato específico"""
    try:
        contact = Contact.query.get_or_404(contact_id)
        return jsonify({
            'success': True,
            'data': contact.to_dict()
        }), 200
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar contato: {str(e)}'}), 500


@contact_bp.route('/<int:contact_id>/read', methods=['PATCH'])
def mark_as_read(contact_id):
    """Marca um contato como lido"""
    try:
        contact = Contact.query.get_or_404(contact_id)
        contact.lido = True
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Contato marcado como lido',
            'data': contact.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao atualizar contato: {str(e)}'}), 500



