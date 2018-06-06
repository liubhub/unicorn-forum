from django.urls import path, re_path
from django.conf.urls import url
from . import views

urlpatterns = [
   
    path('thread/', views.ThreadAPI.as_view()),
    url(r'^thread/(?P<thread_id>t[0-9]+)/$', views.ThreadAPI.as_view()),
    url(r'^thread/(?P<thread_id>t[0-9]+)((?P<data>.*/$))', views.ThreadAPI.as_view()),

    path('user', views.UserAPI.as_view()),
    path('users/', views.users_template),
    path('comment/', views.comment_thread),
    path('like/', views.LikeAPI.as_view())

    # path('api/users', views.users_info),
    # url(r'thread/(?P<thread_id>t[0-9]+)((?P<data>[True]+)/)?$', views.Thread.as_view()),

    # url(r'thread/(?P<thread_id>t[0-9]+)', views.Thread.as_view()),
    # url(r'thread/(?P<thread_id>t[0-9]+)/(?P<data>[true]+)', views.Thread.as_view()),

    # активация профиля пользователя
    # url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.activate, name='activate'),
    # path('verify/',views.verify)
    
    # path('api/category/', views.CategoryListCreate.as_view()),
    # path('api/threads/', views.threads_view),
    # path('register/', views.register),
    # path('login/',views.Login.as_view()),
]

# url(r'^so/(?P<required>\d+)/$', 'myapp.so', name='something'),
# url(r'^so/(?P<required>\d+)/(?P<optional>.*)/$', 'myapp.so', name='something_else'),

# re_path(r'^activate/(?P<uidb64>\w+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.activate,name='activate'),
# r'^(?P<pk>[0-9]+)/$'  [0-9A-Za-z_\-]
# http://127.0.0.1:8000/%5Eactivate/(%3FPb'MTQ'%5B0-9A-Za-z_%5C-%5D+)/(%3FP4w1-c6157b567805eafd7a22%5B0-9A-Za-z%5D%7B1,13%7D-%5B0-9A-Za-z%5D%7B1,20%7D)/$