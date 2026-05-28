from django.urls import path
from .views import *

urlpatterns = [

    path('records/', get_records),

    path('add/', add_record),

    path('approve/<int:pk>/', approve_record),

    path('reject/<int:pk>/', reject_record),

    path('upload-csv/', upload_csv),
]