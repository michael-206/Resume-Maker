#!/bin/bash

# Resume Maker - Quick Start Script

echo "=================================================="
echo "Resume Maker - Quick Start Setup"
echo "=================================================="
echo ""

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.7 or higher."
    exit 1
fi

echo "✓ Python 3 found"
python3 --version
echo ""

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv
echo "✓ Virtual environment created"
echo ""

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate || . venv/Scripts/activate
echo "✓ Virtual environment activated"
echo ""

# Install dependencies
echo "Installing dependencies from requirements.txt..."
pip install -r requirements.txt
echo "✓ Dependencies installed"
echo ""

# Summary
echo "=================================================="
echo "✅ Setup Complete!"
echo "=================================================="
echo ""
echo "To start the Flask app, run:"
echo "  python app.py"
echo ""
echo "Then open your browser and go to:"
echo "  http://localhost:5000"
echo ""
echo "If you want to deactivate the virtual environment later, run:"
echo "  deactivate"
echo ""
