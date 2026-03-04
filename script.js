/**
 * FEFY COSMETICS - Premium JavaScript
 * Interactions and Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        
        // Animate hamburger
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

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ==========================================
    // ACTIVE NAV LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });

    // ==========================================
    // CART SIDEBAR
    // ==========================================
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    // ==========================================
    // ADD TO CART FUNCTIONALITY
    // ==========================================
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation
            btn.innerHTML = '<i class="fas fa-check"></i> Añadido';
            btn.style.background = 'linear-gradient(135deg, #A8E6CF, #7FD1B9)';
            
            // Update cart count
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animate cart icon
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Reset button after delay
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Añadir al Carrito';
                btn.style.background = '';
            }, 2000);
            
            // Show notification
            showNotification('Producto añadido al carrito');
        });
    });

    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #A8E6CF, #7FD1B9);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(next);
    }

    // Auto-rotate testimonials
    function startTestimonialSlider() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopTestimonialSlider() {
        clearInterval(testimonialInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopTestimonialSlider();
            showTestimonial(index);
            startTestimonialSlider();
        });
    });

    // Start slider
    startTestimonialSlider();

    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonials__slider');
    testimonialSlider.addEventListener('mouseenter', stopTestimonialSlider);
    testimonialSlider.addEventListener('mouseleave', startTestimonialSlider);

    // ==========================================
    // WISHLIST TOGGLE
    // ==========================================
    const wishlistBtns = document.querySelectorAll('.action-icon .fa-heart');
    
    wishlistBtns.forEach(btn => {
        btn.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            btn.classList.toggle('far');
            btn.classList.toggle('fas');
            
            if (btn.classList.contains('fas')) {
                btn.style.color = '#FF6B9D';
                showNotification('Añadido a favoritos');
            } else {
                btn.style.color = '';
                showNotification('Eliminado de favoritos');
            }
        });
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    const newsletterForm = document.querySelector('.newsletter__form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button');
        
        if (emailInput.value) {
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Suscrito!';
            submitBtn.style.background = 'linear-gradient(135deg, #A8E6CF, #7FD1B9)';
            emailInput.value = '';
            
            showNotification('¡Bienvenida a la familia Fefy!');
            
            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = 'Suscribirme <i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = '';
            }, 3000);
        }
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ==========================================
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==========================================
    // PRODUCT CARD 3D TILT EFFECT
    // ==========================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 1024) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // ==========================================
    // SEARCH BUTTON POPUP
    // ==========================================
    const searchBtn = document.querySelector('.action-btn[aria-label="Buscar"]');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = prompt('¿Qué estás buscando?');
        if (searchTerm) {
            showNotification(`Buscando: "${searchTerm}"`);
        }
    });

    // ==========================================
    // USER ACCOUNT BUTTON
    // ==========================================
    const accountBtn = document.querySelector('.action-btn[aria-label="Cuenta"]');
    
    accountBtn.addEventListener('click', function() {
        showNotification('Inicia sesión para acceder a tu cuenta');
    });

    // ==========================================
    // PAGE LOAD ANIMATION
    // ==========================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // ==========================================
    // LAZY LOADING FOR IMAGES (if added later)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==========================================
    // COUNT UP ANIMATION FOR STATS
    // ==========================================
    const statsSection = document.querySelector('.hero__stats');
    const statNumbers = document.querySelectorAll('.stat__number');
    let counted = false;

    function countUp(element, target, suffix = '') {
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = numericTarget / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                statNumbers.forEach(stat => {
                    const target = stat.textContent;
                    const suffix = target.replace(/[0-9]/g, '');
                    countUp(stat, target, suffix);
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    console.log('🌸 Fefy Cosmetics - Premium Experience Loaded');
});
