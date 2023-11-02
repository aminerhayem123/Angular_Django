from rest_framework import generics
from .models import Document, Annotation, Labels
from .serializers import DocumentSerializer, AnnotationSerializer, LabelsSerializer

class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class AnnotationListCreateView(generics.ListCreateAPIView):
    queryset = Annotation.objects.all()
    serializer_class = AnnotationSerializer

class LabelsListCreateView(generics.ListCreateAPIView):
    queryset = Labels.objects.all()
    serializer_class = LabelsSerializer
