"""easyticket URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # https://djoser.readthedocs.io/en/latest/authentication_backends.html#json-web-token-authentication
    # Include djoser urls
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # include marketing urls as info
    path('api/info/', include('marketing.urls')),
    # Summernote
    path('summernote/', include('django_summernote.urls')),
    # include premium urls
    path('api/premium/', include('premium.urls')),
    # include payments urls
    path('api/payments/', include('payments.urls')),
    # import types and categories urls
    path('api/types-categories/', include('typesandcategories.urls')),
    # import events urls
    path('api/events/', include('events.urls')),
    # import howtos urls
    path('api/howtos/', include('howtos.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]