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
        
        // Detect if image is a real photo path or Font Awesome icon
        const isImagePath = item.image && item.image.includes('/');
        const imageHtml = isImagePath 
            ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`
            : `<i class="fas ${item.image || 'fa-spa'}"></i>`;
        
        html += `
            <div class="summary-item">
                <div class="item-info">
                    <div class="item-image" style="${isImagePath ? 'background:none;overflow:hidden;padding:0;' : ''}">
                        ${imageHtml}
                    </div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${item.size} × ${item.quantity}</p>
                    </div>
                </div>
                <span class="item-total">$${itemTotal.toLocaleString('es-CL')}</span>
            </div>
        `;
    });
    
    summaryItems.innerHTML = html;
    
    orderData.subtotal = subtotal;
    orderData.total = subtotal;
    
    // Update displays
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('es-CL')}`;
    updateTotal();
    
    // Calculate loyalty points ($1.000 = 1 punto)
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
    
    if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
    if (payButtonAmount) payButtonAmount.textContent = `$${total.toLocaleString('es-CL')}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-CL')}`;
    
    // Update discount line
    const discountLine = document.getElementById('discountLine');
    const discountAmount = document.getElementById('discountAmount');
    
    if (discount > 0) {
        if (discountLine) discountLine.style.display = 'flex';
        if (discountAmount) discountAmount.textContent = `-$${discount.toLocaleString('es-CL')}`;
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

// Process Payment with Mercado Pago Checkout Pro
async function processPayment() {
    if (AppState.cart.length === 0) {
        showToast('Tu carrito está vacío', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }
    
    // Show loading
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'flex';
    
    try {
        // Get payer info from form
        const email = document.getElementById('email')?.value;
        const firstName = document.getElementById('firstName')?.value;
        const lastName = document.getElementById('lastName')?.value;
        
        const items = AppState.cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));
        
        const payer = {};
        if (email) payer.email = email;
        if (firstName) payer.name = firstName;
        if (lastName) payer.surname = lastName;
        
        const response = await fetch('/api/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items,
                payer: Object.keys(payer).length > 0 ? payer : undefined
            })
        });
        
        const data = await response.json();
        
        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Error creando la preferencia de pago');
        }
        
        console.log('[MP] Preference created:', data.preferenceId);
        
        // Redirect to Mercado Pago checkout
        window.location.href = data.initPoint || data.sandboxInitPoint;
        
    } catch (error) {
        console.error('[MP] Checkout error:', error);
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        showToast(error.message || 'Error al iniciar el pago. Intenta de nuevo.', 'error');
    }
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
                    <span>$${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                </div>
            `;
        });
        html += `
            <div class="confirm-total">
                <strong>Total</strong>
                <strong>$${order.total.toLocaleString('es-CL')}</strong>
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
