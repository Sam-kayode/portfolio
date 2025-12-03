// Environment Configuration
// This file reads from environment variables (Netlify, local .env.local, or window globals)

const getEnvVar = (key, fallback = '') => {
    // Try window variable first (for Netlify context)
    // Use 'in' operator to check if key exists (even if value is empty string)
    if (typeof window !== 'undefined' && key in window && window[key] !== undefined && window[key] !== '') {
        return window[key];
    }
    // Return fallback
    return fallback;
};

const ENV = {
    EMAILJS_SERVICE_ID: getEnvVar('VITE_EMAILJS_SERVICE_ID', ''),
    EMAILJS_TEMPLATE_ID: getEnvVar('VITE_EMAILJS_TEMPLATE_ID', ''),
    EMAILJS_PUBLIC_KEY: getEnvVar('VITE_EMAILJS_PUBLIC_KEY', '')
};

// Log for debugging (remove in production)
console.log('Environment loaded:', {
    service: ENV.EMAILJS_SERVICE_ID ? '✓ Set' : '✗ Empty',
    template: ENV.EMAILJS_TEMPLATE_ID ? '✓ Set' : '✗ Empty',
    publicKey: ENV.EMAILJS_PUBLIC_KEY ? '✓ Set' : '✗ Empty'
});
