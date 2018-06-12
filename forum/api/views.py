import pprint

from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse


from rest_framework.views import APIView
from .serializers import *
from users.views import TokenAuthentication
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
    def get(self, request, username=None):


        if request.META['PATH_INFO'] == '/api/users/': # хз это хорошо или плохо
            profiles = models.Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)


        if 'HTTP_AUTHORIZATION' in request.META:# and request.META['HTTP_AUTHORIZATION'].split('Bearer')[1] != 'null':
            Auth = TokenAuthentication()
            res = Auth.authenticate(request)
            if res:
                user, token = res
                serializer = UserSerializer(user)
                return JsonResponse(serializer.data)
            else:
                return HttpResponse(status=400)

        if username:
            user = models.User.objects.filter(username=username).first()
            print(user.id)
            if user:
                profile = models.Profile(user=user)
                print(profile.bio)
                serializer = ProfileSerializer(profile)
                pprint.pprint(serializer.data)
                return JsonResponse(serializer.data)
            else:
                return HttpResponse(status=400)

            return JsonResponse({'ok':True})
