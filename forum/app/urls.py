from django.urls import path, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/category/', views.CategoryListCreate.as_view()),
    path('api/threads/', views.threads_view),
    path('register/', views.register),
    # re_path(r'^activate/(?P<uidb64>\w+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.activate,name='activate'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),
    path('verify/',views.verify),
    path('login/',views.Login.as_view())
]
# r'^(?P<pk>[0-9]+)/$'  [0-9A-Za-z_\-]
# http://127.0.0.1:8000/%5Eactivate/(%3FPb'MTQ'%5B0-9A-Za-z_%5C-%5D+)/(%3FP4w1-c6157b567805eafd7a22%5B0-9A-Za-z%5D%7B1,13%7D-%5B0-9A-Za-z%5D%7B1,20%7D)/$