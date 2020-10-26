from django.db import models


class HowTo(models.Model):
    """ This model will hold the data about the how-to page """
    question = models.CharField(max_length=254)
    answer = models.TextField()
    # when the question will be clicked this will be updated by one
    number_of_views = models.IntegerField(default=1)

    def __str__(self):
        return self.question
