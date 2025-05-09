document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor implementation
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const trails = Array.from({ length: 5 }, () => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        return trail;
    });

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = Array(5).fill(0);
    let trailY = Array(5).fill(0);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Main cursor
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;

        // Cursor trails
        trails.forEach((trail, index) => {
            const trailDx = (index === 0 ? cursorX : trailX[index - 1]) - trailX[index];
            const trailDy = (index === 0 ? cursorY : trailY[index - 1]) - trailY[index];
            trailX[index] += trailDx * 0.3;
            trailY[index] += trailDy * 0.3;
            trail.style.transform = `translate(${trailX[index] - 4}px, ${trailY[index] - 4}px)`;
        });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursor.style.mixBlendMode = 'normal';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursor.style.mixBlendMode = 'difference';
        });
    });

    // Page transitions
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);

    // Handle smooth scrolling with page transition
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                transitionOverlay.classList.add('active');
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    transitionOverlay.classList.remove('active');
                }, 500);
            }
        });
    });

    // Add background pattern
    const bgPattern = document.createElement('div');
    bgPattern.className = 'bg-pattern';
    document.body.appendChild(bgPattern);

    // Add gradient overlays to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-gradient');
    });

    // Lazy loading with skeleton loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const skeleton = img.parentElement.querySelector('.skeleton');
                
                if (skeleton) {
                    skeleton.style.display = 'block';
                }

                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                    if (skeleton) {
                        skeleton.style.display = 'none';
                    }
                };
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    lazyImages.forEach(img => {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton';
        skeleton.style.width = '100%';
        skeleton.style.height = img.offsetHeight + 'px';
        img.parentElement.insertBefore(skeleton, img);
        imageObserver.observe(img);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
}); 