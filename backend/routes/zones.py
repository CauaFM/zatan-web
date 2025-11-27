"""
Rotas para zonas do ZATAN
"""
from flask import Blueprint, request, jsonify
<<<<<<< HEAD
from database import db
from models import Zone
=======
from ..database import db
from ..models import Zone
>>>>>>> def128b (atualização)
from datetime import datetime

zones_bp = Blueprint('zones', __name__, url_prefix='/api/zones')


@zones_bp.route('/', methods=['GET'])
def list_zones():
    """Lista todas as zonas"""
    try:
        tipo_filter = request.args.get('tipo', None)
        ativo_filter = request.args.get('ativo', None)
        
        query = Zone.query
        
        if tipo_filter:
            query = query.filter_by(tipo=tipo_filter)
        
        if ativo_filter is not None:
            ativo = ativo_filter.lower() == 'true'
            query = query.filter_by(ativo=ativo)
        else:
            # Por padrão, mostrar apenas zonas ativas
            query = query.filter_by(ativo=True)
        
        zones = query.order_by(Zone.nome).all()
        
        return jsonify({
            'success': True,
            'data': [zone.to_dict() for zone in zones]
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao listar zonas: {str(e)}'}), 500


@zones_bp.route('/<int:zone_id>', methods=['GET'])
def get_zone(zone_id):
    """Obtém uma zona específica"""
    try:
        zone = Zone.query.get_or_404(zone_id)
        return jsonify({
            'success': True,
            'data': zone.to_dict()
        }), 200
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar zona: {str(e)}'}), 500


@zones_bp.route('/', methods=['POST'])
def create_zone():
    """Cria uma nova zona (admin)"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400
        
        nome = data.get('nome', '').strip()
        tipo = data.get('tipo', '').strip()
        cor = data.get('cor', '#000000')
        
        if not nome:
            return jsonify({'error': 'Nome é obrigatório'}), 400
        
        if not tipo:
            return jsonify({'error': 'Tipo é obrigatório'}), 400
        
        tipos_validos = ['restrita', 'regulada', 'liberal']
        if tipo not in tipos_validos:
            return jsonify({'error': f'Tipo inválido. Tipos válidos: {", ".join(tipos_validos)}'}), 400
        
        zone = Zone(
            nome=nome,
            tipo=tipo,
            cor=cor,
            descricao=data.get('descricao', ''),
            regras=data.get('regras', ''),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            ativo=data.get('ativo', True)
        )
        
        db.session.add(zone)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Zona criada com sucesso',
            'data': zone.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao criar zona: {str(e)}'}), 500


@zones_bp.route('/<int:zone_id>', methods=['PUT'])
def update_zone(zone_id):
    """Atualiza uma zona (admin)"""
    try:
        zone = Zone.query.get_or_404(zone_id)
        data = request.get_json()
        
        if data.get('nome'):
            zone.nome = data['nome'].strip()
        if data.get('tipo'):
            zone.tipo = data['tipo'].strip()
        if data.get('cor'):
            zone.cor = data['cor']
        if 'descricao' in data:
            zone.descricao = data['descricao']
        if 'regras' in data:
            zone.regras = data['regras']
        if 'latitude' in data:
            zone.latitude = data['latitude']
        if 'longitude' in data:
            zone.longitude = data['longitude']
        if 'ativo' in data:
            zone.ativo = data['ativo']
        
        zone.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Zona atualizada com sucesso',
            'data': zone.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao atualizar zona: {str(e)}'}), 500



