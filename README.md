# Resume Maker

A modern, user-friendly Flask application for generating professional resumes with multiple template options and export formats.

## Features

✨ **Key Features:**
- **Template Selection**: Choose from 4 professionally designed resume templates
- **Multi-Section Form**: Easy-to-navigate form with multiple steps
  - Personal Information
  - Work Experience
  - Education
  - Skills
  - Certifications & Additional Information
- **Skip Sections**: Option to skip any section you don't need
- **Live Preview**: See your resume before downloading
- **Multiple Export Formats**:
  - PDF (professional document format)
  - Word (.docx) - editable format
  - HTML (web format)
- **Voluntary Donation**: Optional donation modal to support the app (fully customizable amounts)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Project Structure

```
Resume-Maker/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── utils/
│   ├── __init__.py
│   └── document_generator.py  # PDF, Word, and HTML generation
├── templates/
│   ├── index.html         # Template selection page
│   ├── form.html          # Multi-step form
│   └── preview.html       # Resume preview and download
└── static/
    ├── css/
    │   ├── style.css      # Main styles
    │   ├── form.css       # Form page styles
    │   └── preview.css    # Preview page styles
    └── js/
        ├── form.js        # Form logic and validation
        └── preview.js     # Download and donation logic
```

## Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Setup Steps

1. **Clone or navigate to the project directory:**
   ```bash
   cd Resume-Maker
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - **On Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **On macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask development server:**
   ```bash
   python app.py
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:5000
   ```

3. **Start creating resumes!**

## Usage Guide

### Step 1: Select a Template
Choose from 4 professionally designed templates:
- **Modern**: Clean, contemporary design with bold typography
- **Classic**: Professional and timeless layout
- **Minimal**: Simple and elegant design
- **Creative**: Colorful and modern design

### Step 2: Fill Out Your Information
Navigate through the multi-step form:
1. **Personal Information**: Enter your name, email, phone, and location
2. **Experience**: Add your work experience (job titles, companies, dates, descriptions)
3. **Education**: List your educational background
4. **Skills**: Add your professional skills
5. **Certifications**: Include any certifications or additional information

**Tip**: All sections except Personal Information can be skipped if not needed!

### Step 3: Preview Your Resume
- View how your resume looks before downloading
- Go back to edit if needed
- Choose from 3 download formats

### Step 4: Download & Support
When downloading:
- A donation modal appears (completely optional)
- Users can donate any amount they wish
- Users can skip donation and download immediately
- Choose to download as PDF, Word, or HTML

## Customization

### Adding More Templates
Edit `app.py` and add to the `TEMPLATES` dictionary:
```python
TEMPLATES = {
    'your_template': {
        'name': 'Your Template Name',
        'description': 'Description of your template',
        'color': '#yourcolor'
    },
    ...
}
```

### Modifying the Donation Modal
Edit the donation form in `templates/preview.html` to:
- Change default donation amounts
- Modify donation messages
- Integrate with payment processors (Stripe, PayPal, etc.)

### Styling
All styles are in the `static/css/` directory:
- `style.css` - Global styles and color scheme
- `form.css` - Form page styles
- `preview.css` - Preview and donation modal styles

Edit CSS variables in `style.css` to change colors:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #34495e;
    --accent-color: #e74c3c;
    /* ... */
}
```

## Dependencies

- **Flask** (3.0.0): Web framework
- **python-docx** (0.8.11): Word document generation
- **reportlab** (4.0.9): PDF generation
- **Pillow** (10.1.0): Image processing
- **Werkzeug** (3.0.1): Utility library for Flask

## Generated Files

- Resumes are generated as temporary files in the `/tmp` directory
- Files are cleaned up automatically
- Downloaded files include timestamp in filename for uniqueness

## Future Enhancements

Possible improvements:
- [ ] Database integration to save resumes
- [ ] User authentication and profile management
- [ ] More resume templates
- [ ] Resume templates with colors and styling
- [ ] Real payment integration (Stripe/PayPal)
- [ ] Email download links
- [ ] Analytics and usage tracking
- [ ] Additional languages support
- [ ] Resume quality tips and suggestions

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available under the MIT License.

## Support

For issues, feature requests, or questions, please create an issue in the repository.

---

**Made with ❤️ to help you create amazing resumes!**