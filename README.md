# Breathe ESG Tech Intern Assignment

A Django REST + React application for ESG emissions data ingestion, normalization, review, and approval workflow.

---

# Project Overview

This project is built for the Breathe ESG Tech Intern Assignment.

The application allows:

- Ingesting ESG data from multiple sources
- Uploading CSV files
- Viewing emissions records
- Approving and rejecting records
- Tracking Scope 1 / 2 / 3 emissions
- Analyst review workflow

---

# Technologies Used

## Backend
- Python
- Django
- Django REST Framework

## Frontend
- React
- Vite
- Axios

## Database
- SQLite

---

# Features

- Add emission records manually
- Upload CSV files
- View records in table format
- Approve records
- Reject records
- Automatic emission calculation
- ESG dashboard UI

---

# Project Structure

```text
ESG assignment/
│
├── config/
├── emissions/
├── frontend/
├── manage.py
├── README.md
Backend Setup (Django)
Step 1: Create Virtual Environment
python -m venv .venv
Step 2: Activate Virtual Environment
Windows
.venv\Scripts\activate
Step 3: Install Required Packages
python -m pip install django djangorestframework django-cors-headers
Step 4: Run Migrations
python manage.py makemigrations
python manage.py migrate
Step 5: Run Django Server
python manage.py runserver

Backend runs on:

http://127.0.0.1:8000/
Frontend Setup (React)
Step 1: Create React App
npm create vite@latest frontend -- --template react
Step 2: Open Frontend Folder
cd frontend
Step 3: Install Dependencies
npm install
npm install axios react-router-dom
Step 4: Run React Server
npm run dev

Frontend runs on:

http://localhost:5173/
API Endpoints
Get Records
GET /api/records/
Add Record
POST /api/add/
Approve Record
PUT /api/approve/<id>/
Reject Record
PUT /api/reject/<id>/
Upload CSV
POST /api/upload-csv/
CSV Format

Create a CSV file like this:

source_type,company_name,activity_name,quantity,unit,normalized_unit,emission_factor,scope,created_by
SAP,Reliance,Diesel Fuel,500,Liters,Liters,2.68,Scope 1,Admin
UTILITY,Infosys,Electricity Usage,1200,kWh,kWh,0.85,Scope 2,Analyst
TRAVEL,TCS,Flight Travel,1500,km,km,0.12,Scope 3,Manager
Sample Data Sources
SAP
Fuel procurement exports
Flat file CSV structure
Utility Data
Electricity portal CSV export
Travel Data
Corporate travel platform exports
Emission Calculation

The system calculates emissions automatically:

Total Emission = Quantity × Emission Factor

Example:

500 × 2.68 = 1340
Workflow
Add records manually OR upload CSV
Records appear in dashboard
Analyst reviews records
Approve or reject records
Final records stored for audit tracking
Assignment Requirements Covered
Multi-source ingestion
ESG normalization
Analyst dashboard
Review workflow
Scope categorization
Audit tracking
CSV ingestion
Django REST API
React frontend
Future Improvements
Authentication system
PDF utility bill parser
SAP API integration
Advanced analytics dashboard
Charts and reports
Export to Excel/PDF
User roles and permissions
Deployment
Backend

Deploy using:

Render
Railway
Frontend

Deploy using:

Vercel
Netlify
Author

Karnam Vaishnavi K

BTech CSE