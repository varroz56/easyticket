from django.urls import path
from .views import ShippingAddressCRUDView

urlpatterns = [
    path('manage-shipping-address/', ShippingAddressCRUDView.as_view()),
]
