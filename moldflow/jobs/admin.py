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

    fields = ("name", "description", "project",
              "estimated", "result", "progress")

    # these fields get input by the user
    readonly_fields = ("name", "description", "created", "project")


admin.site.register(Job, JobAdmin)
