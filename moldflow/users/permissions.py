from rest_framework import permissions


class IsLoggedInUserOrStaff(permissions.BasePermission):
    """
    Only the logged in user or a staff member permission
    """
    def has_permission(self, request, view):
        return request.user or request.user.is_staff


class IsStaffUser(permissions.BasePermission):
    """
    Only staff members
    """
    def has_permission(self, request, view):
        return request.user.is_staff
