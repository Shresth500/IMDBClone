from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase,APIClient
from rest_framework.authtoken.models import Token

from watchlist_app.api import serializers
from watchlist_app import models
# Create your tests here.


class ReviewTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.get(user__username=self.user)
        # self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.stream = models.StreamPlatform.objects.create(name="Netflix", 
                                about="#1 Platform", website="https://www.netflix.com")
        self.watchlist = models.WatchList.objects.create(platform=self.stream, title="Example Movie",
                                storyLine="Example Movie", active=True)
        self.watchlist2 = models.WatchList.objects.create(platform=self.stream, title="Example Movie",
                                storyLine="Example Movie", active=True)
        self.review = models.Review.objects.create(review_user=self.user, rating=5, description="Great Movie", 
                                watchlist=self.watchlist2, active=True)
    
    def test_review_create(self):
        data = {
            "review_user": self.user,
            "rating": 5,
            "description": "Great Movie!",
            "watchlist": self.watchlist,
            "active": True
        }
        print(self.watchlist.id)
        print(self.user)
        print("token = ")
        print(self.token)
        print(self.client)
        response = self.client.post(reverse('review-create', args=(self.watchlist.id,)), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Review.objects.count(), 2)

        # response = self.client.post(reverse('review-create', args=(self.watchlist.id,)), data)
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_review_create_unauth(self):
        data = {
            "review_user": self.user,
            "rating": 5,
            "description": "Great Movie!",
            "watchlist": self.watchlist,
            "active": True
        }

        self.client.force_authenticate(user=None)
        response = self.client.post(reverse('review-create', args=(self.watchlist.id,)), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_review_update(self):
    #     data = {
    #         "review_user": self.user,
    #         "rating": 4,
    #         "description": "Great Movie! - Updated",
    #         "watchlist": self.watchlist,
    #         "active": False
    #     }
    #     response = self.client.put(reverse('review-detail', args=(self.review.id,)), data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_review_list(self):
    #     response = self.client.get(reverse('review-list', args=(self.watchlist.id,)))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # def test_review_ind(self):
    #     response = self.client.get(reverse('review-detail', args=(self.review.id,)))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_review_ind_delete(self):
    #     response = self.client.delete(reverse('review-detail', args=(self.review.id,)))
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # def test_review_user(self):
    #     response = self.client.get('/watch/reviews/?username' + self.user.username)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)