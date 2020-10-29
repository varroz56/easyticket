from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from .serializers import (EventTypeSerializer,
                          EventCategorySerializer, EventSubCategorySerializer)


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
