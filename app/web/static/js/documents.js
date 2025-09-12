// Documents page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Documents page JavaScript loaded');
    
    // PDF preview functionality
    const pdfModal = document.getElementById('pdfModal');
    const pdfFrame = document.getElementById('pdfFrame');
    const downloadLink = document.getElementById('downloadLink');
    
    if (pdfModal) {
        pdfModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const pdfUrl = button.getAttribute('data-pdf');
            
            // Load PDF in iframe
            if (pdfFrame && pdfUrl) {
                pdfFrame.src = pdfUrl;
            }
            
            // Set download link
            if (downloadLink && pdfUrl) {
                downloadLink.href = pdfUrl;
                downloadLink.download = pdfUrl.split('/').pop();
            }
        });
        
        // Clean up when modal closes
        pdfModal.addEventListener('hidden.bs.modal', function() {
            if (pdfFrame) {
                pdfFrame.src = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Search functionality
    const searchInput = document.querySelector('.document-filter input[type="text"]');
    const categorySelect = document.querySelector('.document-filter select:nth-of-type(1)');
    const yearSelect = document.querySelector('.document-filter select:nth-of-type(2)');

    function filterDocuments() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categorySelect ? categorySelect.value : '';
        const selectedYear = yearSelect ? yearSelect.value : '';

        const documentCards = document.querySelectorAll('.document-card');
        
        documentCards.forEach(card => {
            const title = card.querySelector('.document-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.document-description')?.textContent.toLowerCase() || '';
            const category = card.closest('.document-category')?.querySelector('.category-title')?.textContent.toLowerCase() || '';
            
            const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = !selectedCategory || selectedCategory === 'Всички категории' || category.includes(selectedCategory.toLowerCase());
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.parentElement.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Hide empty categories
        const categories = document.querySelectorAll('.documents-container');
        categories.forEach(category => {
            const visibleCards = category.querySelectorAll('.document-card[style*="display: block"], .document-card:not([style*="display: none"])');
            if (visibleCards.length === 0) {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
            }
        });
    }

    // Add event listeners for filtering
    if (searchInput) {
        searchInput.addEventListener('input', filterDocuments);
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', filterDocuments);
    }
    
    if (yearSelect) {
        yearSelect.addEventListener('change', filterDocuments);
    }
    
    // Enhanced document card interactions
    const documentCards = document.querySelectorAll('.document-card');
    
    documentCards.forEach(card => {
        // Add loading state to preview buttons
        const previewBtn = card.querySelector('.btn-preview');
        if (previewBtn) {
            previewBtn.addEventListener('click', function() {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Зареждане...';
                this.disabled = true;
                
                // Reset button after modal is shown
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1000);
            });
        }

        // Add download tracking
        const downloadBtn = card.querySelector('.btn-download');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                const documentTitle = card.querySelector('.document-title')?.textContent || 'Неизвестен документ';
                console.log(`Изтегляне на документ: ${documentTitle}`);
                
                // Show temporary feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check me-1"></i> Изтеглено';
                this.style.backgroundColor = 'var(--primary-gold)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = 'var(--primary-red)';
                }, 2000);
            });
        }
    });
});