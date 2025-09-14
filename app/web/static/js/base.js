// Base JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Base JavaScript loaded');
    
    // Scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Add hover effect for dropdowns on desktop
    if (window.innerWidth > 992) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-menu').classList.add('show');
            });
            dropdown.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown-menu').classList.remove('show');
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Only redirect if this is the first visit
    if (!sessionStorage.getItem('languageSelected')) {
        const userLang = navigator.language || navigator.userLanguage;
        let targetLang = 'bg'; // Bulgarian is the default language
        
        // Only change from Bulgarian if specifically one of these languages
        if (['en', 'en-US', 'en-GB'].includes(userLang)) {
            targetLang = 'en';
        } 
        else if (['de', 'de-DE', 'de-AT', 'de-CH'].includes(userLang)) {
            targetLang = 'de';
        }
        else if (['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH'].includes(userLang)) {
            targetLang = 'fr';
        }
        // For all other languages, keep Bulgarian as default
        
        // Only redirect if we're not already on the detected language page
        const currentPath = window.location.pathname;
        const currentLang = currentPath.split('/')[1];
        
        if (currentLang !== targetLang && !['bg', 'en', 'de', 'fr'].includes(currentLang)) {
            // Get current page or default to home
            const currentPage = currentPath.split('/')[2] || 'home';
            window.location.href = '/' + targetLang + '/' + currentPage;
        }
        
        // Set flag to prevent future redirects
        sessionStorage.setItem('languageSelected', 'true');
    }
});