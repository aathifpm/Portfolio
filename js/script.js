document.addEventListener('DOMContentLoaded', () => {
    // Debug theme state
    
    
    // Preloader
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
    
    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    
    // Theme toggle function
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Toggling theme from', currentTheme, 'to', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };
    
    // Add event listener to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    } 

    // Navigation Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Navigation
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);

            // Animate Links
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                
                navLinksItems.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    // Active Navigation Item on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Form Submission with Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Create message elements
        const formMessage = document.createElement('div');
        formMessage.className = 'form-message';
        contactForm.appendChild(formMessage);
        
        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous messages
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Form validation
            let hasError = false;
            
            if (!name) {
                showError('name', 'Please enter your name');
                hasError = true;
            }
            
            if (!email) {
                showError('email', 'Please enter your email');
                hasError = true;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                hasError = true;
            }
            
            if (!subject) {
                showError('subject', 'Please enter a subject');
                hasError = true;
            }
            
            if (!message) {
                showError('message', 'Please enter your message');
                hasError = true;
            }
            
            if (hasError) {
                return;
            }
            
            // Form data object
            const formData = {
                name,
                email,
                subject,
                message
            };
            
            // Show sending message
            formMessage.textContent = 'Sending message...';
            formMessage.className = 'form-message info';
            
            // Simulate sending (in a real app, you would make an API call here)
            setTimeout(() => {
                // Show success message
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 5000);
            }, 1500);
        });
        
        // Function to show field errors
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            field.classList.add('error');
            
            // Create error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            
            // Insert error message after the field
            field.parentNode.appendChild(errorDiv);
            
            // Remove error on field focus
            field.addEventListener('focus', function() {
                field.classList.remove('error');
                if (field.parentNode.querySelector('.error-message')) {
                    field.parentNode.querySelector('.error-message').remove();
                }
            }, { once: true });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .skill-category, .education-item, .certification-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Apply initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .education-item, .certification-card, .timeline-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate skill progress bars
    const animateProgressBars = () => {
        const skillItems = document.querySelectorAll('.skill-progress-item');
        
        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            const width = progress.style.width;
            
            // Reset width first for animation
            progress.style.width = '0%';
            
            // Set timeout to start animation
            setTimeout(() => {
                progress.style.width = width;
            }, 300);
        });
    };
    
    // Run progress bar animation on load
    window.addEventListener('load', animateProgressBars);
    
    // Testimonials Slider
    const testimonialSlider = () => {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        
        if (!cards.length || !dots.length) return;
        
        let currentIndex = 0;
        
        const updateSlider = (index) => {
            // Remove all classes from cards
            cards.forEach(card => {
                card.classList.remove('active', 'prev', 'next');
            });
            
            // Remove active class from dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Calculate previous and next indices
            const prevIndex = (index - 1 + cards.length) % cards.length;
            const nextIndex = (index + 1) % cards.length;
            
            // Add classes to cards
            cards[index].classList.add('active');
            cards[prevIndex].classList.add('prev');
            cards[nextIndex].classList.add('next');
            
            // Add active class to current dot
            dots[index].classList.add('active');
            
            // Update currentIndex
            currentIndex = index;
        };
        
        // Initialize slider
        updateSlider(currentIndex);
        
        // Handle dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlider(index);
            });
        });
        
        // Handle prev button click
        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider(newIndex);
        });
        
        // Handle next button click
        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % cards.length;
            updateSlider(newIndex);
        });
        
        // Auto slide every 5 seconds
        let autoSlideInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % cards.length;
            updateSlider(newIndex);
        }, 5000);
        
        // Pause auto slide on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            testimonialSlider.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    const newIndex = (currentIndex + 1) % cards.length;
                    updateSlider(newIndex);
                }, 5000);
            });
        }
    };
    
    // Initialize testimonial slider
    testimonialSlider();
}); 