<<<<<<< HEAD
=======
"""
Aplicação principal do Backend ZATAN
"""
>>>>>>> def128b (atualização)
import json
import os
from pathlib import Path
from flask import Flask, jsonify, send_from_directory, send_file
from flask_cors import CORS
<<<<<<< HEAD

=======
>>>>>>> def128b (atualização)
from .config import Config, CORS_ORIGINS
from .database import db, init_db
from .routes.contact import contact_bp
from .routes.quiz import quiz_bp
from .routes.zones import zones_bp
from .models import Zone

<<<<<<< HEAD
BASE_DIR = Path(__file__).parent.parent

def create_app():

=======
# Diretório base do projeto (subindo um nível do backend)
BASE_DIR = Path(__file__).parent.parent

def create_app():
    """Factory function para criar a aplicação Flask"""
    # Configurar Flask para servir arquivos estáticos
>>>>>>> def128b (atualização)
    static_folder = str(BASE_DIR)
    app = Flask(__name__, static_folder=static_folder, static_url_path='')
    app.config.from_object(Config)
    
<<<<<<< HEAD
    CORS(app, origins=CORS_ORIGINS, supports_credentials=True)
    
    db.init_app(app)
    
=======
    # Configurar CORS
    CORS(app, origins=CORS_ORIGINS, supports_credentials=True)
    
    # Inicializar banco de dados
    db.init_app(app)
    
    # Rota de health check (antes dos blueprints para garantir prioridade)
>>>>>>> def128b (atualização)
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'online',
            'message': 'Backend ZATAN está funcionando!',
            'version': '1.0.0'
        }), 200
    
<<<<<<< HEAD
    app.register_blueprint(contact_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(zones_bp)

=======
    # Registrar blueprints (devem estar após health check mas antes das rotas de arquivos)
    app.register_blueprint(contact_bp)
    app.register_blueprint(quiz_bp)
    app.register_blueprint(zones_bp)
    
    # Rotas para servir arquivos HTML e estáticos (depois das APIs)
>>>>>>> def128b (atualização)
    @app.route('/')
    def index():
        return send_file(os.path.join(BASE_DIR, 'index.html'))
    
    @app.route('/<path:filename>')
    def serve_static(filename):
<<<<<<< HEAD
        if filename.startswith('api/'):
            return jsonify({'error': 'Endpoint não encontrado'}), 404
        
=======
        """Serve arquivos estáticos (HTML, CSS, JS, imagens)
        Esta rota só será chamada se não corresponder a nenhuma rota de API acima
        """
        # Ignorar rotas de API
        if filename.startswith('api/'):
            return jsonify({'error': 'Endpoint não encontrado'}), 404
        
        # Se for um arquivo HTML, servir diretamente
>>>>>>> def128b (atualização)
        if filename.endswith('.html'):
            file_path = os.path.join(BASE_DIR, filename)
            if os.path.exists(file_path):
                return send_file(file_path)
            return jsonify({'error': 'Arquivo não encontrado'}), 404
        
<<<<<<< HEAD
=======
        # Para outros arquivos estáticos (CSS, JS, imagens)
>>>>>>> def128b (atualização)
        try:
            file_path = os.path.join(BASE_DIR, filename)
            if os.path.exists(file_path) and os.path.isfile(file_path):
                return send_from_directory(BASE_DIR, filename)
            return jsonify({'error': 'Arquivo não encontrado'}), 404
        except Exception as e:
            return jsonify({'error': 'Erro ao servir arquivo', 'details': str(e)}), 500
<<<<<<< HEAD

    with app.app_context():

=======
    
    # Inicializar banco de dados e dados iniciais
    with app.app_context():
>>>>>>> def128b (atualização)
        init_db(app)
        create_initial_zones()
    
    return app


def create_initial_zones():
<<<<<<< HEAD
=======
    """Cria zonas iniciais se não existirem"""
>>>>>>> def128b (atualização)
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


if __name__ == '__main__':
    app = create_app()
<<<<<<< HEAD
    print(" Iniciando servidor Backend ZATAN...")
    print(" API disponível em: http://localhost:5000")
    print(" Health check: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)
=======
    print("🚀 Iniciando servidor Backend ZATAN...")
    print("📍 API disponível em: http://localhost:5000")
    print("📊 Health check: http://localhost:5000/api/health")
    app.run(debug=True, host='0.0.0.0', port=5000)

>>>>>>> def128b (atualização)
