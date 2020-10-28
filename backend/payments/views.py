from django.conf import settings
import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

stripe.api_key = settings.STRIPE_SK


class StripeTestPaymentView(APIView):
    """ This is to test stripe payment request"""

    def post(self, request):

        data = stripe.PaymentIntent.create(
            amount=1000,
            currency='pln',
            payment_method_types=['card'],
            receipt_email='baledi1182@sovixa.com'
        )
        return Response(status=status.HTTP_200_OK, data=data)
