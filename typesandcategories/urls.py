from django.urls import path
from .views import (EventTypeCreateView,
                    EventCategoryCreateView,
                    EventSubCategoryCreateView,
                    EventCategorySearchView,
                    EventSubCategorySearchView)


urlpatterns = [
    path('create-event-type/', EventTypeCreateView.as_view()),
    path('create-event-category/', EventCategoryCreateView.as_view()),
    path('create-event-subcategory/', EventSubCategoryCreateView.as_view()),
    path('get-categories/', EventCategorySearchView.as_view()),
    path('get-subcategories/', EventSubCategorySearchView.as_view()),
]
