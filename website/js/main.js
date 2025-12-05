/**
 * Aestra Website - Main JavaScript File
 * Handles interactive features, form validation, and general functionality
 */

// ========================================
// 1. MOBILE MENU TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// ========================================
// 2. FAQ ACCORDION FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            const faqContent = document.getElementById(faqId);
            const icon = this.querySelector('span');

            // Toggle the display of content
            faqContent.classList.toggle('hidden');

            // Rotate the icon
            if (icon) {
                icon.textContent = faqContent.classList.contains('hidden') ? '+' : '−';
            }

            // Close other open items
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherId = otherToggle.getAttribute('data-faq');
                    const otherContent = document.getElementById(otherId);
                    if (!otherContent.classList.contains('hidden')) {
                        otherContent.classList.add('hidden');
                        const otherIcon = otherToggle.querySelector('span');
                        if (otherIcon) {
                            otherIcon.textContent = '+';
                        }
                    }
                }
            });
        });
    });
});

// ========================================
// 3. CONTACT FORM VALIDATION & SUBMISSION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const successMessage = document.getElementById('success-message');

            // Clear previous error messages
            clearErrorMessages();

            // Validate form fields
            let isValid = true;

            // Name validation
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }

            // Email validation
            if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            // Subject validation
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            }

            // Message validation
            if (!message.value.trim() || message.value.trim().length < 10) {
                showError(message, 'Please enter a message with at least 10 characters');
                isValid = false;
            }

            // If valid, show success message
            if (isValid) {
                // Show success message
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                }

                // Reset form
                contactForm.reset();

                // In a real application, you would send this data to a backend service
                console.log({
                    name: name.value,
                    email: email.value,
                    phone: document.getElementById('phone').value || 'Not provided',
                    subject: subject.value,
                    message: message.value
                });

                // Example: Integration with third-party form services
                // 1. Formspree: Use form's action attribute
                // 2. EmailJS: Use emailjs.send() method
                // 3. Custom API: Use fetch() to send data to your backend
                // 4. Netlify Forms: Add netlify attribute to form
            }
        });
    }
});

// ========================================
// 4. UTILITY FUNCTIONS
// ========================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for a form field
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message to display
 */
function showError(field, message) {
    // Add error styling to field
    field.classList.add('border-red-600');
    field.classList.remove('border-gray-300');

    // Find or create error span
    let errorSpan = field.parentElement.querySelector('.error');
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'error text-red-600 text-sm block mt-1';
        field.parentElement.appendChild(errorSpan);
    }

    errorSpan.textContent = message;
    errorSpan.classList.remove('hidden');
}

/**
 * Clear all error messages from the form
 */
function clearErrorMessages() {
    const formFields = document.querySelectorAll('input, textarea, select');
    const errorSpans = document.querySelectorAll('.error');

    // Clear error styling from fields
    formFields.forEach(field => {
        field.classList.remove('border-red-600');
        field.classList.add('border-gray-300');
    });

    // Clear error messages
    errorSpans.forEach(span => {
        span.textContent = '';
        span.classList.add('hidden');
    });
}

// ========================================
// 5. SMOOTH SCROLL BEHAVIOR
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========================================
// 6. ANALYTICS TRACKING (Optional)
// ========================================
/**
 * Track page views or custom events
 * Replace with your actual analytics service (Google Analytics, Mixpanel, etc.)
 */
function trackEvent(eventName, eventData = {}) {
    // Example: Send to analytics service
    console.log(`Event tracked: ${eventName}`, eventData);

    // Uncomment below to integrate with Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }

    // Or use your custom analytics endpoint
    // fetch('/api/track', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ event: eventName, data: eventData })
    // });
}

// ========================================
// 7. FORM INTEGRATION GUIDE
// ========================================
/**
 * CONTACT FORM INTEGRATION OPTIONS:
 *
 * Option 1: Formspree (Easiest)
 * - Add action="https://formspree.io/f/YOUR_FORM_ID" to the form
 * - Sign up at formspree.io and create a form
 * - Formspree will handle email delivery
 *
 * Option 2: EmailJS (JavaScript-based)
 * - Include EmailJS SDK: <script src="https://cdn.emailjs.com/sdk/2.11.0/email.min.js"></script>
 * - Initialize and use emailjs.send() in your submit handler
 *
 * Option 3: Netlify Forms (If hosted on Netlify)
 * - Add netlify attribute to the form: <form netlify>
 * - Netlify will automatically collect submissions
 *
 * Option 4: Custom Backend API
 * - Create a backend endpoint to handle form submissions
 * - Use fetch() to POST data to your endpoint
 * - Example:
 *   fetch('/api/contact', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(formData)
 *   })
 *
 * Option 5: Third-party Services
 * - SendGrid, MailChimp, Zapier, or other form handlers
 * - Follow their API documentation for integration
 */

// ========================================
// 8. PERFORMANCE OPTIMIZATION
// ========================================
/**
 * Lazy loading for images (Optional)
 * Add data-src attribute instead of src, and class="lazy-image"
 */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// 9. ACCESSIBILITY ENHANCEMENTS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels for better accessibility
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
});

console.log('Aestra Website - JavaScript loaded successfully');
