from django.urls import path
from .views import EventCreateView, EventUpdateView, EventListView, EventDetailView, EventUpdateListView

urlpatterns = [
    path('create/', EventCreateView.as_view()),
    path('update/', EventUpdateView.as_view()),
    path('get-events/', EventListView.as_view()),
    path('event-details/<reference>', EventDetailView.as_view()),
    path('event-details/<event>', EventDetailView.as_view()),
]
