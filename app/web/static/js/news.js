// News page JavaScript with enhanced filtering and mobile support
document.addEventListener('DOMContentLoaded', function() {
	console.log('News page JavaScript loaded');
	
	// Handle form submission with all filters
	const filterForm = document.getElementById('newsFilterForm');
	if (filterForm) {
		filterForm.addEventListener('submit', function(e) {
			e.preventDefault();
			
			// Get form data
			const formData = new FormData(this);
			const params = new URLSearchParams();
			
			// Add all form values to params
			for (const [key, value] of formData.entries()) {
				if (value) {
					params.append(key, value);
				}
			}
			
			// Redirect to filtered page
			window.location.href = '?' + params.toString();
		});
	}
	
	// Enhanced date validation
	const dateFrom = document.getElementById('dateFrom');
	const dateTo = document.getElementById('dateTo');
	
	if (dateFrom && dateTo) {
		dateFrom.addEventListener('change', function() {
			if (dateTo.value && this.value > dateTo.value) {
				dateTo.value = this.value;
			}
		});
		
		dateTo.addEventListener('change', function() {
			if (dateFrom.value && this.value < dateFrom.value) {
				dateFrom.value = this.value;
			}
		});
	}
	
	// Auto-submit when category changes (desktop only)
	const categorySelect = document.querySelector('select[name="category"]');
	if (categorySelect && window.innerWidth >= 992) {
		categorySelect.addEventListener('change', function() {
			filterForm.submit();
		});
	}
	
	// Handle mobile filter collapse state
	const filterCollapse = document.getElementById('filterCollapse');
	if (filterCollapse && window.innerWidth < 992) {
		// Close mobile filters when clicking outside
		document.addEventListener('click', function(event) {
			if (!filterCollapse.contains(event.target) && 
				!event.target.closest('[data-bs-toggle="collapse"]') &&
				filterCollapse.classList.contains('show')) {
				const bsCollapse = new bootstrap.Collapse(filterCollapse);
				bsCollapse.hide();
			}
		});
	}
});

// Global function for resetting filters
function resetFilters() {
	window.location.href = window.location.pathname;
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
	const categorySelect = document.querySelector('select[name="category"]');
	const filterForm = document.getElementById('newsFilterForm');
	
	if (categorySelect && filterForm) {
		// Remove existing event listener
		categorySelect.replaceWith(categorySelect.cloneNode(true));
		
		// Re-attach event listener based on screen size
		const newCategorySelect = document.querySelector('select[name="category"]');
		if (window.innerWidth >= 992) {
			newCategorySelect.addEventListener('change', function() {
				filterForm.submit();
			});
		}
	}
});
