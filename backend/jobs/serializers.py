from rest_framework import serializers

from users.permissions import IsLoggedInUserOrStaff

from .models import Job


class JobSerializer(serializers.HyperlinkedModelSerializer):
    """
    This serializer is dictates the client access, hence the read_only fields
    """
    permission_classes = [IsLoggedInUserOrStaff]

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

        # these fields get manually updated by staff, or should not be touched
        read_only_fields = ("result", "progress", "estimated", "url", "owner")
