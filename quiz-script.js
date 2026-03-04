/**
 * Quiz / Personalization Scripts
 */

let quizAnswers = {};
let currentQuestion = 1;
const totalQuestions = 5;

document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});

function initQuiz() {
    const options = document.querySelectorAll('.quiz-option input');
    const nextBtn = document.getElementById('nextBtn');
    
    options.forEach(option => {
        option.addEventListener('change', () => {
            // Save answer
            const question = option.name;
            quizAnswers[question] = option.value;
            
            // Enable next button
            if (nextBtn) nextBtn.disabled = false;
            
            // Auto-advance after selection
            setTimeout(() => {
                if (currentQuestion < totalQuestions) {
                    nextQuestion();
                }
            }, 500);
        });
    });
}

function startQuiz() {
    document.querySelector('.quiz-hero').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    
    currentQuestion = 1;
    quizAnswers = {};
    updateQuizUI();
}

function nextQuestion() {
    // Validate answer
    const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
    const selected = currentQ?.querySelector('input:checked');
    
    if (!selected) {
        showToast('Por favor selecciona una opción', 'error');
        return;
    }
    
    // Hide current
    currentQ.classList.remove('active');
    
    // Show next
    currentQuestion++;
    const nextQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
    if (nextQ) nextQ.classList.add('active');
    
    updateQuizUI();
}

function prevQuestion() {
    if (currentQuestion <= 1) return;
    
    // Hide current
    const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
    if (currentQ) currentQ.classList.remove('active');
    
    // Show previous
    currentQuestion--;
    const prevQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
    if (prevQ) prevQ.classList.add('active');
    
    updateQuizUI();
}

function updateQuizUI() {
    // Update progress bar
    const progress = (currentQuestion / totalQuestions) * 100;
    const progressFill = document.getElementById('quizProgress');
    const currentQEl = document.getElementById('currentQuestion');
    
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (currentQEl) currentQEl.textContent = currentQuestion;
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.style.visibility = currentQuestion === 1 ? 'hidden' : 'visible';
    }
    
    if (nextBtn) {
        if (currentQuestion === totalQuestions) {
            nextBtn.innerHTML = 'Ver mi Rutina <i class="fas fa-magic"></i>';
            nextBtn.onclick = showResults;
        } else {
            nextBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
            nextBtn.onclick = nextQuestion;
        }
        
        // Check if current question has answer
        const currentQ = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
        const hasAnswer = currentQ?.querySelector('input:checked');
        nextBtn.disabled = !hasAnswer;
    }
}

function showResults() {
    // Validate last question
    const lastQ = document.querySelector(`.quiz-question[data-question="${totalQuestions}"]`);
    if (!lastQ?.querySelector('input:checked')) {
        showToast('Por favor selecciona una opción', 'error');
        return;
    }
    
    // Generate routine based on answers
    const routine = generateRoutine(quizAnswers);
    
    // Hide quiz
    document.getElementById('quizContainer').style.display = 'none';
    
    // Show results
    displayRoutine(routine);
    
    document.getElementById('quizResults').style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Save to localStorage
    localStorage.setItem('fefy_quiz_result', JSON.stringify({
        answers: quizAnswers,
        routine: routine,
        date: new Date().toISOString()
    }));
}

function generateRoutine(answers) {
    const skinType = answers.skinType;
    const concern = answers.concern;
    const age = answers.age;
    const budget = answers.budget;
    
    // Define products database
    const products = {
        cleanser: {
            id: 'cleanser',
            name: 'Gel Limpiador Natural',
            price: 22.90,
            icon: 'fa-pump-soap',
            desc: 'Limpieza suave sin resecar'
        },
        toner: {
            id: 'toner',
            name: 'Tónico Hidratante',
            price: 18.90,
            icon: 'fa-spray-can',
            desc: 'Equilibra y refresca'
        },
        serumVitC: {
            id: 'serum-vit-c',
            name: 'Serum Vitamina C',
            price: 34.90,
            icon: 'fa-droplet',
            desc: 'Ilumina y protege',
            bestseller: true
        },
        serumRetinol: {
            id: 'serum-retinol',
            name: 'Serum Retinol Natural',
            price: 38.90,
            icon: 'fa-eye-dropper',
            desc: 'Anti-edad y renovación'
        },
        serumHA: {
            id: 'serum-ha',
            name: 'Serum Ácido Hialurónico',
            price: 32.90,
            icon: 'fa-tint',
            desc: 'Hidratación profunda'
        },
        moisturizer: {
            id: 'moisturizer',
            name: 'Crema Hidratante',
            price: 29.90,
            icon: 'fa-spa',
            desc: 'Nutrición 24h'
        },
        nightCream: {
            id: 'night-cream',
            name: 'Crema Regeneradora Noche',
            price: 42.90,
            icon: 'fa-moon',
            desc: 'Regeneración nocturna'
        },
        sunscreen: {
            id: 'sunscreen',
            name: 'Protector Solar SPF 50',
            price: 26.90,
            icon: 'fa-sun',
            desc: 'Protección UV'
        },
        eyeCream: {
            id: 'eye-cream',
            name: 'Contorno de Ojos',
            price: 28.90,
            icon: 'fa-eye',
            desc: 'Anti-ojeras y bolsas'
        }
    };
    
    // Generate AM routine based on concern
    let amRoutine = [products.cleanser];
    
    if (concern === 'brightness' || concern === 'anti-aging') {
        amRoutine.push(products.serumVitC);
    } else if (concern === 'hydration') {
        amRoutine.push(products.serumHA);
    } else {
        amRoutine.push(products.toner);
    }
    
    if (age === '46+' || concern === 'anti-aging') {
        amRoutine.push(products.eyeCream);
    }
    
    amRoutine.push(products.moisturizer);
    amRoutine.push(products.sunscreen);
    
    // Generate PM routine
    let pmRoutine = [products.cleanser];
    
    if (concern === 'anti-aging' || age === '36-45' || age === '46+') {
        pmRoutine.push(products.serumRetinol);
    } else if (concern === 'hydration' || concern === 'sensitivity') {
        pmRoutine.push(products.serumHA);
    } else {
        pmRoutine.push(products.serumVitC);
    }
    
    if (age === '46+' || concern === 'anti-aging') {
        pmRoutine.push(products.eyeCream);
    }
    
    pmRoutine.push(products.nightCream);
    
    // Adjust for budget
    if (budget === 'economic') {
        // Remove most expensive items
        amRoutine = amRoutine.filter(p => p.id !== 'eye-cream');
        pmRoutine = pmRoutine.filter(p => p.id !== 'eye-cream' && p.id !== 'night-cream');
    }
    
    // Calculate totals
    const allProducts = [...amRoutine, ...pmRoutine.filter(p => !amRoutine.find(ap => ap.id === p.id))];
    const originalTotal = allProducts.reduce((sum, p) => sum + p.price, 0);
    const discountedTotal = originalTotal * 0.85; // 15% bundle discount
    
    // Routine name based on concern
    const routineNames = {
        'hydration': 'Hidratación Intensa',
        'anti-aging': 'Anti-Edad Avanzado',
        'acne': 'Piel Limpia y Purificada',
        'brightness': 'Luminosidad Radiante',
        'sensitivity': 'Calma y Protección'
    };
    
    return {
        name: routineNames[concern] || 'Personalizada',
        am: amRoutine,
        pm: pmRoutine,
        all: allProducts,
        originalTotal,
        discountedTotal,
        savings: originalTotal - discountedTotal,
        concern: concern,
        skinType: skinType
    };
}

function displayRoutine(routine) {
    // Update header
    const routineType = document.getElementById('routineType');
    const routineDesc = document.getElementById('routineDesc');
    
    if (routineType) routineType.textContent = routine.name;
    if (routineDesc) {
        routineDesc.textContent = `Rutina diseñada para piel ${routine.skinType} con focus en ${routine.concern}`;
    }
    
    // AM Routine
    const amContainer = document.getElementById('amRoutine');
    if (amContainer) {
        amContainer.innerHTML = routine.am.map((product, index) => `
            <div class="routine-step" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <div class="step-image">
                        <i class="fas ${product.icon}"></i>
                    </div>
                    <div class="step-info">
                        <h4>${product.name}</h4>
                        <p>${product.desc}</p>
                        ${product.bestseller ? '<span class="badge-bestseller">Bestseller</span>' : ''}
                        <span class="step-price">€${product.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // PM Routine
    const pmContainer = document.getElementById('pmRoutine');
    if (pmContainer) {
        pmContainer.innerHTML = routine.pm.map((product, index) => `
            <div class="routine-step" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <div class="step-image">
                        <i class="fas ${product.icon}"></i>
                    </div>
                    <div class="step-info">
                        <h4>${product.name}</h4>
                        <p>${product.desc}</p>
                        ${product.bestseller ? '<span class="badge-bestseller">Bestseller</span>' : ''}
                        <span class="step-price">€${product.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Summary
    const summaryContainer = document.getElementById('summaryProducts');
    if (summaryContainer) {
        summaryContainer.innerHTML = routine.all.map(product => `
            <div class="summary-product">
                <div class="product-icon">
                    <i class="fas ${product.icon}"></i>
                </div>
                <span class="product-name">${product.name}</span>
                <span class="product-price">€${product.price.toFixed(2)}</span>
            </div>
        `).join('');
    }
    
    // Totals
    const originalPrice = document.getElementById('originalPrice');
    const finalPrice = document.getElementById('finalPrice');
    const savings = document.getElementById('savings');
    
    if (originalPrice) originalPrice.textContent = `€${routine.originalTotal.toFixed(2)}`;
    if (finalPrice) finalPrice.textContent = `€${routine.discountedTotal.toFixed(2)}`;
    if (savings) savings.textContent = `Ahorras €${routine.savings.toFixed(2)} (15% OFF)`;
    
    // Tips
    const tipsGrid = document.getElementById('tipsGrid');
    if (tipsGrid) {
        const tips = getRoutineTips(routine.concern, routine.skinType);
        tipsGrid.innerHTML = tips.map(tip => `
            <div class="tip-card" data-aos="fade-up">
                <i class="fas ${tip.icon}"></i>
                <h4>${tip.title}</h4>
                <p>${tip.text}</p>
            </div>
        `).join('');
    }
}

function getRoutineTips(concern, skinType) {
    const tips = {
        hydration: [
            { icon: 'fa-tint', title: 'Hidratación Layering', text: 'Aplica productos de más ligero a más denso para sellar la humedad.' },
            { icon: 'fa-clock', title: 'Timing Importa', text: 'Aplica el serum sobre piel ligeramente húmeda para mejor absorción.' }
        ],
        'anti-aging': [
            { icon: 'fa-sun', title: 'SPF es Clave', text: 'El retinol aumenta la sensibilidad al sol. Usa SPF 50 todos los días.' },
            { icon: 'fa-moon', title: 'Rutina Nocturna', text: 'El retinol solo de noche. Alterna con Vitamina C por la mañana.' }
        ],
        acne: [
            { icon: 'fa-hand-sparkles', title: 'No Toques', text: 'Evita tocar la cara. Limpia tu teléfono diariamente.' },
            { icon: 'fa-sync', title: 'Paciencia', text: 'Los resultados tardan 4-6 semanas. Sé constante con la rutina.' }
        ],
        brightness: [
            { icon: 'fa-sun', title: 'Protección Solar', text: 'La Vitamina C + SPF 50 = piel radiante y protegida.' },
            { icon: 'fa-glass-water', title: 'Hidratación', text: 'Bebe 2L de agua al día para luminosidad desde dentro.' }
        ],
        sensitivity: [
            { icon: 'fa-leaf', title: 'Patch Test', text: 'Prueba productos nuevos en el antebrazo 24h antes.' },
            { icon: 'fa-wind', title: 'Simplifica', text: 'Menos es más. Usa solo lo necesario para no sobrecargar.' }
        ]
    };
    
    return tips[concern] || tips.hydration;
}

function addRoutineToCart() {
    const routine = generateRoutine(quizAnswers);
    
    // Add all products to cart
    routine.all.forEach(product => {
        AppState.cart.push({
            id: product.id,
            name: product.name,
            price: product.price * 0.85, // 15% discount
            size: '30ml',
            image: product.icon,
            quantity: 1,
            fromQuiz: true
        });
    });
    
    saveCart();
    updateCartUI();
    
    // Add loyalty points
    addLoyaltyPoints(Math.floor(routine.discountedTotal));
    
    showToast(`¡Rutina añadida! +${Math.floor(routine.discountedTotal)} puntos`, 'success');
    
    // Redirect to checkout
    setTimeout(() => {
        window.location.href = 'checkout.html?code=QUIZ10';
    }, 1500);
}

function emailRoutine() {
    const email = prompt('Introduce tu email para recibir tu rutina:');
    if (email && email.includes('@')) {
        showToast('Rutina enviada a tu email. ¡Revisa tu bandeja de entrada!', 'success');
        addLoyaltyPoints(20);
    } else if (email) {
        showToast('Email no válido', 'error');
    }
}

function restartQuiz() {
    currentQuestion = 1;
    quizAnswers = {};
    
    // Reset UI
    document.querySelectorAll('.quiz-option input').forEach(input => {
        input.checked = false;
    });
    
    document.querySelectorAll('.quiz-question').forEach((q, index) => {
        q.classList.toggle('active', index === 0);
    });
    
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    
    updateQuizUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global exports
window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.prevQuestion = prevQuestion;
window.showResults = showResults;
window.addRoutineToCart = addRoutineToCart;
window.emailRoutine = emailRoutine;
window.restartQuiz = restartQuiz;
