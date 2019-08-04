from django.contrib import admin

from .models import Job


class JobAdmin(admin.TabularInline):
    model = Job

    # fields seen in the user inline (dictates ordering as well)
    fields = (
        "name",
        "description",
        "created",
        "project",
        "estimated",
        "result",
        "progress",
    )

    # fields that are not available to change
    readonly_fields = ["name", "description", "created", "project"]


# admin.site.register(Job, JobAdmin)
