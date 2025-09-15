// News page JavaScript with enhanced filtering
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
	
	// Auto-submit when category changes
	const categorySelect = document.querySelector('select[name="category"]');
	if (categorySelect) {
		categorySelect.addEventListener('change', function() {
			filterForm.submit();
		});
	}
});

// Global function for resetting filters
function resetFilters() {
	window.location.href = window.location.pathname;
}
