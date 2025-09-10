// Navbar component JavaScript
document.addEventListener('DOMContentLoaded', function() {
	console.log('Navbar component loaded');
	
	// Add hover functionality for dropdowns on desktop
	function initDropdownHover() {
		if (window.innerWidth > 992) {
			const dropdowns = document.querySelectorAll('.nav-item.dropdown');
			
			dropdowns.forEach(dropdown => {
				dropdown.addEventListener('mouseenter', function() {
					this.classList.add('show');
					const menu = this.querySelector('.dropdown-menu');
					if (menu) {
						menu.classList.add('show');
					}
				});
				
				dropdown.addEventListener('mouseleave', function() {
					this.classList.remove('show');
					const menu = this.querySelector('.dropdown-menu');
					if (menu) {
						menu.classList.remove('show');
					}
				});
			});
		}
	}
	
	// Initialize dropdown hover
	initDropdownHover();
	
	// Re-initialize on window resize
	window.addEventListener('resize', initDropdownHover);
});
