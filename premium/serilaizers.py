from rest_framework import serializers
from .models import ShippingAddress, PremiumPackage


class ShippingAddressSerializer(serializers.ModelSerializer):
    """ Serialize Shipping address data"""
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class PremiumPackageSerializer(serializers.ModelSerializer):
    """ Serialize Premium Package data """
    class Meta:
        model = PremiumPackage
        exclude = ['created_on']
