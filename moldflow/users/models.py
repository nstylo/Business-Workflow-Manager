from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(BaseUserManager):
    """
    Manage custom user model
    """

    def create_user(
        self, email, password, phone, company, country, address, is_active=False
    ):
        """
        Create and save a regular user in the database
        """
        # all these fields are required, other inherited create_user
        # functions use self.create_user, hence this does not need to be
        # repeated
        if not email:
            raise ValueError("An email has not been set")
        if not phone:
            raise ValueError("A phone number has not been set")
        if not company:
            raise ValueError("A company name has not been set")
        if not country:
            raise ValueError("A country name has not been set")
        if not address:
            raise ValueError("An address has not been set")

        # set the fields
        user = self.model(
            email=self.normalize_email(email),
            phone=phone,
            company=company,
            country=country,
            address=address,
        )

        user.is_active = False  # TODO: change to False when email is in place
        user.set_password(password)
        user.last_login = timezone.now()
        user.save()

        return user

    def create_superuser(self, email, password, phone, company, country, address):
        """
        Create and save a superuser in the database
        """
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            phone=phone,
            company=company,
            country=country,
            address=address,
        )

        user.is_active = True  # TODO: change to False when email is in place
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.last_login = timezone.now()
        user.save()

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Define Custom user table
    """

    # max email length 254 is defined in RFC 5321
    email = models.EmailField(max_length=254, unique=True)
    phone = PhoneNumberField()  # uses phone number field library
    company = models.CharField(max_length=128)
    country = models.CharField(max_length=64)
    address = models.CharField(max_length=128)

    # False, as activation is done with email
    is_active = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    # these fields are the required fields when creating a **superuser**
    REQUIRED_FIELDS = ["phone", "company", "country", "address"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email
