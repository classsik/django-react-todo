from rest_framework import viewsets

from .serializers import (
    ColorSerializer,
    TaskSerializer,
    CategorySerializer,
    TaskListRetrieveSerializer,
    CategoryDetailSerializer
)

from ..models import Color, Category, Task


class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    action_to_serializer = {
        "list": TaskListRetrieveSerializer,
        "retrieve": TaskListRetrieveSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(self.action, self.serializer_class)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    action_to_serializer = {
        "list": CategoryDetailSerializer,
        "retrieve": CategoryDetailSerializer
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(self.action, self.serializer_class)

