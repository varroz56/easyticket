# User does not have to be authenticated to submit
# contact form, import permissions to allow Any
from rest_framework import permissions, status
# generic APIView from rest
from rest_framework.views import APIView
# HTTP response to handle view exits
from rest_framework.response import Response
# import settings to use env vars
from django.conf import settings
# import django builtin send email method
from django.core.mail import send_mail
# import our models
from .models import Contact, ContactUsMessage


class ContactCreateView(APIView):
    """ To Create a contact instance using the posted data"""
    # allow permissions
    permission_classes = (permissions.isAuthenticated,)
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
            content = {'success', 'Contact has been created'}
            return Response(content, status=status.HTTP_201_CREATED)
        # Found contact
        content = {'success', 'Found Contact'}
        return Response(content, status=status.HTTP_200_OK)


class ContactUsMessageCreateView(APIView):
    """Create Message instance and send automatic email to customer"""
    # set permissions
    permission_classes = (permissions.isAuthenticated,)

    # from the posted data

    def post(self, request):
        data = self.request.data

        try:
            # Create and save new Message instance
            message = ContactUsMessage(
                subject=data['subject'], message=data['message'], contact=data['email'])
            message.save()

            # setting end and prefix vars
            end = str(message.id)
            prefix = "CUF"
            # in the case of over 9999999 insatnces
            if message.id > 9999999:
                # backup prefix and the end will roll back to start
                # from 1
                prefix = "BUP"
                end = str(message.id-9999999)
            # get the length of the id
            # fill with 0s while get the required length
            num = len(end)
            mid = ""
            while num < 7:
                mid += "0"
                num += 1
            # set ref from the required tags
            ref = prefix + mid + end
            try:
                # Get contact to fill in the name field
                contact = Contact.objects.get(email=data['email'])
                # as Django send_mail required fields
                # name
                name = contact.first_name + " " + contact.last_name
                # subject
                subject = "Do not reply Re: " + data['subject']
                # our message
                message = "Dear " + name + ",\n" + "Thank you for contacting the Easy Ticket team, your enquery reference number: " + \
                    ref + ".\n" + "We will get back to you shortly. \n" + \
                    "Kind Regards, \n" + " The Easy Ticket Team"
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
                # message sent successfully
                content = {'success', 'Message created and sent successfully'}
                return Response(content, status=status.HTTP_200_OK)
            except:
                # Failed to send message
                content = {'error': 'Failed to send message'}
                return Response(content, status=status.HTTP_409_CONFLICT)
        except:
            # Failed to create message instance
            content = {'error': 'Failed to create message'}
            return Response(content, status=status.HTTP_412_PRECONDITION_FAILED)
