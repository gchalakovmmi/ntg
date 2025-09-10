// About Us page JavaScript - Fixed for Reconstruction Branch
document.addEventListener('DOMContentLoaded', function() {
    console.log('About Us page JavaScript loaded');
    
    // Use the existing animate-on-scroll system from base.js
    // No need to recreate the IntersectionObserver since base.js handles it
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // Account for fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced timeline animation that works with base.js
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Create a specific observer for timeline items with better settings
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Add special timeline animation class
                    entry.target.classList.add('timeline-animate');
                }, index * 150); // Stagger by 150ms
                
                // Unobserve after animation
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px' // Trigger earlier
    });

    // Apply to timeline items
    timelineItems.forEach((item, index) => {
        // Add the animate-on-scroll class so base.js can handle it
        item.classList.add('animate-on-scroll');
        if (index > 0) {
            item.classList.add(`delay-${Math.min(index, 3)}`);
        }
        timelineObserver.observe(item);
    });

    // Statistics counter animation for qualification cards
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const finalValue = statElement.textContent.trim();
                
                // Only animate if it's a number
                const numericPart = finalValue.replace(/[^\d]/g, '');
                if (numericPart && !isNaN(numericPart)) {
                    const isPercentage = finalValue.includes('%');
                    const numericValue = parseInt(numericPart);
                    let currentValue = 0;
                    const increment = Math.ceil(numericValue / 50);
                    const duration = 2000; // 2 seconds
                    const stepTime = duration / (numericValue / increment);
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            statElement.textContent = finalValue;
                            clearInterval(timer);
                        } else {
                            statElement.textContent = currentValue + (isPercentage ? '%' : '');
                        }
                    }, stepTime);
                }
                
                statsObserver.unobserve(statElement);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe stat numbers
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Enhanced hover effects for cards (lighter touch since base.js handles main animations)
    const cards = document.querySelectorAll('.leader-card, .value-card, .qualification-stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax effect for hero section (subtle)
    const hero = document.querySelector('.about-hero');
    if (hero) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3; // Reduced for subtlety
            hero.style.transform = `translateY(${parallax}px)`;
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

    // Timeline year badges animation enhancement
    const timelineYears = document.querySelectorAll('.timeline-year');
    const yearsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 0.6s ease-out';
                entry.target.addEventListener('animationend', () => {
                    entry.target.style.animation = '';
                });
                yearsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    timelineYears.forEach(year => {
        yearsObserver.observe(year);
    });

    // Fix any layout issues on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any positions if needed
            console.log('Layout recalculated');
        }, 250);
    });
});

// Add CSS animation for timeline items
const style = document.createElement('style');
style.textContent = `
    .timeline-animate {
        animation: timelineSlideIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    
    @keyframes timelineSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .timeline-year {
        animation: none; /* Reset any conflicting animations */
    }
    
    @keyframes pulse {
        0% {
            transform: translateX(-50%) scale(1);
        }
        50% {
            transform: translateX(-50%) scale(1.1);
        }
        100% {
            transform: translateX(-50%) scale(1);
        }
    }
`;
document.head.appendChild(style);