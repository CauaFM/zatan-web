# ☁️ Projeto ZATAN - Configurado para Google Cloud

## ✅ O que foi feito

Este projeto foi completamente preparado para deploy no Google Cloud Platform (App Engine). Todas as configurações foram implementadas e organizadas.

## 📁 Arquivos Criados/Modificados

### Novos Arquivos de Configuração

1. **`main.py`** - Ponto de entrada para App Engine
2. **`app.yaml`** - Configuração do App Engine
3. **`requirements.txt`** - Dependências Python (na raiz)
4. **`.gcloudignore`** - Arquivos ignorados no deploy
5. **`DEPLOY.md`** - Guia completo de deploy
6. **`GOOGLE_CLOUD_SETUP.md`** - Este arquivo

### Arquivos Modificados

1. **`backend/app.py`**
   - ✅ Integrado para servir arquivos estáticos (HTML, CSS, JS)
   - ✅ Rotas configuradas para frontend e backend
   - ✅ Preparado para produção

2. **`backend/config.py`**
   - ✅ Configuração para Google Cloud
   - ✅ Suporte a variáveis de ambiente do GCP
   - ✅ CORS configurado para produção
   - ✅ Banco de dados preparado para `/tmp` no App Engine

3. **`backend/requirements.txt`**
   - ✅ Adicionado `gunicorn` (servidor WSGI para produção)
   - ✅ Versões fixas de todas as dependências

4. **`assets/js/api.js`**
   - ✅ URL da API detecta automaticamente o ambiente
   - ✅ Funciona em desenvolvimento (localhost) e produção

## 🏗️ Estrutura Final

```
projetonovo/
├── main.py                    # ← NOVO: Ponto de entrada App Engine
├── app.yaml                   # ← NOVO: Configuração App Engine
├── requirements.txt           # ← NOVO: Dependências (raiz)
├── .gcloudignore             # ← NOVO: Ignorar arquivos no deploy
├── DEPLOY.md                  # ← NOVO: Guia de deploy completo
├── GOOGLE_CLOUD_SETUP.md      # ← NOVO: Este arquivo
│
├── backend/
│   ├── app.py                # ← MODIFICADO: Serve arquivos estáticos
│   ├── config.py             # ← MODIFICADO: Config GCP
│   ├── requirements.txt      # ← MODIFICADO: Adicionado gunicorn
│   └── ...
│
├── assets/
│   └── js/
│       └── api.js            # ← MODIFICADO: URL relativa
│
└── *.html                     # Páginas HTML
```

## 🚀 Próximos Passos

### 1. Antes do Deploy

1. **Gerar SECRET_KEY**
   ```bash
   python -c "import secrets; print(secrets.token_hex(32))"
   ```

2. **Editar `app.yaml`**
   - Substituir `'GERE_UMA_CHAVE_SECRETA_SEGURA_AQUI'` pela chave gerada

### 2. Configurar Google Cloud

```bash
# Autenticar
gcloud auth login

# Definir projeto
gcloud config set project SEU_PROJECT_ID

# Habilitar APIs
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Criar App Engine (primeira vez)
gcloud app create --region=southamerica-east1
```

### 3. Fazer Deploy

```bash
gcloud app deploy
```

### 4. Acessar

```bash
gcloud app browse
```

## 📋 Checklist Pré-Deploy

- [ ] Google Cloud SDK instalado
- [ ] Autenticado no Google Cloud (`gcloud auth login`)
- [ ] Projeto criado no Google Cloud
- [ ] Billing habilitado
- [ ] SECRET_KEY atualizada no `app.yaml`
- [ ] Testado localmente: `python main.py`
- [ ] Verificar que tudo funciona em `http://localhost:5000`

## 🔧 Configurações Importantes

### Ambiente
- **Runtime**: Python 3.11
- **Instância**: F1 (pode mudar para F2/F4 se necessário)
- **Escalamento**: Automático (1-10 instâncias)

### Banco de Dados
- Por padrão: SQLite em `/tmp/zatan.db`
- Para produção: Configurar Cloud SQL (veja `DEPLOY.md`)

### CORS
- Em produção: Aceita todas as origens (`*`)
- Para restringir: Configure variável `CORS_ORIGINS` no `app.yaml`

## 🌐 URLs

Após o deploy:
- **App**: `https://SEU_PROJECT_ID.appspot.com`
- **Health Check**: `https://SEU_PROJECT_ID.appspot.com/api/health`
- **API**: `https://SEU_PROJECT_ID.appspot.com/api/*`

## 💡 Funcionalidades

✅ Frontend integrado (HTML servido pelo Flask)
✅ Backend API funcionando
✅ Arquivos estáticos servidos corretamente
✅ CORS configurado
✅ Health check para monitoramento
✅ Banco de dados inicializado automaticamente
✅ Dados iniciais (zonas) criados automaticamente

## 📚 Documentação

- **Deploy completo**: Veja `DEPLOY.md`
- **Backend**: Veja `backend/README.md`
- **Frontend**: Veja `README.md`

## ⚠️ Notas Importantes

1. **SQLite em Produção**: SQLite em `/tmp/` é efêmero (perde dados se instância reiniciar). Para dados persistentes, use Cloud SQL.

2. **SECRET_KEY**: **SEMPRE** use uma chave segura em produção. Não use a chave padrão.

3. **CORS**: Configurado para aceitar todas as origens em produção. Ajuste conforme necessário para segurança.

4. **Recursos**: A instância F1 tem limites. Se precisar de mais recursos, altere no `app.yaml`.

## 🆘 Suporte

Em caso de problemas:
1. Verifique os logs: `gcloud app logs tail -s default`
2. Veja o guia de troubleshooting no `DEPLOY.md`
3. Verifique a documentação do Google Cloud

---

**Projeto pronto para deploy no Google Cloud! 🚀**

