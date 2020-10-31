from rest_framework import serializers
from .models import EventType, EventCategory, EventSubCategory


class EventTypeSerializer(serializers.ModelSerializer):
    """ Serialize Event Type data """
    class Meta:
        model = EventType
        fields = '__all__'


class EventCategorySerializer(serializers.ModelSerializer):
    """ Serialize Event Category """
    class Meta:
        model = EventCategory
        fields = '__all__'


class EventSubCategorySerializer(serializers.ModelSerializer):
    """ Serialize Event Subcategory data"""
    class Meta:
        model = EventSubCategory
        fields = '__all__'
