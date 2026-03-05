// =============================================
//  products.js – Renders product cards from JSON
//  Works both locally (inline data) and on a server (fetch)
// =============================================

// ---- Inline product data (fallback for local file:// access) ----
// Full catalog is loaded from data/products.json when served over HTTP
const PRODUCTS_DATA = [
  {"id":1,"name":"Set of 6 F.R.I.E.N.D.S (4 Inches)","category":"Hand-Painted Planters","price":550,"originalPrice":550,"description":"Hand-painted plastic planters inspired by F.R.I.E.N.D.S — set of 6, 4 inches each. No two pieces ever the same. Made to order with vibrant, quirky character.","image":"images/products/Product 1- Set of 6 F.R.I.E.N.D.S- 550- set 4Inches.jpeg","badge":"Made to Order","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Set of 6, 4 inches each"},
  {"id":2,"name":"Hand-Painted Planter","category":"Hand-Painted Planters","price":165,"originalPrice":165,"description":"Hand-painted plastic planter — humble container turned into vibrant art. Each piece painted by hand; exclusivity and a personal touch in every stroke.","image":"images/products/Product 2- 165 each.jpeg","badge":"Eco-Friendly","rating":4.6,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Various"},
  {"id":3,"name":"Hand-Painted Planter (7–8 Inches)","category":"Hand-Painted Planters","price":165,"originalPrice":165,"description":"Hand-painted plastic planter, 7–8 inches. Bursting with character — from quirky patterns to elegant motifs, every planter is one of a kind.","image":"images/products/Product 3- 165 Each -7to8 Inches.jpeg","badge":"Handcrafted","rating":4.7,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"7–8 inches"},
  {"id":4,"name":"Hand-Painted Planter (9–10 Inches)","category":"Hand-Painted Planters","price":200,"originalPrice":200,"description":"Hand-painted plastic planter, 9–10 inches. Larger format for a bold statement. Made to order with care and soul.","image":"images/products/Product 4- 200-each 9to10 Inches.jpeg","badge":"Handcrafted","rating":4.7,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"9–10 inches"},
  {"id":5,"name":"Hippie Couple (Pair, 9–10 Inches)","category":"Hand-Painted Planters","price":400,"originalPrice":400,"description":"Hand-painted Hippie Couple pair — 9–10 inches each. Quirky, colourful and conversation-worthy. Made to order.","image":"images/products/Product 5 -Hippie couple 400- pair 9to10 Inches.jpeg","badge":"Pair","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Pair, 9–10 inches each"},
  {"id":6,"name":"Anna–Vadhina Couple (Pair, 9–10 Inches)","category":"Hand-Painted Planters","price":420,"originalPrice":420,"description":"Hand-painted Anna–Vadhina couple — pair, 9–10 inches. Indian craftsmanship with a modern, playful aesthetic. Giftable and collectible.","image":"images/products/Product6 - Anna-Vadhina Couple 420- pair 9to10 Inches.jpeg","badge":"Pair","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Pair, 9–10 inches each"},
  {"id":7,"name":"Two Crooks (9–10 Inches)","category":"Hand-Painted Planters","price":200,"originalPrice":200,"description":"Hand-painted 'Two Crooks' design — 200 each, 9–10 inches. Unique, made-to-order artistry. No two pieces ever the same.","image":"images/products/Product 7 - Two crooks 200- each 9to10 Inches.jpeg","badge":"Handcrafted","rating":4.6,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"9–10 inches each"},
  {"id":8,"name":"Carl & Ellie (Pair, 9–10 Inches)","category":"Hand-Painted Planters","price":420,"originalPrice":420,"description":"Hand-painted Carl & Ellie pair — 9–10 inches. Heart-made, conversation-worthy pieces. Made to order.","image":"images/products/Product8 - Carl-Ellie 420- pair 9-10 Inches.jpeg","badge":"Pair","rating":4.9,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Pair, 9–10 inches each"},
  {"id":9,"name":"Metroz Dada–Dadi (Pair, 9–10 Inches)","category":"Hand-Painted Planters","price":420,"originalPrice":420,"description":"Hand-painted Metroz Dada–Dadi pair — 9–10 inches. Quirky, lovable characters. Indian craftsmanship with a modern twist.","image":"images/products/Product9 - Metroz Dada-Dadi 420- pair 9to10 Inches.jpeg","badge":"Pair","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Pair, 9–10 inches each"},
  {"id":10,"name":"Grandma–Paa (Pair, 9–10 Inches)","category":"Hand-Painted Planters","price":420,"originalPrice":420,"description":"Hand-painted Grandma–Paa pair — 9–10 inches. Warm, nostalgic and full of character. Made to order with a personal touch.","image":"images/products/Product 10 - Grandma-Paa 420- pair 9to10 Inches.jpeg","badge":"Pair","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Pair, 9–10 inches each"},
  {"id":11,"name":"Radha Krishna (Each)","category":"Hand-Painted Planters","price":350,"originalPrice":350,"description":"Hand-painted Radha Krishna design — 350 each. Traditional motif with a fresh, handcrafted finish. Perfect for gifting or home décor.","image":"images/products/Product11- RadhaKrishna 350- each.jpeg","badge":"Handcrafted","rating":4.9,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"Each"},
  {"id":12,"name":"Kanha (9–10 Inches)","category":"Hand-Painted Planters","price":300,"originalPrice":300,"description":"Hand-painted Kanha design — 9–10 inches. Divine and decorative. Made to order with care and soul.","image":"images/products/Product 12- Kanha 300- 9-10 Inches.jpeg","badge":"Handcrafted","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"9–10 inches"},
  {"id":13,"name":"Best Friends (9–10 Inches)","category":"Hand-Painted Planters","price":350,"originalPrice":350,"description":"Hand-painted Best Friends design — 350 each, 9–10 inches. Celebrating friendship with colour and craft. Made to order.","image":"images/products/Product13- Best Friends - KS - 350- each 9-10 Inches.jpeg","badge":"Handcrafted","rating":4.7,"reviews":0,"artisan":"QalaSmith","material":"Upcycled plastic, acrylic paint","dimensions":"9–10 inches each"},
  {"id":14,"name":"Vintage Look Upcycled Khat Serve-ware","category":"Trays & Serveware","price":1000,"originalPrice":1000,"description":"Vintage look with desi tadka — upcycled khat (charpai) wood transformed into a multipurpose serve-ware and decor piece. Sustainability gets stylish; smooth, sturdy, and aesthetically rich.","image":"images/products/Product 14 Vintage look with desi tadka Upcycled Khat Serve-wear decor piece-multipurpose.jpeg","badge":"Upcycled","rating":4.9,"reviews":0,"artisan":"QalaSmith","material":"Reclaimed furniture wood","dimensions":"Multipurpose serve-ware"},
  {"id":15,"name":"Bowed Teddy on Tote Bag","category":"Bottle Diyas & Decor","price":1000,"originalPrice":1000,"description":"Hand-painted Bowed Teddy design on a tote bag. Unique, giftable, and conversation-worthy. Made to order with a personal touch.","image":"images/products/Product 15 - Bowed teddy - on tote bag.jpeg","badge":"Handcrafted","rating":4.6,"reviews":0,"artisan":"QalaSmith","material":"Tote bag, acrylic paint","dimensions":"One size"},
  {"id":16,"name":"Ahoo – Shubh Labh","category":"Hand-Painted Planters","price":1000,"originalPrice":1000,"description":"Hand-painted Ahoo – Shubh Labh design. Auspicious and decorative. Indian craftsmanship with a modern aesthetic. Made to order.","image":"images/products/Product16 - Ahoo - Shubh Labh.jpeg","badge":"Handcrafted","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled materials, acrylic paint","dimensions":"Various"},
  {"id":17,"name":"Different Women – Unique Style","category":"Hand-Painted Planters","price":1000,"originalPrice":1000,"description":"Hand-painted 'Different Women – Unique Style' — celebrating diversity and character. No two pieces ever the same. Made to order.","image":"images/products/Product 17 - Different women - Unique Style.jpeg","badge":"Handcrafted","rating":4.7,"reviews":0,"artisan":"QalaSmith","material":"Upcycled materials, acrylic paint","dimensions":"Various"},
  {"id":18,"name":"Inner Peace (Milton Bottle Diya)","category":"Bottle Diyas & Decor","price":1000,"originalPrice":1000,"description":"Empty bottle turned into a decorative, glowing diya — 'Inner Peace' design. Who says waste can't shine? Perfect for festive décor or chic home accents.","image":"images/products/Product18 -Inner peace - on Milton bottle.jpeg","badge":"Upcycled","rating":4.8,"reviews":0,"artisan":"QalaSmith","material":"Upcycled bottle, acrylic paint","dimensions":"Bottle diya"},
  {"id":19,"name":"Iridescent Blossoms Dining Runner & Placement Mats","category":"Placement Mats & Dining","price":1000,"originalPrice":1000,"description":"Add a splash of colour to your table! Handcrafted placement mats and dining runner with Iridescent Blossoms design — warmth, sophistication, and handcrafted charm for everyday dining.","image":"images/products/Product19 - Iridescent Blossoms Dining runner and placement mats.jpeg","badge":"Bestseller","rating":4.9,"reviews":0,"artisan":"QalaSmith","material":"Fabric, hand-painted / printed","dimensions":"Runner & placement mats set"},
  {"id":20,"name":"Trays from Reclaimed Furniture Wood","category":"Trays & Serveware","price":1000,"originalPrice":1000,"description":"Sustainability gets stylish. We salvage wood from discarded furniture and craft it into fancy trays — smooth, sturdy, and aesthetically rich. These pieces don't just serve; they impress.","image":"images/products/Product 20 - Trays From reclaimed furniture wood!.jpeg","badge":"Upcycled","rating":4.9,"reviews":0,"artisan":"QalaSmith","material":"Reclaimed furniture wood","dimensions":"Tray"},
  {"id":21,"name":"Colourful Canes Upcycled Cane Tokris","category":"Bottle Diyas & Decor","price":1000,"originalPrice":1000,"description":"Multipurpose upcycled cane tokris (baskets) — colourful, practical, and eco-friendly. Perfect for storage, gifting, or home décor. Creating with minimum waste and maximum imagination.","image":"images/products/Product 21 -Colourful Canes Multipurpose Upcycled cane tokris.jpeg","badge":"Upcycled","rating":4.7,"reviews":0,"artisan":"QalaSmith","material":"Upcycled cane","dimensions":"Multipurpose tokri"}
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
    'Limited Stock': 'ltd',
    'Made to Order': 'hand',
    'Pair': 'new',
    'Upcycled': 'eco'
  };
  return map[badge] || '';
}

// Build product card HTML
function buildProductCard(product, index) {
  const discount = product.originalPrice > product.price ? getDiscount(product.price, product.originalPrice) : 0;
  const showDiscount = discount > 0;
  const priceRow = showDiscount
    ? `<span class="card-price">${formatPrice(product.price)}</span><span class="card-price-original">${formatPrice(product.originalPrice)}</span><span class="card-discount">${discount}% off</span>`
    : `<span class="card-price">${formatPrice(product.price)}</span>`;
  const reviewText = product.reviews ? `${product.rating} (${product.reviews} reviews)` : 'Made to order';
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
          <span>${reviewText}</span>
        </div>
        <div class="card-price-row">${priceRow}</div>
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
  function setFilter(cat) {
    filterBar.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
    renderProducts(cat === 'All' ? data : data.filter(p => p.category === cat));
  }

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    setFilter(btn.dataset.cat);
  });

  // Footer category links: apply filter when clicked
  document.querySelectorAll('a[href="#products"][data-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-cat');
      if (cat) setFilter(cat);
    });
  });

  renderProducts(data);
}

document.addEventListener('DOMContentLoaded', initProducts);
