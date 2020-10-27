"""
Django settings for easyticket project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import os
import sys
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("ET_DJANGO_SECRET")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',  # Django Rest Framework
    # https://www.django-rest-framework.org
    # To fix TypeError: Abstract base class containing model fields not
    # permitted
    # for proxy model 'TokenProxy'.
    'rest_framework.authtoken',
    'djoser',  # Using Djoser as the authentication system
    # https://djoser.readthedocs.io/en/latest/introduction.html
    # Summernote
    'django_summernote',
    # Own apps:
    'accounts',
    'marketing',
    'howtos',
    'premium',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'easyticket.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'easyticket.wsgi.application'


SITE_ID = 1
# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# Defined PostgreSQL database as default
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get("ET_BD_NAME"),
        'USER': os.environ.get("ET_POSTGRES_USER"),
        'PASSWORD': os.environ.get("ET_POSTGRES_PASS"),
        'HOST': 'localhost'
    }
}
if 'test' in sys.argv or 'test_coverage' in sys.argv:  # Covers regular testing and django-coverage
    DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql'
    DATABASES['default']['NAME'] = ':memory:'

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
# Rest Framework, JWT, Djoser
# Rest framework requires to set permission classes,
# as using JWT for authentication(supported by rest framework)
# it is mandatory to set as auth class
REST_FRAMEWORK = {
    'DEAFULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}
# JWT
# this is to set JWT in headers
# https://www.django-rest-framework.org/api-guide/authentication/#json-web-token-authentication
SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('JWT',),
}

# Djoser
# https://djoser.readthedocs.io/en/latest/
# https://djoser.readthedocs.io/en/latest/settings.html
# This is to customize Djoser authentication classes
# Some are to set the fields and some to set the endpoints or serializer routes
DJOSER = {
    # This is to use email as username
    'LOGIN_FIELD': 'email',
    # When registering, user needs to confirm the password
    'USER_CREATE_PASSWORD_RETYPE': True,

    # Upon registering a an activation email will be sent
    'SEND_ACTIVATION_EMAIL': True,
    'ACTIVATION_URL': 'activate/{uid}/{token}',

    # Upon registration or activation a confirmation email will be sent
    'SEND_CONFIRMATION_EMAIL': True,

    # Upon activation will need to re-enter the username and password
    'SET_USERNAME_RETYPE': True,
    'SET_PASSWORD_RETYPE': True,

    # Upon changing username send a confirmation email
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    # Upon changing password send a confirmation email
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,

    # When User resets password or username, a confirmation email will be sent
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',

    # Want user to logout on Password change
    'LOGOUT_ON_PASSWORD_CHANGE': True,
    # https://djoser.readthedocs.io/en/latest/settings.html#serializers
    # As will use custom user model from the accounts app:
    'SERIALIZERS': {
        'user_create': 'accounts.serializers.UserProfileCreateSerializer',
        'user': 'accounts.serializers.UserProfileCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
    },
}
# Define the custom usermodel as default
AUTH_USER_MODEL = 'accounts.UserProfile'

# Adding email settings

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get("ET_EMAIL_HOST")
EMAIL_PORT = 587
EMAIL_HOST_USER = os.environ.get("ET_EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("ET_EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = True


# Summernote to set bootstrap 4 theme
SUMMERNOTE_THEME = 'bs4'

# To fix https://support.mozilla.org/en-US/kb/xframe-neterror-page?as=u&utm_source=inproduct
X_FRAME_OPTIONS = 'SAMEORIGIN'
