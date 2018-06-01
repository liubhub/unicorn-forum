from django.shortcuts import render
from rest_framework.response import Response


from rest_framework.views import APIView
from .serializers import *
from app import models


class ThreadAPIView(APIView):
    def get(self, request):
        threads = models.ThreadTheme.objects.all()
        serializer = ThreadSerializer(threads, many=True)
        return Response(serializer.data)


class CategoryAPIView(APIView):
    def get(self, request):
        categories = models.Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class UserAPIView(APIView):
    def get(self, request):
        profiles = models.Profile.objects.all()
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data)