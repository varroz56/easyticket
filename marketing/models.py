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


class ContactUsMessage(models.Model):
    """To store the message and to create the response to that message"""
    subject = models.CharField(max_length=150)
    message = models.TextField()

    created_on = models.DateTimeField(auto_now_add=True)
    contact = models.CharField(max_length=254)

    reference = models.CharField(max_length=10, null=True, blank=True)
    # Create custom save method to add reference
    # refernce is limited to 9999999 any more instance created after this
    # it will add a backup prefix and have another 9999999
    # instance time to prepare
    # with a better soultion
    # This is to have a consistent and limited length of reference numbers

    def create_reference(self):
        # setting end and prefix vars
        end = str(self.id)
        prefix = "CUF"
        # in the case of over 9999999 insatnces
        if self.id > 9999999:
            # backup prefix and the end will roll back to start
            # from 1
            prefix = "FUC"
            end = str(self.id-9999999)
        # get the length of the id
        # fill with 0s while get the required length
        num = len(end)
        mid = ""
        while num < 7:
            mid += "0"
            num += 1
        # set ref from the required tags
        ref = prefix + mid + end
        # update the instance
        ContactUsMessage.objects.filter(
            id=self.id).update(reference=ref)

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            self.create_reference()

    def get_contact(self):
        if not self.contact:
            return str("No contact has been linked to this message yet.")
        return self.contact

    def __str__(self):
        if not self.reference:
            return str("No Reference has been created yet")
        return self.reference
