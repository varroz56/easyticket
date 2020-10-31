from django.urls import path
from .views import ContactCreateView, ContactUsMessageCreateView

urlpatterns = [
    path('create-contact/', ContactCreateView.as_view()),
    path('create-message/', ContactUsMessageCreateView.as_view()),
]
