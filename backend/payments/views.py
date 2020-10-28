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
            amount=18000,
            currency='usd',
            payment_method_types=['card'],
            receipt_email='baledi1182@sovixa.com',
            customer='cus_IHsjy2XOtzdbLl',
            payment_method='pm_1HhIgcJrrLmDBj9hCdMyQnQc',
            confirm=True
        )
        return Response(status=status.HTTP_200_OK, data=data)


class FindOrCreateStripeCustomer(APIView):
    """ This is to find or create stripe
    customer related to our user """

    def post(self, request):
        # using the data came with the request
        data = self.request.data
        customer = stripe.Customer.list(email=data['email'])
        print(customer.data)
        if not customer:
            customer = stripe.Customer.create(
                email=data['email'], payment_method=data['payment_method_id'])
            data = {'success': 'Created customer', 'data': customer}
            return Response(data, status=status.HTTP_201_CREATED)
        data = {'success': 'Found customer', 'data': customer}
        return Response(data, status=status.HTTP_200_OK)
