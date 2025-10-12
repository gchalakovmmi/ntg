function openTeamModal(data) {
    const modal = document.getElementById('teamMemberModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const modalName = document.getElementById('modalName');
    const modalPosition = document.getElementById('modalPosition');
    const modalDetails = document.getElementById('modalDetails');

    modalPhoto.src = data.photo;
    modalPhoto.alt = data.name;
    modalName.textContent = data.name;
    modalPosition.textContent = data.position;

    let detailsHTML = '';
    
    if (data.education) {
        detailsHTML += `
            <div class="info-item">
                <div class="info-label">Образование</div>
                <div class="info-value">${data.education}</div>
            </div>
        `;
    }
    
    if (data.subjects) {
        detailsHTML += `
            <div class="info-item">
                <div class="info-label">Преподавани предмети</div>
                <div class="info-value">${data.subjects}</div>
            </div>
        `;
    }
    
    if (data.experience) {
        detailsHTML += `
            <div class="info-item">
                <div class="info-label">Професионален опит</div>
                <div class="info-value">${data.experience}</div>
            </div>
        `;
    }
    
    if (data.contact) {
        detailsHTML += `
            <div class="info-item">
                <div class="info-label">Контакт</div>
                <div class="info-value">${data.contact}</div>
            </div>
        `;
    }

    modalDetails.innerHTML = detailsHTML;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openTeamModalFromData(element) {
    const data = {
        name: element.dataset.name,
        position: element.dataset.position,
        photo: element.dataset.photo,
        education: element.dataset.education,
        subjects: element.dataset.subjects,
        experience: element.dataset.experience,
        contact: element.dataset.contact
    };
    openTeamModal(data);
}

function closeTeamModal() {
    const modal = document.getElementById('teamMemberModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('teamMemberModal');
    if (event.target === modal) {
        closeTeamModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTeamModal();
    }
});