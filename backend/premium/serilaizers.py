from rest_framework import serializers
from .models import ShippingAddress


class ShippingAddressSerializer(serializers.ModelSerializer):
    """ Serialize Shipping address data"""
    class Meta:
        model = ShippingAddress
        fields = '__all__'
