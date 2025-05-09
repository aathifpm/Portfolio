document.addEventListener('DOMContentLoaded', function() {
    // Initialize vanilla-tilt for project cards with improved settings
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
        gyroscope: true,
        gyroscopeMinAngleX: -15,
        gyroscopeMaxAngleX: 15,
        gyroscopeMinAngleY: -15,
        gyroscopeMaxAngleY: 15
    });

    // Initialize project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add animation class when card comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    projectCards.forEach(card => {
        observer.observe(card);
        
        // Add 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Lazy load project images
    const projectImages = document.querySelectorAll('.project-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.add('loaded');
                };
                imageObserver.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    projectImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Add click handlers for project tags
    const projectTags = document.querySelectorAll('.project-tags span');
    projectTags.forEach(tag => {
        tag.addEventListener('click', (event) => {
            // Remove any existing ripple elements first
            const existingRipples = tag.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            tag.appendChild(ripple);
            
            const rect = tag.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            ripple.style.left = `${event.clientX - rect.left - size/2}px`;
            ripple.style.top = `${event.clientY - rect.top - size/2}px`;
            
            // Ensure ripple is removed after animation
            setTimeout(() => {
                ripple.remove();
            }, 600); // Animation duration plus a little buffer
            
            // Prevent event from creating new elements on parent elements
            event.stopPropagation();
        });
    });
    
    // Add hover effect for project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });

    // Enhanced GitHub statistics fetching with caching
    const githubLinks = document.querySelectorAll('.project-link[data-github]');
    const githubCache = new Map();
    
    githubLinks.forEach(link => {
        const repoUrl = link.getAttribute('data-github');
        const repoName = repoUrl.split('/').slice(-2).join('/');
        
        // Check cache first
        if (githubCache.has(repoName)) {
            updateProjectStats(link, githubCache.get(repoName));
            return;
        }
        
        fetch(`https://api.github.com/repos/${repoName}`)
            .then(response => response.json())
            .then(data => {
                // Cache the data
                githubCache.set(repoName, data);
                
                if (data.stargazers_count || data.forks_count) {
                    updateProjectStats(link, data);
                }
            })
            .catch(error => console.error('Error fetching GitHub stats:', error));
    });

    function updateProjectStats(link, data) {
        // Check if stats already exist to prevent duplicates
        if (link.parentElement.querySelector('.project-stats')) {
            return;
        }
        
        const statsDiv = document.createElement('div');
        statsDiv.className = 'project-stats';
        
        if (data.stargazers_count) {
            statsDiv.innerHTML += `
                <div class="project-stat">
                    <i class="fas fa-star"></i>
                    <span>${data.stargazers_count}</span>
                </div>
            `;
        }
        
        if (data.forks_count) {
            statsDiv.innerHTML += `
                <div class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${data.forks_count}</span>
                </div>
            `;
        }

        // Add last updated info
        if (data.updated_at) {
            const lastUpdated = new Date(data.updated_at);
            const timeAgo = getTimeAgo(lastUpdated);
            statsDiv.innerHTML += `
                <div class="project-stat">
                    <i class="fas fa-clock"></i>
                    <span>${timeAgo}</span>
                </div>
            `;
        }
        
        link.parentElement.appendChild(statsDiv);
    }

    // Helper function to format time ago
    function getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + 'y ago';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + 'mo ago';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + 'd ago';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + 'h ago';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + 'm ago';
        
        return Math.floor(seconds) + 's ago';
    }

    // Enhanced hover effects for project tags
    projectTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
            tag.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = 'none';
        });
    });

    // Enhanced click events for project cards
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links or tags
            if (e.target.closest('.project-link') || e.target.closest('.project-tags span')) return;
            
            const demoLink = card.querySelector('.project-link[data-demo]');
            if (demoLink) {
                // Add click animation
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                    window.open(demoLink.getAttribute('data-demo'), '_blank');
                }, 150);
            }
        });
    });
}); 