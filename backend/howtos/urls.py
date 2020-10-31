from django.urls import path
from .views import HowToListView

urlpatterns = [
    path('get-howtos/', HowToListView.as_view()),
]
