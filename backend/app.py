import json
import os
from pathlib import Path
from flask import Flask, jsonify, send_from_directory, send_file
from flask_cors import CORS

from .config import Config, CORS_ORIGINS
from .database import db, init_db
from .routes.contact import contact_bp
from .routes.quiz import quiz_bp
from .routes.zones import zones_bp
from .models import Zone

BASE_DIR = Path(__file__).resolve().parent.parent

def create_app():
    static_folder = str(BASE_DIR) 
    app = Flask(__name__, static_folder=static_folder, static_url_path='')

    app.config.from_object(Config)

    CORS(app, origins=CORS_ORIGINS, supports_credentials=True)

    db.init_app(app)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'online',
            'message': 'Backend ZATAN está funcionando!',
            'version': '1.0.0'
        }), 200

    app.register_blueprint(contact_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(zones_bp)

    @app.route('/')
    def index():
        index_path = os.path.join(BASE_DIR, 'index.html')
        if os.path.exists(index_path):
            return send_file(index_path)
        return jsonify({'error': 'Arquivo index.html não encontrado'}), 404

    @app.route('/<path:filename>')
    def serve_static(filename):
        if filename.startswith('api/'):
            return jsonify({'error': 'Endpoint não encontrado'}), 404

        file_path = os.path.join(BASE_DIR, filename)
        if filename.endswith('.html'):
            if os.path.exists(file_path):
                return send_file(file_path)
            return jsonify({'error': 'Arquivo não encontrado'}), 404

        try:
            if os.path.exists(file_path) and os.path.isfile(file_path):
                return send_from_directory(BASE_DIR, filename)
            return jsonify({'error': 'Arquivo não encontrado'}), 404
        except Exception as e:
            return jsonify({'error': 'Erro ao servir arquivo', 'details': str(e)}), 500

    with app.app_context():
        init_db(app)
        create_initial_zones()

    return app


def create_initial_zones():
    try:
        if Zone.query.count() == 0:
            zonas_iniciais = [
                {
                    'nome': 'Zona Restrita - Preservação Máxima',
                    'tipo': 'restrita',
                    'cor': '#E53935',
                    'descricao': 'Área de preservação máxima. Apenas trânsito de passagem é permitido.',
                    'regras': json.dumps({
                        'permitido': ['Trânsito de passagem'],
                        'proibido': ['Ancoragem', 'Banho', 'Pesca', 'Esportes náuticos', 'Mergulho']
                    })
                },
                {
                    'nome': 'Zona Regulada - Uso Controlado',
                    'tipo': 'regulada',
                    'cor': '#FFB300',
                    'descricao': 'Área com uso controlado e regulamentado.',
                    'regras': json.dumps({
                        'permitido': ['Navegação com velocidade reduzida', 'Pesca esportiva com cotas', 'Mergulho em pontos demarcados'],
                        'proibido': ['Esportes náuticos motorizados', 'Ancoragem sobre recifes']
                    })
                },
                {
                    'nome': 'Zona Liberal - Uso Geral',
                    'tipo': 'liberal',
                    'cor': '#43A047',
                    'descricao': 'Área de uso geral, respeitando legislação vigente.',
                    'regras': json.dumps({
                        'permitido': ['Uso geral conforme legislação', 'Pesca', 'Navegação', 'Esportes náuticos'],
                        'proibido': ['Descarte de resíduos', 'Danos ao meio ambiente']
                    })
                }
            ]

            for zona_data in zonas_iniciais:
                zone = Zone(**zona_data)
                db.session.add(zone)

            db.session.commit()
            print("✅ Zonas iniciais criadas!")
    except Exception as e:
        print("⚠️ Não foi possível criar zonas iniciais:", e)

