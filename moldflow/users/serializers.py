from rest_framework import serializers

from .models import CustomUser


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['url', 'email', 'phone', 'company', 'country', 'address',
                  'is_active', 'is_staff'
                  ]
