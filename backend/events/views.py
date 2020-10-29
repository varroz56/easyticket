from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from accounts.models import UserProfile
from .models import Event
from typesandcategories.models import EventSubCategory


class EventCreateView(APIView):
    """ A view to create Event instance """

    def post(self, request):

        data = self.request.data
        user = UserProfile.objects.get(id=data['user'])
        sub_category = EventSubCategory.objects.get(id=data['sub_category'])
        event = Event(
            created_for=user,
            open_notes=data['open_notes'],
            sub_category=sub_category
        )
        event.save()
        content = {'success', 'Event has been created'}
        return Response(content, status=status.HTTP_201_CREATED)
