from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
#from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import mixins, generics,viewsets

from watchlist_app.api.serializers import WatchListSerializer, StreamPlatFormSerializer,ReviewSerializer
from watchlist_app.models import WatchList,StreamPlatform,Review
from watchlist_app.api.permissions import AdminOrReadOnly,ReviewUserOrReadOnly
# Create your views here.

class ReviewCreate(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    
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

    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Review.objects.filter(watchlist = pk)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class WatchListSerializerAV(APIView):
    permission_classes=[AdminOrReadOnly]
    def get(self,request):
        movie = WatchList.objects.all()
        serializer = WatchListSerializer(movie,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = WatchListSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class WatchDetailsAV(APIView):
    def get(self,request,pk):
        movie = WatchList.objects.get(pk = pk)
        serializer = WatchListSerializer(movie)
        return Response(serializer.data)
    
    def put(self,request,pk):
        movie = WatchList.objects.get(pk = pk)
        serializer = WatchListSerializer(movie,request.data)
        return Response(serializer.data)
    
    def delete(self,request,pk):
        movie = WatchList.objects.get(pk = pk)
        movie.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

class StreamPlatFormVS(viewsets.ModelViewSet):
    serializer_class = StreamPlatFormSerializer
    queryset = StreamPlatform.objects.all()

# class StreamerListAV(APIView):
#     def get(self,request):
#         streamer = StreamPlatform.objects.all()
#         serializer = StreamPlatFormSerializer(streamer,many=True)
#         return Response(serializer.data)
    
#     def post(self,request):
#         serializer = StreamPlatFormSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

# class StreamerDetailsAV(APIView):
#     def get(self,request,pk):
#         streamer = StreamPlatform.objects.get(pk = pk)
#         serializer = StreamPlatFormSerializer(streamer)
#         return Response(serializer.data)
    
#     def put(self,request,pk):
#         streamer = StreamPlatform.objects.get(pk = pk)
#         serializer = StreamPlatFormSerializer(streamer,request.data)
#         return Response(serializer.data)
    
#     def delete(self,request,pk):
#         streamer = StreamPlatform.objects.get(pk = pk)
#         streamer.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)