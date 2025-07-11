from django.urls import path,include
from watchlist_app.api import views
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('stream',views.StreamPlatFormVS,basename='streamplatform')


urlpatterns = [
    
    path("actors/", views.ActorsList.as_view()),
    path("actors/<int:pk>",views.ActorDetails.as_view()),
    
    path('list/',views.WatchListSerializerAV.as_view(),name='movie-list'),
    path('<int:pk>/',views.WatchDetailsAV.as_view(),name='movie-details'),
    
    path('',include(router.urls)),
    
    
    path('<int:pk>/review/',views.ReviewList.as_view(),name='review-list'),
    path('<int:pk>/review-create/',views.ReviewCreate.as_view(),name='review-create'),
    path('reviews/<int:pk>/',views.ReviewDetail.as_view(),name='review-details')
]

