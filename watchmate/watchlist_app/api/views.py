from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import mixins, generics,viewsets
from rest_framework.throttling import UserRateThrottle,AnonRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser


from watchlist_app.api.serializers import ActorDetailSerializer, ActorSerializer, StarCastListSerailizer, WatchListSerializer, StreamPlatFormSerializer,ReviewSerializer,StarCastSerailizer
from watchlist_app.models import Actors, StarCast, WatchList,StreamPlatform,Review,Actors
from watchlist_app.api.permissions import IsAdminOrReadOnly,ReviewUserOrReadOnly
from watchlist_app.api.throttling import ReviewCreateThrottle, ReviewListThrottling
from watchlist_app.api.pagination import WatchListPagination

# Create your views here.

class ReviewCreate(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [ReviewCreateThrottle]

    
    def get_queryset(self):
        return Review.objects.all()
    
    
    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        
        watchlist = WatchList.objects.get(pk = pk)
        
        review_user = self.request.user
        
        print(review_user)
        
        review_queryset = Review.objects.filter(watchlist=watchlist,review_user=review_user)
        
        if review_queryset.exists():
            raise ValidationError('You have already reviewed this movie')
        
        if watchlist.number_of_rating == 0:
            watchlist.avg_rating = serializer.validated_data['rating']
        
        else:
            watchlist.avg_rating = (watchlist.avg_rating + serializer.validated_data['rating'])/2
            
        watchlist.number_of_rating += 1
        
        watchlist.save()
        
        serializer.save(watchlist=watchlist,review_user=review_user)
        

class ReviewList(generics.ListAPIView):
    # queryset = Review.objects.all()
    
    permission_classes = [IsAuthenticated]
    throttle_classes = [ReviewListThrottling,AnonRateThrottle]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['review_user__username', 'active']

    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Review.objects.filter(watchlist = pk)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=[ReviewUserOrReadOnly]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    throttle_classes = [ReviewListThrottling,AnonRateThrottle]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['review_user__username', 'active']


class WatchListSerializerAV(generics.ListCreateAPIView):
    queryset = WatchList.objects.all()
    serializer_class = WatchListSerializer
    permission_classes=[IsAdminOrReadOnly]
    parser_classes = ( MultiPartParser, FormParser,JSONParser)
    filter_backends = [DjangoFilterBackend,filters.OrderingFilter]
    filterset_fields = ['title', 'platform__name','avg_rating']
    ordering_fields = ['avg_rating']
    pagination_class = WatchListPagination



class WatchDetailsAV(APIView):
    permission_classes=[IsAdminOrReadOnly]
    def get(self,request,pk):
        movie = movie = get_object_or_404(WatchList, pk=pk)
        serializer = WatchListSerializer(movie, context={'request':request})
        starcast_qs = StarCast.objects.filter(watchlist=movie)
        starcast_list = StarCastListSerailizer(starcast_qs,many=True, context={'request': request}).data
        return Response({
            'movie':serializer.data,
            'starcast':starcast_list
        })
    
    def put(self,request,pk):
        movie = WatchList.objects.get(pk = pk)
        serializer = WatchListSerializer(movie,request.data)
        return Response(serializer.data)
    
    def delete(self,request,pk):
        movie = WatchList.objects.get(pk = pk)
        movie.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

class StreamPlatFormVS(viewsets.ModelViewSet):
    permission_classes=[IsAdminOrReadOnly]
    serializer_class = StreamPlatFormSerializer
    queryset = StreamPlatform.objects.all()
    parser_classes = (MultiPartParser, FormParser)


class ActorsList(generics.ListCreateAPIView):
    serializer_class = ActorSerializer
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [DjangoFilterBackend,filters.OrderingFilter]
    filterset_fields = ['age','name']
    ordering_fields = ['age']
    pagination_class = WatchListPagination
        
    def get_queryset(self):
        return Actors.objects.all()
    
class ActorDetails(generics.RetrieveAPIView):

    serializer_class = ActorSerializer  # Not strictly needed anymore
    lookup_field = 'pk'

    def get(self, request, pk, *args, **kwargs):
        actor = get_object_or_404(Actors, pk=pk)
        actor_data = ActorSerializer(actor, context={'request': request}).data
        
        starcast_qs = StarCast.objects.filter(actors=actor)
        movie_data = ActorDetailSerializer(starcast_qs, many=True, context={'request': request}).data
        
        return Response({
            "actor": actor_data,
            "movies": movie_data
        })
    

    