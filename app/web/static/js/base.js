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
	
	// Add hover effect for dropdowns on desktop only
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

	// ===============================================================
	// MOBILE NAVIGATION - UNIVERSAL CLICK HANDLING
	// ===============================================================
	
	const navbarToggler = document.querySelector('.navbar-toggler');
	const navbarCollapse = document.querySelector('.navbar-collapse');
	
	if (navbarToggler && navbarCollapse) {
		navbarToggler.addEventListener('click', function() {
			const isExpanded = this.getAttribute('aria-expanded') === 'true';
			
			if (isExpanded) {
				// Closing navbar - enable page scroll
				document.body.classList.remove('navbar-open');
				// Close all dropdowns when navbar closes
				navbarCollapse.querySelectorAll('.dropdown-menu.show').forEach(menu => {
					menu.classList.remove('show');
				});
				// Allow a small delay for the transition to complete
				setTimeout(() => {
					document.body.style.overflow = '';
				}, 300);
			} else {
				// Opening navbar - disable page scroll, enable navbar scroll
				document.body.classList.add('navbar-open');
				document.body.style.overflow = 'hidden';
			}
		});
		
		// Close navbar when clicking on a regular nav link (but NOT dropdown toggles)
		const regularNavLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
		regularNavLinks.forEach(link => {
			link.addEventListener('click', function() {
				if (window.innerWidth <= 992) {
					navbarToggler.click();
					// Restore page scroll after closing
					setTimeout(() => {
						document.body.style.overflow = '';
						document.body.classList.remove('navbar-open');
					}, 300);
				}
			});
		});
		
		// UNIVERSAL CLICK HANDLER: Proper mobile dropdown toggle functionality
		const dropdownToggles = navbarCollapse.querySelectorAll('.dropdown-toggle');
		dropdownToggles.forEach(toggle => {
			toggle.addEventListener('click', function(e) {
				if (window.innerWidth <= 992) {
					e.preventDefault();
					e.stopPropagation();
					
					const parentDropdown = this.closest('.dropdown');
					const dropdownMenu = parentDropdown.querySelector('.dropdown-menu');
					
					// Toggle the dropdown menu
					if (dropdownMenu.classList.contains('show')) {
						// Close this dropdown
						dropdownMenu.classList.remove('show');
						this.setAttribute('aria-expanded', 'false');
					} else {
						// Close other open dropdowns first (except nested ones)
						const allOpenMenus = navbarCollapse.querySelectorAll('.dropdown-menu.show');
						allOpenMenus.forEach(menu => {
							// Don't close nested dropdowns that are children of the current dropdown
							if (!parentDropdown.contains(menu) || menu === dropdownMenu) {
								return;
							}
							menu.classList.remove('show');
							const otherToggle = menu.previousElementSibling;
							if (otherToggle && otherToggle.classList.contains('dropdown-toggle')) {
								otherToggle.setAttribute('aria-expanded', 'false');
							}
						});
						
						// Show the clicked dropdown
						dropdownMenu.classList.add('show');
						this.setAttribute('aria-expanded', 'true');
						
						// FIX: Automatically open nested dropdowns when parent opens
						const nestedDropdowns = dropdownMenu.querySelectorAll('.dropdown-menu');
						nestedDropdowns.forEach(nestedMenu => {
							nestedMenu.classList.add('show');
							const nestedToggle = nestedMenu.previousElementSibling;
							if (nestedToggle && nestedToggle.classList.contains('dropdown-toggle')) {
								nestedToggle.setAttribute('aria-expanded', 'true');
							}
						});
						
						// Ensure the dropdown is visible in the viewport
						setTimeout(() => {
							const rect = dropdownMenu.getBoundingClientRect();
							if (rect.bottom > window.innerHeight) {
								dropdownMenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
							}
						}, 50);
					}
				}
			});
		});
		
		// Handle nested dropdowns on mobile - allow toggling if needed
		const nestedDropdownToggles = navbarCollapse.querySelectorAll('.dropdown-item.dropdown-toggle');
		nestedDropdownToggles.forEach(toggle => {
			toggle.addEventListener('click', function(e) {
				if (window.innerWidth <= 992) {
					e.preventDefault();
					e.stopPropagation();
					
					const nestedMenu = this.nextElementSibling;
					if (nestedMenu && nestedMenu.classList.contains('dropdown-menu')) {
						if (nestedMenu.classList.contains('show')) {
							nestedMenu.classList.remove('show');
							this.setAttribute('aria-expanded', 'false');
						} else {
							// Close other nested dropdowns at the same level
							const parentItem = this.parentElement;
							parentItem.querySelectorAll('.dropdown-menu.show').forEach(menu => {
								if (menu !== nestedMenu) {
									menu.classList.remove('show');
								}
							});
							
							nestedMenu.classList.add('show');
							this.setAttribute('aria-expanded', 'true');
						}
					}
				}
			});
		});
		
		// Close navbar when window is resized to desktop size
		window.addEventListener('resize', function() {
			if (window.innerWidth > 992) {
				navbarCollapse.classList.remove('show');
				document.body.style.overflow = '';
				document.body.classList.remove('navbar-open');
				
				// Close all dropdown menus when switching to desktop
				navbarCollapse.querySelectorAll('.dropdown-menu.show').forEach(menu => {
					menu.classList.remove('show');
				});
			}
		});
		
		// Close dropdowns when clicking outside on mobile
		document.addEventListener('click', function(e) {
			if (window.innerWidth <= 992 && navbarCollapse.classList.contains('show')) {
				const isNavbarClick = navbarCollapse.contains(e.target);
				const isTogglerClick = navbarToggler.contains(e.target);
				
				if (!isNavbarClick && !isTogglerClick) {
					// Clicked outside - close all dropdowns
					navbarCollapse.querySelectorAll('.dropdown-menu.show').forEach(menu => {
						menu.classList.remove('show');
						const toggle = menu.previousElementSibling;
						if (toggle && toggle.classList.contains('dropdown-toggle')) {
							toggle.setAttribute('aria-expanded', 'false');
						}
					});
				}
			}
		});
		
		// Prevent navbar from closing when clicking inside dropdown menus
		navbarCollapse.addEventListener('click', function(e) {
			if (window.innerWidth <= 992 && e.target.closest('.dropdown-menu')) {
				e.stopPropagation();
			}
		});
	}
	
	// Re-initialize dropdown behavior on window resize
	window.addEventListener('resize', function() {
		// Remove all hover events and re-add only for desktop
		const dropdowns = document.querySelectorAll('.dropdown');
		dropdowns.forEach(dropdown => {
			// Remove existing hover events
			dropdown.replaceWith(dropdown.cloneNode(true));
		});
		
		// Add hover effect only for desktop
		if (window.innerWidth > 992) {
			const refreshedDropdowns = document.querySelectorAll('.dropdown');
			refreshedDropdowns.forEach(dropdown => {
				dropdown.addEventListener('mouseenter', function() {
					this.querySelector('.dropdown-menu').classList.add('show');
				});
				dropdown.addEventListener('mouseleave', function() {
					this.querySelector('.dropdown-menu').classList.remove('show');
				});
			});
		}
	});
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
