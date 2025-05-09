// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to get current theme
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
    
    // Function to set particles configuration based on theme
    function initParticles() {
        const currentTheme = getCurrentTheme();
        const particleColor = currentTheme === 'light' ? '#000000' : '#ffffff';
        // Adjusting line color for stronger contrast
        const lineColor = currentTheme === 'light' ? '#000000' : '#ffffff'; // Darker line for light theme, white for dark theme
        
        // Particles.js configuration
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 200,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: particleColor
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: lineColor, // Using the adjusted line color for stronger contrast
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Initialize particles based on current theme
    initParticles();
    
    // Listen for theme changes
    document.getElementById('themeToggle')?.addEventListener('click', function() {
        // Give a small delay to allow theme to update
        setTimeout(initParticles, 100);
    });

    // Initialize vanilla-tilt
    VanillaTilt.init(document.querySelector('.hero-image img'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });

    // Initialize Typed.js
    new Typed('#typed-text', {
        strings: [
            'Building innovative solutions with AI',
            'Creating modern web applications',
            'Developing mobile solutions',
            'Implementing machine learning models'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
}); 