from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import EmissionRecord
from .serializers import EmissionSerializer

import csv
from io import TextIOWrapper


@api_view(['GET'])
def get_records(request):

    records = EmissionRecord.objects.all()

    serializer = EmissionSerializer(records, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def add_record(request):

    serializer = EmissionSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)


@api_view(['PUT'])
def approve_record(request, pk):

    record = EmissionRecord.objects.get(id=pk)

    record.status = "APPROVED"

    record.save()

    return Response({"message": "Record Approved"})


@api_view(['PUT'])
def reject_record(request, pk):

    record = EmissionRecord.objects.get(id=pk)

    record.status = "REJECTED"

    record.save()

    return Response({"message": "Record Rejected"})


@api_view(['POST'])
def upload_csv(request):

    file = request.FILES['file']

    csv_file = TextIOWrapper(file.file, encoding='utf-8')

    reader = csv.DictReader(csv_file)

    for row in reader:

        EmissionRecord.objects.create(

            source_type=row['source_type'],
            company_name=row['company_name'],
            activity_name=row['activity_name'],
            quantity=float(row['quantity']),
            unit=row['unit'],
            normalized_unit=row['normalized_unit'],
            emission_factor=float(row['emission_factor']),
            scope=row['scope'],
            created_by=row['created_by']

        )

    return Response({"message": "CSV Uploaded Successfully"})