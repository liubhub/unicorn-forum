from rest_framework import serializers
from app import models

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id','first_name','last_name','username']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = '__all__'

class CommentInfoSerializer(serializers.ModelSerializer):
    comment = CommentSerializer()

    class Meta:
        model = models.CommentMeta
        fields = '__all__'


class ThreadSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    user = UserSerializer()

    comments = serializers.SerializerMethodField()

    class Meta:
        model = models.ThreadTheme
        fields = '__all__'
    
    def get_comments(self, obj):
        thread_comments = models.CommentMeta.objects.filter(thread_id=obj.entity_id)
        thread_comments_serializer = CommentInfoSerializer(thread_comments, many=True)
        return thread_comments_serializer.data

class ProfileSerializer(serializers.ModelSerializer): 
    user = UserSerializer()
    num_user_comments = serializers.SerializerMethodField()
    user_threads = serializers.SerializerMethodField()

    class Meta:
        model = models.Profile
        fields = '__all__'
    
    def get_user_threads(self, obj):
        usr_threads = models.ThreadTheme.objects.filter(user_id=obj.user_id)
        usr_threads_serializer = ThreadSerializer(usr_threads, many=True)
        return usr_threads_serializer.data
    
    def get_num_user_comments(self, obj):
        usr_comments = models.CommentMeta.objects.filter(creator=obj.user_id)
        return len(usr_comments)