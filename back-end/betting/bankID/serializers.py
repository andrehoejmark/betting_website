from rest_framework import serializers
from .models import BankIDAuthentication


class BankIDAuthenticationSerializer(serializers.Serializer):

    end_user_ip = serializers.CharField(max_length=255)
    personal_number = serializers.CharField(max_length=255)
    type_of_authentication = serializers.CharField(max_length=3)



class BankIDCollectSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankIDAuthentication
        fields = ['order_ref']
