// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5K3QR2V134', {
    'anonymize_ip': true
});

// Security: Input sanitization helper
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Form submission handler
async function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Security: Check honeypot field
    if (formData.get('_gotcha')) {
        console.log('Spam detected');
        return false;
    }
    
    // Security: Basic input validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || name.length < 2) {
        alert('Please enter a valid name.');
        return false;
    }
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!message || message.length < 10) {
        alert('Please enter a message with at least 10 characters.');
        return false;
    }
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Thank you for your inquiry! We will get back to you within 24 hours.');
            form.reset();
        } else {
            alert('Oops! There was a problem submitting your form. Please try again.');
        }
    } catch (error) {
        alert('Oops! There was a problem submitting your form. Please try again.');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Inquiry';
    }
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
