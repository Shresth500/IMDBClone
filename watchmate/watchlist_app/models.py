from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User
# Create your models here.

class Actors(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField(validators=[MinValueValidator(5)])
    image = models.ImageField(upload_to='actors_images/',null=True,blank=True)
    DateOfBirth = models.DateField()
    description = models.TextField(max_length=500)
    
    def __str__(self):
        return self.name
    


class StreamPlatform(models.Model):
    name = models.CharField(max_length=30)
    about = models.CharField(max_length=150)
    website = models.URLField(max_length=100)
    image = models.ImageField(upload_to='streamplatform_images/', null=True, blank=True)  # new field

    def __str__(self):
        return self.name
    

class WatchList(models.Model):
    title = models.CharField(max_length=50)
    storyLine = models.TextField(max_length=500)
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    platform = models.ForeignKey(StreamPlatform, on_delete=models.CASCADE, related_name='watchlist')
    avg_rating = models.FloatField(default=0)
    number_of_rating = models.IntegerField(default=0)
    image = models.ImageField(upload_to='watchlist_images/', null=True, blank=True)  # new field
    
    def __str__(self):
        return self.title

class StarCast(models.Model):
    actors = models.ForeignKey(Actors,on_delete=models.CASCADE)
    watchlist = models.ForeignKey(WatchList,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.actors.name + ' ' + self.watchlist.title

class Review(models.Model):
    review_user = models.ForeignKey(User,on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    description = models.CharField(max_length=255,null=True)
    watchlist = models.ForeignKey(WatchList,on_delete=models.CASCADE,related_name='reviews')
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.rating) + " " + self.watchlist.title
    
class ImageList(models.Model):
    watchlist = models.ForeignKey(WatchList,on_delete=models.CASCADE)
    image = models.ImageField(upload_to='watchlist_images/otherImages/', null=True, blank=True)

    def __str__(self):
        return self.watchlist.title + ' - ' + self.image.name

class Genre(models.Model):
    type = models.CharField(max_length=15)
    
    def __str__(self):
        return self.type

class Tags(models.Model):
    watchlist = models.ForeignKey(WatchList,on_delete=models.CASCADE,related_name='tags')
    genre = models.ForeignKey(Genre,on_delete=models.CASCADE) 
    
    def __str__(self):
        return self.watchlist.title + ' ' + self.genre.type