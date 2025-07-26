from rest_framework import serializers
from watchlist_app.models import ImageList, WatchList,StreamPlatform,Review,Actors,StarCast,Tags,Genre


class ReviewSerializer(serializers.ModelSerializer):
    review_user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Review
        exclude = ('watchlist',)

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['type']

class TagSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True)
    class Meta:
        model = Tags    
        fields = ['genre']
        
class ImageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageList
        fields = ['id', 'image']

class WatchListSerializer(serializers.ModelSerializer):
    platform = serializers.CharField(source='platform.name')
    image = serializers.ImageField(use_url=True,read_only=True)
    actor_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    images = ImageListSerializer(many=True, read_only=True, source='imagelist_set')
    upload_images = ImageListSerializer(many=True, write_only=True, required=False)
    # tags = TagSerializer(many=True,read_only=True)
    tags = serializers.SerializerMethodField()
    genre = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    
    class Meta:
        model = WatchList
        fields = '__all__'
        extra_fields = ['actor_ids','upload_images','images','tags','genre']

    def get_tags(self,obj):
        return [tag.genre.type for tag in obj.tags.all()]
    
    def create(self, validated_data):
        platform_name = validated_data.pop('platform')['name']
        platform = StreamPlatform.objects.get(name=platform_name)

        actor_ids = validated_data.pop('actor_ids', [])
        images_data = validated_data.pop('upload_images', [])
        watchlist = WatchList.objects.create(platform=platform, **validated_data)
        
        tag_ids = validated_data.pop('genre', [])
        
        for genre_id in tag_ids:
            try:
                genre = Genre.objects.get(id=genre_id)
                Tags.objects.create(watchlist=watchlist, genre=genre)
            except Genre.DoesNotExist:
                raise serializers.ValidationError(f"Genre with ID {genre_id} does not exist.")
        

        for image_data in images_data:
            ImageList.objects.create(watchlist=watchlist, **image_data)

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