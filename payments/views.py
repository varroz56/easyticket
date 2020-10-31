import stripe
import json
from datetime import date, timedelta
from django.conf import settings
from accounts.models import UserProfile
from premium.models import ShippingAddress, PremiumPackage
from rest_framework import status, permissions
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import PurchasedPackage

stripe.api_key = settings.STRIPE_SK


class StripePaymentView(APIView):
    """ A view to create stripe payment"""

    def post(self, request):
        data = self.request.data
        try:
            data = stripe.PaymentIntent.create(
                amount=data['amount'],
                currency='eur',
                payment_method_types=['card'],
                receipt_email=data['email'],
                customer=data['customer'],
                payment_method=data['payment_method'],
                confirm=True
            )
            return Response(status=status.HTTP_200_OK, data=data)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


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


class HandlePremiumPackagePurchaseView(APIView):
    """ This view to handle after-payment options and methods
        When a payment has been submitted, the following needs to happen:
        - Need to create a Purchased package instance to hold the
        relevant data together and to keep them safe from any change
        - Set customer to premium user and set the relevant timeout
        - send an email to customer with a purchase receipt
    """

    def post(self, request):
        """ All relevant data will be sent with the request """
        data = self.request.data
        if UserProfile.objects.filter(id=data['user']):
            user = UserProfile.objects.get(id=data['user'])
        else:
            # Problelm finding user:
            content = {'error': 'Failed to find User'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        if PremiumPackage.objects.filter(slug=data['chosen_package']):
            ppackage = PremiumPackage.objects.get(slug=data['chosen_package'])
        else:
            # Problelm finding package:
            content = {'error': 'Failed to find Package'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)

        # creating PurchasedPackage instance
        purchase = PurchasedPackage(
            user=user,
            full_name=user.get_full_name(),
            email=data['email'],
            address_line_one=data['address_line_one'],
            address_line_two=data['address_line_two'],
            postcode=data['postcode'],
            city=data['city'],
            country=data['country'],
            price_paid=data['price_paid'],
            days_given=data['days_given'],
            ppackage=ppackage
        )
        purchase.save()
        # setting premium related user fields
        if user.is_premium:
            if date.today() > user.premium_until:
                UserProfile.objects.filter(id=user.id).update(
                    premium_until=date.today()+timedelta(data['days_given'])
                )
            else:
                UserProfile.objects.filter(id=user.id).update(
                    premium_until=user.premium_until +
                    timedelta(data['days_given'])
                )
        else:
            if date.today() > user.premium_until:
                UserProfile.objects.filter(id=user.id).update(
                    premium_until=date.today()+timedelta(data['days_given']),
                    is_premium=True
                )
            else:
                UserProfile.objects.filter(id=user.id).update(
                    premium_until=user.premium_until +
                    timedelta(data['days_given']),
                    is_premium=True
                )
            # creating email
        try:
            # as Django send_mail required fields
            # name
            name = user.get_full_name()
            # subject
            subject = "Thank you for your purchase!"

            # our message
            days = data['days_given']
            price = data['price_paid']
            message = "Dear " + name + ",\n" + " Thank you for your purchase!" + \
                "\n" + " Your choosen package: " + ppackage.name + "\n" + \
                " Gives you " + str(days) + " days access.\n" + \
                " Price paid: " + str(price) + "\n" + \
                " Reference number: " + str(purchase.id) + "\n" + \
                " Kind Regards, \n" + " The Easy Ticket Team"

            # get the email host to set sender
            sender = settings.EMAIL_HOST_USER

            recipient = [data['email']]
            send_mail(
                subject,
                message,
                sender,
                recipient,
                fail_silently=False
            )
            content = {'success', 'Order saved, Email sent successfully'}
            return Response(content, status=status.HTTP_200_OK)
        except:
            # Failed to send message
            content = {'error': 'Order created, but failed to send email'}
            return Response(content, status=status.HTTP_409_CONFLICT)
