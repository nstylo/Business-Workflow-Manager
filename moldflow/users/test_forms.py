from django.contrib.auth import get_user_model
from django.test import TestCase

from .forms import CustomUserChangeForm, CustomUserCreationForm


class UserChangeTests(TestCase):
    """
    Tests for changing user data with forms
    """
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email='test@example.com',
            password='testingpassword123',
            phone='+31649802702',
            company='Shell',
            country='Netherlands',
            address='sample address',
        )

    def test_valid_data(self):
        """
        Test if a good change form would be valid
        """
        form = CustomUserChangeForm(
            {'email': 'leela@example.com',
             'phone': '+31598682506',
             'company': 'sample company name',
             'country': 'NL',
             'address': 'sample address'}, instance=self.user)
        self.assertTrue(form.is_valid())
        change_form = form.save()

        self.assertEqual(change_form.email, 'leela@example.com')
        self.assertEqual(change_form.phone, '+31598682506')
        self.assertEqual(change_form.company, 'sample company name')
        self.assertEqual(change_form.country, 'NL')
        self.assertEqual(change_form.address, 'sample address')

    def test_empty_data(self):
        """
        Test if empty data isn't valid and what the responses we get are
        """
        form = CustomUserChangeForm({}, instance=self.user)  # empty form

        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors, {
            'email': ['This field is required.'],
            'phone': ['This field is required.'],
            'company': ['This field is required.'],
            'country': ['This field is required.'],
            'address': ['This field is required.']
        })


class UserCreateTests(TestCase):
    """
    Tests for creating user data with forms
    """

    def test_valid_data(self):
        form = CustomUserCreationForm(
            {'email': 'leela@example.com',
             'password1': 'This.password123test',
             'password2': 'This.password123test',
             'phone': '+31598682506',
             'company': 'sample company name',
             'country': 'NL',
             'address': 'sample address'})
        self.assertTrue(form.is_valid())
        creation_form = form.save()

        self.assertEqual(creation_form.email, 'leela@example.com')
        self.assertEqual(creation_form.phone, '+31598682506')
        self.assertEqual(creation_form.company, 'sample company name')
        self.assertEqual(creation_form.country, 'NL')
        self.assertEqual(creation_form.address, 'sample address')

    def test_empty_data(self):
        """
        Test if empty data isn't valid and what the responses we get are
        """
        form = CustomUserCreationForm({})  # empty form

        self.assertFalse(form.is_valid())
        self.assertEqual(form.errors, {
            'email': ['This field is required.'],
            'password1': ['This field is required.'],
            'password2': ['This field is required.'],
            'phone': ['This field is required.'],
            'company': ['This field is required.'],
            'country': ['This field is required.'],
            'address': ['This field is required.']
        })
