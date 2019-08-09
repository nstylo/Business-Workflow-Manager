import datetime

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.urls import reverse

from .emails import EmailJobStaff, EmailJobClient


def upload_path(instance, filename):
    """
    Define the upload file path

    :param instance: An instance of the model where the FileField
                    is defined. More specifically, this is the particular
                    instance where the current file is being attached.
    :param filename: The filename that was originally given to the file.

    :returns: A url string for the file uploads in the format:
            uploads/company/year/month/filename
    """
    timestamp = datetime.datetime.now()
    year = str(timestamp.year)
    month = str(timestamp.month)

    return "uploads/{0}/{1}/{2}/{3}".format(
        instance.owner.company, year, month, filename
    )


class Job(models.Model):
    """
    The job model

    :field name: The name of the job (user-defined)
    :field description: The description of the job (user-defined)
    :field owner: The user that created the job
    :field created: The timestamp of when the job was created
    :field estimated: The estimated date and time that it will
                    take to finish the job (manual)
    :field project: The user uploaded cad file(s)
    :field result: The engineer uploaded (manual) result file(s)
    :field progress: An small, positive integer (shown as %) showing
                    the current progress of the job
                    limited range [0, 100]

    """

    name = models.CharField(max_length=64)
    description = models.CharField(max_length=1024, default="")
    owner = models.ForeignKey(
        "users.CustomUser", related_name="jobs", on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now=False, auto_now_add=True)
    estimated = models.DateTimeField(
        auto_now=False, auto_now_add=False, null=True, blank=True
    )
    project = models.FileField(upload_to=upload_path)
    result = models.FileField(upload_to=upload_path, null=True, blank=True)
    progress = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )

    __original_result = None

    class Meta:
        indexes = [models.Index(fields=["created"])]
        ordering = ["created"]
        verbose_name = "job"
        verbose_name_plural = "jobs"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_result = self.result

    def save(self, *args, **kwargs):
        """
        Override save and send an email to staff stating that a new job
        was added, or send en email to the client, when the results are uploaded
        """
        if self.pk:  # only happens if object is in db
            # gets triggered if the result file gets uploaded
            if self.result != self.__original_result:
                super().save()
                client_email = EmailJobClient(self)  # notify the client
                client_email.send_mail()
                self.progress = 100  # if a result is uploaded, the job is finished
        else:  # the job is not in the database yet, a new job gets created
            super().save()
            staff_email = EmailJobStaff(self)
            staff_email.send_mail()

        self.__original_result = self.result

    def get_admin_url(self):
        """
        Return the url for the created job
        """
        content_type = ContentType.objects.get_for_model(self.__class__)
        return settings.HOST + reverse(
            "admin:%s_%s_change" % (
                content_type.app_label, content_type.model),
            args=(self.id,),
        )

    def __str__(self):
        return self.name
