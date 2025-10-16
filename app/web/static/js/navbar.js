// Navbar mobile functionality - Handles both clicks and taps
document.addEventListener('DOMContentLoaded', function() {
	console.log('Navbar initialized - handling both clicks and taps');
	
	const navbarToggler = document.querySelector('.navbar-toggler');
	const navbarCollapse = document.querySelector('.navbar-collapse');
	
	// Handle navbar toggler
	if (navbarToggler && navbarCollapse) {
		navbarToggler.addEventListener('click', function() {
			setTimeout(() => {
				const isExpanded = navbarCollapse.classList.contains('show');
				if (isExpanded) {
					document.body.style.overflow = 'hidden';
					document.body.classList.add('navbar-open');
				} else {
					document.body.style.overflow = '';
					document.body.classList.remove('navbar-open');
				}
			}, 50);
		});
		
		// Close navbar when clicking regular links on mobile
		const regularNavLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
		regularNavLinks.forEach(link => {
			link.addEventListener('click', function() {
				if (window.innerWidth < 1220) {
					const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
					if (bsCollapse) {
						bsCollapse.hide();
					}
					document.body.style.overflow = '';
					document.body.classList.remove('navbar-open');
				}
			});
		});
	}
	
	// Enhanced dropdown handling for both clicks and taps
	function setupDropdowns() {
		const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
		
		dropdownToggles.forEach(toggle => {
			// Remove any existing listeners to avoid duplicates
			toggle.removeEventListener('click', handleDropdownClick);
			toggle.removeEventListener('touchend', handleDropdownTouch);
			
			// Add both click and touch events
			toggle.addEventListener('click', handleDropdownClick);
			toggle.addEventListener('touchend', handleDropdownTouch);
		});
	}
	
	function handleDropdownClick(e) {
		if (window.innerWidth < 1220) {
			e.preventDefault();
			e.stopPropagation();
			triggerBootstrapDropdown(this);
		}
	}
	
	function handleDropdownTouch(e) {
		if (window.innerWidth < 1220) {
			e.preventDefault();
			e.stopPropagation();
			triggerBootstrapDropdown(this);
		}
	}
	
	function triggerBootstrapDropdown(element) {
		const dropdown = bootstrap.Dropdown.getInstance(element);
		if (dropdown) {
			dropdown.toggle();
		} else {
			new bootstrap.Dropdown(element).toggle();
		}
	}
	
	// Initialize dropdowns
	setupDropdowns();
	
	// Re-initialize on resize
	window.addEventListener('resize', function() {
		setupDropdowns();
	});
});
