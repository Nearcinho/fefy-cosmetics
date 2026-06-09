/**
 * Product Detail Page Scripts - UI Interactions
 * Product data is loaded dynamically by product.html
 */

document.addEventListener('DOMContentLoaded', function() {
    initProductTabs();
    initImageGallery();
    initStarRating();
    loadReviews();
});

// Product Tabs
function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tab)?.classList.add('active');
        });
    });
}

// Image Gallery
function initImageGallery() {
    // Thumbnail click is handled by inline script in product.html
}

// Quantity Selector
function updateQty(delta) {
    const input = document.getElementById('quantity');
    if (!input) return;
    let value = parseInt(input.value) + delta;
    value = Math.max(1, Math.min(10, value));
    input.value = value;
}

// Star Rating Input
function initStarRating() {
    const stars = document.querySelectorAll('.star-input i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            stars.forEach((s, i) => {
                s.className = i < rating ? 'fas fa-star' : 'far fa-star';
            });
        });
    });
}

// Reviews
function loadReviews() {
    const container = document.getElementById('reviewsList');
    if (!container) return;
    const reviews = JSON.parse(localStorage.getItem('fefy_reviews') || '[]');
    if (reviews.length === 0) {
        container.innerHTML = '<p style="color:#999;text-align:center;padding:24px;">Sé el primero en escribir una reseña.</p>';
        return;
    }
    container.innerHTML = reviews.slice(0, 5).map(r => `
        <div class="review-item">
            <div class="review-header">
                <strong>${r.name}</strong>
                <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
            </div>
            <p class="review-text">${r.review}</p>
            <span class="review-date">${r.date || 'Hace poco'}</span>
        </div>
    `).join('');
}

function loadMoreReviews() {
    loadReviews(); // In real app would paginate
}

function openReviewModal() {
    document.getElementById('reviewModal').classList.add('active');
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('active');
}

function submitReview(e) {
    e.preventDefault();
    const form = e.target;
    const rating = document.querySelectorAll('.star-input .fas').length;
    const review = {
        name: form.name.value,
        skinType: form.skinType.value,
        review: form.review.value,
        rating: rating || 5,
        date: new Date().toLocaleDateString('es-CL'),
        productId: new URLSearchParams(window.location.search).get('id')
    };
    const reviews = JSON.parse(localStorage.getItem('fefy_reviews') || '[]');
    reviews.unshift(review);
    localStorage.setItem('fefy_reviews', JSON.stringify(reviews));
    closeReviewModal();
    form.reset();
    loadReviews();
    if (window.showToast) window.showToast('¡Reseña publicada con éxito!', 'success');
}

// Zoom
function openZoom() {
    const modal = document.getElementById('zoomModal');
    if (modal) modal.classList.add('active');
}

function closeZoom() {
    const modal = document.getElementById('zoomModal');
    if (modal) modal.classList.remove('active');
}

// Close modals on backdrop click
document.addEventListener('click', function(e) {
    if (e.target.id === 'zoomModal') closeZoom();
    if (e.target.id === 'reviewModal') closeReviewModal();
});
