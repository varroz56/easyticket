# Used as guidance
# https://stripe.com/docs/payments/payment-intents
# https://medium.com/better-programming/how-to-integrate-django-react-app-with-stripe-payments-95709b3f23e5
from django.db import models


class PurchasedPackage(models.Model):
    """ This model will hold the data about a purchase,
        a receipt can be sent using its data and even
        the user has been deleted this should be retained
        The shipping address can be changed by the user
        so to keep it with the purchase this needs to
        be added instead of relating
    """

    user = models.ForeignKey("accounts.UserProfile",
                             null=True, on_delete=models.SET_NULL)
    full_name = models.CharField(max_length=254)
    address_line_one = models.CharField(max_length=254)
    address_line_two = models.CharField(max_length=254)
    postcode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.uuid
