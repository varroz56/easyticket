from django.urls import path

from .views import (ShippingAddressCRUDView, ShippingAddressDeletView,
                    ShippingAddressReadView)

urlpatterns = [
    path('manage-shipping-address/', ShippingAddressCRUDView.as_view()),
    path('delete-shipping-address/', ShippingAddressDeletView.as_view()),
    path('show-shipping-address/', ShippingAddressReadView.as_view()),
]
