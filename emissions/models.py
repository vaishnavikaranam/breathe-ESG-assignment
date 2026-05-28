from django.db import models

# Create your models here.


class EmissionRecord(models.Model):

    SOURCE_TYPES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'Utility'),
        ('TRAVEL', 'Travel'),
    ]

    STATUS_TYPES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES)

    company_name = models.CharField(max_length=100)

    activity_name = models.CharField(max_length=200)

    quantity = models.FloatField()

    unit = models.CharField(max_length=50)

    normalized_unit = models.CharField(max_length=50)

    emission_factor = models.FloatField(default=0)

    total_emission = models.FloatField(default=0)

    scope = models.CharField(max_length=20)

    status = models.CharField(
        max_length=20,
        choices=STATUS_TYPES,
        default='PENDING'
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    created_by = models.CharField(max_length=100)

    def save(self, *args, **kwargs):

        self.total_emission = self.quantity * self.emission_factor

        super().save(*args, **kwargs)

    def __str__(self):
        return self.activity_name