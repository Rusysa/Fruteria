// ===========================
// CONFIGURACIÓN
// ===========================
const API_URL = 'http://127.0.0.1:3000/api';
let authToken = localStorage.getItem('adminToken');
let editingProductId = null;

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        showDashboard();
    } else {
        showLoginPage();
    }
});

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('adminLayout').classList.remove('visible');
}

function showDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminLayout').classList.add('visible');
    loadDashboardProducts();
    loadProductsTable();
}

// ===========================
// LOGIN
// ===========================
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const btn = e.target.querySelector('button[type="submit"]');
    const alert = document.getElementById('loginAlert');

    btn.disabled = true;
    btn.textContent = 'Verificando...';

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            const data = await res.json();
            authToken = data.token;
            localStorage.setItem('adminToken', authToken);
            document.getElementById('sidebarUsername').textContent = username;
            showDashboard();
            showToast('¡Bienvenido al panel de administración!', 'success');
        } else {
            showAlert(alert, 'Usuario o contraseña incorrectos.', 'error');
        }
    } catch (err) {
        // Demo mode: allow login with admin/admin123
        if (username === 'admin' && password === 'admin123') {
            authToken = 'demo-token';
            localStorage.setItem('adminToken', authToken);
            document.getElementById('sidebarUsername').textContent = username;
            showDashboard();
            showToast('¡Bienvenido! (Modo Demo)', 'success');
        } else {
            showAlert(alert, 'Error de conexión. Modo demo: usa admin / admin123', 'error');
        }
    } finally {
        btn.disabled = false;
        btn.textContent = '🔑 Iniciar Sesión';
    }
});

// ===========================
// LOGOUT
// ===========================
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    authToken = null;
    showLoginPage();
    showToast('Sesión cerrada correctamente.', 'info');
});

// ===========================
// NAVEGACIÓN SIDEBAR
// ===========================
document.querySelectorAll('.sidebar-nav a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        showSection(section);

        document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    });
});

function showSection(name) {
    document.querySelectorAll('[id^="section-"]').forEach(s => s.style.display = 'none');
    document.getElementById(`section-${name}`).style.display = 'block';

    const titles = {
        dashboard: ['Dashboard', 'Resumen general del sistema'],
        products: ['Gestión de Productos', 'Administra el catálogo de frutas'],
        categories: ['Categorías', 'Organiza tus productos por categoría']
    };

    if (titles[name]) {
        document.getElementById('topbarTitle').textContent = titles[name][0];
        document.getElementById('topbarSubtitle').textContent = titles[name][1];
    }

    document.querySelectorAll('.sidebar-nav a[data-section]').forEach(a => {
        a.classList.toggle('active', a.dataset.section === name);
    });
}

// ===========================
// CARGAR PRODUCTOS
// ===========================
async function fetchProducts() {
    try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error();
        return await res.json();
    } catch {
        return getDemoProducts();
    }
}

function getDemoProducts() {
    return [
        { id: 1, name: 'Mango Ataulfo', description: 'Dulce y jugoso, directamente de Veracruz.', price_per_kg: 35.50, image_url: '../images/mango.jpg', category: 'Frutas Tropicales' },
        { id: 2, name: 'Papaya Maradol', description: 'Grande y de pulpa anaranjada y dulce.', price_per_kg: 25.00, image_url: '../images/papaya.jpg', category: 'Frutas Tropicales' },
        { id: 3, name: 'Guayaba Criolla', description: 'Fresca y aromática, ideal para jugos.', price_per_kg: 28.75, image_url: '../images/guayaba.jpg', category: 'Frutas Tropicales' },
        { id: 4, name: 'Piña Miel', description: 'Extra dulce y jugosa.', price_per_kg: 22.00, image_url: '../images/frutas-mexico.jpg', category: 'Frutas Tropicales' }
    ];
}

async function loadDashboardProducts() {
    const products = await fetchProducts();
    document.getElementById('statProducts').textContent = products.length;

    const tbody = document.getElementById('dashboardProductsBody');
    tbody.innerHTML = products.slice(0, 5).map(p => `
        <tr>
            <td><img src="${p.image_url}" alt="${p.name}" class="product-img-thumb" onerror="this.src='../images/hero-bg.jpg'"></td>
            <td><strong>${p.name}</strong></td>
            <td><span class="badge badge-orange">${p.category || 'General'}</span></td>
            <td><strong>$${parseFloat(p.price_per_kg).toFixed(2)}</strong></td>
        </tr>
    `).join('');
}

async function loadProductsTable() {
    const products = await fetchProducts();
    const tbody = document.getElementById('productsTableBody');

    tbody.innerHTML = products.map(p => `
        <tr>
            <td><img src="${p.image_url}" alt="${p.name}" class="product-img-thumb" onerror="this.src='../images/hero-bg.jpg'"></td>
            <td><strong>${p.name}</strong></td>
            <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.description}</td>
            <td><span class="badge badge-orange">${p.category || 'General'}</span></td>
            <td><strong>$${parseFloat(p.price_per_kg).toFixed(2)}</strong></td>
            <td>
                <button class="btn-edit" onclick="editProduct(${p.id})">✏️ Editar</button>
                <button class="btn-delete" onclick="deleteProduct(${p.id}, '${p.name}')">🗑️ Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// ===========================
// MODAL DE PRODUCTO
// ===========================
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');

document.getElementById('btnAddProduct').addEventListener('click', () => {
    editingProductId = null;
    document.getElementById('modalTitle').textContent = 'Agregar Producto';
    productForm.reset();
    productModal.classList.add('active');
});

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('btnCancelModal').addEventListener('click', closeModal);

productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal();
});

function closeModal() {
    productModal.classList.remove('active');
    editingProductId = null;
}

async function editProduct(id) {
    const products = await fetchProducts();
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingProductId = id;
    document.getElementById('modalTitle').textContent = 'Editar Producto';
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productDesc').value = product.description;
    document.getElementById('productPrice').value = product.price_per_kg;
    document.getElementById('productImage').value = product.image_url;
    document.getElementById('productCategory').value = product.category || 'Frutas Tropicales';
    productModal.classList.add('active');
}

async function deleteProduct(id, name) {
    if (!confirm(`¿Estás seguro de eliminar "${name}"?`)) return;

    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': authToken }
        });
        if (res.ok) {
            showToast(`"${name}" eliminado correctamente.`, 'success');
            loadProductsTable();
            loadDashboardProducts();
        } else {
            showToast('Error al eliminar el producto.', 'error');
        }
    } catch {
        showToast('Error de conexión. (Modo Demo)', 'error');
    }
}

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const productData = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDesc').value,
        price_per_kg: parseFloat(document.getElementById('productPrice').value),
        image_url: document.getElementById('productImage').value || '../images/hero-bg.jpg',
        category: document.getElementById('productCategory').value
    };

    const method = editingProductId ? 'PUT' : 'POST';
    const url = editingProductId ? `${API_URL}/products/${editingProductId}` : `${API_URL}/products`;

    try {
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': authToken
            },
            body: JSON.stringify(productData)
        });

        if (res.ok) {
            showToast(editingProductId ? 'Producto actualizado.' : 'Producto creado.', 'success');
            closeModal();
            loadProductsTable();
            loadDashboardProducts();
        } else {
            showToast('Error al guardar el producto.', 'error');
        }
    } catch {
        showToast('Error de conexión. (Modo Demo)', 'error');
        closeModal();
    }
});

// ===========================
// UTILIDADES
// ===========================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: '🍊' };
    toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function showAlert(el, message, type) {
    el.textContent = message;
    el.className = `alert alert-${type}`;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
}
