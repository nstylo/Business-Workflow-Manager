from django.contrib.auth import authenticate, get_user_model
from rest_framework import exceptions, serializers

from .models import CustomUser


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serialize model to json/xml

    :param HyperlinkedModelSerializer: use url instead of id
    """

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
        ]


class LoginSerializer(serializers.Serializer):
    """
    Serialize login
    """

    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(style={"input_type": "password"})

    def authenticate(self, **kwargs):
        return authenticate(self.context["request"], **kwargs)

    def validate_email_password(self, email, password):
        """
        Authenticate with validated email and password fields
        """
        user = None

        # email and password are required
        if email and password:
            user = self.authenticate(email=email, password=password)
        else:
            msg = 'Must include "email" and "password".'
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = self.validate_email_password(email, password)

        if user:
            if not user.is_active:
                msg = "User account not activated."
                raise exceptions.ValidationError(msg)
        else:
            msg = "Unable to log in with provided credentials."
            raise exceptions.ValidationError(msg)

        attrs["user"] = user
        return attrs
