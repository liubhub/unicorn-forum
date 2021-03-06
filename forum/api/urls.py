from django.urls import path, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/categories/', views.CategoryAPIView.as_view()),
    path('api/threads/', views.ThreadAPIView.as_view()),
    path('api/users/', views.UserAPIView.as_view()),
    path('api/user', views.UserAPIView.as_view()),
    
    url(r'^api/user/(?P<username>\w+)/$', views.UserAPIView.as_view()),
]