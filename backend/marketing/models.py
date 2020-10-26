from django.db import models


class Contact(models.Model):
    """ Contact model to store contact details
    and if subscribe to the newsletters """
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    subscribe_me = models.BooleanField()
    created_on = models.DateTimeField(auto_now_add=True)

    def get_email(self):
        return str(self.email)

    def __str__(self):
        return self.email
