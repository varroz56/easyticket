from django.db import models


class EventType(models.Model):
    """ Event types such as Request or Incident """
    name = models.CharField(max_length=50, unique=True)
    short = models.CharField(max_length=3, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class EventCategory(models.Model):
    """ This model will hold the category names
        such as Lockout, Performance issue,
        Distribution list, Password reset etc
    """
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField()

    class Meta:
        verbose_name = "Event Category"
        verbose_name_plural = "Event Categories"

    def __str__(self):
        return self.name


class EventSubCategory(models.Model):
    """ This model will hold the sub-categories
        those are related to both category
        and to type
    """
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField()

    etype = models.ForeignKey(
        "typesandcategories.EventType",
        null=True, on_delete=models.SET_NULL)
    ecategory = models.ForeignKey(
        "typesandcategories.EventCategory",
        null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name = "Event Subcategory"
        verbose_name_plural = "Event Subcategories"

    def __str__(self):
        return self.name
