from . import models


def get_thread(theme):

    thread_details = dict()

    thread_comments = models.CommentMeta.objects.filter(thread_id = theme.entity_id).order_by('created_at')

    comments = []
    for c in thread_comments:

        comment_meta = dict()
        
        comment_meta['creation_date']= c.created_at
        comment_meta['content'] = models.Comment.objects.filter(entity_id=c.comment_id).first().content
        comment_meta['author_username'] = models.User.objects.filter(id = c.creator_id).first().username
        comment_meta['author_avatar'] = str(models.Profile.objects.filter(user_id=c.creator_id).first().avatar)
        comment_meta['number_of_replies'] = len(models.CommentMeta.objects.filter(creator_id=c.creator_id))
        comment_meta['is_comment'] = True
        comments.append(comment_meta)

    category = models.Category.objects.filter(id = theme.category_id).first().category_name
    number_of_replies = thread_comments.count()
    author_username = models.User.objects.filter(id = theme.user_id).first().username
    author_avatar = str(models.Profile.objects.filter(user_id = theme.user_id).first().avatar)

    last_commented_username = ''
    last_commented_avatar = ''
    last_commented_date = ''
    if number_of_replies != 0:
        last_commented_date = thread_comments.last().created_at
        last_commented_username = models.User.objects.filter(id = thread_comments.last().creator_id).first().username
        last_commented_avatar = str(models.Profile.objects.filter(user_id = thread_comments.last().creator_id).first().avatar)
    
    thread_details['id'] = theme.entity_id
    thread_details['last_commented_avatar'] = last_commented_avatar
    thread_details['last_commented_username'] = last_commented_username
    thread_details['last_commented_date'] = last_commented_date
    thread_details['author_avatar'] = author_avatar
    thread_details['author_username'] = author_username
    thread_details['number_of_replies'] = number_of_replies
    thread_details['category'] = category
    
    thread_details['creation_date'] = theme.created_at
    thread_details['subject'] = theme.subject
    thread_details['content'] = theme.content
    thread_details['is_comment'] = False
    thread_details['comments'] = comments
    return thread_details

    
def collect_threads_info():
     
    threads_info = []

    threads = models.ThreadTheme.objects.all().order_by('-updated_at')

    for theme in threads:
        thread_details = get_thread(theme) # dict()
    
        threads_info.append(thread_details)

    return threads_info