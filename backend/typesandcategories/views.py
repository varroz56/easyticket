# https://docs.djangoproject.com/en/3.1/ref/contrib/postgres/search/
from django.contrib.postgres.search import SearchVector
from rest_framework import filters, permissions, status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
# HTTP response to handle view exits
from rest_framework.response import Response
from .models import EventCategory, EventSubCategory
from .serializers import (EventCategorySerializer, EventSubCategorySerializer,
                          EventTypeSerializer)


class EventTypeCreateView(CreateAPIView):
    """ A view to create Event type instance """
    permission_classes = (permissions.AllowAny,)
    serializer_class = EventTypeSerializer


class EventCategoryCreateView(CreateAPIView):
    """ A view to create Category instance """
    permission_classes = (permissions.AllowAny,)
    serializer_class = EventCategorySerializer


class EventSubCategoryCreateView(CreateAPIView):
    """ A view to create Subcategory instance """
    permission_classes = (permissions.AllowAny,)
    serializer_class = EventSubCategorySerializer


class EventCategorySearchView(ListAPIView):
    """ A view to return searched category qs"""

    queryset = EventCategory.objects.all()
    serializer_class = EventCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']


class EventSubCategorySearchView(ListAPIView):
    """ A view to return searched subcategory qs"""

    queryset = EventSubCategory.objects.all()
    serializer_class = EventSubCategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
