from rest_framework import serializers
from .models import Contact, ContactUsMessage


class ContactSerializer(serializers.ModelSerializer):
    """ Contact serializer to interpret contact details"""
    class Meta:
        model = Contact
        fields = '__all__'


class ContactUsMessageSerializer(serializers.ModelSerializer):
    """ Serialize contact us message data"""
    class Meta:
        model = ContactUsMessage
        fields = '__all__'
