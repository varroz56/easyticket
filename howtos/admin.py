from django.contrib import admin
# https://github.com/summernote/django-summernote
from django_summernote.admin import SummernoteModelAdmin
from .models import HowTo


class HowToAdmin(SummernoteModelAdmin):
    """ Using Summernotes to be able to format the Howto answer"""
    search_fields = ('question', 'answer')
    summernote_fields = ('answer',)


admin.site.register(HowTo, HowToAdmin)
