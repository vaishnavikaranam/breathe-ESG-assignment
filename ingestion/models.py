from django.db import models

# Create your models here.

SOURCE_TYPES = [
    ('SAP', 'SAP'),
    ('UTILITY', 'Utility'),
    ('TRAVEL', 'Travel'),
]

STATUS_CHOICES = [
    ('PENDING', 'Pending'),
    ('APPROVED', 'Approved'),
    ('REJECTED', 'Rejected'),
]


class ESGData(models.Model):

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_TYPES
    )

    scope = models.CharField(max_length=20)

    uploaded_by = models.CharField(max_length=100)

    file_name = models.CharField(max_length=255)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name
