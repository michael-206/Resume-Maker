let selectedAmount = 5;
let currentThemeColor = '#2c3e50';

function changeThemeColor(color) {
    currentThemeColor = color;
    window.resumeData.resumeColor = color;
    
    // Update CSS variables for resume styling
    document.documentElement.style.setProperty('--resume-color', color);
    
    // Apply color to resume name and section titles
    document.querySelectorAll('.resume-name, .resume-section-title').forEach(element => {
        element.style.color = color;
    });
    
    // Apply color to borders in resume header
    const resumeHeader = document.querySelector('.resume-header');
    if (resumeHeader) {
        resumeHeader.style.borderBottomColor = color;
    }
    
    // Apply color to skill tags
    document.querySelectorAll('.skill-tag').forEach(element => {
        element.style.backgroundColor = color;
    });
}

// Initialize resume color on page load
function initializeThemeColor() {
    const resumeColor = window.resumeData.resumeColor || '#2c3e50';
    currentThemeColor = resumeColor;
    document.documentElement.style.setProperty('--resume-color', resumeColor);
}

function goBack() {
    window.history.back();
}

function downloadResume(format) {
    // Show donation modal
    showDonationModal();

    // Store format for later use
    window.downloadFormat = format;
}

function showDonationModal() {
    const modal = document.getElementById('donationModal');
    modal.classList.add('show');

    // Set default amount
    setAmount(5);
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    modal.classList.remove('show');
    window.downloadFormat = null;
}

function setAmount(amount) {
    selectedAmount = amount;
    
    // Update button styles
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes('$' + amount)) {
            btn.classList.add('active');
        }
    });

    // Clear custom amount
    document.getElementById('customAmount').value = '';

    // Update display
    updateAmountDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
    // Listen for custom amount input
    const customAmountInput = document.getElementById('customAmount');
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            if (this.value) {
                selectedAmount = parseFloat(this.value);
                document.querySelectorAll('.amount-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                updateAmountDisplay();
            }
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('donationModal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeDonationModal();
            }
        });
    }
});

function updateAmountDisplay() {
    const display = document.getElementById('amountDisplay');
    if (display) {
        display.textContent = `Amount: $${selectedAmount.toFixed(2)}`;
    }
}

function processDonation() {
    if (selectedAmount < 0.50) {
        alert('Please enter a valid donation amount (minimum $0.50)');
        return;
    }

    const email = document.getElementById('donorEmail').value;
    const message = document.getElementById('donorMessage').value;

    // In a real app, you would process this with Stripe or another payment processor
    recordDonation(email, message);
}

function recordDonation(email, message) {
    // Show loading state
    const donateBtn = document.querySelector('.btn-donate');
    const originalText = donateBtn.textContent;
    donateBtn.textContent = 'Processing...';
    donateBtn.disabled = true;

    // Send donation info
    fetch('/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: selectedAmount,
            email: email,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show thank you message
            showThankYouMessage();
            
            // Start download after delay
            setTimeout(() => {
                proceedWithDownload();
            }, 2000);
        } else {
            throw new Error('Donation processing failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        donateBtn.textContent = originalText;
        donateBtn.disabled = false;
        alert('Error processing donation. Please try again.');
    });
}

function showThankYouMessage() {
    const modal = document.getElementById('donationModal');
    const content = modal.querySelector('.modal-content');

    // Save original content
    const originalContent = content.innerHTML;

    // Show thank you message
    content.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
            <h2 style="color: #27ae60; margin-bottom: 15px;">Thank You!</h2>
            <p style="color: #34495e; margin-bottom: 10px;">
                Your donation of <strong>$${selectedAmount.toFixed(2)}</strong> has been received.
            </p>
            <p style="color: #7f8c8d; font-size: 0.95rem;">
                We truly appreciate your support. Your contribution helps us continue improving Resume Maker!
            </p>
            <p style="color: #7f8c8d; font-size: 0.85rem; margin-top: 20px;">
                Your download will start shortly...
            </p>
        </div>
    `;

    // Restore original content after delay
    setTimeout(() => {
        content.innerHTML = originalContent;
    }, 3000);
}

function proceedWithDownload() {
    const format = window.downloadFormat;

    if (!format) {
        return;
    }

    // Close modal
    closeDonationModal();

    // Trigger download
    triggerDownload(format);
}

function skipDonation() {
    // Close modal and proceed with download
    closeDonationModal();
    
    const format = window.downloadFormat;
    if (!format) {
        return;
    }

    triggerDownload(format);
}

function triggerDownload(format) {
    // Show loading
    showLoading('Generating ' + format.toUpperCase() + ' file...');

    // Prepare download request
    fetch(`/download/${format}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(window.resumeData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Download failed');
        }
        return response.json();
    })
    .then(data => {
        if (data.success && data.file_name) {
            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = `/send-download/${encodeURIComponent(data.file_name)}`;
            link.download = data.file_name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            hideLoading();

            // Show success message
            showSuccessMessage(format);
        } else {
            throw new Error('Invalid response');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        hideLoading();
        alert('Error downloading file. Please try again.');
    });
}

function showLoading(message = 'Processing...') {
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
            <p style="color: #2c3e50; font-weight: 600; margin: 0;">${message}</p>
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

function showSuccessMessage(format) {
    const message = document.createElement('div');
    message.id = 'successMessage';
    message.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    message.textContent = `✓ Your ${format.toUpperCase()} resume is ready!`;
    document.body.appendChild(message);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 5000);
}

// Add slide animations to style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
