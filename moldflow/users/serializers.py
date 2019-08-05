from rest_framework import serializers

from .models import CustomUser
from .permissions import IsLoggedInUserOrAdmin


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serialize model to json/xml

    :param HyperlinkedModelSerializer: use url instead of id
    """

    permission_classes = [IsLoggedInUserOrAdmin]
    jobs = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='job-detail')

    class Meta:
        model = CustomUser
        fields = [
            "url",
            "email",
            "phone",
            "company",
            "country",
            "address",
            "is_active",
            "is_staff",
            "jobs",
        ]
