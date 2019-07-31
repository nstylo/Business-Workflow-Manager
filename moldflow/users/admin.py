from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

from .forms import CustomUserCreationForm, CustomUserChangeForm

class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm
    model = CustomUser

    #The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email', 'company', 'phone', 'country', 'is_admin', 'is_active')

    list_filter = ('is_staff', 'country', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'is_active')}),
        ('Personal info', {'fields': ('company', 'phone', 'country', 'address',)}),
        ('Permissions', {'fields': ('is_admin', 'is_staff', 'is_superuser')}),
    )

    #add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    #overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'company', 'country', 'phone', 'password1', 'password2')}
         ),
    )
    search_fields = ('email', 'company', 'country', 'phone') # what fields can be searched
    ordering = ('email',)
    filter_horizontal = ()

admin.site.register(CustomUser, CustomUserAdmin)
