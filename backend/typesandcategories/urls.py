from django.urls import path
from .views import EventTypeCreateView


urlpatterns = [
    path('create-event-type/', EventTypeCreateView.as_view()),
]
