from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from phonenumber_field.phonenumber import PhoneNumber
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    """
    Our custom user manager
    """
    def create_user(self, email, password, phone, company, country, address):
        """
        Creates and saves a user in the database
        """
        # all these fields are required
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
            email = self.normalize_email(email),
            phone = phone,
            company = company,
            country = country,
            address = address
        )

        user.set_password(password)
        user.last_login = timezone.now()
        user.save()

        return user

    def create_superuser(self, email, password, phone, company, country, address):
        """
        Creates and saves a superuser in the database
        """
        # the only requirement is having an email
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

        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            phone = phone,
            company = company,
            country = country,
            address = address
        )

        user.is_active = True # TODO: change to False when email is in place
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.last_login = timezone.now()
        user.save()

        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Custom user table
    """
    # max email length 254 is defined in RFC 5321
    email = models.EmailField(max_length=254, unique=True)
    phone = PhoneNumberField() # uses phone number field library
    company = models.CharField(max_length=128)
    country = models.CharField(max_length=64)
    address = models.CharField(max_length=128)

    is_active = models.BooleanField(default=False) # we want to activate users with email
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    # these fields are the required fields when creating a **superuser**
    REQUIRED_FIELDS = ['phone', 'company', 'country', 'address']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
