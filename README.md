# QalaSmith – Authentic Indian Handicrafts 🪔

A static ecommerce website showcasing authentic handcrafted Indian products. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

## ✨ Features

- 🛒 Product catalog loaded from `data/products.json` (easy to extend)
- 🔍 Category filter bar
- 📦 Product detail modal with ordering contact info (phone & email)
- 🛍 Cart sidebar with item count badge
- 📱 Fully responsive (mobile-first, works on all screen sizes)
- ♿ Keyboard accessible, semantic HTML
- ⚡ Fast – no JavaScript frameworks, no build tools

## 📁 Project Structure

```
qalasmith/
├── index.html              # Main page
├── .nojekyll               # GitHub Pages config
├── css/
│   └── style.css           # All styles + responsive design
├── js/
│   ├── products.js         # Product rendering from JSON
│   └── app.js              # Cart, modal, nav interactions
├── data/
│   └── products.json       # Product catalog ← add products here
└── images/
    └── products/           # Product images
```

## 🛍 Adding New Products

Open `data/products.json` and add a new object to the array:

```json
{
  "id": 6,
  "name": "Your Product Name",
  "category": "Category Name",
  "price": 999,
  "originalPrice": 1299,
  "description": "Product description here.",
  "image": "images/products/product6.jpg",
  "badge": "New Arrival",
  "rating": 4.5,
  "reviews": 0,
  "artisan": "Artisan Name, State",
  "material": "Material used",
  "dimensions": "W × H cm"
}
```

Badge options: `Bestseller`, `New Arrival`, `Eco-Friendly`, `Handcrafted`, `Limited Stock`

## 📞 Order Contact

Customers order by contacting:
- **Phone / WhatsApp:** +91 98765 43210
- **Email:** orders@qalasmith.in

> Update these in `js/products.js` and `js/app.js` (top of each file: `CONTACT_PHONE` / `CONTACT_EMAIL` constants) and inside `index.html` contact section.

## 🚀 Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Set **Source** to `main` branch, `/ (root)` folder
4. Click **Save** — your site will be live at `https://yourusername.github.io/qalasmith/`

> **Note:** The `.nojekyll` file ensures GitHub Pages serves the files as-is without Jekyll processing.

## 🏠 Run Locally

Simply open `index.html` in your browser. No server required for basic viewing.

> For product images to load correctly, you may need a local server if CORS restrictions apply. Use VS Code's **Live Server** extension, or run:
> ```bash
> npx serve .
> ```

---

Made with ❤️ for Indian Artisans | © 2025 QalaSmith
