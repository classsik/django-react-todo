from django.urls import path
from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register('colors', views.ColorViewSet, basename='colors')
router.register('tasks', views.TaskViewSet, basename='tasks')
router.register('category', views.CategoryViewSet, basename='category')


urlpatterns = []

urlpatterns += router.urls