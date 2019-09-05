from rest_framework import filters, viewsets

from users.permissions import IsLoggedInUserOrStaff

from .models import Job
from .serializers import JobSerializer


class JobView(viewsets.ModelViewSet):
    permission_classes = [IsLoggedInUserOrStaff]
    serializer_class = JobSerializer
    # https://docs.djangoproject.com/en/2.2/ref/models/querysets/#order-by
    queryset = Job.objects.all()

    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["name", "created"]
    ordering = ["created"]

    def get_queryset(self):
        """
        This view should return a list of all the todos
        for the currently authenticated user or staff,
        only if their account is active
        """
        user = self.request.user

        if user.is_authenticated and user.is_active:
            if user.is_staff:
                return Job.objects.all()
            else:
                return Job.objects.filter(owner=user)

    def perform_create(self, serializer):
        """
        On creation of a job, attach it to the user who created it
        Only allow if the user is authenticated and is active
        """
        user = self.request.user

        if user.is_authenticated and user.is_active:
            serializer.save(owner=self.request.user)
