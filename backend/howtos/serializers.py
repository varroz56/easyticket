from rest_framework import serializers
from .models import HowTo


class HowToSerializer(serializers.ModelSerializer):
    """ Serialize How To data"""
    class Meta:
        model = HowTo
        fields = ('question', 'answer', 'reference')
