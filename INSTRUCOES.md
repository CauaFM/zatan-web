# 🚀 Instruções para Usar o Backend ZATAN

Este guia explica como configurar e executar o backend junto com o frontend do site ZATAN.

## 📋 Pré-requisitos

- **Python 3.8 ou superior** instalado
- **pip** (gerenciador de pacotes Python)

## 🔧 Configuração do Backend

### 1. Navegar até a pasta do backend

```bash
cd backend
```

### 2. Criar ambiente virtual (recomendado)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Executar o servidor backend

```bash
python app.py
```

O servidor estará rodando em: **http://localhost:5000**

Você verá mensagens como:
```
🚀 Iniciando servidor Backend ZATAN...
📍 API disponível em: http://localhost:5000
📊 Health check: http://localhost:5000/api/health
✅ Banco de dados inicializado com sucesso!
✅ Zonas iniciais criadas!
```

## 🌐 Executar o Frontend

### Opção 1: Servidor Python Simples

Em outro terminal, na pasta raiz do projeto:

```bash
# Python 3
python -m http.server 8000
```

Depois acesse: **http://localhost:8000**

### Opção 2: Outros servidores

```bash
# Node.js (com http-server instalado)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

## ✅ Verificar se está funcionando

1. **Backend:** Acesse http://localhost:5000/api/health
   - Deve retornar: `{"status": "online", "message": "Backend ZATAN está funcionando!"}`

2. **Frontend:** Acesse http://localhost:8000
   - O site deve carregar normalmente

3. **Formulário de Contato:**
   - Vá para http://localhost:8000/contato.html
   - Preencha e envie o formulário
   - Os dados serão salvos no banco de dados do backend

4. **Quiz:**
   - Vá para http://localhost:8000/quiz.html
   - Complete o quiz
   - Os resultados serão salvos no backend automaticamente

## 🔗 Endpoints da API

### Health Check
```
GET http://localhost:5000/api/health
```

### Contato/Feedback
```
POST http://localhost:5000/api/contact
GET http://localhost:5000/api/contact
GET http://localhost:5000/api/contact/<id>
```

### Quiz
```
POST http://localhost:5000/api/quiz/result
GET http://localhost:5000/api/quiz/results
GET http://localhost:5000/api/quiz/statistics
```

### Zonas
```
GET http://localhost:5000/api/zones
GET http://localhost:5000/api/zones/<id>
```

## 📁 Estrutura de Arquivos

```
projetonovo/
├── backend/                 # Backend Python (Flask)
│   ├── app.py              # Aplicação principal
│   ├── config.py           # Configurações
│   ├── database.py         # Banco de dados
│   ├── models.py           # Modelos de dados
│   ├── requirements.txt    # Dependências
│   ├── routes/             # Rotas da API
│   │   ├── contact.py
│   │   ├── quiz.py
│   │   └── zones.py
│   └── zatan.db           # Banco SQLite (criado automaticamente)
│
├── assets/                 # Arquivos do frontend
│   ├── css/
│   ├── js/
│   │   ├── api.js         # Comunicação com backend
│   │   └── ...
│   └── img/
│
├── *.html                  # Páginas do site
└── INSTRUCOES.md          # Este arquivo
```

## 🗄️ Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução:
- **Localização:** `backend/zatan.db`
- **Tabelas criadas automaticamente:**
  - `contacts` - Formulários de contato
  - `quiz_results` - Resultados do quiz
  - `zones` - Zonas do ZATAN

## ⚙️ Configurações Avançadas

### Alterar porta do backend

Edite `backend/config.py` ou defina variáveis de ambiente:
```bash
# Windows
set FLASK_RUN_PORT=3000
python app.py

# Linux/Mac
export FLASK_RUN_PORT=3000
python app.py
```

### Alterar URL da API no frontend

Edite `assets/js/api.js` e altere:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Para sua URL de produção:
```javascript
const API_BASE_URL = 'https://seu-backend.com/api';
```

## 🐛 Troubleshooting

### Erro: "ModuleNotFoundError"
- Certifique-se de estar com o ambiente virtual ativado
- Execute: `pip install -r requirements.txt`

### Erro de CORS
- Verifique se o frontend está nas origens permitidas em `backend/config.py`
- O backend já está configurado para aceitar requisições de `http://localhost:8000`

### Erro ao salvar dados
- Verifique se o backend está rodando na porta 5000
- Verifique o console do navegador para erros de conexão
- O site funciona offline, mas os dados não serão salvos

### Banco de dados não criado
- Delete o arquivo `backend/zatan.db` se existir
- Reinicie o servidor backend
- O banco será criado automaticamente

## 📝 Próximos Passos

1. ✅ Backend criado e funcionando
2. ✅ Frontend integrado com backend
3. ✅ Formulário de contato salvando no banco
4. ✅ Quiz salvando resultados no banco
5. 🔄 Adicionar autenticação (opcional)
6. 🔄 Deploy em produção (opcional)

## 💡 Dicas

- Mantenha o backend rodando em um terminal separado do frontend
- Use dois terminais: um para backend (porta 5000) e outro para frontend (porta 8000)
- Os dados são salvos automaticamente no banco SQLite
- Você pode visualizar o banco usando ferramentas como DB Browser for SQLite

## 📞 Suporte

Se encontrar problemas:
1. Verifique se todas as dependências foram instaladas
2. Certifique-se de que as portas 5000 e 8000 não estão em uso
3. Verifique os logs do terminal para mensagens de erro
4. Consulte a documentação do Flask se necessário



