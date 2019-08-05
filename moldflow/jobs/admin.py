from django.contrib import admin

from .models import Job


class JobAdmin(admin.ModelAdmin):
    # fields seen in the user inline (dictates ordering as well)
    list_display = (
        "name",
        "description",
        "created",
        "project",
        "estimated",
        "result",
        "progress",
    )


class JobAdminInline(admin.TabularInline):
    model = Job

    fields = (
        "name",
        "description",
        "created",
        "project",
        "estimated",
        "result",
        "progress",
    )

    def get_readonly_fields(self, request, obj=None):
        """
        Make certain fields read only
        """
        if obj:
            return ["name", "description", "created", "project"]
        else:
            return []


admin.site.register(Job, JobAdmin)
