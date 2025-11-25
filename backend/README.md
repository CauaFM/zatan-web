# Backend ZATAN

Backend em Python (Flask) para o sistema ZATAN - Zoneamento Ambiental e Territorial das Atividades Náuticas.

## 📋 Estrutura do Projeto

```
backend/
├── app.py                 # Aplicação principal Flask
├── config.py              # Configurações
├── database.py            # Configuração do banco de dados
├── models.py              # Modelos de dados (Contact, QuizResult, Zone)
├── requirements.txt       # Dependências Python
├── routes/                # Rotas organizadas por funcionalidade
│   ├── __init__.py
│   ├── contact.py         # API de contato/feedback
│   ├── quiz.py            # API de quiz
│   └── zones.py           # API de zonas
└── README.md
```

## 🚀 Como Instalar e Executar

### 1. Instalar Python

Certifique-se de ter Python 3.8 ou superior instalado.

### 2. Criar ambiente virtual (recomendado)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Executar o servidor

```bash
python app.py
```

O servidor estará disponível em: `http://localhost:5000`

## 📡 Endpoints da API

### Health Check
- `GET /api/health` - Verifica se o backend está online

### Contato/Feedback
- `POST /api/contact` - Criar novo contato
- `GET /api/contact` - Listar contatos (com paginação)
- `GET /api/contact/<id>` - Obter contato específico
- `PATCH /api/contact/<id>/read` - Marcar contato como lido

### Quiz
- `POST /api/quiz/result` - Salvar resultado do quiz
- `GET /api/quiz/results` - Listar resultados
- `GET /api/quiz/statistics` - Estatísticas do quiz

### Zonas
- `GET /api/zones` - Listar todas as zonas
- `GET /api/zones/<id>` - Obter zona específica
- `POST /api/zones` - Criar nova zona (admin)
- `PUT /api/zones/<id>` - Atualizar zona (admin)

## 🗄️ Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução. O arquivo `zatan.db` será criado na pasta `backend/`.

### Modelos de Dados

1. **Contact** - Formulários de contato/feedback
2. **QuizResult** - Resultados do quiz educativo
3. **Zone** - Zonas do ZATAN (Restrita, Regulada, Liberal)

## 🔧 Configurações

Edite o arquivo `config.py` para ajustar:
- Porta do servidor
- Configurações de CORS
- Configurações de email (opcional)
- Configurações do banco de dados

## 📝 Exemplo de Uso

### Enviar formulário de contato

```javascript
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao@example.com',
    tipo: 'sugestao',
    mensagem: 'Sugestão de melhoria...'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Salvar resultado do quiz

```javascript
fetch('http://localhost:5000/api/quiz/result', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    score: 8,
    total_questions: 10,
    nome: 'João Silva',
    email: 'joao@example.com',
    answers: [...]
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🔒 Segurança

- Em produção, altere a `SECRET_KEY` no `config.py`
- Configure CORS adequadamente para produção
- Considere adicionar autenticação para rotas administrativas

## 📦 Dependências

- Flask 3.0.0 - Framework web
- Flask-CORS 4.0.0 - Suporte a CORS
- Flask-SQLAlchemy 3.1.1 - ORM para banco de dados
- python-dotenv 1.0.0 - Variáveis de ambiente
- email-validator 2.1.0 - Validação de emails

## 🐛 Troubleshooting

### Erro ao instalar dependências
- Verifique se está usando Python 3.8+
- Use `pip install --upgrade pip` antes de instalar

### Erro de CORS
- Verifique as configurações de CORS no `config.py`
- Certifique-se de que o frontend está nas origens permitidas

### Erro de banco de dados
- Delete o arquivo `zatan.db` e reinicie o servidor
- O banco será recriado automaticamente



