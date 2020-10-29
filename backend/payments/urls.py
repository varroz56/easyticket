from django.urls import path
from .views import (StripeTestPaymentView, FindOrCreateStripeCustomer,
                    HandlePremiumPackagePurchaseView)


urlpatterns = [
    path('test-payment/', StripeTestPaymentView.as_view()),
    path('find-or-create-customer/', FindOrCreateStripeCustomer.as_view()),
    path('create-purchase/', HandlePremiumPackagePurchaseView.as_view()),
]
