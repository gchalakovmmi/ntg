// Home page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Home page JavaScript loaded');
    
    // Auto-rotate stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.textContent = target;
                clearInterval(timer);
            } else {
                number.textContent = Math.ceil(current);
            }
        }, 30);
    });
    
    // Ensure quick links are fully visible
    function adjustQuickLinks() {
        const quickLinks = document.querySelector('.quick-links');
        if (quickLinks) {
            const viewportHeight = window.innerHeight;
            const headerHeight = 70; // Fixed header height
            const quickLinksHeight = viewportHeight * 0.2; // 20% of viewport
            quickLinks.style.height = `${quickLinksHeight}px`;
            
            // Adjust carousel height
            const carousel = document.querySelector('.hero-carousel');
            if (carousel) {
                carousel.style.height = `${viewportHeight - headerHeight - quickLinksHeight}px`;
            }
        }
    }
    
    // Initial adjustment
    adjustQuickLinks();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustQuickLinks);
});
