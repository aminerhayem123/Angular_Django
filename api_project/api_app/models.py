from django.db import models

class Document(models.Model):
    text = models.TextField()

class Annotation(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    start = models.IntegerField()
    end = models.IntegerField()
    label = models.CharField(max_length=100)
    annotated_text = models.TextField()

class Labels(models.Model):
    label = models.CharField(max_length=100)
