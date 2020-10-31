# Using serializer to convert querysets and models into native Python datatypes
# https://djoser.readthedocs.io/en/latest/settings.html#serializers
# As using Rest and Djoser, will inherit and override the Djoser CreateUserSerializer
from djoser.serializers import UserCreateSerializer
# get django User model what is our custom model
from django.contrib.auth import get_user_model

User = get_user_model()


class UserProfileCreateSerializer(UserCreateSerializer):
    """ User Profile serializer This needs to be added to Djoser's SERIALIZERS settings"""
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
