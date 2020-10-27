from django.urls import path
from .views import ShippingAddressCRUDView, ShippingAddressDeletView

urlpatterns = [
    path('manage-shipping-address/', ShippingAddressCRUDView.as_view()),
    path('delete-shipping-address/', ShippingAddressDeletView.as_view()),
]
