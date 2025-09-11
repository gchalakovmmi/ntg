// Contact page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact page JavaScript loaded');
    
    // Enhanced animation handling for contact cards
    const contactCards = document.querySelectorAll('.contact-card, .department-card');
    
    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                contactObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize contact cards with animation state
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactObserver.observe(card);
    });
    
    // Email protection (simple obfuscation)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        const email = link.href.replace('mailto:', '');
        if (email.includes('@')) {
            // Simple email validation and protection
            link.addEventListener('click', function(e) {
                // You can add additional protection logic here
                console.log('Email link clicked:', email);
            });
        }
    });
    
    // Phone number formatting
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phone = link.href.replace('tel:', '');
            console.log('Phone link clicked:', phone);
        });
    });
    
    // Copy to clipboard functionality for contact information
    function addCopyToClipboard() {
        const contactTexts = document.querySelectorAll('.contact-text, .department-link');
        
        contactTexts.forEach(element => {
            if (element.textContent.includes('@') || element.textContent.includes('+359')) {
                element.style.cursor = 'pointer';
                element.title = 'Кликнете за копиране';
                
                element.addEventListener('click', function() {
                    const text = this.textContent.trim();
                    
                    if (navigator.clipboard && window.isSecureContext) {
                        navigator.clipboard.writeText(text).then(() => {
                            showCopyFeedback(this);
                        }).catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                    } else {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = text;
                        document.body.appendChild(textArea);
                        textArea.select();
                        try {
                            document.execCommand('copy');
                            showCopyFeedback(this);
                        } catch (err) {
                            console.error('Fallback copy failed: ', err);
                        }
                        document.body.removeChild(textArea);
                    }
                });
            }
        });
    }
    
    // Show feedback when text is copied
    function showCopyFeedback(element) {
        const originalText = element.textContent;
        const originalColor = element.style.color;
        
        element.textContent = 'Копирано!';
        element.style.color = 'var(--primary-gold)';
        element.style.fontWeight = 'bold';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = originalColor;
            element.style.fontWeight = '';
        }, 1500);
    }
    
    // Initialize copy functionality
    addCopyToClipboard();
    
    // Map interaction enhancements
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        const mapIframe = mapContainer.querySelector('iframe');
        
        // Prevent scroll zoom on map until clicked
        if (mapIframe) {
            const mapOverlay = document.createElement('div');
            mapOverlay.style.position = 'absolute';
            mapOverlay.style.top = '0';
            mapOverlay.style.left = '0';
            mapOverlay.style.width = '100%';
            mapOverlay.style.height = '100%';
            mapOverlay.style.background = 'transparent';
            mapOverlay.style.cursor = 'pointer';
            mapOverlay.style.zIndex = '5';
            
            const clickHint = document.createElement('div');
            clickHint.textContent = 'Кликнете за взаимодействие с картата';
            clickHint.style.position = 'absolute';
            clickHint.style.bottom = '10px';
            clickHint.style.right = '10px';
            clickHint.style.background = 'rgba(0, 0, 0, 0.7)';
            clickHint.style.color = 'white';
            clickHint.style.padding = '5px 10px';
            clickHint.style.borderRadius = '5px';
            clickHint.style.fontSize = '0.8rem';
            clickHint.style.zIndex = '6';
            
            mapContainer.style.position = 'relative';
            mapContainer.appendChild(mapOverlay);
            mapContainer.appendChild(clickHint);
            
            mapOverlay.addEventListener('click', function() {
                this.style.display = 'none';
                clickHint.style.display = 'none';
                mapIframe.style.pointerEvents = 'auto';
            });
            
            // Re-enable overlay when mouse leaves map
            mapContainer.addEventListener('mouseleave', function() {
                mapOverlay.style.display = 'block';
                clickHint.style.display = 'block';
                mapIframe.style.pointerEvents = 'none';
            });
        }
    }
    
    // Smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add ripple effect to contact cards
    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any positions if needed
            console.log('Contact page layout recalculated');
        }, 250);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(178, 34, 34, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .contact-card, .department-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);