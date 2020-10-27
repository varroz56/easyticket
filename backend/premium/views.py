import json
# User will need to be authneticated in
# order to make changes to the shipping address
from rest_framework import permissions, status
# generic APIView from rest
from rest_framework.views import APIView
# to be able to handle delete
from rest_framework.generics import DestroyAPIView, RetrieveAPIView
# HTTP response to handle view exits
from rest_framework.response import Response
# import our models
from .models import ShippingAddress
from .serilaizers import ShippingAddressSerializer
from accounts.models import UserProfile


class ShippingAddressCRUDView(APIView):
    """ This view handles Create Read and Update on the shipping address
        Customer can always change or delete this, however, for purchase,
        this needs to be entered if not exists and the address will be
        stored along the purchase details, what cannot be deleted
    """

    # At the moment it allows everybody,
    # in production this needs to be authenticated
    permission_classes = (permissions.AllowAny,)
    # CREATE AND UPDATE

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


class ShippingAddressReadView(RetrieveAPIView):
    """ This view to handle get request on
        It will exit if no user, no address or
        when found
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        # using the data came with the request
        data = self.request.data

        # try to find user if not found error
        user = UserProfile.objects.filter(id=data['user'])
        if not user:
            content = {'error', 'User not found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        user = UserProfile.objects.get(id=data['user'])

        address = ShippingAddress.objects.filter(user=data['user'])
        if not address:
            content = {
                'info', 'No Address has been saved yet, unable to show'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        queryset = ShippingAddress.objects.get(user=data['user'])
        serializer = ShippingAddressSerializer(queryset, many=False)
        content = {'success', 'Address found'}
        return Response(serializer.data, status=status.HTTP_200_OK)


class ShippingAddressDeletView(DestroyAPIView):
    """ This view to handle instance deletion
        It will exit if no user, no address or
        when the instance deleted
    """
    permission_classes = (permissions.AllowAny,)

    def delete(self, request):
        # using the data came with the request
        data = self.request.data

        # try to find user if not found error
        user = UserProfile.objects.filter(id=data['user'])
        if not user:
            content = {'error', 'User not found'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        user = UserProfile.objects.get(id=data['user'])

        address = ShippingAddress.objects.filter(user=data['user'])
        if not address:
            content = {
                'info', 'No Address has been saved yet, unable to delete'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        ShippingAddress.objects.get(user=data['user']).delete()
        content = {
            'success', 'Address has been deleted'}
        return Response(content, status=status.HTTP_204_NO_CONTENT)
