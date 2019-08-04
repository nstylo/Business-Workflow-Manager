from rest_framework import permissions, serializers

from .models import Job
from users.permissions import IsLoggedInUserOrAdmin


class JobSerializer(serializers.HyperlinkedModelSerializer):
    permission_classes = [IsLoggedInUserOrAdmin]
    owner = serializers.ReadOnlyField(source="owner.company")

    class Meta:
        model = Job
        fields = [
            "url",
            "owner",
            "name",
            "description",
            "created",
            "estimated",
            "project",
            "progress",
        ]
