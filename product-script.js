/**
 * Product Detail Page Scripts
 */

document.addEventListener('DOMContentLoaded', function() {
    initProductTabs();
    initVariantSelector();
    initImageGallery();
    initStarRating();
    loadReviews();
    addToRecentlyViewed();
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

// Variant Selector
function initVariantSelector() {
    const variantBtns = document.querySelectorAll('.variant-btn');
    const currentPrice = document.querySelector('.current-price');
    
    variantBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            variantBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const price = btn.dataset.price;
            if (currentPrice && price) {
                currentPrice.textContent = `€${price}`;
            }
        });
    });
}

// Image Gallery
function initImageGallery() {
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.querySelector('.image-main');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // In real implementation, this would change the main image
        });
    });
}

// Quantity Selector
function updateQty(delta) {
    const input = document.getElementById('quantity');
    if (!input) return;
    
    let value = parseInt(input.value) + delta;
    value = Math.max(1, Math.min(5, value));
    input.value = value;
}

// Add to Cart from Product Page
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);
    const variantBtn = document.querySelector('.variant-btn.active');
    const size = variantBtn?.dataset.size || '30ml';
    const price = parseFloat(variantBtn?.dataset.price || 34.90);
    const isSubscription = document.getElementById('subscribeCheck')?.checked;
    
    const product = {
        id: 'serum-vit-c-' + size,
        name: 'Serum Vitamina C Iluminador',
        price: isSubscription ? price * 0.85 : price,
        originalPrice: price,
        size: size,
        image: 'fa-droplet',
        quantity: quantity,
        isSubscription: isSubscription
    };
    
    // Check if item already in cart
    const existingIndex = AppState.cart.findIndex(item => 
        item.id === product.id && item.size === product.size
    );
    
    if (existingIndex > -1) {
        AppState.cart[existingIndex].quantity += quantity;
    } else {
        AppState.cart.push(product);
    }
    
    saveCart();
    updateCartUI();
    openCart();
    
    // Add loyalty points
    addLoyaltyPoints(Math.floor(product.price * quantity));
}

// Buy Now
function buyNow() {
    addToCart();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

// Wishlist Toggle
function toggleWishlist() {
    const btn = document.querySelector('.wishlist-add');
    const icon = btn?.querySelector('i');
    
    if (!btn) return;
    
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        icon?.classList.remove('far');
        icon?.classList.add('fas');
        showToast('Añadido a favoritos', 'success');
        
        // Add to wishlist
        AppState.wishlist.push({
            id: 'serum-vit-c',
            name: 'Serum Vitamina C Iluminador',
            price: 34.90
        });
    } else {
        icon?.classList.remove('fas');
        icon?.classList.add('far');
        showToast('Eliminado de favoritos', 'info');
        
        // Remove from wishlist
        AppState.wishlist = AppState.wishlist.filter(item => item.id !== 'serum-vit-c');
    }
    
    localStorage.setItem('fefy_wishlist', JSON.stringify(AppState.wishlist));
    updateWishlistUI();
}

// Share Product
function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: 'Serum Vitamina C Iluminador - Fefy Cosmetics',
            text: 'Mira este increíble serum que encontré',
            url: window.location.href
        });
    } else {
        // Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast('Enlace copiado al portapapeles', 'success');
    }
}

// Zoom Modal
function openZoom() {
    document.getElementById('zoomModal')?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeZoom() {
    document.getElementById('zoomModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

// Star Rating Input
function initStarRating() {
    const stars = document.querySelectorAll('.star-input i');
    let selectedRating = 0;
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            selectedRating = index + 1;
            updateStarDisplay(selectedRating);
        });
        
        star.addEventListener('mouseenter', () => {
            updateStarDisplay(index + 1);
        });
    });
    
    document.querySelector('.star-input')?.addEventListener('mouseleave', () => {
        updateStarDisplay(selectedRating);
    });
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.star-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Review Modal
function openReviewModal() {
    document.getElementById('reviewModal')?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReviewModal() {
    document.getElementById('reviewModal')?.classList.remove('active');
    document.body.style.overflow = '';
}

// Submit Review
function submitReview(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const review = {
        id: Date.now(),
        name: formData.get('name'),
        skinType: formData.get('skinType'),
        review: formData.get('review'),
        rating: document.querySelectorAll('.star-input i.fas').length,
        date: new Date().toLocaleDateString('es-ES'),
        verified: true
    };
    
    // Save to localStorage
    const reviews = JSON.parse(localStorage.getItem('fefy_reviews') || '[]');
    reviews.unshift(review);
    localStorage.setItem('fefy_reviews', JSON.stringify(reviews));
    
    // Add loyalty points
    addLoyaltyPoints(50);
    
    showToast('¡Reseña publicada! +50 puntos', 'success');
    closeReviewModal();
    loadReviews();
    e.target.reset();
}

// Load Reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    const reviews = JSON.parse(localStorage.getItem('fefy_reviews') || '[]');
    
    // Add default reviews if none exist
    if (reviews.length === 0) {
        const defaultReviews = [
            {
                id: 1,
                name: 'María G.',
                skinType: 'Mixta',
                review: 'Increíble serum. Mi piel nunca se vio tan radiante. Después de 2 semanas usando, noto mucha diferencia en la luminosidad.',
                rating: 5,
                date: '15/02/2024',
                verified: true
            },
            {
                id: 2,
                name: 'Laura M.',
                skinType: 'Sensible',
                review: 'Tenía miedo por mi piel sensible pero es súper suave. No me ha irritado nada y el efecto es visible.',
                rating: 5,
                date: '10/02/2024',
                verified: true
            },
            {
                id: 3,
                name: 'Carmen R.',
                skinType: 'Seca',
                review: 'Me encanta la textura y cómo se absorbe rápido. La piel queda muy hidratada y luminosa.',
                rating: 4,
                date: '05/02/2024',
                verified: true
            }
        ];
        localStorage.setItem('fefy_reviews', JSON.stringify(defaultReviews));
        reviews.push(...defaultReviews);
    }
    
    let html = '';
    reviews.slice(0, 5).forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        html += `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-author">
                        <div class="review-avatar">${review.name.charAt(0)}</div>
                        <div class="review-meta">
                            <h4>${review.name}</h4>
                            <span>${review.date}</span>
                        </div>
                    </div>
                    ${review.verified ? '<span class="review-verified"><i class="fas fa-check-circle"></i> Verificado</span>' : ''}
                </div>
                <div class="review-rating">${stars}</div>
                <p class="review-text">${review.review}</p>
                <span class="review-skin-type">Piel ${review.skinType}</span>
            </div>
        `;
    });
    
    reviewsList.innerHTML = html;
}

function loadMoreReviews() {
    showToast('Cargando más reseñas...', 'info');
}

// Add to Recently Viewed
function addToRecentlyViewed() {
    const product = {
        id: 'serum-vit-c',
        name: 'Serum Vitamina C Iluminador',
        price: 34.90,
        image: 'fa-droplet'
    };
    
    // Remove if already exists
    AppState.recentlyViewed = AppState.recentlyViewed.filter(item => item.id !== product.id);
    
    // Add to beginning
    AppState.recentlyViewed.unshift(product);
    
    // Keep only 4
    AppState.recentlyViewed = AppState.recentlyViewed.slice(0, 4);
    
    localStorage.setItem('fefy_recent', JSON.stringify(AppState.recentlyViewed));
}

// Add Routine to Cart
function addRoutineToCart() {
    const checkboxes = document.querySelectorAll('.routine-check input:checked');
    
    checkboxes.forEach(checkbox => {
        const price = parseFloat(checkbox.dataset.price);
        const product = {
            id: 'routine-' + Date.now(),
            name: checkbox.closest('.routine-item').querySelector('h4').textContent,
            price: price,
            size: '30ml',
            image: 'fa-spa',
            quantity: 1
        };
        
        AppState.cart.push(product);
    });
    
    // Add main product
    AppState.cart.push({
        id: 'serum-vit-c',
        name: 'Serum Vitamina C Iluminador',
        price: 34.90,
        size: '30ml',
        image: 'fa-droplet',
        quantity: 1
    });
    
    saveCart();
    updateCartUI();
    openCart();
    
    showToast('Rutina añadida al carrito con 15% de descuento', 'success');
}

// Global exports
window.updateQty = updateQty;
window.buyNow = buyNow;
window.shareProduct = shareProduct;
window.openZoom = openZoom;
window.closeZoom = closeZoom;
window.openReviewModal = openReviewModal;
window.closeReviewModal = closeReviewModal;
window.submitReview = submitReview;
window.loadMoreReviews = loadMoreReviews;
window.addRoutineToCart = addRoutineToCart;
