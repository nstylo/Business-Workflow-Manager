import datetime

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


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
        auto_now=False, auto_now_add=False, null=True)
    project = models.FileField(upload_to=upload_path)
    result = models.FileField(upload_to=upload_path, null=True, blank=True)
    progress = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0
    )

    class Meta:
        indexes = [models.Index(fields=["created"])]
        ordering = ["created"]
        verbose_name = "job"
        verbose_name_plural = "jobs"

    def __str__(self):
        return self.name