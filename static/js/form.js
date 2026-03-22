let currentStep = 1;
const totalSteps = 5;

function showStep(step) {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show current section
    document.querySelector(`.form-section[data-step="${step}"]`).classList.add('active');

    // Update progress
    document.querySelectorAll('.progress-step').forEach((progressStep, index) => {
        if (index + 1 <= step) {
            progressStep.classList.add('active');
        } else {
            progressStep.classList.remove('active');
        }
    });

    // Update buttons
    document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = step === totalSteps ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'block' : 'none';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
    if (currentStep < totalSteps) {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function validateStep(step) {
    let isValid = true;

    if (step === 1) {
        // Personal information
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!fullName) {
            showError('Please enter your full name');
            isValid = false;
        } else if (!email) {
            showError('Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            isValid = false;
        }
    }

    return isValid;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message) {
    alert(message); // Simple error display - can be enhanced with toast notifications
}

function addExperience() {
    const list = document.getElementById('experienceList');
    const template = list.querySelector('.experience-item').cloneNode(true);

    // Clear values
    template.querySelectorAll('input, textarea').forEach(input => {
        input.value = '';
    });
    
    // Clear select values
    template.querySelectorAll('select').forEach(select => {
        select.value = '';
    });

    list.appendChild(template);
}

function removeExperience(button) {
    const list = document.getElementById('experienceList');
    if (list.children.length > 1) {
        button.closest('.experience-item').remove();
    } else {
        showError('You must have at least one experience entry to add this section');
    }
}

function addEducation() {
    const list = document.getElementById('educationList');
    const template = list.querySelector('.education-item').cloneNode(true);

    // Clear values
    template.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    
    // Clear select values
    template.querySelectorAll('select').forEach(select => {
        select.value = '';
    });

    list.appendChild(template);
}

function removeEducation(button) {
    const list = document.getElementById('educationList');
    if (list.children.length > 1) {
        button.closest('.education-item').remove();
    } else {
        showError('You must have at least one education entry to add this section');
    }
}

function addSkill() {
    const list = document.getElementById('skillsList');
    const template = list.querySelector('.skill-item').cloneNode(true);
    template.querySelector('input').value = '';
    list.appendChild(template);
}

function removeSkill(button) {
    button.closest('.skill-item').remove();
}

function addCertification() {
    const list = document.getElementById('certificationsList');
    const template = list.querySelector('.certification-item').cloneNode(true);

    // Clear values
    template.querySelectorAll('input').forEach(input => {
        input.value = '';
    });

    list.appendChild(template);
}

function removeCertification(button) {
    const list = document.getElementById('certificationsList');
    if (list.children.length > 1) {
        button.closest('.certification-item').remove();
    } else {
        showError('You must have at least one certification entry to add this section');
    }
}

function gatherFormData() {
    const form = document.getElementById('resumeForm');
    const template = form.dataset.template;

    // Personal Information
    const personal = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value
    };

    const summary = document.getElementById('summary').value;
    const resumeColor = document.querySelector('input[name="resumeColor"]:checked').value;

    // Experience
    const experienceSkip = document.querySelector('[data-section="experience"]').checked;
    const experience = [];
    if (!experienceSkip) {
        document.querySelectorAll('.experience-item').forEach(item => {
            const jobTitle = item.querySelector('.jobTitle').value;
            if (jobTitle) {
                const startMonth = item.querySelector('.startMonth').value;
                const startYear = item.querySelector('.startYear').value;
                const endMonth = item.querySelector('.endMonth').value;
                const endYear = item.querySelector('.endYear').value;
                
                let startDate = '';
                if (startMonth && startYear) {
                    startDate = `${startYear}-${startMonth}`;
                }
                
                let endDate = 'Current';
                if (endMonth && endYear) {
                    if (endYear && isNaN(endYear)) {
                        endDate = endYear;
                    } else if (endYear) {
                        endDate = `${endYear}-${endMonth}`;
                    }
                }
                
                experience.push({
                    jobTitle: jobTitle,
                    company: item.querySelector('.company').value,
                    startDate: startDate,
                    endDate: endDate,
                    description: item.querySelector('.description').value
                });
            }
        });
    }

    // Education
    const educationSkip = document.querySelector('[data-section="education"]').checked;
    const education = [];
    if (!educationSkip) {
        document.querySelectorAll('.education-item').forEach(item => {
            const school = item.querySelector('.school').value;
            if (school) {
                const gradMonth = item.querySelector('.graduationMonth').value;
                const gradYear = item.querySelector('.graduationYear').value;
                
                let graduationDate = '';
                if (gradMonth && gradYear) {
                    graduationDate = `${gradYear}-${gradMonth}`;
                }
                
                education.push({
                    school: school,
                    degree: item.querySelector('.degree').value,
                    field: item.querySelector('.field').value,
                    graduationDate: graduationDate
                });
            }
        });
    }

    // Skills
    const skillsSkip = document.querySelector('[data-section="skills"]').checked;
    const skills = [];
    if (!skillsSkip) {
        document.querySelectorAll('.skill-item input').forEach(input => {
            const skill = input.value.trim();
            if (skill) {
                skills.push({ skill: skill });
            }
        });
    }

    // Certifications
    const certificationsSkip = document.querySelector('[data-section="certifications"]').checked;
    const certifications = [];
    if (!certificationsSkip) {
        document.querySelectorAll('.certification-item').forEach(item => {
            const name = item.querySelector('.certName').value;
            if (name) {
                certifications.push({
                    name: name,
                    issuer: item.querySelector('.certIssuer').value
                });
            }
        });
    }

    return {
        template: template,
        session_id: generateSessionId(),
        personal: personal,
        summary: summary,
        resumeColor: resumeColor,
        experience: experience,
        education: education,
        skills: skills,
        certifications: certifications
    };
}

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function submitForm(event) {
    event.preventDefault();

    const resumeData = gatherFormData();

    // Show loading
    showLoading();

    // Send to preview
    fetch('/preview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resumeData)
    })
    .then(response => response.text())
    .then(html => {
        // Redirect to preview page
        document.open();
        document.write(html);
        document.close();
    })
    .catch(error => {
        console.error('Error:', error);
        hideLoading();
        showError('Failed to generate preview. Please try again.');
    });
}

function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loadingOverlay';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    loading.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
        ">
            <div style="
                width: 40px;
                height: 40px;
                border: 4px solid #f0f0f0;
                border-top: 4px solid #e74c3c;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 15px;
            "></div>
            <p style="color: #2c3e50; font-weight: 600; margin: 0;">Generating your resume...</p>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.remove();
    }
}

function initializeDateSelectors() {
    // Year inputs are now number fields, no initialization needed
}

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    showStep(1);

    // Handle form submission
    document.getElementById('resumeForm').addEventListener('submit', submitForm);

    // Request focus to first input
    document.getElementById('fullName').focus();
});
