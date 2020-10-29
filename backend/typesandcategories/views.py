from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from .serializers import EventTypeSerializer


class EventTypeCreateView(CreateAPIView):
    """ A view to create Event type instance """
    permission_classes = (permissions.AllowAny,)
    serializer_class = EventTypeSerializer
