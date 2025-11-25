# 🚀 Guia de Deploy para Google Cloud Platform

Este guia explica como fazer o deploy do projeto ZATAN no Google Cloud Platform usando App Engine.

## 📋 Pré-requisitos

1. **Conta Google Cloud** com projeto criado
2. **Google Cloud SDK** instalado ([instruções](https://cloud.google.com/sdk/docs/install))
3. **Python 3.11** instalado localmente
4. **Billing habilitado** no projeto (App Engine requer billing)

## 🔧 Configuração Inicial

### 1. Autenticar no Google Cloud

```bash
gcloud auth login
gcloud config set project SEU_PROJECT_ID
```

### 2. Habilitar APIs necessárias

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 3. Configurar App Engine (primeira vez)

```bash
gcloud app create --region=us-central
```

*Nota: Escolha a região mais próxima dos seus usuários. Opções comuns: `us-central`, `southamerica-east1` (São Paulo), `us-east1`, etc.*

## ⚙️ Configurações do Projeto

### 1. Atualizar SECRET_KEY no app.yaml

**IMPORTANTE**: Antes do deploy, edite o arquivo `app.yaml` e substitua `'GERE_UMA_CHAVE_SECRETA_SEGURA_AQUI'` por uma chave secreta forte:

```bash
# Gerar uma chave secreta (opcional)
python -c "import secrets; print(secrets.token_hex(32))"
```

### 2. Configurar Variáveis de Ambiente (Opcional)

Se precisar configurar variáveis de ambiente específicas:

```bash
gcloud app deploy --set-env-vars SECRET_KEY=sua_chave_secreta_aqui
```

Ou edite diretamente no arquivo `app.yaml` na seção `env_variables`.

### 3. Banco de Dados

Por padrão, o projeto usa SQLite (armazenado em `/tmp/zatan.db` no App Engine).

**Para produção, recomenda-se usar Cloud SQL**:

1. Crie uma instância Cloud SQL:
```bash
gcloud sql instances create zatan-db \
  --database-version=MYSQL_8_0 \
  --tier=db-f1-micro \
  --region=southamerica-east1
```

2. Crie o banco de dados:
```bash
gcloud sql databases create zatan --instance=zatan-db
```

3. Configure a conexão no `app.yaml`:
```yaml
env_variables:
  DATABASE_URL: 'mysql+pymysql://user:password@/zatan?unix_socket=/cloudsql/PROJECT_ID:REGION:zatan-db'
```

4. Adicione a instância Cloud SQL ao app.yaml:
```yaml
beta_settings:
  cloud_sql_instances: PROJECT_ID:REGION:zatan-db
```

## 📤 Fazendo o Deploy

### Deploy Inicial

```bash
gcloud app deploy
```

Este comando irá:
- Enviar todos os arquivos do projeto
- Instalar as dependências do `requirements.txt`
- Criar uma nova versão do App Engine
- Fazer o deploy automático

### Deploy com Versão Específica

```bash
gcloud app deploy --version=v1
```

### Deploy sem Promover (testar antes)

```bash
gcloud app deploy --no-promote
# Depois, para promover manualmente:
gcloud app versions migrate v1
```

## 🌐 Acessando a Aplicação

Após o deploy:

```bash
# Ver a URL da aplicação
gcloud app browse

# Ou acesse diretamente
https://SEU_PROJECT_ID.appspot.com
```

## 📊 Monitoramento e Logs

### Ver logs em tempo real

```bash
gcloud app logs tail -s default
```

### Ver logs no console web

Acesse: https://console.cloud.google.com/logs/query

### Ver métricas e performance

Acesse: https://console.cloud.google.com/appengine

## 🔄 Atualizando a Aplicação

Para atualizar após fazer mudanças:

```bash
# 1. Testar localmente primeiro
python main.py

# 2. Fazer o deploy
gcloud app deploy

# 3. Verificar os logs
gcloud app logs tail -s default
```

## 🛠️ Comandos Úteis

### Listar versões do App Engine

```bash
gcloud app versions list
```

### Migrar tráfego para uma versão específica

```bash
gcloud app versions migrate VERSION_ID
```

### Parar uma versão antiga

```bash
gcloud app versions stop VERSION_ID
```

### Deletar uma versão antiga

```bash
gcloud app versions delete VERSION_ID
```

### Ver configuração atual

```bash
gcloud app describe
```

## 🔒 Segurança

### 1. SECRET_KEY

**Nunca** commite a SECRET_KEY no código. Use variáveis de ambiente:

```bash
# No app.yaml (já configurado para usar env vars)
env_variables:
  SECRET_KEY: ${SECRET_KEY}
```

### 2. CORS

O CORS está configurado para aceitar todas as origens em produção. Para restringir:

```yaml
env_variables:
  CORS_ORIGINS: 'https://seusite.com,https://www.seusite.com'
```

### 3. HTTPS

O App Engine fornece HTTPS automaticamente. Certifique-se de que:
- Redireciona HTTP para HTTPS
- Usa HTTPS em todas as requisições

## 💰 Custos

### Estimativa de custos (aprox.)

- **F1 Instance**: ~$0.05/hora (~$36/mês se rodar 24/7)
- **Storage**: ~$0.026/GB/mês
- **Bandwidth**: Primeiros 1GB grátis, depois ~$0.12/GB

**Nota**: App Engine tem tier gratuito generoso para começar!

## 🐛 Troubleshooting

### Erro: "Module not found"

- Verifique se todas as dependências estão no `requirements.txt`
- Execute `pip install -r requirements.txt` localmente para testar

### Erro: "Database locked"

- SQLite pode ter problemas com múltiplas instâncias
- Considere migrar para Cloud SQL

### Erro: "Port already in use"

- O App Engine define a porta automaticamente via variável `PORT`
- Não precisa configurar porta manualmente

### Erro: "Instance class not available"

- Verifique se o billing está habilitado
- Algumas regiões podem não ter todos os tipos de instância

## 📝 Estrutura de Arquivos para Deploy

```
projetonovo/
├── main.py                 # Ponto de entrada (obrigatório)
├── app.yaml               # Configuração App Engine
├── requirements.txt       # Dependências Python
├── .gcloudignore         # Arquivos a ignorar no deploy
├── backend/              # Código backend
│   ├── app.py
│   ├── config.py
│   ├── ...
├── assets/               # Arquivos estáticos
└── *.html               # Páginas HTML
```

## 🔗 Links Úteis

- [Documentação App Engine](https://cloud.google.com/appengine/docs)
- [Python Runtime](https://cloud.google.com/appengine/docs/standard/python3/runtime)
- [Console do Google Cloud](https://console.cloud.google.com)
- [Pricing Calculator](https://cloud.google.com/products/calculator)

## ✅ Checklist de Deploy

- [ ] Google Cloud SDK instalado e autenticado
- [ ] Projeto criado no Google Cloud
- [ ] Billing habilitado
- [ ] App Engine habilitado na região escolhida
- [ ] SECRET_KEY atualizada no `app.yaml`
- [ ] `requirements.txt` com todas as dependências
- [ ] Testado localmente com `python main.py`
- [ ] `.gcloudignore` configurado corretamente
- [ ] Variáveis de ambiente configuradas (se necessário)
- [ ] Deploy executado com sucesso
- [ ] Health check funcionando (`/api/health`)
- [ ] Logs verificados

## 🎉 Pronto!

Após o deploy, sua aplicação estará disponível em:

```
https://SEU_PROJECT_ID.appspot.com
```

Para domínio personalizado, configure no [Console do App Engine](https://console.cloud.google.com/appengine/settings/domains).

---

**Desenvolvido para ZATAN - Zoneamento Ambiental e Territorial das Atividades Náuticas**

