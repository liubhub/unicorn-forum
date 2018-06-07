from rest_framework import serializers
from app import models

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    avatar = serializers.SerializerMethodField()

    def get_avatar(self, obj):
        profile = models.Profile.objects.filter(user = obj).first()
        avatar = str(profile.avatar)
        return avatar

    class Meta:
        model = models.User
        fields = ['id','first_name','last_name','username','avatar']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = '__all__'

class CommentInfoSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    comment = CommentSerializer()

    class Meta:
        model = models.CommentMeta
        fields = '__all__'

class LikesSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.LikedEntity
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer): 

    num_user_comments = serializers.SerializerMethodField()
    user_threads = serializers.SerializerMethodField()
    user_data = serializers.SerializerMethodField()
    user_likes = serializers.SerializerMethodField()

    class Meta:
        model = models.Profile
        fields = '__all__'
    
    def get_user_likes(self,obj):
        likes = models.LikedEntity.objects.filter(user_id=obj.user_id).all()
        likes_serializer = LikesSerializer(likes, many=True)
        return likes_serializer.data


    def get_user_data(self,obj):
        user = models.User.objects.filter(id=obj.user_id).first()
        user_serializer = UserSerializer(user)
        return user_serializer.data

    def get_user_threads(self, obj):
        usr_threads = models.ThreadTheme.objects.filter(user_id=obj.user_id)
        usr_threads_serializer = ThreadSerializer(usr_threads, many=True)
        return usr_threads_serializer.data
    
    def get_num_user_comments(self, obj):
        usr_comments = models.CommentMeta.objects.filter(creator=obj.user_id)
        return len(usr_comments)

class ThreadSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    user = UserSerializer()

    comments = serializers.SerializerMethodField()
    # creator_avatar = serializers.SerializerMethodField()
    last_meta_data = serializers.SerializerMethodField()
    
    class Meta:
        model = models.ThreadTheme
        fields = '__all__'
    
    def get_comments(self, obj, intern=False):
        thread_comments = models.CommentMeta.objects.filter(thread_id=obj.entity_id).order_by('-created_at')
        if intern:
            return thread_comments
        thread_comments_serializer = CommentInfoSerializer(thread_comments, many=True)
        return thread_comments_serializer.data

    # def get_creator_avatar(self, obj):
    #     profile = models.Profile.objects.filter(user_id=obj.user.id).first()
    #     return str(profile.avatar)
    
    def get_last_meta_data(self,obj):
        comments = self.get_comments(obj, intern=True)
        if comments:
            last_meta_data = dict()
            
            last_meta_data['last_commented_date'] = comments.last().created_at
            last_meta_data['last_commented_username'] = models.User.objects.filter(id = comments.last().creator_id).first().username
            last_meta_data['last_commented_avatar'] = str(models.Profile.objects.filter(user_id = comments.last().creator_id).first().avatar)

            return last_meta_data

        return 0