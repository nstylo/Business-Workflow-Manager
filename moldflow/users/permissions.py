from rest_framework import permissions


class IsLoggedInUserOrAdmin(permissions.BasePermission):
    """
    Only the logged in user or a staff member permission
    """
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff
