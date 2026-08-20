/**
 * Landing Page Conversion Analytics
 * Handles tracking for page_view, cta_start_project, cta_view_work,
 * email_click, github_click, live_project_click, contact_form_start, contact_form_submit.
 */

(function () {
    // Detect service type from body attribute or URL
    function getServiceType() {
        const bodyService = document.body.getAttribute('data-service');
        if (bodyService) return bodyService;
        const path = window.location.pathname;
        if (path.includes('freelance-ai-developer')) return 'ai';
        if (path.includes('freelance-fullstack-developer')) return 'fullstack';
        if (path.includes('freelance-mobile-app-developer')) return 'mobile';
        return 'portfolio';
    }

    const service = getServiceType();

    // Central event tracking dispatcher
    window.trackEvent = function (eventName, eventParams = {}) {
        const payload = {
            service: service,
            page_path: window.location.pathname,
            timestamp: new Date().toISOString(),
            ...eventParams
        };

        // GA4 / GTM DataLayer support
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: eventName, ...payload });
        }

        // gtag support
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, payload);
        }

        // Console fallback for verification
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.debugAnalytics) {
            console.log('[Analytics Event]', eventName, payload);
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        // Track Page View
        window.trackEvent('page_view', { service: service, title: document.title });

        // Delegate Click Tracking
        document.body.addEventListener('click', function (e) {
            const target = e.target.closest('a, button');
            if (!target) return;

            const href = target.getAttribute('href') || '';
            const text = (target.textContent || '').trim().toLowerCase();

            // Email Clicks
            if (href.startsWith('mailto:')) {
                window.trackEvent('email_click', {
                    service: service,
                    email: href.replace('mailto:', ''),
                    label: text
                });
            }

            // WhatsApp Clicks
            if (href.includes('wa.me') || href.includes('whatsapp.com')) {
                window.trackEvent('whatsapp_click', {
                    service: service,
                    target_url: href
                });
            }

            // GitHub Clicks
            if (href.includes('github.com')) {
                window.trackEvent('github_click', {
                    service: service,
                    target_url: href
                });
            }

            // Live Project Clicks
            if (target.closest('.case-study-links') || (target.hasAttribute('target') && href.startsWith('http') && !href.includes('github.com') && !href.includes('linkedin.com'))) {
                window.trackEvent('live_project_click', {
                    service: service,
                    target_url: href,
                    project: target.closest('.case-study')?.querySelector('h3')?.textContent || 'external'
                });
            }

            // Start a Project CTA
            if (text.includes('start a project') || text.includes('build my product') || text.includes('build my mobile app')) {
                window.trackEvent('cta_start_project', {
                    service: service,
                    cta_text: text,
                    location: target.closest('.landing-hero') ? 'hero' : (target.closest('.landing-cta') ? 'bottom_cta' : 'header')
                });
            }

            // View Work CTA
            if (text.includes('view ai work') || text.includes('view full-stack work') || text.includes('view mobile work') || text.includes('view portfolio') || text.includes('view case studies')) {
                window.trackEvent('cta_view_work', {
                    service: service,
                    cta_text: text
                });
            }
        });

        // Form Tracking (if form is present)
        const forms = document.querySelectorAll('form');
        forms.forEach(function (form) {
            let started = false;
            form.addEventListener('focusin', function () {
                if (!started) {
                    started = true;
                    window.trackEvent('contact_form_start', { service: service, form_id: form.id || 'contact' });
                }
            });

            form.addEventListener('submit', function (e) {
                // Only fire submit event on successful submit / submission handler
                window.trackEvent('contact_form_submit', { service: service, form_id: form.id || 'contact' });
            });
        });
    });
})();
