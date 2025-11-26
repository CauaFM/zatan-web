FROM python:3.11-slim

# evitar prompts interativos ao instalar pacotes
ENV DEBIAN_FRONTEND=noninteractive
ENV PORT=8080

WORKDIR /app

# instalar dependências do sistema (compacto)
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential gcc libpq-dev ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# atualizar pip/setuptools/wheel e instalar requirements
COPY requirements.txt .
RUN python -m pip install --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt

# copiar código
COPY . .

EXPOSE 8080

# iniciar usando a factory create_app() no backend.app
CMD exec gunicorn --bind :$PORT "backend.app:create_app()" --workers 1 --threads 2 --timeout 120

