// Filter functionality
        document.addEventListener('DOMContentLoaded', function() {
            const newsItems = document.querySelectorAll('#news-container > .col');
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
                    const itemDate = new Date(item.querySelector('.text-muted').textContent.split(' ').pop().split('.').reverse().join('-'));
                    const itemCategory = item.querySelector('.badge').textContent.trim();
                    const itemTitle = item.querySelector('.card-title').textContent.toLowerCase();
                    const itemDescription = item.querySelector('.card-text').textContent.toLowerCase();
                    
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
        });