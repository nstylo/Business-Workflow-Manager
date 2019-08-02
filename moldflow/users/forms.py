from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import CustomUser


class CustomUserChangeForm(UserChangeForm):
    """
    Define custom user change form
    """

    class Meta(UserChangeForm):
        model = CustomUser
        fields = ("email", "phone",
                  "company", "country", "address")


class CustomUserCreationForm(UserCreationForm):
    """
    Define custom user creation form
    """

    class Meta(UserCreationForm):
        model = CustomUser
        fields = ("email", "phone", "company", "country", "address")
