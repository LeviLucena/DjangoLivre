from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('saudepublica/', include('saudepublica.urls')),
    path('accounts/', include('accounts.urls')),  # Supondo que suas URLs de accounts estejam em accounts.urls
]
