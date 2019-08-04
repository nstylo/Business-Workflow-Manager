from django.contrib import admin

from .models import Job


class JobAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "created",
        "estimated",
        "project",
        "result",
        "progress",
    )


admin.site.register(Job, JobAdmin)
