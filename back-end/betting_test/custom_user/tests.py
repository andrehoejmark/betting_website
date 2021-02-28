
#from django.conf import settings
from allauth import  utils

import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase



# Create your tests here.
class RegistrationTestCase(APITestCase):

    def test_registration(self):
        
        first_name = utils.generate_username_candidate("firstname_", 4)
        last_name = utils.generate_username_candidate("lastname_", 4)
        username = utils.generate_username_candidate("username_", 4)
        password = "testgodx"
        email = utils.generate_username_candidate("email_", 4) + "@gmail.com"

        data = {"first_name": first_name, "last_name": last_name, "username": username, "password": password, "email": email}
        print(data)
        response = self.client.post("http://127.0.0.1:8000/rest-auth/registration/", data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)





