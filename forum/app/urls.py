from django.urls import path, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
   
    path('thread/', views.ThreadAPI.as_view()),
    url(r'^thread/(?P<thread_id>t[0-9]+)/$', views.ThreadAPI.as_view()),
    url(r'^thread/(?P<thread_id>t[0-9]+)((?P<data>.*/$))', views.ThreadAPI.as_view()),

    
    url(r'^user/(?P<username>\w+)/$', views.UserAPI.as_view()),
    url(r'^user/(?P<username>\w+)/edit/$', views.edit_profile),

    path('comment/', views.comment_thread),
    path('like/', views.LikeAPI.as_view()),

    # TODO: 
    path('users/', views.users_template),
]