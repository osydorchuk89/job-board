import os
import dj_database_url
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY = "django-insecure-+a_n#)rmfdh%ncm1e=!sf_gby*vyivp9@5c9!#l37ve^gh9o4("
SECRET_KEY = os.environ.get("SECRET_KEY", default="your secret key")

DEBUG = os.environ.get("DEBUG", "True") == "True"

ALLOWED_HOSTS = []

RENDER_EXTERNAL_HOSTNAME = os.environ.get("RENDER_EXTERNAL_HOSTNAME")
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "djoser",
    "corsheaders",
    "debug_toolbar",
    "core",
    "candidates",
    "companies",
    "vacancies",
    "feedback",
]

MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend_job_board.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend_job_board.wsgi.application"


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
DATABASES["default"] = dj_database_url.parse(os.environ.get("DATABASE_URL"))
# DATABASES["default"] = dj_database_url.parse(
#     "postgres://job_link_db_03cu_user:lQhRrkR1LKXzCVQBzeBXbOx8YqIoEDCv@dpg-cle63a7pc7cc73elj07g-a.frankfurt-postgres.render.com/job_link_db_03cu"
# )

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3.S3Storage",
        "OPTIONS": {
            "bucket_name": "job-link",
            "access_key": os.environ.get("AWS_ACCES_KEY_ID"),
            "secret_key": os.environ.get("AWS_SECRET_ACCESS_KEY"),
            "location": "media",
            "region_name": "us-east-1",
            "file_overwrite": False,
            "signature_version": "s3v4",
            "default_acl": "public-read",
            "object_parameters": {"CacheControl": "max-age=86400"},
            "custom_domain": "%s.s3.amazonaws.com" % "job-link",
        },
    },
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"
if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
    STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
}

CORS_ALLOWED_ORIGINS = ["http://localhost:5173", "https://job-link.onrender.com"]

AUTH_USER_MODEL = "core.User"

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "AUTH_HEADER_TYPES": ("Bearer", "JWT"),
}

DJOSER = {
    "SERIALIZERS": {
        "user_create": "core.serializers.UserCreateSerializer",
        "current_user": "core.serializers.UserSerializer",
    }
}

INTERNAL_IPS = [
    "127.0.0.1",
]

# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,
#     "handlers": {
#         "console": {"class": "logging.StreamHandler"},
#         "file": {
#             "class": "logging.FileHandler",
#             "filename": "general.log",
#             "formatter": "verbose",
#         },
#     },
#     "loggers": {
#         "": {
#             "handlers": ["console", "file"],
#             "level": os.environ.get("DJANGO_LOG_LEVEL", "INFO"),
#         }
#     },
#     "formatters": {
#         "verbose": {
#             "format": "{asctime} ({levelname}) - {name} - {message}",
#             "style": "{",
#         }
#     },
# }
