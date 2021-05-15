from django.db import models


class Color(models.Model):
    hex = models.CharField(max_length=10)
    name = models.CharField(max_length=50)


class Category(models.Model):
    title = models.CharField(max_length=200)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)


class Task(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    text = models.TextField()
    completed = models.BooleanField(default=False)
