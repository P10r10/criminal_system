from django.urls import path
from . import views

app_name = 'records'
urlpatterns = [
    path('api/persons/', views.persons),
    path('api/casefiles/', views.casefiles),
    path('api/personcasefiles/', views.personcasefiles),
    path('api/personcasefiles/<int:personcasefile_id>/', views.personcasefile),
    path('api/signup/', views.signup),
    path("api/signup/", views.signup),
    path("api/login/", views.login_view),
    path("api/logout/", views.logout_view),
    path("api/user/", views.user_view),
]
