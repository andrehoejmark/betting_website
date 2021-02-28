from django.urls import path
from .views import Authenticate, OrderStatus


urlpatterns = [
    path("authenticate", Authenticate.as_view()),
    path("order-status", OrderStatus.as_view()),
]