from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
#from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import mixins, generics,viewsets

from watchlist_app.api.serializers import WatchListSerializer, StreamPlatFormSerializer,ReviewSerializer
from watchlist_app.models import WatchList,StreamPlatform,Review
# Create your views here.

class ReviewCreate(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    
    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        
        watchlist = WatchList.objects.get(pk = pk)
        serializer.save(watchlist=watchlist)
        

class ReviewList(generics.ListAPIView):
    # queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Review.objects.filter(watchlist = pk)


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class WatchListSerializerAV(APIView):
    
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