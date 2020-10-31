from django.db import models


class HowTo(models.Model):
    """ This model will hold the data about the how-to page """
    question = models.CharField(max_length=254)
    answer = models.TextField()
    # when the question will be clicked this will be updated by one
    number_of_views = models.IntegerField(default=1)
    # addin ref so can use it as a uniques id
    reference = models.CharField(max_length=10, blank=True)

    def create_reference(self):
        # setting end and prefix vars
        end = str(self.id)
        prefix = "HOW"
        # in the case of over 9999999 insatnces
        if self.id > 9999999:
            # backup prefix and the end will roll back to start
            # from 1
            prefix = "WOH"
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
        HowTo.objects.filter(
            id=self.id).update(reference=ref)

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            self.create_reference()

    def __str__(self):
        return self.question
