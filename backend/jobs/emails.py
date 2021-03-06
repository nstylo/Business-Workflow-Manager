from abc import ABC, abstractmethod

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string


class EmailJob(EmailMessage, ABC):
    def __init__(self, job, receiver=None, subject="", body=""):
        self.subject = subject
        self.plain_body = body
        self.html_body = body
        self.sender = [settings.EMAIL_HOST_USER]
        self.receiver = receiver
        self.job = job

    @abstractmethod
    def _get_recipients(self):
        pass

    @abstractmethod
    def _get_subject(self):
        pass

    @abstractmethod
    def _get_body(self):
        pass

    def send_mail(self):
        """
        Send emails out to recipients with subjects and bodies
        """
        if self._get_recipients():
            self._get_subject()
            self._get_body()
            send_mail(
                self.subject,
                self.plain_body,
                self.sender,
                self.receiver,
                html_message=self.html_body,
            )
        else:
            raise ValueError(
                "The receiver of the email either does not exist or is not active"
            )


class EmailJobStaff(EmailJob):
    """
    Handles sending staff emails when a new job gets created
    """

    def _get_subject(self):
        """
        Set subject of email for a new job posting
        """
        self.subject = "A new job has been posted for {0}.".format(
            self.job.owner.company
        )

    def _get_body(self):
        """
        Set body of email for a new job posting
        """
        # url for the user uploaded project file
        # .url gets relative url
        project_url = Site.objects.get_current().domain + str(self.job.project.url)

        context = {
            "company": self.job.owner.company,
            "name": self.job.name,
            "description": self.job.description,
            "owner": self.job.owner.email,
            "created": self.job.created,
            "admin_url": self.job.get_admin_url(),
            "project": project_url,
        }
        self.html_body = render_to_string("new_job_email.html", context)

        # alternative email for those that cannot render html
        self.plain_body = render_to_string("new_job_email.txt", context)

    def _get_recipients(self):
        """
        Set the email recipients to all staff members that are active
        """
        # transform to list to check if empty
        receiver = list(
            self.job.owner.__class__.objects.filter(
                is_staff=True, is_active=True
            ).values_list("email", flat=True)
        )

        if receiver is not None and receiver:
            self.receiver = receiver
            return True
        return False


class EmailJobClient(EmailJob):
    """
    Handles sending client emails when a new job gets created
    """

    def __init__(self, update=False, *args, **kwargs):
        """
        Initialize update variable to distinguish an updated result

        :param update: Flag dictating if the result file is new or simply updated
        """
        self.update = update
        super().__init__(*args, **kwargs)

    def _get_subject(self):
        """
        Set subject of the email for result file upload/update to be sent to the client
        """
        if self.update:
            self.subject = 'Your job "{0}" results have been updated!'.format(
                self.job.name
            )
        else:
            self.subject = 'Your job "{0}" results have been uploaded!'.format(
                self.job.name
            )

    def _get_body(self):
        """
        Set body of the email for result file upload/update to be sent to the client
        """
        # TODO: rename to ..../project/the specific project url/
        project_url = Site.objects.get_current().domain + "/user/projects/"

        context = {"name": self.job.name,
                   "url": project_url, "update": self.update}

        self.html_body = render_to_string("job_results_email.html", context)

        # alternative email for those that cannot render html
        self.plain_body = render_to_string("job_results_email.txt", context)

    def _get_recipients(self):
        """
        Set the recipient of the email to the owner of the job, if he is active
        """
        receiver = [self.job.owner.email]
        active = self.job.owner.is_active

        if receiver is not None and active:
            self.receiver = receiver
            return True
        else:
            return False
