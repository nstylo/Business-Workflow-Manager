import datetime

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.mail import send_mail
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse

from users.models import CustomUser


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

    class Meta:
        indexes = [models.Index(fields=["created"])]
        ordering = ["created"]
        verbose_name = "job"
        verbose_name_plural = "jobs"

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


@receiver(post_save, sender=Job)
def compose_job_email(sender, **kwargs):
    """
    Sends an email to staff stating that a new job was created
    Gets triggered on the post_save signal

    :param sender: the sender model object (in our case the Job)
    """

    sender_obj = sender.objects.first()
    job_url = sender_obj.get_admin_url()

    # job fields
    job_name_field = sender._meta.get_field("name")
    job_owner_field = sender._meta.get_field("owner")
    job_description_field = sender._meta.get_field("description")
    job_created_field = sender._meta.get_field("created")

    job_name = getattr(sender_obj, job_name_field.attname)
    job_description = getattr(sender_obj, job_description_field.attname)
    job_created = getattr(sender_obj, job_created_field.attname)

    # job owner variables
    # the primary key of the job owner
    job_owner_id = getattr(sender_obj, job_owner_field.attname)
    # get corresponding user
    job_owner_obj = CustomUser.objects.filter(pk=job_owner_id)
    job_owner_email = job_owner_obj.values_list("email", flat=True)[0]
    job_owner_company = job_owner_obj.values_list("company", flat=True)[0]

    email_subject = "A new job has been added for {0}".format(
        job_owner_company)
    email_body = """A new job \"{0}\" for {1} has been posted.\n
    Please promptly update the estimated time to completion.\n
    Title: {0}\n
    Description: {2}\n
    Owner Email: {3}\n
    Timestamp: {4}\n
    Job url: {5}""".format(
        job_name,
        job_owner_company,
        job_description,
        job_owner_email,
        job_created,
        job_url,
    )

    send_staff_email(email_subject, email_body)


def send_staff_email(subject, body):
    """
    Sends an email to all staff members

    :param subject: The subject line of the email
    :param body: The email body
    """
    email_sender = settings.EMAIL_HOST_USER  # sender email address
    # Get all staff member emails into a list
    staff_emails = CustomUser.objects.filter(is_staff=True, is_active=True).values_list(
        "email", flat=True
    )

    # send an email to all staff members
    send_mail(subject, body, email_sender, staff_emails)
