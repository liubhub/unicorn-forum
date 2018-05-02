from django.urls import path
from . import views

urlpatterns = [
    path('api/category/', views.CategoryListCreate.as_view()),
    path('api/threads/', views.threads_view),
    # path('register/', views.CustomRegistrationView.as_view())
]