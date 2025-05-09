document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline::before');
    
    // Add parallax effect to timeline items
    timelineItems.forEach((item, index) => {
        // Add achievement badges
        const badgeContainer = document.createElement('div');
        badgeContainer.className = 'timeline-badges';
        
        // Add these elements to the timeline content
        const content = item.querySelector('.timeline-content');
        content.appendChild(badgeContainer);
        
        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.boxShadow = 'none';
        });
    });
    
    // Animate timeline items on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add achievement badges based on content
    function addAchievementBadges() {
        const badges = {
            'Speedzy': {
                icon: 'fa-rocket',
                color: '#FF6B6B',
                text: 'Startup'
            },
            'Triblet': {
                icon: 'fa-trophy',
                color: '#4ECDC4',
                text: 'Lead Developer'
            },
            'CODSOFT': {
                icon: 'fa-brain',
                color: '#45B7D1',
                text: 'ML Intern'
            },
            'Hackathons': {
                icon: 'fa-code',
                color: '#96CEB4',
                text: 'Winner'
            }
        };
        
        timelineItems.forEach(item => {
            const title = item.querySelector('h3').textContent;
            const badgeContainer = item.querySelector('.timeline-badges');
            
            if (badges[title]) {
                const badge = document.createElement('div');
                badge.className = 'achievement-badge';
                badge.innerHTML = `
                    <i class="fas ${badges[title].icon}"></i>
                    <span>${badges[title].text}</span>
                `;
                badge.style.backgroundColor = badges[title].color;
                badgeContainer.appendChild(badge);
            }
        });
    }
    
    // Initialize badges
    addAchievementBadges();
}); 