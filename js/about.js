document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for About section
    const aboutText = document.querySelector('.about-text');
    const infoItems = document.querySelectorAll('.info-item');
    const educationItems = document.querySelectorAll('.education-item');

    // Add animation classes
    aboutText.classList.add('fade-in');
    infoItems.forEach((item, index) => {
        item.classList.add('fade-in');
        // Add staggered delay to info items
        item.style.transitionDelay = `${index * 0.15}s`;
    });
    educationItems.forEach(item => item.classList.add('slide-in'));

    // Create intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('education-item')) {
                    // Add staggered animation for education items
                    const index = Array.from(educationItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.2}s`;
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Observe elements
    observer.observe(aboutText);
    infoItems.forEach(item => observer.observe(item));
    educationItems.forEach(item => observer.observe(item));

    // Add hover effect for education icon
    educationItems.forEach(item => {
        const icon = item.querySelector('.education-icon');
        if (icon) {
            item.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            });
            item.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });

    // Add parallax effect to about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            aboutSection.style.backgroundPosition = `center ${rate}px`;
        });
    }

    // Add typing effect for education details
    const educationInfo = document.querySelectorAll('.education-info p');
    educationInfo.forEach(info => {
        const text = info.textContent;
        info.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                info.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect when element is visible
        const infoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    infoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        infoObserver.observe(info);
    });
}); 