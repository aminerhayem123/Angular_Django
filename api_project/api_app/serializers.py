from rest_framework import serializers
from .models import Document, Annotation, Labels

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = '__all__'

class LabelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labels
        fields = '__all__'

