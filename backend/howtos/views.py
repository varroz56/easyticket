from rest_framework import filters, permissions
from rest_framework.generics import ListAPIView
from .models import HowTo
from .serializers import HowToSerializer


class HowToListView(ListAPIView):
    """ This view will list How-Tos ordered by the most
    visited ones and then alphabetical """
    permission_classes = (permissions.AllowAny,)
    queryset = HowTo.objects.order_by('question', 'number_of_views')
    serializer_class = HowToSerializer


class HowToSearchView(ListAPIView):
    """ A view to return searched subcategory qs"""

    queryset = HowTo.objects.all()
    serializer_class = HowToSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['question', 'answer']
