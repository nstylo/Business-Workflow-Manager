from rest_framework import serializers

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
            "result",
        ]

        # these fields get manually updated by staff
        read_only_fields = ("result", "progress", "estimated")
