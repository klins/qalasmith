// =============================================
//  app.js – UI interactions: modal, cart, nav
// =============================================

const CONTACT_PHONE = '+91 98765 43210';
const CONTACT_EMAIL = 'orders@qalasmith.in';

// ---------- Helpers ----------
function formatPrice(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function getDiscount(price, original) {
    return Math.round((1 - price / original) * 100);
}

function buildStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

// ---------- Toast ----------
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2400);
}

// =====================
//  NAVBAR SCROLL EFFECT
// =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// =====================
//  MOBILE NAV
// =====================
const btnMenu = document.getElementById('btn-menu');
const mobileNav = document.getElementById('mobile-nav');
const navOverlay = document.getElementById('nav-overlay');
const mobileNavClose = document.getElementById('mobile-nav-close');

function openMobileNav() {
    mobileNav.classList.add('open');
    navOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('visible');
    document.body.style.overflow = '';
}

btnMenu.addEventListener('click', openMobileNav);
mobileNavClose.addEventListener('click', closeMobileNav);
navOverlay.addEventListener('click', () => {
    closeMobileNav();
    closeCart();
});

mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileNav);
});

// =====================
//  CART LOGIC
// =====================
let cart = [];

const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const btnCart = document.getElementById('btn-cart');
const cartBadge = document.getElementById('cart-badge');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total-amount');
const cartOverlay = navOverlay; // reuse overlay

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
    renderCart();
}

function closeCart() {
    cartSidebar.classList.remove('open');
    if (!mobileNav.classList.contains('open')) {
        cartOverlay.classList.remove('visible');
        document.body.style.overflow = '';
    }
}

btnCart.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);

function updateCartBadge() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (count > 0) {
        cartBadge.textContent = count > 99 ? '99+' : count;
        cartBadge.classList.add('visible');
    } else {
        cartBadge.classList.remove('visible');
    }
}

function addToCart(productId) {
    const product = window.__products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCartBadge();
    showToast(`🛍 "${product.name}" added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    updateCartBadge();
    renderCart();
}

function renderCart() {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartTotal.textContent = formatPrice(total);

    if (cart.length === 0) {
        cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <small>Click "View & Order" on any product to get started</small>
      </div>`;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)} × ${item.qty}</div>
      </div>
      <button class="cart-item-remove" data-remove="${item.id}" aria-label="Remove">✕</button>
    </div>`).join('');

    cartItems.querySelectorAll('[data-remove]').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(+btn.dataset.remove));
    });
}

// Checkout button — opens mailto since no payment integration
document.getElementById('btn-checkout').addEventListener('click', () => {
    if (cart.length === 0) { showToast('Cart is empty!'); return; }
    const items = cart.map(i => `${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`).join('%0A');
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=Order from QalaSmith&body=Hi, I'd like to order:%0A%0A${items}%0A%0ATotal: ${formatPrice(total)}%0A%0APlease confirm availability.`;
});

// =====================
//  PRODUCT MODAL
// =====================
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

function openModal(product) {
    const discount = getDiscount(product.price, product.originalPrice);
    const saved = formatPrice(product.originalPrice - product.price);

    document.getElementById('modal-badge').textContent = product.badge;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-image').alt = product.name;
    document.getElementById('modal-stars').textContent = buildStars(product.rating);
    document.getElementById('modal-rating').textContent = `${product.rating} (${product.reviews} reviews)`;
    document.getElementById('modal-price').textContent = formatPrice(product.price);
    document.getElementById('modal-original').textContent = formatPrice(product.originalPrice);
    document.getElementById('modal-save').textContent = `Save ${saved} (${discount}% off)`;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-artisan').textContent = product.artisan;
    document.getElementById('modal-material').textContent = product.material;
    document.getElementById('modal-dimensions').textContent = product.dimensions;
    document.getElementById('modal-product-name-contact').textContent = product.name;

    // Wire Add to Cart from modal
    const addBtn = document.getElementById('modal-add-cart');
    addBtn.onclick = () => {
        addToCart(product.id);
        closeModal();
    };

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeMobileNav(); closeCart(); }
});

// =====================
//  EVENT DELEGATION – Product Grid
// =====================
document.getElementById('product-grid').addEventListener('click', e => {
    // Wishlist toggle
    const wishBtn = e.target.closest('.card-wishlist');
    if (wishBtn) {
        e.stopPropagation();
        wishBtn.classList.toggle('active');
        wishBtn.textContent = wishBtn.classList.contains('active') ? '❤️' : '🤍';
        return;
    }

    // Add to cart (small button)
    const cartBtn = e.target.closest('.btn-add-cart');
    if (cartBtn) {
        e.stopPropagation();
        addToCart(+cartBtn.dataset.id);
        return;
    }

    // View & Order OR clicking the card
    const orderBtn = e.target.closest('.btn-view-order');
    const card = e.target.closest('.product-card');

    const productId = +(orderBtn?.dataset.id || card?.dataset.id);
    if (productId) {
        const product = window.__products.find(p => p.id === productId);
        if (product) openModal(product);
    }
});

// Keyboard accessibility for product cards
document.getElementById('product-grid').addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.product-card');
        if (card) {
            e.preventDefault();
            const product = window.__products.find(p => p.id === +card.dataset.id);
            if (product) openModal(product);
        }
    }
});

// =====================
//  HERO SCROLL CTA
// =====================
document.getElementById('btn-shop-now')?.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// =====================
//  SMOOTH NAV LINKS
// =====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
