// HBO page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('HBO page JavaScript loaded');
    
    // Document opening function
    window.openDocument = function(url) {
        window.open(url, '_blank');
    };

    // Add click effect animation for document rows
    const documentRows = document.querySelectorAll('.document-row');
    
    documentRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Add ripple effect
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
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

    // Enhanced floating animation for icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        // Add slight random delay to make animations feel more natural
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }

    // Enhanced scroll animations for documents
    const documentsContainer = document.querySelector('.documents-container');
    if (documentsContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); // Stagger animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        documentRows.forEach(row => {
            row.classList.add('animate-on-scroll');
            observer.observe(row);
        });
    }

    // Add hover sound effect (optional)
    documentRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            // Create subtle hover feedback
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Keyboard navigation support
    documentRows.forEach((row, index) => {
        row.setAttribute('tabindex', '0');
        row.setAttribute('role', 'button');
        row.setAttribute('aria-label', `Document ${index + 1}: ${row.querySelector('.document-title').textContent}`);
        
        row.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Stats animation on scroll
    const statsItems = document.querySelectorAll('.stat-item h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const finalValue = statElement.textContent.trim();
                
                // Simple number animation
                if (!isNaN(finalValue)) {
                    const numericValue = parseInt(finalValue);
                    let currentValue = 0;
                    const increment = Math.ceil(numericValue / 30);
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            statElement.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            statElement.textContent = currentValue;
                        }
                    }, 50);
                }
                
                statsObserver.unobserve(statElement);
            }
        });
    }, { threshold: 0.5 });

    statsItems.forEach(stat => {
        statsObserver.observe(stat);
    });
});