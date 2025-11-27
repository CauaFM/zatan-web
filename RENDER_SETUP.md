# ☁️ Projeto ZATAN - Configurado para Render

## ✅ O que mudou

O projeto foi reorganizado para rodar 100% no Render como um **Web Service Python** com Gunicorn servindo o backend Flask e os arquivos estáticos do frontend.

### Arquivos novos

1. `wsgi.py` – ponto de entrada WSGI carregado pelo Gunicorn/Render.
2. `Procfile` – define o comando `web: gunicorn wsgi:app`.
3. `render.yaml` – blueprint com build/start commands e versão do Python.
4. `RENDER_SETUP.md` – este guia rápido.

### Arquivos ajustados

- `backend/app.py`, `routes/*`, `models.py`: imports relativos para funcionar quando o pacote é carregado pelo Gunicorn.
- `backend/config.py`: pronto para usar variáveis do Render (`DATABASE_URL`, `RENDER_PERSISTENT_DIR`, `RENDER_EXTERNAL_URL`).
- `main.py`: mantido para desenvolvimento local (sem dependências do Google Cloud).
- Documentação (`DEPLOY.md`, `LEIA-ME-DEPLOY.md`): agora descrevem somente o fluxo no Render.

## 🏗️ Estrutura para Deploy no Render

```
projetonovo/
├── Procfile
├── render.yaml
├── requirements.txt
├── wsgi.py
├── backend/
│   ├── app.py
│   ├── config.py
│   └── ...
└── (HTML/CSS/JS do frontend)
```

## 🚀 Variáveis de ambiente recomendadas

Configure no dashboard ou no `render.yaml`:

| Variável | Descrição |
| --- | --- |
| `SECRET_KEY` | Obrigatória em produção. |
| `DATABASE_URL` | Opcional. Render gera automaticamente para bancos gerenciados (Postgres). |
| `CORS_ORIGINS` | Lista separada por vírgula caso queira restringir domínios. |
| `RENDER_PERSISTENT_DIR` | Render preenche automaticamente quando você adiciona um Disk. Usado para SQLite. |

Se não configurar um Postgres, adicione um **Render Disk** e use SQLite persistente em `RENDER_PERSISTENT_DIR/zatan.db`.

## 🧪 Testar localmente

```
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

Front e API estarão acessíveis em `http://localhost:5000`.

--- 

Pronto! Basta conectar o repositório ao Render ou aplicar o `render.yaml` para criar o serviço. Ajuste apenas as variáveis de ambiente e, se necessário, conecte um Postgres ou disco persistente.

