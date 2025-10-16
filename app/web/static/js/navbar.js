// Navbar component JavaScript - Simple and reliable
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navbar component loaded');
    
    // Initialize immediately based on current screen size
    initNavbar();
    
    // Handle resize with proper cleanup
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initNavbar, 100);
    });
});

function initNavbar() {
    const isMobile = window.innerWidth < 1220;
    
    // Clean up all existing event listeners first
    cleanupEventListeners();
    
    if (isMobile) {
        setupMobileDropdowns();
    } else {
        setupDesktopHover();
    }
}

function cleanupEventListeners() {
    // Remove all dropdown toggle click events
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.removeEventListener('click', handleMobileDropdownClick);
    });
    
    // Remove all hover events
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.removeEventListener('mouseenter', handleMouseEnter);
        dropdown.removeEventListener('mouseleave', handleMouseLeave);
    });
    
    // Remove document click listener
    document.removeEventListener('click', handleDocumentClick);
}

function setupMobileDropdowns() {
    console.log('Setting up mobile dropdowns');
    
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', handleMobileDropdownClick);
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', handleDocumentClick);
}

function handleMobileDropdownClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const dropdown = this.closest('.dropdown');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Close all other dropdowns
    closeAllDropdownsExcept(dropdown);
    
    // Toggle current dropdown
    if (menu.classList.contains('show')) {
        menu.classList.remove('show');
    } else {
        menu.classList.add('show');
    }
}

function handleDocumentClick(event) {
    if (!event.target.closest('.dropdown') && !event.target.closest('.navbar-toggler')) {
        closeAllDropdowns();
    }
}

function closeAllDropdowns() {
    const openMenus = document.querySelectorAll('.dropdown-menu.show');
    openMenus.forEach(menu => menu.classList.remove('show'));
}

function closeAllDropdownsExcept(exceptDropdown) {
    const allDropdowns = document.querySelectorAll('.dropdown');
    allDropdowns.forEach(dropdown => {
        if (dropdown !== exceptDropdown) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) menu.classList.remove('show');
        }
    });
}

function setupDesktopHover() {
    console.log('Setting up desktop hover');
    
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', handleMouseEnter);
        dropdown.addEventListener('mouseleave', handleMouseLeave);
    });
}

function handleMouseEnter() {
    this.classList.add('show');
    const menu = this.querySelector('.dropdown-menu');
    if (menu) menu.classList.add('show');
}

function handleMouseLeave() {
    this.classList.remove('show');
    const menu = this.querySelector('.dropdown-menu');
    if (menu) menu.classList.remove('show');
}
