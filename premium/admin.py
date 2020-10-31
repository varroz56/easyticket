from django.contrib import admin
from .models import ShippingAddress, PremiumPackage


admin.site.register(ShippingAddress)
admin.site.register(PremiumPackage)
