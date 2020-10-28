import stripe
from django.conf import settings
from rest_framework import status
from rest_framework.test import APITestCase


class StipePaymentTests(APITestCase):
    """ This is to tes stripe payments """

    def test_stripe_payment_request_returns_ok(self):
        """ This is to test that the request has
        been sent and returned with status code 200"""
        stripe.api_key = settings.STRIPE_SK
        url = settings.API_URL+'/api/payments/test-payment/'
        data = stripe.PaymentIntent.create(
            amount=1000,
            currency='pln',
            payment_method_types=['card'],
            receipt_email='baledi1182@sovixa.com'
        )
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_stripe_payment_request_returns_data(self):
        """ This is to test that the request has
        been sent and returned with the required data"""
        stripe.api_key = settings.STRIPE_SK
        url = settings.API_URL+'/api/payments/test-payment/'
        data = stripe.PaymentIntent.create(
            amount=1000,
            currency='pln',
            payment_method_types=['card'],
            receipt_email='baledi1182@sovixa.com'
        )
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(
            response.data["receipt_email"], "baledi1182@sovixa.com")
