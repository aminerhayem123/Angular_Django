from django.urls import path
from .views import DocumentListCreateView, AnnotationListCreateView, LabelsListCreateView

urlpatterns = [
    path('documents/', DocumentListCreateView.as_view(), name='document-list-create'),
    path('annotations/', AnnotationListCreateView.as_view(), name='annotation-list-create'),
    path('labels/', LabelsListCreateView.as_view(), name='labels-list-create'),
]

