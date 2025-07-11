from rest_framework import serializers
from watchlist_app.models import WatchList,StreamPlatform,Review,Actors,StarCast


class ReviewSerializer(serializers.ModelSerializer):
    review_user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Review
        exclude = ('watchlist',)
        
        
    

class WatchListSerializer(serializers.ModelSerializer):
    #reviews = ReviewSerializer(many=True,read_only=True)
    platform = serializers.CharField(source='platform.name')
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = WatchList
        fields = '__all__'
        
    # field level validation
    def validate_name(self,value):
        if len(value) < 2:
            raise serializers.ValidationError("Name is too short")
        return value
    def create(self, validated_data):
        platform_name = validated_data.pop('platform')['name']
        platform = StreamPlatform.objects.get(name=platform_name)
        return WatchList.objects.create(platform=platform, **validated_data)
    


class StreamPlatFormSerializer(serializers.ModelSerializer):
    watchlist = WatchListSerializer(many=True,read_only=True)
    image = serializers.ImageField(use_url=True)
    
    class Meta:
        model = StreamPlatform
        fields = '__all__'


class ActorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Actors
        fields = '__all__'


class StarCastSerailizer(serializers.ModelSerializer):
    actors = ActorSerializer(read_only=True)
    # watchlist = WatchListSerializer(read_only=True)
    watchlist = serializers.CharField(source='watchlist.title')
    
    class Meta:
        model = StarCast
        fields = '__all__'
        
class ActorDetailSerializer(serializers.ModelSerializer):
    watchlist = serializers.CharField(source='watchlist.title')
    watchlist_image = serializers.ImageField(source='watchlist.image',use_url=True)
    
    class Meta:
        model = StarCast
        fields = '__all__'
        

class StarCastListSerailizer(serializers.ModelSerializer):
    actors = serializers.CharField(source='actors.name')
    actors_image = serializers.ImageField(source='actors.image',use_url=True)
    
    class Meta:
        model = StarCast
        fields = '__all__'