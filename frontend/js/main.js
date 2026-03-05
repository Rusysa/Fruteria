// ===========================
// CONFIGURACIÓN
// ===========================
const API_URL = 'http://127.0.0.1:3000/api';

// ===========================
// NAVBAR
// ===========================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.navbar-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ===========================
// MODAL DE LOGIN
// ===========================
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const modalClose = document.getElementById('modalClose');
const loginForm = document.getElementById('loginForm');
const loginAlert = document.getElementById('loginAlert');

loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
});

modalClose?.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

loginModal?.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Iniciando sesión...';

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('adminToken', data.token);
            loginModal.classList.remove('active');
            showToast('¡Bienvenido, Administrador!', 'success');
            setTimeout(() => {
                window.location.href = '/admin';
            }, 1200);
        } else {
            showAlert(loginAlert, 'Usuario o contraseña incorrectos. Inténtalo de nuevo.', 'error');
        }
    } catch (error) {
        showAlert(loginAlert, 'Error de conexión. Verifica que el servidor esté activo.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Iniciar Sesión';
    }
});

// ===========================
// CARGAR PRODUCTOS DESDE LA API
// ===========================
async function loadProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = '<div class="loading-spinner">Cargando productos frescos...</div>';

    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Error al cargar productos');
        const products = await response.json();

        if (products.length === 0) {
            container.innerHTML = '<p style="text-align:center; color: var(--text-light);">No hay productos disponibles.</p>';
            return;
        }

        container.innerHTML = products.map(product => createProductCard(product)).join('');
    } catch (error) {
        // Si la API no está disponible, mostrar datos de ejemplo
        container.innerHTML = getDemoProducts().map(p => createProductCard(p)).join('');
    }
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-card-img-wrapper">
                <img src="${product.image_url}" alt="${product.name}" class="product-card-img" onerror="this.src='images/hero-bg.jpg'">
                <span class="product-badge">${product.category || 'Fruta Fresca'}</span>
            </div>
            <div class="product-card-body">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <div>
                        <span class="price">$${parseFloat(product.price_per_kg).toFixed(2)}</span>
                        <span class="price-unit"> / kg</span>
                    </div>
                    <button class="btn-add-cart" onclick="addToCart('${product.name}')">
                        🛒 Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getDemoProducts() {
    return [
        { id: 1, name: 'Mango Ataulfo', description: 'Dulce y jugoso, directamente de las huertas veracruzanas.', price_per_kg: 35.50, image_url: 'images/mango.jpg', category: 'Frutas Tropicales' },
        { id: 2, name: 'Papaya Maradol', description: 'Grande y de pulpa anaranjada, rica en vitaminas y antioxidantes.', price_per_kg: 25.00, image_url: 'images/papaya.jpg', category: 'Frutas Tropicales' },
        { id: 3, name: 'Guayaba Criolla', description: 'Fresca y aromática, ideal para jugos, postres y mermeladas.', price_per_kg: 28.75, image_url: 'images/guayaba.jpg', category: 'Frutas Tropicales' },
        { id: 4, name: 'Piña Miel', description: 'Extra dulce y jugosa, perfecta para el calor veracruzano.', price_per_kg: 22.00, image_url: 'images/frutas-mexico.jpg', category: 'Frutas Tropicales' }
    ];
}

// ===========================
// CARRITO (DEMO)
// ===========================
function addToCart(productName) {
    showToast(`"${productName}" agregado al carrito 🛒`, 'success');
}

// ===========================
// FORMULARIO DE CONTACTO
// ===========================
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('¡Mensaje enviado! Te contactaremos pronto. 📩', 'success');
    contactForm.reset();
});

// ===========================
// UTILIDADES
// ===========================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: '🍊' };
    toast.innerHTML = `<span>${icons[type] || '🍊'}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function showAlert(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = `alert alert-${type}`;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 4000);
}

// ===========================
// ANIMACIONES AL SCROLL
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .category-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
