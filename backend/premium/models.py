from django.db import models
from accounts.models import UserProfile


class ShippingAddress(models.Model):
    """ User's shipping address One to one relation to user"""
    user = models.OneToOneField(
        "accounts.UserProfile", on_delete=models.CASCADE)
    address_line_one = models.CharField(max_length=254)
    address_line_two = models.CharField(max_length=254)
    postcode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Shipping Adresses"

    def __str__(self):
        return self.user.email
