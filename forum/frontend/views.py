from django.shortcuts import render

def index(request):
    # print(request)
    # print('-'*100)
    # print(request.path)
    # print('-'*100)
    # print(request.body)
    # print('-'*100)
    # print(request.method)
    # print('-'*100)
    # print(request.path_info)
    # print('-'*100)
    # print(request.session)
    return render(request, 'frontend/index.html')

def category(request):
    return render(request, 'frontend/category.html')