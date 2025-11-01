# The Shop — Demo Static Retail Site

This repo contains a modern, responsive, static demo storefront ready to host on GitHub Pages.

Features
- Clean, minimal design with smooth micro-interactions
- Responsive pages: Home, Shop, Product, Cart, Checkout, About, Contact
- Sample product data with royalty-free images (Unsplash source)
- LocalStorage-based cart (demo only)
- Countdown banner, Best Sellers carousel, recommended items
- Back-to-top button, meta tags, favicon

How to preview locally
1. Open `index.html` in your browser (double-click). For full behavior, serve via a static server to avoid some browser restrictions (recommended).

Quick local server (using Python)
```powershell
# Python 3
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

Deploy to GitHub Pages
1. Create a new GitHub repository and push these files.
2. In the repository settings, enable GitHub Pages from the main branch (root). The site will be served at `https://<your-username>.github.io/<repo-name>/`.

Notes & customization
- Product images are loaded from Unsplash source queries; update `assets/js/products.js` to customize products and images.
- This is a demo; no real payments or server-side functions.

Suggestions (next steps)
- Add product JSON file and admin UI to manage items
- Integrate a static site generator (Jekyll, Hugo) or React for dynamic builds
- Add unit tests and CI for bundle linting

Enjoy!
