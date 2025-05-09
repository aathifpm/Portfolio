document.addEventListener('DOMContentLoaded', function() {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    // Add animation classes
    certificationCards.forEach(card => {
        card.classList.add('fade-in');
        
        // Add hover effect for icon
        const icon = card.querySelector('.certification-icon');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            });
            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        }

        // Add shimmer effect
        card.addEventListener('mouseenter', () => {
            card.classList.add('shimmer');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('shimmer');
        });
    });

    // Create intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation
                const index = Array.from(certificationCards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Observe certification cards
    certificationCards.forEach(card => observer.observe(card));

    // Add click effect for verify links
    const verifyLinks = document.querySelectorAll('.verify-link');
    verifyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            
            // Add click animation
            link.classList.add('clicked');
            setTimeout(() => {
                link.classList.remove('clicked');
                window.open(url, '_blank');
            }, 300);
        });
    });
}); 