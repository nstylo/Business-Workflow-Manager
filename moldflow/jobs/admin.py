from django.contrib import admin

from .models import Job


class JobAdmin(admin.ModelAdmin):
    # fields seen in the user inline (dictates ordering as well)
    model = Job
    fields = (
        "owner",
        "name",
        "description",
        "created",
        "project",
        "estimated",
        "result",
        "progress",
    )

    # these fields can only be changed by the customer/django
    readonly_fields = ("name", "description", "created", "project", "owner")

    # which fields can be searched for
    search_fields = ("owner", "name", "created", "estimated")

    # list to view all jobs
    list_display = ("owner", "name", "progress", "created", "project", "estimated", "result")
    # ordering for the list display
    ordering = ("progress", "created", "estimated")

    def has_add_permission(self, request, obj=None):
        """
        Disable adding new jobs through the admin interface
        """
        return False


class JobAdminInline(admin.TabularInline):
    model = Job

    max_num = 1

    fields = ("name", "project",
              "estimated", "result", "progress")

    # these fields get input by the user
    readonly_fields = ("name", "description", "created", "project")

    ordering = ("progress", "created", "estimated")

    def has_add_permission(self, request, obj=None):
        """
        Disable adding new jobs through the admin interface
        """
        return False


admin.site.register(Job, JobAdmin)
