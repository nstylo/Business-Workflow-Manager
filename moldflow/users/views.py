from rest_framework import permissions, viewsets

from .models import CustomUser
from .permissions import IsLoggedInUserOrAdmin
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API view for interacting with users
    """

    # only admin users should be allowed to view the user list
    permission_classes = [permissions.IsAdminUser]
    queryset = CustomUser.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Enforce different permissions per request types
        """
        permission_classes = []
        # anyone is able to register
        if self.action == "create":
            permission_classes = [permissions.AllowAny]
        # only the logged in user or a staff member should be able to:
        # get, update their credentials
        elif (
            self.action == "retrieve"
            or self.action == "update"
            or self.action == "partial_update"
        ):
            permission_classes = [IsLoggedInUserOrAdmin]
        # only the admin can view all users or remove users
        elif self.action == "list" or self.action == "destroy":
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
