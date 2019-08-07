from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from jobs.admin import JobAdminInline

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    """
    Define Custom admin user interface
    """

    inlines = [JobAdminInline]
    form = CustomUserChangeForm  # form for changing user credentials
    add_form = CustomUserCreationForm  # form for creating a new user
    model = CustomUser

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ("email", "company", "phone",
                    "country", "is_admin", "is_active")

    # right side panel to filter fields
    list_filter = ("is_staff", "country", "is_active")
    fieldsets = (
        (None, {"fields": ("email", "password", "is_active")}),
        ("Personal info", {
         "fields": ("company", "phone", "country", "address")}),
        ("Permissions", {"fields": ("is_admin", "is_staff", "is_superuser")}),
    )

    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "phone",
                    "company",
                    "country",
                    "address",
                    "password1",
                    "password2",
                ),
            },
        ),
    )

    # what fields can be searched
    search_fields = ("email", "company", "country", "phone")
    ordering = ("email",)
    filter_horizontal = ()


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)
