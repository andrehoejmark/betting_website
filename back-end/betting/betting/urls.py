
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('dj_rest_auth.urls')),
    path('bankID/', include('bankID.urls')),
    path('accounts/signup/', include('dj_rest_auth.registration.urls')),
]

