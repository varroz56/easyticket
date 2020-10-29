from django.db import models
from accounts.models import UserProfile
from typesandcategories.models import EventSubCategory


class Event(models.Model):
    """ This model to hold information about an event """

    # status choices to show progress of an event
    class EvetStatus(models.TextChoices):
        OPEN = 'Open'
        INPROGRESS = 'In Progress'
        ON_HOLD = 'On Hold'
        CLOSED = 'Closed'

    reference = models.CharField(max_length=10, blank=True)

    status = models.CharField(
        max_length=50, choices=EvetStatus.choices, default=EvetStatus.OPEN)

    created_on = models.DateTimeField(auto_now_add=True)
    closed_on = models.DateTimeField(blank=True, null=True, auto_now_add=False)
    created_for = models.ForeignKey("accounts.UserProfile",
                                    on_delete=models.PROTECT,
                                    related_name='+',)

    closed_by = models.ForeignKey("accounts.UserProfile",
                                  on_delete=models.PROTECT,
                                  null=True,
                                  related_name='+',)

    open_notes = models.TextField(blank=True)
    close_notes = models.TextField(blank=True)

    sub_category = models.ForeignKey(
        "typesandcategories.EventSubCategory",
        null=True,
        on_delete=models.SET_NULL)

    # Create custom save method to add reference
    # refernce is limited to 9999999 any more instance created after this
    # it will add a backup prefix and have another 9999999
    # instance time to prepare
    # with a better soultion
    # This is to have a consistent and limited length of reference numbers

    def create_reference(self):
        # setting end and prefix vars
        end = str(self.id)
        prefix = self.sub_category.etype.get_short()
        # in the case of over 9999999 insatnces
        if self.id > 9999999:
            # backup prefix and the end will roll back to start
            # from 1
            prefix = self.event.etype.get_short()[::-1]
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
        Event.objects.filter(
            id=self.id).update(reference=ref)

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            self.create_reference()

    def __str__(self):
        if self.reference:
            return self.reference
        return "Ref"+self.id
