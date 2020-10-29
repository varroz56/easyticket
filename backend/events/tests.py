from django.conf import settings
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import UserProfile
from typesandcategories.models import (EventType,
                                       EventCategory,
                                       EventSubCategory)
from .models import Event, EventUpdate


class EventTests(APITestCase):
    """ test event views"""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        UserProfile.objects.create_user(
            email="dorimij336@wpfoo.com",
            first_name="Bilbo",
            last_name="Baggins",
            password="Password123!!"
        )
        EventType.objects.create(
            name="TestType",
            short="TST",
            description="Test Type desc"
        )
        EventCategory.objects.create(
            name="Test Category",
            description="Test Category description"
        )
        EventSubCategory.objects.create(
            name="Test Subcategory",
            description="Test Subcategory desc",
            etype=EventType.objects.get(short="TST"),
            ecategory=EventCategory.objects.get(name="Test Category")
        )

    def test_that_event_created(self):
        """ This is to test event creation"""
        url = settings.API_URL+'/api/events/create/'

        data = {
            "user": 1,
            "open_notes": "This is a opening test note",
            "sub_category": 1
        }
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_201_CREATED)

    def test_that_event_ref_created(self):
        """ This is to test event creation"""
        url = settings.API_URL+'/api/events/create/'

        data = {
            "user": 1,
            "open_notes": "This is a opening test note1111",
            "sub_category": 1
        }
        response = self.client.post(
            url, data, format='json')
        if response.status_code == status.HTTP_201_CREATED:
            event = Event.objects.get(
                open_notes="This is a opening test note1111")

            self.assertEqual(event.reference, "TST0000002")
        else:
            self.assertEqual(1, 2)

    def test_that_eventupdate_instance_created(self):
        """ Test that when updating event an update instance created"""
        url = settings.API_URL+'/api/events/create/'

        data = {
            "user": 1,
            "open_notes": "This is a opening test note11112",
            "sub_category": 1
        }
        response = self.client.post(
            url, data, format='json')
        if response.status_code == status.HTTP_201_CREATED:
            url = settings.API_URL+'/api/events/update/'

            data = {
                "user": 1,
                "event": "TST0000003",
                "update_notes": "This is an update test note",
                "status": "ON_HOLD"
            }

            response = self.client.post(
                url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            update = EventUpdate.objects.get(
                update_notes="This is an update test note")
            self.assertEqual(update.event.reference, "TST0000003")
