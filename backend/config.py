import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")

DEBUG = os.environ.get("FLASK_DEBUG", os.environ.get("DEBUG", "false")).lower() == "true"

_database_url = os.environ.get("DATABASE_URL")

if _database_url and _database_url.startswith("postgres://"):
    _database_url = _database_url.replace("postgres://", "postgresql://", 1)

if _database_url:
    SQLALCHEMY_DATABASE_URI = _database_url
else:
    persistent_dir = os.environ.get("RENDER_PERSISTENT_DIR")
    if persistent_dir:
        db_path = Path(persistent_dir) / "zatan.db"
    elif os.environ.get("GAE_ENV"):
        db_path = Path("/tmp") / "zatan.db"
    else:
        db_path = BASE_DIR / "zatan.db"

    db_path.parent.mkdir(parents=True, exist_ok=True)
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{str(db_path)}"

SQLALCHEMY_TRACK_MODIFICATIONS = False

_cors_origins_env = os.environ.get("CORS_ORIGINS", "")
if _cors_origins_env:
    CORS_ORIGINS = [origin.strip() for origin in _cors_origins_env.split(",") if origin.strip()]
else:
    CORS_ORIGINS = [
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5000",
        "http://127.0.0.1:5000",
    ]

render_external_url = os.environ.get("RENDER_EXTERNAL_URL")
if render_external_url and render_external_url not in CORS_ORIGINS:
    CORS_ORIGINS.append(render_external_url)

if os.environ.get("ALLOW_ALL_ORIGINS", "false").lower() == "true":
    CORS_ORIGINS = ["*"]

MAIL_SERVER = os.environ.get("MAIL_SERVER", "smtp.gmail.com")
MAIL_PORT = int(os.environ.get("MAIL_PORT", 587))
MAIL_USE_TLS = os.environ.get("MAIL_USE_TLS", "True").lower() == "true"
MAIL_USERNAME = os.environ.get("MAIL_USERNAME", "")
MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD", "")

CONTACT_EMAIL = os.environ.get("CONTACT_EMAIL", "contato@zatan.pe.gov.br")

class Config:
    SECRET_KEY = SECRET_KEY
    DEBUG = DEBUG
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = SQLALCHEMY_TRACK_MODIFICATIONS

    CORS_ORIGINS = CORS_ORIGINS

    MAIL_SERVER = MAIL_SERVER
    MAIL_PORT = MAIL_PORT
    MAIL_USE_TLS = MAIL_USE_TLS
    MAIL_USERNAME = MAIL_USERNAME
    MAIL_PASSWORD = MAIL_PASSWORD
    CONTACT_EMAIL = CONTACT_EMAIL

    BASE_DIR = str(BASE_DIR)
