document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form animations
    const contactForm = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    // Add floating label effect
    formInputs.forEach(input => {
        const label = document.createElement('label');
        label.className = 'floating-label';
        label.textContent = input.placeholder;
        input.parentNode.insertBefore(label, input);
        input.placeholder = '';
        
        // Handle focus and blur events
        input.addEventListener('focus', () => {
            label.classList.add('active');
            input.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
                input.parentNode.classList.remove('focused');
            }
        });
        
        // Check initial value
        if (input.value) {
            label.classList.add('active');
        }
    });
    
    // Add form validation
    const validateForm = () => {
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
            
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                }
            }
        });
        return isValid;
    };
    
    // Enhanced form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showFormMessage('Please fill in all fields correctly.', 'error');
            return;
        }
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        showFormMessage('Sending message...', 'info');
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showFormMessage('Message sent successfully!', 'success');
            contactForm.reset();
            formInputs.forEach(input => {
                input.parentNode.classList.remove('focused');
                input.parentNode.querySelector('.floating-label').classList.remove('active');
            });
        }, 1500);
    });
    
    // Show form messages
    function showFormMessage(message, type) {
        const messageDiv = document.querySelector('.form-message') || document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        if (!document.querySelector('.form-message')) {
            contactForm.appendChild(messageDiv);
        }
        
        // Auto-hide success message
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => messageDiv.remove(), 300);
            }, 3000);
        }
    }
    
    // Add social media hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(10px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
}); 