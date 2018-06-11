from django.urls import path, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/categories/', views.CategoryAPIView.as_view()),
    path('api/threads/', views.ThreadAPIView.as_view()),

    
    path('api/users/', views.UserAPIView.as_view()),
    
    # /api/user = /user - с токеном для извлечения лайков
    # /api/user/username - без токена для вытаскивания инфы о пользователе для профиля

    path('api/user', views.UserAPIView.as_view()),
    url(r'^user/(?P<username>\w+)/$', views.UserAPIView.as_view()),
]