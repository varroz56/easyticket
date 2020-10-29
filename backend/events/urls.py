from django.urls import path
from .views import EventCreateView, EventUpdateView

urlpatterns = [
    path('create/', EventCreateView.as_view()),
    path('update/', EventUpdateView.as_view()),
]
