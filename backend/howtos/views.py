from rest_framework import permissions
from rest_framework.generics import ListAPIView
from .models import HowTo
from serializers import HowToSerializer


class HowToListView(ListAPIView):
    """ This view will list How-Tos ordered by the most
    visited ones and then alphabetical """
    permission_classes = (permissions.AllowAny,)
    queryset = HowTo.objects.order_by('question', 'number_of_views')
    serializer_class = HowToSerializer
