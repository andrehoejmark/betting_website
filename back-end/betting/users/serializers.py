from rest_framework import serializers
from rest_framework.serializers import ModelSerializer,Serializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import MyUser

'''
class CustomRegisterSerializer(RegisterSerializer):
    
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)

    class Meta:
        model = MyUser
        fields = ('email', 'username', 'password', 'first_name','last_name')
    
    def get_cleaned_data(self):
        return {
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            #'email': self.validated_data.get('email', ''),
            #'first_name': self.validated_data.get('first_name', ''),
            #'last_name': self.validated_data.get('last_name', ''),
        }

    def save(self, request):
        user = super().save(request)
        #user.first_name = self.validated_data.get('first_name')
        #user.last_name = self.validated_data.get('last_name')
        
        user.save()
        return user
'''