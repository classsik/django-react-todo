from rest_framework import serializers

from ..models import Color, Task, Category


class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class CategoryDetailSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()
    color = ColorSerializer()

    class Meta:
        model = Category
        fields = '__all__'

    @staticmethod
    def get_tasks(obj):
        return TaskSerializer(Task.objects.filter(category=obj), many=True).data


class TaskListRetrieveSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Task
        fields = '__all__'
