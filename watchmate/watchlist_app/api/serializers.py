from rest_framework import serializers
from watchlist_app.models import WatchList,StreamPlatform,Review


class ReviewSerializer(serializers.ModelSerializer):
    review_user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Review
        exclude = ('watchlist',)
        
        
    

class WatchListSerializer(serializers.ModelSerializer):
    #reviews = ReviewSerializer(many=True,read_only=True)
    platform = serializers.CharField(source='platform.name')
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
    class Meta:
        model = StreamPlatform
        fields = '__all__'


# USING serializers.Serializer
# using validators
# def name_length(value):
#     if len(value) < 2:
#         raise serializers.ValidationError("Name is too short")
#     return value

# class MovieSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only = True)
#     name = serializers.CharField(validators = [name_length])
#     description = serializers.CharField()
#     active = serializers.BooleanField()
    
    
#     def create(self,validated_data):
#         return Movie.objects.create(**validated_data)
    
#     def update(self,instance,validated_data):
#         instance.name = validated_data.get('name',instance.name)
#         instance.description = validated_data.get('description',instance.description)
#         instance.active = validated_data.get('active',instance.active)
#         instance.save()
#         return instance
    
#     # field level validation
#     # def validate_name(self,value):
#     #     if len(value) < 2:
#     #         raise serializers.ValidationError("Name is too short")
#     #     return value
    
#     # object level validation
#     def validate(self,data):
#         if data['title'] == data['description']:
#             raise serializers.ValidationError("Title and Description should be different")
#         return data