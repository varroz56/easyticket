from django.urls import path
from .views import StripeTestPaymentView


urlpatterns = [
    path('test-payment/', StripeTestPaymentView.as_view()),
]
