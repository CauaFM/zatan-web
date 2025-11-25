"""
Ponto de entrada principal para Google App Engine
"""
import os
from backend.app import create_app

# Criar a aplicação Flask
app = create_app()

# Para App Engine, o servidor será iniciado automaticamente
# Port será definido pela variável de ambiente PORT do Google Cloud
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

