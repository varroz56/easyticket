# User does not have to be authenticated to submit
# contact form, import permissions to allow Any
from rest_framework import permissions
# generic APIView from rest
from rest_framework.views import APIView
# HTTP response to handle view exits
from rest_framework.response import Response
# import our models
from .models import Contact


class ContactCreateView(APIView):
    """ To Create a contact instance using the posted data"""
    # allow permissions
    permission_classes = (permissions.AllowAny,)
    # define post method

    def post(self, request):
        # using the data came with the request
        data = self.request.data
        # got the data, getting contact
        contact = Contact.objects.filter(email=data['email'])
        # if contact does not exist
        if not contact:
            # check subscribe value to set sme value to python bool
            if data['subscribe_me'] == "true":
                sme = True
            sme = False
            # create and save new contact
            contact = Contact(first_name=data['first_name'], last_name=data['last_name'],
                              email=data['email'], subscribe_me=sme)
            contact.save()
            # New contact created
            return Response({'success', 'Contact has been created'})
        # Failed to create new contact
        return Response({'success', 'Found Contact'})
