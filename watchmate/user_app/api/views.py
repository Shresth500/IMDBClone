from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from user_app import models
from user_app.api.serializers import RegistrationSerializer


@api_view(['POST'])
def logout_view(request):
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response(status = status.HTTP_200_OK)


@api_view(['POST'])
def registration_view(request):
    
    if request.method == 'POST':
        serializer = RegistrationSerializer(data = request.data)
        data = {}
        
        if serializer.is_valid():
            account = serializer.save()
            refresh = RefreshToken.for_user(account)
            print(account)
            
            data['response'] = 'Registration Successful!'
            data['username'] = account.username
            data['email'] = account.email
            data['Token'] = {'refresh': str(refresh),
        'access': str(refresh.access_token),}
        
        else:
            data = serializer.errors
            
        return Response(data,status = status.HTTP_201_CREATED)
        