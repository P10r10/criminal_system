@echo off
ECHO Setting up the React + Django project...

:: Check for Python and Node.js
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    ECHO Python is not installed. Please install it from https://www.python.org.
    pause
    exit /b 1
)
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    ECHO Node.js is not installed. Please install it from https://nodejs.org.
    pause
    exit /b 1
)

:: Create and activate virtual environment
ECHO Creating Python virtual environment...
python -m venv .venv
if %ERRORLEVEL% NEQ 0 (
    ECHO Failed to create virtual environment.
    pause
    exit /b %ERRORLEVEL%
)

ECHO Activating virtual environment...
call .\.venv\Scripts\activate
if %ERRORLEVEL% NEQ 0 (
    ECHO Failed to activate virtual environment.
    pause
    exit /b %ERRORLEVEL%
)

:: Install Python dependencies
ECHO Installing Django backend dependencies...
pip install django djangorestframework django-cors-headers
if %ERRORLEVEL% NEQ 0 (
    ECHO Failed to install Python dependencies.
    pause
    exit /b %ERRORLEVEL%
)

:: Install React frontend dependencies
ECHO Installing React frontend dependencies...
cd records-frontend
call npm install axios react-router-dom date-fns
if %ERRORLEVEL% NEQ 0 (
    ECHO Failed to install frontend dependencies.
    pause
    exit /b %ERRORLEVEL%
)
cd ..

:: Start Django server in a new window
ECHO Starting Django backend server...
start "Django Server" cmd /k "python manage.py runserver"

:: Start React server in a new window
ECHO Starting React frontend server...
cd records-frontend
start "React Server" cmd /k "npm start"
cd ..

ECHO Setup complete! Django and React servers are running in separate windows.
ECHO To stop the servers, close the respective windows or press Ctrl+C.
pause
