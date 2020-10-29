from rest_framework import serializers
from .models import Event, EventUpdate


class EventSerializer(serializers.ModelSerializer):
    """ Serialize events data """
    class Meta:
        model = Event
        fields = '__all__'


class EventUpdateSerializer(serializers.ModelSerializer):
    """ Serialize Event Update data"""
    class Meta:
        model = EventUpdate
        fields = '__all__'
