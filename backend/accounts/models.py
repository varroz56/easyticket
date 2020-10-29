from datetime import date, timedelta
from django.db import models
# import required models to inherit our custom usermodel
from django.contrib.auth.models import (AbstractBaseUser,
                                        PermissionsMixin, BaseUserManager)


# Using custom User model
# https://docs.djangoproject.com/en/3.1/ref/contrib/auth/
# https://docs.djangoproject.com/en/3.1/ref/contrib/admin/
# https://docs.djangoproject.com/en/3.1/topics/auth/customizing/

# Create user manager to def save method for user, support user and
# superuser


class UserAccountManager(BaseUserManager):
    """ Define create methods for each user profile """

    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('Please enter your emeail address')

        if not first_name:
            raise ValueError('Please enter your First name')

        if not first_name:
            raise ValueError('Please enter your Last name')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name,
                          last_name=last_name)

        user.set_password(password)
        user.save()

        return user

    def create_support_user(self, email, first_name, last_name, password=None):
        user = self.create_user(email, first_name, last_name, password)

        # setting user as supportuser
        user.is_support_user = True

        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        # superuser who can access the admin page
        user = self.create_user(email, first_name, last_name, password)

        user.is_support_user = True
        user.is_superuser = True
        user.is_staff = True

        user.save()
        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """ Our custom user profile inherited from the abstract base user
        removed username and use email instead
    """
    email = models.EmailField(max_length=255, unique=True)

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    is_premium = models.BooleanField(default=False)
    # adding date field to set premium timeout
    # default is yesterday
    premium_until = models.DateField(
        auto_now_add=False, default=date.today()-timedelta(1), editable=True)

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)
    is_support_user = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        return str(self.first_name + " " + self.last_name)

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
