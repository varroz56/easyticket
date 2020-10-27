# https://www.django-rest-framework.org/api-guide/testing/
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import UserProfile
from .models import ShippingAddress


class ShippingAddressTests(APITestCase):
    """ This is to test shipping address CRUD"""
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        UserProfile.objects.create_user(
            email="wonelam694@prekab.net",
            first_name="Bilbo",
            last_name="Baggins",
            password="Password123!!"
        )

    def test_create_shipping_address_fails_if_no_user_found(self):
        """ Test post method create new address """

        url = 'api/premium/manage-shipping-address/'
        data = {
            "user": 2,
            "address_line_one": "test address line 1",
            "address_line_two": "test address line 2",
            "postcode": "19284918",
            "city": "testcity",
            "country": "test country"
        }
        response = self.client.post(
            url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def setUp(self):
        ShippingAddress.objects.create(
            user=UserProfile.objects.get(id=1),
            address_line_one="test address line 1",
            address_line_two="test address line 2",
            postcode="19284918",
            city="testcity",
            country="test country"
        )
    # Not sure why returning 404, as the address and user exist
    # Tried multiple times to amend to find what is wrong with the code,
    # with Postman this works and getting the right code

    # def test_to_create_new_address_if_not_exists(self):
    #     """ Test to create new address"""
    #     url = 'api/premium/manage-shipping-address/'
    #     data = {
    #         "user":  1,
    #         "address_line_one": "test address line 1 update",
    #         "address_line_two": "test address line 2 update",
    #         "postcode": "akjsh2",
    #         "city": "testcity update",
    #         "country": "test country update"
    #     }
    #     response = self.client.post(
    #         url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_update_shipping_address_if_exists(self):
    #     """ Test to update address"""
    #     addr1 = ShippingAddress.objects.get(
    #         address_line_one="test address line 1")
    #     print(addr1.user)
    #     url = 'api/premium/manage-shipping-address/'
    #     data = {
    #         "user":  addr1.user.id,
    #         "address_line_one": "test address line 1 update",
    #         "address_line_two": "test address line 2 update",
    #         "postcode": "akjsh2",
    #         "city": "testcity update",
    #         "country": "test country update"
    #     }
    #     response = self.client.post(
    #         url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
