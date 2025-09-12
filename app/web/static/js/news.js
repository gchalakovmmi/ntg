// News page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('News page JavaScript loaded');
    
    // Filter functionality
    const newsItems = document.querySelectorAll('.news-item');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    const searchInput = document.getElementById('searchInput');
    const schoolLifeCheckbox = document.getElementById('schoolLife');
    const educationalProcessCheckbox = document.getElementById('educationalProcess');
    const applyFiltersButton = document.getElementById('applyFilters');
    const resetFiltersButton = document.getElementById('resetFilters');
    
    // Set today's date as default for dateTo
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    dateToInput.value = formattedToday;
    
    // Set dateFrom to 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    let mm2 = thirtyDaysAgo.getMonth() + 1;
    let dd2 = thirtyDaysAgo.getDate();
    const yyyy2 = thirtyDaysAgo.getFullYear();
    if (dd2 < 10) dd2 = '0' + dd2;
    if (mm2 < 10) mm2 = '0' + mm2;
    const formattedThirtyDaysAgo = `${yyyy2}-${mm2}-${dd2}`;
    dateFromInput.value = formattedThirtyDaysAgo;
    
    // Filter function
    function filterNews() {
        const dateFrom = new Date(dateFromInput.value);
        const dateTo = new Date(dateToInput.value);
        const searchText = searchInput.value.toLowerCase();
        const showSchoolLife = schoolLifeCheckbox.checked;
        const showEducationalProcess = educationalProcessCheckbox.checked;
        
        newsItems.forEach(item => {
            const itemDateText = item.querySelector('.news-date').textContent;
            // Convert date format from "15 Септември 2023" to Date object
            const dateParts = itemDateText.split(' ');
            const day = dateParts[0];
            const monthName = dateParts[1];
            const year = dateParts[2];
            
            const monthNames = {
                'Януари': 0, 'Февруари': 1, 'Март': 2, 'Април': 3,
                'Май': 4, 'Юни': 5, 'Юли': 6, 'Август': 7,
                'Септември': 8, 'Октомври': 9, 'Ноември': 10, 'Декември': 11
            };
            
            const itemDate = new Date(year, monthNames[monthName], day);
            const itemCategory = item.querySelector('.news-badge').textContent.trim();
            const itemTitle = item.querySelector('.news-title').textContent.toLowerCase();
            const itemDescription = item.querySelector('.news-description').textContent.toLowerCase();
            
            const dateInRange = itemDate >= dateFrom && itemDate <= dateTo;
            const categoryMatch = (itemCategory === 'Училищен живот' && showSchoolLife) ||
                                 (itemCategory === 'Учебен процес' && showEducationalProcess);
            const textMatch = searchText === '' ||
                             itemTitle.includes(searchText) ||
                             itemDescription.includes(searchText);
            
            if (dateInRange && categoryMatch && textMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Event listeners
    applyFiltersButton.addEventListener('click', filterNews);
    resetFiltersButton.addEventListener('click', function() {
        dateFromInput.value = formattedThirtyDaysAgo;
        dateToInput.value = formattedToday;
        searchInput.value = '';
        schoolLifeCheckbox.checked = true;
        educationalProcessCheckbox.checked = true;
        filterNews();
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterNews();
        }
    });
    
    // Initialize filters
    filterNews();
    
    // Animation on scroll
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});