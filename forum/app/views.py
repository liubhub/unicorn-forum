from django.shortcuts import render

# Create your views here.

from app.models import Category
from app.serializers import CategorySerializer
from rest_framework import generics

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer