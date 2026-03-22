@echo off
REM Resume Maker - Quick Start Script for Windows

echo ==================================================
echo Resume Maker - Quick Start Setup
echo ==================================================
echo.

REM Check if Python is installed
python --version > nul 2>&1
if errorlevel 1 (
    echo X Python is not installed. Please install Python 3.7 or higher.
    pause
    exit /b 1
)

echo / Python found
python --version
echo.

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo X Failed to create virtual environment
    pause
    exit /b 1
)
echo / Virtual environment created
echo.

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo / Virtual environment activated
echo.

REM Install dependencies
echo Installing dependencies from requirements.txt...
pip install -r requirements.txt
if errorlevel 1 (
    echo X Failed to install dependencies
    pause
    exit /b 1
)
echo / Dependencies installed
echo.

REM Summary
echo ==================================================
echo / Setup Complete!
echo ==================================================
echo.
echo To start the Flask app, run:
echo   python app.py
echo.
echo Then open your browser and go to:
echo   http://localhost:5000
echo.
echo If you want to deactivate the virtual environment later, run:
echo   deactivate
echo.
pause
