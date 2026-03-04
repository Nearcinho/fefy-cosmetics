/**
 * FEFY COSMETICS - Enhanced Premium JavaScript
 * Full E-commerce functionality with localStorage
 */

// ==========================================
// GLOBAL STATE
// ==========================================
const AppState = {
    cart: JSON.parse(localStorage.getItem('fefy_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('fefy_wishlist')) || [],
    loyaltyPoints: parseInt(localStorage.getItem('fefy_points')) || 0,
    darkMode: localStorage.getItem('fefy_darkmode') === 'true',
    recentlyViewed: JSON.parse(localStorage.getItem('fefy_recent')) || [],
    user: JSON.parse(localStorage.getItem('fefy_user')) || null
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Initialize all modules
    initDarkMode();
    initHeader();
    initMobileMenu();
    initCart();
    initWishlist();
    initSearch();
    initTestimonials();
    initNewsletter();
    initScrollEffects();
    initAnimations();
    initPopups();
    
    // Update UI
    updateCartUI();
    updateWishlistUI();
    updateLoyaltyUI();
    
    console.log('🌸 Fefy Cosmetics - Full E-commerce Loaded');
});

// ==========================================
// DARK MODE
// ==========================================
function initDarkMode() {
    if (AppState.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Add toggle button to header if not exists
    const navActions = document.querySelector('.nav__actions');
    if (navActions && !document.querySelector('.dark-mode-toggle')) {
        const darkToggle = document.createElement('button');
        darkToggle.className = 'action-btn dark-mode-toggle';
        darkToggle.innerHTML = AppState.darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        darkToggle.onclick = toggleDarkMode;
        navActions.insertBefore(darkToggle, navActions.firstChild);
    }
}

function toggleDarkMode() {
    AppState.darkMode = !AppState.darkMode;
    localStorage.setItem('fefy_darkmode', AppState.darkMode);
    
    if (AppState.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    // Update toggle icon
    const toggle = document.querySelector('.dark-mode-toggle');
    if (toggle) {
        toggle.innerHTML = AppState.darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    
    showToast(AppState.darkMode ? 'Modo oscuro activado' : 'Modo claro activado', 'info');
}

// ==========================================
// HEADER
// ==========================================
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const spans = navToggle.querySelectorAll('span');
        
        if (navMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ==========================================
// CART FUNCTIONALITY
// ==========================================
function initCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    
    if (!cartBtn || !cartSidebar) return;
    
    cartBtn.addEventListener('click', openCart);
    if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar) cartSidebar.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    renderCart();
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function addToCart(product = null) {
    if (!product) {
        // Default product for demo
        product = {
            id: 'serum-vit-c',
            name: 'Serum Vitamina C Iluminador',
            price: 34.90,
            size: '30ml',
            image: 'fa-droplet',
            quantity: parseInt(document.getElementById('quantity')?.value || 1)
        };
    }
    
    const existingItem = AppState.cart.find(item => item.id === product.id && item.size === product.size);
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        AppState.cart.push(product);
    }
    
    saveCart();
    updateCartUI();
    
    // Animation
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.3)';
        setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
    }
    
    showToast('Producto añadido al carrito', 'success');
}

function removeFromCart(index) {
    AppState.cart.splice(index, 1);
    saveCart();
    updateCartUI();
    renderCart();
    showToast('Producto eliminado', 'info');
}

function updateCartQuantity(index, delta) {
    AppState.cart[index].quantity += delta;
    if (AppState.cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        updateCartUI();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('fefy_cart', JSON.stringify(AppState.cart));
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `€${totalPrice.toFixed(2)}`;
}

function renderCart() {
    const cartBody = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    if (!cartBody) return;
    
    if (AppState.cart.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Tu carrito está vacío</p>
                <a href="index.html#productos" class="btn btn-primary" onclick="closeCartSidebar()">Ver Productos</a>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    let html = '<div class="cart-items">';
    let total = 0;
    
    AppState.cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item__image">
                    <i class="fas ${item.image}"></i>
                </div>
                <div class="cart-item__details">
                    <h4>${item.name}</h4>
                    <p class="item-size">${item.size}</p>
                    <p class="item-price">€${item.price.toFixed(2)}</p>
                    <div class="item-quantity">
                        <button onclick="updateCartQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });
    
    html += '</div>';
    cartBody.innerHTML = html;
    
    // Update totals
    const shipping = total >= 50 ? 0 : 3.90;
    const finalTotal = total + shipping;
    
    if (cartFooter) {
        cartFooter.style.display = 'block';
        
        // Progress bar for free shipping
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            const progress = Math.min((total / 50) * 100, 100);
            progressFill.style.width = `${progress}%`;
            
            if (total >= 50) {
                progressText.innerHTML = '✨ ¡Envío gratis conseguido!';
            } else {
                const remaining = (50 - total).toFixed(2);
                progressText.innerHTML = `¡Te faltan €${remaining} para envío gratis!`;
            }
        }
        
        // Update total
        const cartTotalEl = document.getElementById('cartTotal');
        if (cartTotalEl) cartTotalEl.textContent = `€${finalTotal.toFixed(2)}`;
    }
}

function continueShopping() {
    closeCartSidebar();
}

// ==========================================
// WISHLIST
// ==========================================
function initWishlist() {
    updateWishlistUI();
}

function toggleWishlist(product = null) {
    if (!product) {
        // Toggle UI state for demo
        const btn = document.querySelector('.wishlist-add, .meta-btn');
        if (btn) {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showToast('Añadido a favoritos', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showToast('Eliminado de favoritos', 'info');
            }
        }
        return;
    }
    
    const index = AppState.wishlist.findIndex(item => item.id === product.id);
    
    if (index > -1) {
        AppState.wishlist.splice(index, 1);
        showToast('Eliminado de favoritos', 'info');
    } else {
        AppState.wishlist.push(product);
        showToast('Añadido a favoritos', 'success');
    }
    
    localStorage.setItem('fefy_wishlist', JSON.stringify(AppState.wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = AppState.wishlist.length;
    }
}

// ==========================================
// SEARCH
// ==========================================
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    if (!searchToggle) return;
    
    searchToggle.addEventListener('click', openSearch);
}

function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.getElementById('searchInput')?.focus();
    }
}

function closeSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) overlay.classList.remove('active');
}

// ==========================================
// TESTIMONIALS
// ==========================================
function initTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialCards.length === 0) return;
    
    let currentTestimonial = 0;
    let interval;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        testimonialCards[index]?.classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function next() {
        showTestimonial((currentTestimonial + 1) % testimonialCards.length);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            showTestimonial(index);
            interval = setInterval(next, 5000);
        });
    });
    
    interval = setInterval(next, 5000);
    
    const slider = document.querySelector('.testimonials__slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(interval));
        slider.addEventListener('mouseleave', () => interval = setInterval(next, 5000));
    }
}

// ==========================================
// NEWSLETTER
// ==========================================
function initNewsletter() {
    const form = document.querySelector('.newsletter__form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]')?.value;
        if (!email) return;
        
        // Save to localStorage
        const subscribers = JSON.parse(localStorage.getItem('fefy_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('fefy_subscribers', JSON.stringify(subscribers));
        }
        
        // Add loyalty points
        addLoyaltyPoints(50);
        
        showToast('¡Bienvenida! +50 puntos por suscribirte', 'success');
        this.reset();
    });
}

// ==========================================
// LOYALTY POINTS
// ==========================================
function addLoyaltyPoints(points) {
    AppState.loyaltyPoints += points;
    localStorage.setItem('fefy_points', AppState.loyaltyPoints);
    updateLoyaltyUI();
}

function updateLoyaltyUI() {
    // Update any loyalty point displays
    document.querySelectorAll('.loyalty-points').forEach(el => {
        el.textContent = AppState.loyaltyPoints;
    });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================
function initScrollEffects() {
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// ANIMATIONS
// ==========================================
function initAnimations() {
    // Product card 3D tilt
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 1024) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ==========================================
// POPUPS
// ==========================================
function initPopups() {
    // Exit intent popup
    let exitIntentShown = sessionStorage.getItem('exitIntentShown');
    
    if (!exitIntentShown) {
        document.addEventListener('mouseout', function(e) {
            if (e.clientY < 0 && !exitIntentShown) {
                showExitPopup();
                exitIntentShown = true;
                sessionStorage.setItem('exitIntentShown', 'true');
            }
        });
    }
    
    // Welcome discount popup (after 5 seconds)
    setTimeout(() => {
        if (!localStorage.getItem('welcomeShown')) {
            showWelcomePopup();
            localStorage.setItem('welcomeShown', 'true');
        }
    }, 5000);
}

function showExitPopup() {
    // Simple exit intent toast
    showToast('¡Espera! Usa código BIENVENIDA10 para 10% de descuento', 'info', 5000);
}

function showWelcomePopup() {
    showToast('🎁 ¡Bienvenida! Código BIENVENIDA10: 10% de descuento en tu primera compra', 'success', 6000);
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function formatPrice(price) {
    return `€${price.toFixed(2)}`;
}

function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

// Global exports for inline handlers
window.AppState = AppState;
window.openCart = openCart;
window.closeCartSidebar = closeCartSidebar;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleWishlist = toggleWishlist;
window.continueShopping = continueShopping;
window.showToast = showToast;
window.toggleDarkMode = toggleDarkMode;
window.closeSearch = closeSearch;
window.addLoyaltyPoints = addLoyaltyPoints;
window.formatPrice = formatPrice;
