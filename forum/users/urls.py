from django.urls import path, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/',views.Login.as_view()),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.activate, name='activate'),
    path('verify/',views.verify)
]