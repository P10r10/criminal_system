from django.urls import path
from . import views

app_name = 'records'
urlpatterns = [
    path('api/persons/', views.persons),
    path('api/casefiles/', views.casefiles),
]