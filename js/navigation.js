document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const floatingNav = document.querySelector('.floating-nav');
    const scrollProgress = document.querySelector('.scroll-progress');
    const sections = document.querySelectorAll('section');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    // Scroll Progress
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Navigation Link
    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Update floating nav active state
        const floatingNavLinks = document.querySelectorAll('.floating-nav a');
        floatingNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle with improved handling
    if (burger && nav) {
        // Force initial state reset
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        
        // Add explicit click handler using addEventListener
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check current state
            const isCurrentlyActive = nav.classList.contains('active');
            
            // Toggle by using direct manipulation instead of toggle
            if (isCurrentlyActive) {
                nav.classList.remove('active');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                
            } else {
                nav.classList.add('active');
                burger.classList.add('active');
                burger.setAttribute('aria-expanded', 'true');
                
            }
        });
        
        // Add click outside to close
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !burger.contains(e.target)) {
                nav.classList.remove('active');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
        
    } 

    // Update active state on scroll
    window.addEventListener('scroll', setActiveLink);

    // Initial active state
    setActiveLink();

    // Show/Hide Floating Nav based on scroll position
    window.addEventListener('scroll', () => {
        if (floatingNav) {
            if (window.scrollY > window.innerHeight) {
                floatingNav.style.display = 'block';
            } else {
                floatingNav.style.display = 'none';
            }
        }
    });
}); 