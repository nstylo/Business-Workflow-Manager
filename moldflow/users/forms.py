from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import CustomUser
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django import forms

class CustomUserChangeForm(UserChangeForm):
    """
    Custom form for changing user credentials
    """
    class Meta(UserChangeForm):
        model = CustomUser
        fields = ('email',)

class CustomUserCreationForm(UserCreationForm):
    """
    Custom form for creating a new user
    """
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('email',)
