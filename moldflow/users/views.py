from django.contrib.auth import login as django_login
from rest_framework import permissions, viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from .models import CustomUser
from .permissions import IsLoggedInUserOrAdmin
from .serializers import LoginSerializer, UserSerializer


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


class LoginView(GenericAPIView):
    """
    Login View
    """

    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def login(self):
        # use validated data
        self.user = self.serializer.validated_data["user"]
        django_login(self.request, self.user)

    def get_response(self):
        """
        Define custom response message and status
        """
        data = {"success": True}
        response = Response(data, status=HTTP_200_OK)
        return response

    def post(self, request):
        """
        Define what happens on a POST for the Login API endpoint
        """
        self.request = request
        self.serializer = self.get_serializer(
            data=self.request.data, context={"request": request}
        )
        # return 400 error response if not valid
        self.serializer.is_valid(raise_exception=True)

        self.login()
        return self.get_response()
