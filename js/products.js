// =============================================
//  products.js – Renders product cards from JSON
//  Works both locally (inline data) and on a server (fetch)
// =============================================

// ---- Inline product data (fallback for local file:// access) ----
const PRODUCTS_DATA = [
  {
    "id": 1,
    "name": "Blue Pottery Vase",
    "category": "Pottery & Ceramics",
    "price": 1299,
    "originalPrice": 1799,
    "description": "A stunning hand-painted ceramic vase featuring intricate blue and white floral motifs inspired by the Jaipur blue pottery tradition. Each piece is uniquely crafted and kiln-fired by master artisans. Perfect as a decorative centerpiece or a thoughtful gift.",
    "image": "images/products/product1.png",
    "badge": "Bestseller",
    "rating": 4.8,
    "reviews": 124,
    "artisan": "Ramesh Kumar, Jaipur",
    "material": "Ceramic Clay, Natural Pigments",
    "dimensions": "H: 30 cm, W: 12 cm"
  },
  {
    "id": 2,
    "name": "Handwoven Bamboo Basket",
    "category": "Weaving & Textiles",
    "price": 849,
    "originalPrice": 1100,
    "description": "Beautifully handwoven bamboo basket with a vibrant cotton fabric lining. Crafted by skilled weavers from Assam using sustainable bamboo, this versatile basket is ideal for storage, gifting, or home décor.",
    "image": "images/products/product2.png",
    "badge": "Eco-Friendly",
    "rating": 4.6,
    "reviews": 87,
    "artisan": "Priya Devi, Assam",
    "material": "Natural Bamboo, Cotton Fabric",
    "dimensions": "H: 22 cm, D: 28 cm"
  },
  {
    "id": 3,
    "name": "Carved Wooden Elephant",
    "category": "Wood Carving",
    "price": 2199,
    "originalPrice": 2800,
    "description": "An exquisitely carved wooden elephant figurine adorned with hand-painted gold and red traditional motifs. Crafted by award-winning artisans from Kerala, this piece makes a striking home décor item and symbolises good luck and prosperity.",
    "image": "images/products/product3.png",
    "badge": "Handcrafted",
    "rating": 4.9,
    "reviews": 203,
    "artisan": "Suresh Nair, Kerala",
    "material": "Teak Wood, Natural Paints",
    "dimensions": "H: 18 cm, L: 24 cm"
  },
  {
    "id": 4,
    "name": "Block Print Silk Scarf",
    "category": "Textiles & Apparel",
    "price": 1599,
    "originalPrice": 2200,
    "description": "A luxurious hand-woven silk scarf featuring vibrant block-print floral patterns in rich shades of red, orange, and gold. Each scarf is individually block-printed using carved wooden blocks and natural vegetable dyes by artisans from Bagru, Rajasthan.",
    "image": "images/products/product4.png",
    "badge": "New Arrival",
    "rating": 4.7,
    "reviews": 56,
    "artisan": "Sunita Sharma, Rajasthan",
    "material": "Pure Silk, Vegetable Dyes",
    "dimensions": "180 cm × 70 cm"
  },
  {
    "id": 5,
    "name": "Macramé Wall Hanging",
    "category": "Macramé & Fiber Art",
    "price": 999,
    "originalPrice": 1400,
    "description": "An elegant handmade macramé wall hanging crafted from natural cotton rope with intricate knotting patterns and flowing fringe. A boho-chic statement piece that brings texture and warmth to any living space. Handcrafted with love in small batches.",
    "image": "images/products/product5.png",
    "badge": "Limited Stock",
    "rating": 4.5,
    "reviews": 73,
    "artisan": "Meera Pillai, Goa",
    "material": "Natural Cotton Rope",
    "dimensions": "W: 45 cm, L: 90 cm (with fringe)"
  }
];

// Utility: format price in INR
function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

// Utility: calculate discount %
function getDiscount(price, original) {
  return Math.round((1 - price / original) * 100);
}

// Build star string
function buildStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Badge class mapping
function badgeClass(badge) {
  const map = {
    'Bestseller': '',
    'Eco-Friendly': 'eco',
    'Handcrafted': 'hand',
    'New Arrival': 'new',
    'Limited Stock': 'ltd'
  };
  return map[badge] || '';
}

// Build product card HTML
function buildProductCard(product, index) {
  const discount = getDiscount(product.price, product.originalPrice);
  return `
    <article class="product-card"
             data-id="${product.id}"
             style="animation-delay:${index * 0.08}s"
             tabindex="0"
             role="button"
             aria-label="View details for ${product.name}">

      <div class="card-image-wrap">
        <img src="${product.image}"
             alt="${product.name}"
             loading="lazy" />
        <span class="card-badge ${badgeClass(product.badge)}">${product.badge}</span>
        <button class="card-wishlist" aria-label="Add to wishlist" data-id="${product.id}">🤍</button>
      </div>

      <div class="card-body">
        <p class="card-category">${product.category}</p>
        <h3 class="card-name">${product.name}</h3>
        <div class="card-rating">
          <span class="card-stars">${buildStars(product.rating)}</span>
          <span>${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div class="card-price-row">
          <span class="card-price">${formatPrice(product.price)}</span>
          <span class="card-price-original">${formatPrice(product.originalPrice)}</span>
          <span class="card-discount">${discount}% off</span>
        </div>
      </div>

      <div class="card-footer">
        <button class="btn-view-order" data-id="${product.id}">
          🛒 View &amp; Order
        </button>
        <button class="btn-add-cart" data-id="${product.id}" aria-label="Add to cart">🛍</button>
      </div>
    </article>`;
}

// Render grid
function renderProducts(list) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = list.length
    ? list.map((p, i) => buildProductCard(p, i)).join('')
    : '<p style="text-align:center;color:var(--clr-text-muted);padding:2rem">No products found in this category.</p>';
}

// Load products: try fetch first (server/GitHub Pages), fall back to inline data
async function initProducts() {
  let data;

  try {
    const res = await fetch('data/products.json');
    if (!res.ok) throw new Error('HTTP error');
    data = await res.json();
  } catch (_) {
    // Fallback: use inline data (works when opening file:// locally)
    data = PRODUCTS_DATA;
  }

  window.__products = data;

  // Populate filter buttons
  const cats = ['All', ...new Set(data.map(p => p.category))];
  const filterBar = document.getElementById('filter-bar');
  filterBar.innerHTML = cats.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}"
             data-cat="${c}">${c}</button>`
  ).join('');

  // Filter button clicks
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    renderProducts(cat === 'All' ? data : data.filter(p => p.category === cat));
  });

  renderProducts(data);
}

document.addEventListener('DOMContentLoaded', initProducts);
