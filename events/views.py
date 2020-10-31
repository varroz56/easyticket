from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import status, permissions
from rest_framework.response import Response
from accounts.models import UserProfile
from .models import Event, EventUpdate
from typesandcategories.models import EventSubCategory
from .serializers import EventSerializer, EventUpdateSerializer


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
        event = Event.objects.get(id=event.id)

        try:
            # as Django send_mail required fields
            # name
            name = user.get_full_name()
            # subject
            subject = str(event.sub_category.etype) + \
                " has been created, Ref: " + str(event)
            # our message
            message = "Dear " + name + ",\n " + \
                "\n" + "\n " + str(event.sub_category.etype) + \
                " has been created on your behalf " + \
                "\n" + " Category of the event: " + str(event.sub_category) + \
                "\n" + " Reference number: " + str(event) + "\n" + \
                "\n" + "\n" + " Kind Regards, \n" + " The Easy Ticket Team"

            # get the email host to set sender

            sender = settings.EMAIL_HOST_USER

            recipient = user.email

            send_mail(
                subject,
                message,
                sender,
                [recipient],
                fail_silently=False
            )
            content = {'success', 'Event has been created, email sent'}
            return Response(content, status=status.HTTP_201_CREATED)
        except:
            content = {
                'error', 'Event has been created, but unable to send email'}
            return Response(content, status=status.HTTP_409_CONFLICT)
        content = {'success', 'Event has been created'}
        return Response(content, status=status.HTTP_201_CREATED)


class EventUpdateView(APIView):
    """ This is a view to update the Event instance"""

    def post(self, request):
        data = self.request.data
        user = UserProfile.objects.get(id=data['user'])
        event = Event.objects.get(reference=data['event'])
        # name
        name = user.get_full_name()
        if data['status'] == 'CLOSED':
            Event.objects.filter(reference=data['event']).update(
                closed_on=timezone.now(),
                closed_by=user,
                status='CLOSED',
                close_notes=data['close_notes']
            )
            subject = "Your " + str(event.sub_category.etype) + \
                " has been closed. Ref: " + str(event)
            # our message
            message = "Dear " + name + ",\n " + \
                "\n" + "\n " + "Your " + str(event.sub_category.etype) + \
                " has been closed." + "\n" + "\n" + \
                " Close notes: " + "\n" + \
                data['close_notes'] + \
                "\n" + " Reference number: " + str(event) + "\n" + \
                "\n" + "\n" + " Kind Regards, \n" + " The Easy Ticket Team"

            content = {'success', 'Event has been Closed, email sent'}

        else:
            update = EventUpdate(
                created_by=user,
                event=event,
                update_notes=data['update_notes']
            )
            update.save()
            if data['status'] != "":
                Event.objects.filter(reference=data['event']).update(
                    status=data['status']
                )
            subject = "Your " + str(event.sub_category.etype) + \
                " has been Updated. Ref: " + str(event)
            # our message
            message = "Dear " + name + ",\n " + \
                "\n" + "\n " + "Your " + str(event.sub_category.etype) + \
                " has been Updated." + "\n" + "\n" + \
                " Update notes: " + "\n" + \
                data['update_notes'] + \
                "\n" + " Reference number: " + str(event) + "\n" + \
                "\n" + "\n" + " Kind Regards, \n" + " The Easy Ticket Team"
            content = {'success', 'Event has been Updated, email sent'}
        try:
            # as Django send_mail required fields
            sender = settings.EMAIL_HOST_USER
            recipient = user.email
            send_mail(
                subject,
                message,
                sender,
                [recipient, sender],
                fail_silently=False
            )
            content = {'success', 'Event has been Updated, email sent'}
            return Response(content, status=status.HTTP_200_OK)
        except:
            content = {
                'error', 'Event updated/closed, but unable to send email'}
            return Response(content, status=status.HTTP_409_CONFLICT)


class EventListView(ListAPIView):
    """ This view will list Evants ordered by the most
    recently created ones"""
    permission_classes = (permissions.AllowAny,)
    queryset = Event.objects.order_by('-created_on')
    serializer_class = EventSerializer


class EventDetailView(RetrieveAPIView):
    """This view is to render an event in more details"""
    permission_classes = (permissions.AllowAny,)
    queryset = Event.objects.all()
    lookup_field = 'reference'
    serializer_class = EventSerializer


class EventUpdateListView(ListAPIView):
    """This view is to render all updates related to an event"""
    permission_classes = (permissions.AllowAny,)
    queryset = EventUpdate.objects.all()
    lookup_field = 'event'
    serializer_class = EventUpdateSerializer
