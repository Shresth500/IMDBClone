from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from user_app.api.views import registration_view,logout_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('login/',obtain_auth_token,name='login'),
    path('registration/',registration_view,name='registration'),
    path('logout/',logout_view,name='logout'),
    
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]