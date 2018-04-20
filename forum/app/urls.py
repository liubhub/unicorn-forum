from django.urls import path
from . import views

urlpatterns = [
    path('api/category/', views.CategoryListCreate.as_view()),
]