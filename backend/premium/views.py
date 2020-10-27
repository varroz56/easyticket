# User will need to be authneticated in
# order to make changes to the shipping address
from rest_framework import permissions, status
# generic APIView from rest
from rest_framework.views import APIView
# HTTP response to handle view exits
from rest_framework.response import Response
# import our models
from .models import ShippingAddress
from accounts.models import UserProfile


class ShippingAddressCRUDView(APIView):
    """ This view handles CRUD on the shipping address
        Customer can always change or delete this, however, for purchase,
        this needs to be entered if not exists and the address will be
        stored along the purchase details, what cannot be deleted
    """

    # At the moment it allows everybody,
    # in production this needs to be authenticated
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # using the data came with the request
        data = self.request.data

        # try to find user if not found error
        user = UserProfile.objects.filter(id=data['user'])

        if not user:
            content = {'error', 'User not found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        # user found, check if address found, if not,
        # create one or found, update it
        user = UserProfile.objects.get(id=data['user'])
        address = ShippingAddress.objects.filter(user=user)
        if not address:
            address = ShippingAddress(
                user=user,
                address_line_one=data['address_line_one'],
                address_line_two=data['address_line_two'],
                postcode=data['postcode'],
                city=data['city'],
                country=data['country'])
            address.save()

            content = {'success', 'New Address has been added'}
            return Response(content, status=status.HTTP_201_CREATED)

        address = ShippingAddress.objects.filter(user=user).update(
            address_line_one=data['address_line_one'],
            address_line_two=data['address_line_two'],
            postcode=data['postcode'],
            city=data['city'],
            country=data['country'])
        content = {'success', 'Address has been updated'}
        return Response(content, status=status.HTTP_200_OK)
