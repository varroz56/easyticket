from django.db import models


class EventType(models.Model):
    """ Event types such as Request or Incident """
    name = models.CharField(max_length=50, unique=True)
    short = models.CharField(max_length=3, unique=True)
    description = models.TextField()
