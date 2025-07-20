from rest_framework import serializers
from watchlist_app.models import WatchList,StreamPlatform,Review,Actors,StarCast


class ReviewSerializer(serializers.ModelSerializer):
    review_user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Review
        exclude = ('watchlist',)
        
        
    

class WatchListSerializer(serializers.ModelSerializer):
    platform = serializers.CharField(source='platform.name')
    image = serializers.ImageField(use_url=True,read_only=True)
    actor_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    class Meta:
        model = WatchList
        fields = '__all__'
        extra_fields = ['actor_ids']

    
    def create(self, validated_data):
        platform_name = validated_data.pop('platform')['name']
        platform = StreamPlatform.objects.get(name=platform_name)

        actor_ids = validated_data.pop('actor_ids', [])
        watchlist = WatchList.objects.create(platform=platform, **validated_data)

        for actor_id in actor_ids:
            try:
                actor = Actors.objects.get(id=actor_id)
                StarCast.objects.create(actors=actor, watchlist=watchlist)
            except Actors.DoesNotExist:
                raise serializers.ValidationError(f"Actor with id {actor_id} does not exist")


        return watchlist
    


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