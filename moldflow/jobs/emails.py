from django.conf import settings
from django.contrib.sites.models import Site
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string


class EmailJob(EmailMessage):
    def __init__(self, job, receiver=None, subject="", body=""):
        self.subject = subject
        self.plain_body = body
        self.html_body = body
        self.sender = [settings.EMAIL_HOST_USER]
        self.receiver = receiver
        self.job = job

    def _get_recipients(self):
        return self.receiver

    def _get_subject(self):
        return self.subject

    def _get_body(self):
        return self.plain_body

    def send_mail(self):
        """
        Send an email to the client stating that their project
        results have been uploaded, only if the client is active
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
        Compose the job email subject for staff
        """
        self.subject = "A new job has been posted for {0}.".format(
            self.job.owner.company
        )

    def _get_body(self):
        """
        The body of the email for sending out a
        notification that a job has been added to staff
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
        Set the mail receivers to all staff members that are active
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
        self.update = update
        super().__init__(*args, **kwargs)

    def _get_subject(self):
        """
        Compose the job email subject for client
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
        The body of the email for sending out a
        notification that a job has been added to client
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
        Get clients that exist and are active
        """
        receiver = [self.job.owner.email]
        active = self.job.owner.is_active

        if receiver is not None and active:
            self.receiver = receiver
            return True
        else:
            return False
