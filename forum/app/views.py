from rest_framework import views

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render

from django.contrib.auth.models import User


from . import models
from users.views import TokenAuthentication
from api import serializers

class ThreadAPI(views.APIView):
    @csrf_exempt
    def post(self, request):
        Auth = TokenAuthentication()
        res = Auth.authenticate(request)
        if res:
            user, token = res
            category = models.Category.objects.get(category_name = request.POST.get('category'))
            if category:
                entity = models.Entity()
                entity.save()
                thread = models.ThreadTheme(entity=entity, subject=request.POST.get('subject'),\
                    content=request.POST.get('content'), user = user, category = category)
                thread.save()
                return HttpResponse(status=200)
        else:
            return HttpResponse(status=400)
    
    def get(self, request, thread_id, data=False):

        print('Params: ',data, thread_id)
        
        if(not data):
            return render(request, 'frontend/thread.html')

        else:
            thread_id = int(thread_id.split('t')[1])

            theme = models.ThreadTheme.objects.filter(entity_id=thread_id).first()
            if theme:
  
                serializer = serializers.ThreadSerializer(theme)
                
                return JsonResponse(serializer.data)

        return HttpResponse(status=400)

class UserAPI(views.APIView):
    def get(self, request):
        # TODO: тут нужна обработка ошибок если токена нет...
        Auth = TokenAuthentication()
        res = Auth.authenticate(request)
        if res:
            user, token = res
            
            serializer = serializers.UserSerializer(user)

            return JsonResponse(serializer.data)
        else:
            return HttpResponse(status=400)


    def post(self, request):
        pass

class LikeAPI(views.APIView):
    def post(self, request):
        print(request.is_ajax())
        print(request.POST)

        # print(dict(request.POST))
        # import json
        # print(json.loads(str(request.POST)))
        return HttpResponse(status=200)

    def get(self, request):
        pass   


@csrf_exempt
def comment_thread(request):
    if request.method == "POST":
        print(request.POST)
        # TODO: Maybe Optimize
        # оптимальность зашкаливает
        # проверить авторизацию
        # создать ентити
        # создать коммент
        # создать коммент мета
        # достать из бд стандартной функцией
        # вернуть джсоном

        Auth = TokenAuthentication()
        res = Auth.authenticate(request)
        if res:
            user, token = res

            thread_id = int(request.POST.get('thread_id').split('t')[1])

            entity = models.Entity()
            entity.save()

            comment = models.Comment(entity=entity, content=request.POST.get('comment'))
            comment.save()

            theme = models.ThreadTheme.objects.filter(entity_id=thread_id).first()

            if theme:
                comment_meta = models.CommentMeta(comment=comment,creator=user,thread=theme)
                comment_meta.save()
  
                # info = get_thread(theme)

                serializer = serializers.CommentInfoSerializer(comment_meta)

                return JsonResponse(serializer.data)


        return HttpResponse(status=403)
    else:
        return HttpResponse(status=405)


def users_template(request):
    return render(request, 'frontend/users.html');