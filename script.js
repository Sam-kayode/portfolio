// Portfolio Application - Main Script
// ====================================

// Configuration - uses environment variables from config.js
const CONFIG = {
    LOADING_DELAY: 3000,
    ANIMATION_THRESHOLD: 0.1,
    COUNTER_STEPS: 50,
    COUNTER_INTERVAL: 20,
    EMAILJS_SERVICE_ID: typeof ENV !== 'undefined' ? ENV.EMAILJS_SERVICE_ID : 'service_portfolio',
    EMAILJS_TEMPLATE_ID: typeof ENV !== 'undefined' ? ENV.EMAILJS_TEMPLATE_ID : 'template_contact',
    EMAILJS_PUBLIC_KEY: typeof ENV !== 'undefined' ? ENV.EMAILJS_PUBLIC_KEY : 'YOUR_EMAILJS_PUBLIC_KEY',
    THEME_STORAGE_KEY: 'portfolio-theme'
};

// Global state
let state = {
    isLoading: true,
    currentTheme: localStorage.getItem(CONFIG.THEME_STORAGE_KEY) || 'dark',
    ticking: false
};

// ============================
// INITIALIZATION
// ============================

document.addEventListener('DOMContentLoaded', function() {
    // Disable scrollbar during loading
    document.body.style.overflow = 'hidden';
    
    // EmailJS is already initialized in index.html
    // Just apply theme and start portfolio
    applyTheme(state.currentTheme);
    
    // Start portfolio after loading delay
    setTimeout(() => {
        hideLoading();
        initializePortfolio();
    }, CONFIG.LOADING_DELAY);
});

function initializePortfolio() {
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initCustomCursor();
    initParallaxEffects();
    initContactForm();
    initSmoothScroll();
    initScrollProgress();
    initCounterAnimations();
    initAdvancedEffects();
    initKeyboardNavigation();
}

// ============================
// LOADING SCREEN
// ============================

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        state.isLoading = false;
        // Re-enable scrollbar
        document.body.style.overflow = 'auto';
    }
}

// ============================
// NAVIGATION
// ============================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }, { passive: true });

    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================
// THEME TOGGLE
// ============================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
        const newTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

function setTheme(theme) {
    state.currentTheme = theme;
    applyTheme(theme);
    localStorage.setItem(CONFIG.THEME_STORAGE_KEY, theme);
}

function applyTheme(theme) {
    const icon = document.querySelector('#themeToggle i');
    document.documentElement.setAttribute('data-theme', theme);
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ============================
// SCROLL ANIMATIONS
// ============================

function initScrollAnimations() {
    const observerOptions = {
        threshold: CONFIG.ANIMATION_THRESHOLD,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// ============================
// CUSTOM CURSOR
// ============================

function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (!cursor || !cursorFollower) return;
    
    // Only show cursor on non-touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        if (!state.isLoading) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
    }, { passive: true });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = (followerX - 20) + 'px';
        cursorFollower.style.top = (followerY - 20) + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover');
        });
    });
}

// ============================
// PARALLAX EFFECTS
// ============================

function initParallaxEffects() {
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${rate * speed}px)`;
        });
    }, { passive: true });
}

// ============================
// SCROLL PROGRESS
// ============================

function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    }, { passive: true });
}

// ============================
// COUNTER ANIMATIONS
// ============================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const metrics = document.querySelectorAll('.metric-value');
    const observerOptions = {
        threshold: 0.7
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isPlus = target.includes('+');
                
                // Parse numeric value
                let numericTarget = parseInt(target.replace(/[^\d]/g, ''));
                
                // Multiply by appropriate scale (M or K)
                if (target.includes('M')) {
                    numericTarget = numericTarget * 1000000;
                } else if (target.includes('K')) {
                    numericTarget = numericTarget * 1000;
                }
                
                animateCounter(counter, numericTarget, isPercentage, isPlus);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
    metrics.forEach(metric => counterObserver.observe(metric));
}

function animateCounter(element, target, isPercentage = false, isPlus = false) {
    let current = 0;
    const increment = target / CONFIG.COUNTER_STEPS;
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.textContent = originalText;
            return;
        }
        
        let displayValue = Math.floor(current);
        
        // Format with K if we need thousands
        if (target >= 1000) {
            displayValue = Math.floor(current / 1000) + 'K';
        }
        
        // Add + or % if needed
        if (isPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue;
    }, CONFIG.COUNTER_INTERVAL);
}

// ============================
// CONTACT FORM
// ============================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const button = form.querySelector('.form-submit');
    const originalText = button.innerHTML;
    
    // Validate form
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Set loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
    button.disabled = true;
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        const templateParams = {
            to_email: 'marvelloussamkayode@gmail.com',
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Check if EmailJS is loaded and credentials are set
        if (typeof emailjs !== 'undefined' && CONFIG.EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            await emailjs.send(
                CONFIG.EMAILJS_SERVICE_ID,
                CONFIG.EMAILJS_TEMPLATE_ID,
                templateParams
            );
        } else {
            // Fallback: Log to console (for development without EmailJS)
            console.log('Form data (EmailJS not fully configured):', templateParams);
            console.warn('EmailJS status:', typeof emailjs !== 'undefined' ? 'Loaded' : 'Not loaded');
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        // Success state
        button.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Message Sent!';
        form.reset();
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Error state
        button.innerHTML = '<i class="fas fa-exclamation-triangle" aria-hidden="true"></i> Try Again';
        button.disabled = false;
        showNotification('Failed to send message. Please try again or email me directly.', 'error');
        
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 3000);
    }
}

function validateForm(form) {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    // Validate name
    if (!name || name.length < 2) return false;
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    
    // Validate subject
    if (!subject || subject.length < 3) return false;
    
    // Validate message
    if (!message || message.length < 10) return false;
    
    return true;
}

// ============================
// NOTIFICATIONS
// ============================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    const iconClass = type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info-circle';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconClass}" aria-hidden="true"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Inline styles to avoid CSS issues
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? 'var(--gradient-primary)' : type === 'error' ? 'var(--gradient-secondary)' : 'var(--accent)'};
        color: var(--dark);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after delay
    const timeoutId = setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
    
    // Allow manual dismiss
    notification.addEventListener('click', () => {
        clearTimeout(timeoutId);
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
}

// ============================
// SMOOTH SCROLLING
// ============================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only prevent default for internal links
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetSection = document.querySelector(href);
            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================
// ADVANCED EFFECTS
// ============================

function initAdvancedEffects() {
    const magneticElements = document.querySelectorAll('.btn, .social-link');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================
// KEYBOARD NAVIGATION
// ============================

function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Add keyboard navigation focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 3px solid var(--primary) !important;
        outline-offset: 2px !important;
        box-shadow: var(--glow-primary) !important;
    }
`;
document.head.appendChild(focusStyle);

// ============================
// ERROR HANDLING
// ============================

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
