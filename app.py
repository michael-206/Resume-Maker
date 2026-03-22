import os
import json
from flask import Flask, render_template, request, jsonify, send_file
from datetime import datetime
from utils.document_generator import PDFGenerator, WordGenerator, HTMLGenerator

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

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

# Store session data
session_data = {}

@app.route('/')
def index():
    return render_template('index.html', templates=TEMPLATES)

@app.route('/form')
def form():
    template_id = request.args.get('template', 'modern')
    if template_id not in TEMPLATES:
        template_id = 'modern'
    return render_template('form.html', template=template_id, template_name=TEMPLATES[template_id]['name'])

@app.route('/preview', methods=['POST'])
def preview():
    data = request.get_json()
    session_id = data.get('session_id', 'default')
    session_data[session_id] = data
    
    template_id = data.get('template', 'modern')
    if template_id not in TEMPLATES:
        template_id = 'modern'
    
    return render_template('preview.html', 
                         resume_data=data, 
                         template=template_id,
                         template_name=TEMPLATES[template_id]['name'])

@app.route('/download/<format_type>', methods=['POST'])
def download(format_type):
    data = request.get_json()
    session_id = data.get('session_id', 'default')
    
    if session_id in session_data:
        data = session_data[session_id]
    
    format_type = format_type.lower()
    
    if format_type == 'pdf':
        file_path = PDFGenerator.generate(data)
    elif format_type == 'docx':
        file_path = WordGenerator.generate(data)
    elif format_type == 'html':
        file_path = HTMLGenerator.generate(data)
    else:
        return jsonify({'error': 'Invalid format'}), 400
    
    if not os.path.exists(file_path):
        return jsonify({'error': 'Failed to generate file'}), 500
    
    # Return only the filename for security and simplicity
    return jsonify({
        'success': True,
        'file_name': os.path.basename(file_path)
    })

@app.route('/send-download/<file_name>')
def send_download(file_name):
    # Ensure file_name doesn't contain path traversal sequences
    if '..' in file_name or '/' in file_name:
        return jsonify({'error': 'Invalid file name'}), 400
    
    full_path = os.path.join('/tmp', file_name)
    
    if not os.path.exists(full_path):
        return jsonify({'error': 'File not found'}), 404
    
    return send_file(full_path, as_attachment=True)

@app.route('/donate', methods=['POST'])
def donate():
    """Process donation - this is a placeholder"""
    data = request.get_json()
    amount = data.get('amount', 0)
    email = data.get('email', '')
    message = data.get('message', '')
    
    # Here you would integrate with a payment processor like Stripe
    # For now, we just log it
    print(f"Donation received: ${amount} from {email}")
    print(f"Message: {message}")
    
    return jsonify({
        'success': True,
        'message': f'Thank you for your donation of ${amount}!'
    })

@app.route('/health')
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
