from django.contrib import admin
from watchlist_app.models import WatchList,StreamPlatform, Review,Actors,StarCast,ImageList,Genre,Tags
from django.utils.html import format_html
# Register your models here.

class StreamPlatformAdmin(admin.ModelAdmin):
    list_display = ('name','about', 'website', 'image_tag')  # Show these columns in the list view

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="60" height="40" style="object-fit:contain;" />', obj.image.url)

        return "No Image"
    image_tag.short_description = 'Logo'  # Column header name

admin.site.register(WatchList)
admin.site.register(StreamPlatform, StreamPlatformAdmin)
admin.site.register(Review)
admin.site.register(Actors)
admin.site.register(StarCast)
admin.site.register(ImageList)
admin.site.register(Genre)
admin.site.register(Tags)