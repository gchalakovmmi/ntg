// Navbar component JavaScript - Manual dropdown handling
document.addEventListener('DOMContentLoaded', function() {
	console.log('Navbar component loaded');
	
	// Manual dropdown toggle for mobile
	function setupMobileDropdowns() {
		const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
		
		dropdownToggles.forEach(toggle => {
			// Remove any existing click listeners to prevent duplicates
			toggle.removeEventListener('click', handleDropdownClick);
			
			// Add click listener for dropdown toggles
			toggle.addEventListener('click', handleDropdownClick);
		});
		
		// Close dropdowns when clicking outside
		document.addEventListener('click', function(event) {
			if (!event.target.closest('.dropdown')) {
				closeAllDropdowns();
			}
		});
	}
	
	function handleDropdownClick(event) {
		// Only handle mobile dropdowns (below 1220px)
		if (window.innerWidth >= 1220) return;
		
		event.preventDefault();
		event.stopPropagation();
		
		const dropdown = this.closest('.dropdown');
		const menu = dropdown.querySelector('.dropdown-menu');
		
		// Close all other dropdowns
		closeAllDropdownsExcept(dropdown);
		
		// Toggle current dropdown
		if (menu.classList.contains('show')) {
			menu.classList.remove('show');
			this.classList.remove('show');
		} else {
			menu.classList.add('show');
			this.classList.add('show');
		}
	}
	
	function closeAllDropdowns() {
		const openMenus = document.querySelectorAll('.dropdown-menu.show');
		const openToggles = document.querySelectorAll('.dropdown-toggle.show');
		
		openMenus.forEach(menu => menu.classList.remove('show'));
		openToggles.forEach(toggle => toggle.classList.remove('show'));
	}
	
	function closeAllDropdownsExcept(exceptDropdown) {
		const allDropdowns = document.querySelectorAll('.dropdown');
		
		allDropdowns.forEach(dropdown => {
			if (dropdown !== exceptDropdown) {
				const menu = dropdown.querySelector('.dropdown-menu');
				const toggle = dropdown.querySelector('.dropdown-toggle');
				
				if (menu) menu.classList.remove('show');
				if (toggle) toggle.classList.remove('show');
			}
		});
	}
	
	// Hover functionality for desktop/tablet
	function setupDesktopHover() {
		if (window.innerWidth >= 1220) {
			const dropdowns = document.querySelectorAll('.nav-item.dropdown');
			
			dropdowns.forEach(dropdown => {
				dropdown.addEventListener('mouseenter', function() {
					this.classList.add('show');
					const menu = this.querySelector('.dropdown-menu');
					if (menu) menu.classList.add('show');
				});
				
				dropdown.addEventListener('mouseleave', function() {
					this.classList.remove('show');
					const menu = this.querySelector('.dropdown-menu');
					if (menu) menu.classList.remove('show');
				});
			});
		}
	}
	
	// Initialize everything
	function initNavbar() {
		setupMobileDropdowns();
		setupDesktopHover();
	}
	
	// Initial setup
	initNavbar();
	
	// Re-initialize on resize
	let resizeTimeout;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(initNavbar, 100);
	});
	
	// Re-initialize when navbar is shown (for mobile)
	const navbarCollapse = document.getElementById('navbarNav');
	if (navbarCollapse) {
		navbarCollapse.addEventListener('shown.bs.collapse', function() {
			setTimeout(setupMobileDropdowns, 50);
		});
		
		// Reset dropdowns when navbar is hidden
		navbarCollapse.addEventListener('hidden.bs.collapse', function() {
			closeAllDropdowns();
		});
	}
	
	// Fallback: re-initialize after page load
	window.addEventListener('load', function() {
		setTimeout(initNavbar, 200);
	});
});

// Global function to manually fix dropdowns if needed
function fixNavbarDropdowns() {
	const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
	dropdownToggles.forEach(toggle => {
		toggle.removeEventListener('click', handleDropdownClick);
		toggle.addEventListener('click', handleDropdownClick);
	});
}
