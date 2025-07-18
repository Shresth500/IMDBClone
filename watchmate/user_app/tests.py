from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
# Create your tests here.


class RegisterTestCase(APITestCase):
    
    def test_register(self):
        
        data = {
            "username":"testcase",
            "email":"testcase@example.com",
            "password":"NewPassword@123",
            "password2":"NewPassword@123"
        }
        response = self.client.post(reverse('registration'),data)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        

class LoginLogoutTestCase(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username="example",
                                             password="NewPassword@123")

    def test_login(self):
        data = {
            "username": "example",
            "password": "NewPassword@123"
        }
        response = self.client.post(reverse('login'), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
