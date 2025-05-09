document.addEventListener('DOMContentLoaded', function() {
    // Initialize vanilla-tilt for skill categories
    VanillaTilt.init(document.querySelectorAll('.skill-category'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
        scale: 1.05
    });

    // Animate skill progress bars when they come into view
    const skillProgress = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillProgress.forEach(progress => {
        observer.observe(progress);
    });

    // Add hover effect for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
}); 