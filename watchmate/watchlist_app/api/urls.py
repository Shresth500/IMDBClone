from django.urls import path,include
from watchlist_app.api import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('stream',views.StreamPlatFormVS,basename='streamplatform')


urlpatterns = [
    path('list',views.WatchListSerializerAV.as_view(),name='movie-list'),
    path('<int:pk>',views.WatchDetailsAV.as_view(),name='movie-details'),
    
    path('',include(router.urls)),
    
    # path('stream/',views.StreamerListAV.as_view(),name='stream-list'),
    # path('stream/<int:pk>',views.StreamerDetailsAV.as_view(),name='stream-details'),
    
    # path('review',views.ReviewList.as_view(),name='review-list'),
    # path('review/<int:pk>',views.ReviewDetail.as_view(),name='review-details')
    
    
    path('<int:pk>/review',views.ReviewList.as_view(),name='review-list'),
    path('<int:pk>/review-create',views.ReviewCreate.as_view(),name='review-create'),
    path('reviews/<int:pk>',views.ReviewDetail.as_view(),name='review-details')
]