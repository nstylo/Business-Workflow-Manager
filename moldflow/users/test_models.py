from django.contrib.auth import get_user_model
from django.test import TestCase


class CustomUserManagerTests(TestCase):
    """
    Test for regular user manager
    """

    def setUp(self):
        self.User = get_user_model()
        self.user = self.User.objects.create_user(
            email="test@example.com",
            company="Shell",
            country="Netherlands",
            address="sample address",
            phone="+31649802702",
            password="testingpassword123",
        )

    def assertPermissions(self, *, is_staff=False, is_superuser=False, is_admin=False):
        self.assertEqual(self.user.is_staff, is_staff)
        self.assertEqual(self.user.is_superuser, is_superuser)
        self.assertEqual(self.user.is_admin, is_admin)

    def test_is_active(self):
        self.assertFalse(self.user.is_active)

    def test_no_username(self):
        try:
            # no usernames get created for our user model
            self.assertIsNone(self.user.username)
        except AttributeError:
            pass

    def test_no_permissions_on_default_account(self):
        self.assertPermissions(
            is_staff=False, is_superuser=False, is_admin=False)


class CustomSuperUserManagerTests(TestCase):
    """
    Test custom super user manager
    """

    def setUp(self):
        self.User = get_user_model()
        self.user = self.User.objects.create_superuser(
            email="test@example.com",
            company="Shell",
            country="Netherlands",
            address="sample address",
            phone="+31647802691",
            password="testingpassw123.",
        )

    # TODO: Change from True to False when emailing is done
    def test_is_active(self):
        self.assertTrue(self.user.is_active)

    def assertPermissions(self, *, is_staff=True, is_superuser=True, is_admin=True):
        self.assertEqual(self.user.is_staff, is_staff)
        self.assertEqual(self.user.is_superuser, is_superuser)
        self.assertEqual(self.user.is_admin, is_admin)

    def test_no_username(self):
        try:
            # no usernames get created for our user model
            self.assertIsNone(self.user.username)
        except AttributeError:
            pass

    def test_no_permissions_on_default_account(self):
        self.assertPermissions(is_staff=True, is_superuser=True, is_admin=True)


class CustomUserManagerEmptyFieldTests(TestCase):
    def setUp(self):
        self.User = get_user_model()
        self.user = self.User.objects.create_superuser(
            email="test@example.com",
            company="Shell",
            country="Netherlands",
            address="sample address",
            phone="+31647802691",
            password="testingpassw123.",
        )

    def test_empty_email(self):
        with self.assertRaises(ValueError):
            self.User.objects.create_user(
                email="",
                company=self.user.company,
                country=self.user.company,
                address=self.user.address,
                phone=self.user.phone,
                password=self.user.password,
            )

    def test_empty_company(self):
        with self.assertRaises(ValueError):
            self.User.objects.create_user(
                email="test@gmails.com",
                company="",
                country=self.user.company,
                address=self.user.address,
                phone=self.user.phone,
                password=self.user.password,
            )

    def test_empty_country(self):
        with self.assertRaises(ValueError):
            self.User.objects.create_user(
                email="test@gmails.com",
                company="a new company",
                country="",
                address=self.user.address,
                phone=self.user.phone,
                password=self.user.password,
            )

    def test_empty_address(self):
        with self.assertRaises(ValueError):
            self.User.objects.create_user(
                email="test@gmails.com",
                company="a new company",
                country="some country",
                address="",
                phone=self.user.phone,
                password=self.user.password,
            )

    def test_empty_phone(self):
        with self.assertRaises(ValueError):
            self.User.objects.create_user(
                email="test@gmails.com",
                company="a new company",
                country="some country",
                address="some address",
                phone="",
                password=self.user.password,
            )
