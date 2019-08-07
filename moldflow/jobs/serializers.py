from rest_framework import serializers

from .models import Job
from users.permissions import IsLoggedInUserOrStaff


class JobSerializer(serializers.HyperlinkedModelSerializer):
    permission_classes = [IsLoggedInUserOrStaff]
    owner = serializers.ReadOnlyField(source="owner.company")

    class Meta:
        model = Job
        fields = [
            "url",
            "owner",  # TODO: make owner the user id or create another user entry
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
