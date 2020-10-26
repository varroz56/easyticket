from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    """ Contact serializer to interpret contact details"""
    class Meta:
        model = Contact
        fields = '__all__'
