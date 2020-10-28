from django.db import models
from accounts.models import UserProfile
# import slugify
from django.template.defaultfilters import slugify


class PremiumPackage(models.Model):
    """ Premium Package name and data to show """
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=60, null=True, blank=True, unique=True)
    sub_name = models.CharField(max_length=150)
    short_description = models.CharField(max_length=254)
    description = models.TextField(blank=True)

    valid_for_days = models.IntegerField()
    price = models.FloatField()
    created_on = models.DateTimeField(auto_now_add=True)

    def create_unique_slug(self):
        """ Create unique slug so package with the same name
             can be saved and still can be distinguished
             So a record can be kept about same package changes
        """
        myslug = slugify(self.name)
        # print("creating unique slug from "+myslug)
        # As probably the same main name will be used like "30 day", "6 month",
        #  annual the next filter is outside of the if statement, however,
        # this is unecessary when the slug is unique
        # But when not and assuming the main package prices/details will
        # change more often than new package names created, this is
        # more effective in this case
        ppackages = PremiumPackage.objects.filter(slug__startswith=myslug)
        if ppackages:
            n = 1
            while n < len(ppackages)+1:
                # print(
                #     "going through all packages with same slug start.." + str(n) + "st/th time(s)")
                is_unique = True
                while is_unique:
                    for p in ppackages:
                        myslug = slugify(self.name+"-"+str(n))
                        p.slug
                        # print("My slug : " +
                        #       myslug+" Comparing to: " + p.slug)
                        if myslug == p.slug:
                            # print(myslug +
                            #       " is not unique as it is equal to: " + p.slug)
                            is_unique = False
                            n += 1
                    if is_unique:
                        PremiumPackage.objects.filter(
                            id=self.id).update(slug=myslug)
                        # print("Set instance slug to: " + myslug)
                        is_unique = False
                        n = len(ppackages)+1
        else:
            PremiumPackage.objects.filter(id=self.id).update(slug=myslug)
            # print("Default slug is unique, set instance slug to: " + myslug)

    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
            self.create_unique_slug()

    def __str__(self):
        return self.slug


class ShippingAddress(models.Model):
    """ User's shipping address One to one relation to user"""
    user = models.OneToOneField(
        "accounts.UserProfile", on_delete=models.CASCADE)
    address_line_one = models.CharField(max_length=254)
    address_line_two = models.CharField(max_length=254)
    postcode = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Shipping Adresses"

    def __str__(self):
        return self.user.email
