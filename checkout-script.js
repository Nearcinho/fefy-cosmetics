/**
 * Checkout Page Scripts
 */

let currentStep = 1;
let orderData = {
    items: [],
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0
};

document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    initShippingMethods();
    initPaymentMethods();
    initDiscountCode();
    initGiftOption();
    updateStepDisplay();
});

// Load Order Summary from Cart
function loadOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('totalAmount');
    const payButtonAmount = document.getElementById('payButtonAmount');
    const loyaltyPoints = document.getElementById('loyaltyPoints');
    
    if (!summaryItems) return;
    
    // Get cart items
    const cart = AppState.cart;
    
    if (cart.length === 0) {
        // Redirect to home if empty cart
        showToast('Tu carrito está vacío', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    orderData.items = cart;
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="summary-item">
                <div class="item-info">
                    <div class="item-image">
                        <i class="fas ${item.image}"></i>
                    </div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${item.size} × ${item.quantity}</p>
                    </div>
                </div>
                <span class="item-total">€${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    summaryItems.innerHTML = html;
    
    orderData.subtotal = subtotal;
    orderData.total = subtotal;
    
    // Update displays
    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    updateTotal();
    
    // Calculate loyalty points (1€ = 1 punto)
    if (loyaltyPoints) loyaltyPoints.textContent = `${Math.floor(subtotal)} puntos`;
}

// Update Total
function updateTotal() {
    const totalEl = document.getElementById('totalAmount');
    const payButtonAmount = document.getElementById('payButtonAmount');
    const shippingEl = document.getElementById('shippingCost');
    
    const shipping = orderData.shipping;
    const discount = orderData.discount;
    const total = orderData.subtotal + shipping - discount;
    orderData.total = total;
    
    if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
    if (payButtonAmount) payButtonAmount.textContent = `€${total.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Gratis' : `€${shipping.toFixed(2)}`;
    
    // Update discount line
    const discountLine = document.getElementById('discountLine');
    const discountAmount = document.getElementById('discountAmount');
    
    if (discount > 0) {
        if (discountLine) discountLine.style.display = 'flex';
        if (discountAmount) discountAmount.textContent = `-€${discount.toFixed(2)}`;
    } else {
        if (discountLine) discountLine.style.display = 'none';
    }
}

// Navigation Steps
function goToStep(step) {
    // Validate current step before proceeding
    if (step > currentStep && !validateStep(currentStep)) {
        return;
    }
    
    currentStep = step;
    updateStepDisplay();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
    if (step === 1) {
        const email = document.getElementById('email')?.value;
        if (!email || !email.includes('@')) {
            showToast('Por favor introduce un email válido', 'error');
            return false;
        }
        // Save email for confirmation
        localStorage.setItem('checkout_email', email);
    }
    
    if (step === 2) {
        const required = ['firstName', 'lastName', 'address', 'postalCode', 'city', 'province'];
        for (const field of required) {
            if (!document.getElementById(field)?.value) {
                showToast('Por favor completa todos los campos obligatorios', 'error');
                return false;
            }
        }
    }
    
    return true;
}

function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step${currentStep}`);
    if (currentStepEl) currentStepEl.classList.add('active');
    
    // Update progress
    document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('completed');
        }
    });
}

// Shipping Methods
function initShippingMethods() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    
    shippingOptions.forEach(option => {
        option.addEventListener('change', () => {
            orderData.shipping = parseFloat(option.dataset.price || 0);
            updateTotal();
        });
    });
}

// Payment Methods
function initPaymentMethods() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardForm = document.getElementById('cardForm');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (cardForm) {
                cardForm.style.display = option.value === 'card' ? 'block' : 'none';
            }
        });
    });
    
    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
            e.target.value = formattedValue;
        });
    }
    
    // Expiry formatting
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
}

// Discount Code
function initDiscountCode() {
    const discountInput = document.getElementById('discountCode');
    
    // Check for code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code && discountInput) {
        discountInput.value = code;
    }
}

function applyDiscount() {
    const code = document.getElementById('discountCode')?.value.toUpperCase();
    
    const discounts = {
        'BIENVENIDA10': 0.10,
        'FEFY15': 0.15,
        'FREESHIP': 0,
        'QUIZ10': 0.10
    };
    
    if (discounts[code] !== undefined) {
        if (code === 'FREESHIP') {
            orderData.shipping = 0;
            document.querySelector('input[value="standard"]').checked = true;
            showToast('¡Envío gratis aplicado!', 'success');
        } else {
            orderData.discount = orderData.subtotal * discounts[code];
            showToast(`¡Descuento ${code} aplicado!`, 'success');
        }
        updateTotal();
    } else {
        showToast('Código no válido', 'error');
    }
}

// Gift Option
function initGiftOption() {
    const isGift = document.getElementById('isGift');
    const giftMessage = document.getElementById('giftMessage');
    
    if (isGift && giftMessage) {
        isGift.addEventListener('change', () => {
            giftMessage.style.display = isGift.checked ? 'block' : 'none';
        });
    }
}

// Process Payment
function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber')?.value;
        const cardName = document.getElementById('cardName')?.value;
        const cardExpiry = document.getElementById('cardExpiry')?.value;
        const cardCvc = document.getElementById('cardCvc')?.value;
        
        if (!cardNumber || !cardName || !cardExpiry || !cardCvc) {
            showToast('Por favor completa los datos de la tarjeta', 'error');
            return;
        }
    }
    
    // Show loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';
    
    // Simulate processing
    setTimeout(() => {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        
        // Generate order number
        const orderNumber = 'FC-' + Date.now().toString().slice(-6);
        
        // Save order
        const order = {
            number: orderNumber,
            date: new Date().toISOString(),
            items: orderData.items,
            total: orderData.total,
            email: localStorage.getItem('checkout_email')
        };
        
        localStorage.setItem('last_order', JSON.stringify(order));
        
        // Clear cart
        AppState.cart = [];
        saveCart();
        
        // Add loyalty points
        addLoyaltyPoints(Math.floor(orderData.total));
        
        // Show confirmation
        showConfirmation(order);
        
        // Go to step 4
        goToStep(4);
    }, 2000);
}

// Show Confirmation
function showConfirmation(order) {
    const confirmEmail = document.getElementById('confirmEmail');
    const confirmItems = document.getElementById('confirmItems');
    
    if (confirmEmail) {
        confirmEmail.textContent = order.email;
    }
    
    if (confirmItems) {
        let html = '';
        order.items.forEach(item => {
            html += `
                <div class="confirm-item">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>€${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });
        html += `
            <div class="confirm-total">
                <strong>Total</strong>
                <strong>€${order.total.toFixed(2)}</strong>
            </div>
        `;
        confirmItems.innerHTML = html;
    }
}

// Login Modal (placeholder)
function showLoginModal() {
    showToast('Inicio de sesión en desarrollo', 'info');
}

// Global exports
window.goToStep = goToStep;
window.applyDiscount = applyDiscount;
window.processPayment = processPayment;
window.showLoginModal = showLoginModal;
