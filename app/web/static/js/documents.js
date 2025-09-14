// Documents page JavaScript
document.addEventListener('DOMContentLoaded', function() {
	console.log('Documents page JavaScript loaded');
	
	// Smooth scrolling for anchor links with offset for fixed header
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				const headerOffset = 80;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});

	// Category filter functionality
	const categorySelect = document.querySelector('.document-filter select');

	function filterDocuments() {
		const selectedCategory = categorySelect ? categorySelect.value : 'all';
		const documentCategories = document.querySelectorAll('.document-category');
		
		// Show/hide categories based on selection
		documentCategories.forEach(category => {
			const categoryId = category.getAttribute('data-section');
			
			if (selectedCategory === 'all' || categoryId === selectedCategory) {
				category.style.display = 'block';
			} else {
				category.style.display = 'none';
			}
		});
	}

	// Add event listener for category filtering
	if (categorySelect) {
		categorySelect.addEventListener('change', filterDocuments);
	}

	// Initialize filter on page load
	filterDocuments();
});
