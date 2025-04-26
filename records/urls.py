from django.urls import path
from . import views

app_name = 'records'
urlpatterns = [
    path('api/persons/', views.persons),
    path('api/casefiles/', views.casefiles),
    path('api/personcasefiles/', views.personcasefiles),
    path('api/personcasefiles/<int:personcasefile_id>/', views.personcasefile),
]
