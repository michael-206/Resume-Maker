"""
Configuration file for Resume Maker
Customize the app settings here without modifying app.py
"""

# Flask Configuration
FLASK_DEBUG = True
FLASK_HOST = '0.0.0.0'
FLASK_PORT = 5000
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB

# Resume Templates
TEMPLATES = {
    'modern': {
        'name': 'Modern',
        'description': 'Clean, contemporary design with bold typography',
        'color': '#2c3e50'
    },
    'classic': {
        'name': 'Classic',
        'description': 'Professional and timeless layout',
        'color': '#34495e'
    },
    'minimal': {
        'name': 'Minimal',
        'description': 'Simple and elegant design',
        'color': '#7f8c8d'
    },
    'creative': {
        'name': 'Creative',
        'description': 'Colorful and modern design',
        'color': '#e74c3c'
    }
}

# Donation Settings
DONATIONS = {
    'enabled': True,  # Enable/disable donation modal
    'default_amounts': [5, 10, 25, 50],  # Default donation amounts
    'currency': 'USD',
    'message': 'We work hard to keep Resume Maker free and accessible to everyone. If you found this tool helpful, please consider making a voluntary donation to support ongoing development and improvements.'
}

# Download Formats
DOWNLOAD_FORMATS = {
    'pdf': {
        'name': 'PDF',
        'extension': '.pdf',
        'icon': '📄'
    },
    'docx': {
        'name': 'Word Document',
        'extension': '.docx',
        'icon': '📝'
    },
    'html': {
        'name': 'HTML',
        'extension': '.html',
        'icon': '🌐'
    }
}

# Color Scheme
COLORS = {
    'primary': '#2c3e50',
    'secondary': '#34495e',
    'accent': '#e74c3c',
    'success': '#27ae60',
    'light_bg': '#ecf0f1',
    'text_dark': '#2c3e50',
    'text_light': '#7f8c8d',
    'border': '#bdc3c7',
    'white': '#ffffff'
}

# Application Settings
APP_NAME = 'Resume Maker'
APP_VERSION = '1.0.0'
APP_DESCRIPTION = 'Create a professional resume in minutes'
