from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from rest_framework.response import Response
from app.models import Category
from app.serializers import CategorySerializer
from rest_framework import generics

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # def list(self, request):
    #     # Note the use of `get_queryset()` instead of `self.queryset`
    #     queryset = self.get_queryset()
    #     serializer = CategorySerializer(queryset, many=True)
    #     return Response(serializer.data)