"""
<<<<<<< HEAD
Ponto de entrada principal para Google App Engine
=======
Ponto de entrada principal para executar o backend ZATAN localmente.
>>>>>>> def128b (atualização)
"""
import os
from backend.app import create_app

# Criar a aplicação Flask
app = create_app()

<<<<<<< HEAD
# Para App Engine, o servidor será iniciado automaticamente
# Port será definido pela variável de ambiente PORT do Google Cloud
=======
# Em produção o Render/Gunicorn cuida do servidor; aqui apenas rodamos localmente
# A porta pode ser definida via variável de ambiente PORT (Render, Railway, etc.)
>>>>>>> def128b (atualização)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

