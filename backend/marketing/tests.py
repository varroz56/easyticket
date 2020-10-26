# https://www.django-rest-framework.org/api-guide/testing/
import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Contact, ContactUsMessage


class ContactTests(APITestCase):

    def test_create_contact(self):
        """
        Ensure we can create a new contact object.
        """
        url = '/api/info/create-contact/'
        data = {
            "first_name": "Bilbo",
            "last_name": "Baggins",
            "email": "wonelam694@prekab.net",
            "subscribe_me": "true"
        }
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Contact.objects.count(), 1)
        self.assertEqual(Contact.objects.get().first_name, 'Bilbo')

    def test_that_not_creating_duplicate_contact(self):
        """ If a contact deatils posted twice this should return 302 found instead of created"""
        url = '/api/info/create-contact/'
        data = {
            "first_name": "Bilbo",
            "last_name": "Baggins",
            "email": "wonelam694@prekab.net",
            "subscribe_me": "true"
        }
        response = self.client.post(
            url, data, format='json')
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_302_FOUND)


class ContactUsMessageTests(APITestCase):
    """ This is to test message creation and send message methods"""

    def test_that_message_send_fails_if_message_instance_could_not_be_created(self):
        """ This is to test if view fails because message was not created"""
        url = '/api/info/create-message/'
        data = {
            "email": "wonelam694@prekab.net",
            "subject": "Test Subject",
        }
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_412_PRECONDITION_FAILED)

    def test_that_message_create_fails_if_no_contact_created(self):
        url = '/api/info/create-message/'
        data = {
            "email": "wonelam694@prekab.net",
            "subject": "Test Subject",
            "message": "Test message"
        }
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

    def test_that_message_created_and_sent_if_everything_provided(self):
        """ This is to test if all data provided """

        data = {
            "first_name": "Bilbo",
            "last_name": "Baggins",
            "email": "gakiget101@insertswork.com",
            "subject": "testsubject",
            "message": "Testmessage",
            "subscribe_me": "True"
        }
        url = '/api/info/create-contact/'
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        url = '/api/info/create-message/'
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
