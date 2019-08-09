from smtplib import SMTPException

from django.conf import settings
from django.core.mail import EmailMessage, send_mail


class EmailJob(EmailMessage):
    def __init__(self, job, subject="", body="", receiver=["receiver@mail.com"]):
        self.subject = subject
        self.body = body
        self.sender = [settings.EMAIL_HOST_USER]
        self.receiver = receiver
        self.job = job

    def send_mail(self):
        send_mail(self.subject, self.body, self.sender, self.receiver)


class EmailJobStaff(EmailJob):
    """
    Handles sending staff emails when a new job gets created
    """

    def _compose_subject_staff(self):
        """
        Compose the job email subject for staff
        """
        self.subject = "A new job has been posted for {0}.".format(
            self.job.owner.company
        )

    def _compose_body_staff(self):
        """
        The body of the email for sending out a
        notification that a job has been added to staff
        """
        self.body = """A new job \"{0}\" has been posted for {1}.
Please update the estimated time to completion ASAP.
Description: {2}
Email: {3}
Timestamp: {4}
Job url: {5}""".format(
            self.job.name,
            self.job.owner.company,
            self.job.description,
            self.job.owner.email,
            self.job.created,
            self.job.get_admin_url(),
        )

    def _get_staff(self):
        """
        Set the mail receivers to all staff members that are active
        """
        self.receiver = self.job.owner.__class__.objects.filter(
            is_staff=True, is_active=True
        ).values_list("email", flat=True)

    def send_mail(self):
        self._get_staff()
        self._compose_subject_staff()
        self._compose_body_staff()
        send_mail(self.subject, self.body, self.sender, self.receiver)


class EmailJobClient(EmailJob):
    """
    Handles sending client emails when a new job gets created
    """

    def _compose_subject_client(self):
        """
        Compose the job email subject for client
        """
        self.subject = "Your job \"{0}\" has finished!".format(
            self.job.name
        )

    def _compose_body_client(self):
        """
        The body of the email for sending out a
        notification that a job has been added to client
        """
        self.body = """The results of your \"{0}\" project have been uploaded!"
You can now see your results at your profile
If you are satisfied with our service, please leave us some feedback!
Kind Regards,\n***REMOVED***""".format(
            self.job.name, self.job.get_admin_url()
        )

    def _set_receiver(self):
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

    def send_mail(self):
        """
        Send an email to the client stating that their project
        results have been uploaded, only if the client is active
        """
        if self._set_receiver():
            self._compose_subject_client()
            self._compose_body_client()
            send_mail(self.subject, self.body, self.sender, self.receiver)
        else:
            raise ValueError(
                "The receiver of the email either does not exist or is not active"
            )
