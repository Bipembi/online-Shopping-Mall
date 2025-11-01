// Main site behavior: rendering, cart, filters, countdown, and micro-interactions.
(function(){
  // Cart helpers (localStorage)
  function getCart(){
    try { return JSON.parse(localStorage.getItem('the_shop_cart')||'{}'); } catch(e){ return {}; }
  }
  function saveCart(cart){ localStorage.setItem('the_shop_cart', JSON.stringify(cart)); updateCartCount(); }
  function addToCart(id, qty=1){
    const cart = getCart();
    cart[id] = (cart[id]||0) + qty;
    saveCart(cart);
  }
  function setQty(id, qty){ const cart=getCart(); if(qty<=0){ delete cart[id]; } else { cart[id]=qty; } saveCart(cart); }
  function removeFromCart(id){ const cart=getCart(); delete cart[id]; saveCart(cart); }
  function cartItems(){ const cart=getCart(); return Object.keys(cart).map(id=>({product: findProduct(id), qty: cart[id]})); }

  // UI updates
  function updateCartCount(){ const count = Object.values(getCart()).reduce((s,n)=>s+n,0); document.querySelectorAll('#cart-count').forEach(e=>e.textContent = count); }
   // Mobile menu
  function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target) && nav.classList.contains('active')) {
          menuBtn.classList.remove('active');
          nav.classList.remove('active');
        }
      });
    }
  }
  // Utility: query param
  function qp(name){ const url=new URL(location.href); return url.searchParams.get(name); }

  // Render best seller carousel on index
  function renderCarousel(){ const el = document.getElementById('bestseller-carousel'); if(!el) return; const items = PRODUCTS.slice(0,8);
    el.innerHTML = '';
    items.forEach(p=>{
      const card = document.createElement('a'); card.className='product-card card'; card.href = 'product.html?id='+p.id;
      card.innerHTML = `<img src="${p.images[0]}" alt="${p.title}"><div class="pc-body"><h4>${p.title}</h4><p class="muted">$${p.price}</p></div>`;
      el.appendChild(card);
    });
  }

  // Countdown: offer end (now set to 10 years ahead)
  function setupCountdown(){ const el=document.getElementById('countdown'); if(!el) return; let end = localStorage.getItem('the_shop_sale_end');
    // Ensure we display something immediately
    el.textContent = 'Starting...';
    // If missing or invalid, set to now + 10 years
    function makeDefaultEnd(){ const d = new Date(); d.setFullYear(d.getFullYear()+10); return d.toISOString(); }
    if(!end){ end = makeDefaultEnd(); localStorage.setItem('the_shop_sale_end', end); }
    // Validate stored end date
    let target = new Date(end);
    if(isNaN(target.getTime()) || target <= new Date()){
      end = makeDefaultEnd(); target = new Date(end); localStorage.setItem('the_shop_sale_end', end);
    }

    function formatRemaining(ms){
      let diff = Math.max(0, ms);
      const years = Math.floor(diff / (365*24*3600000)); diff -= years*(365*24*3600000);
      const days = Math.floor(diff / (24*3600000)); diff -= days*(24*3600000);
      const h = Math.floor(diff/3600000); diff -= h*3600000;
      const m = Math.floor(diff/60000); diff -= m*60000;
      const s = Math.floor(diff/1000);
      if(years>0) return `${years}y ${days}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
      if(days>0) return `${days}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
      return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }

    function tick(){
      const now = new Date(); target = new Date(localStorage.getItem('the_shop_sale_end') || end);
      if(isNaN(target.getTime())){ target = new Date(end); }
      const diff = Math.max(0, target - now);
      el.textContent = formatRemaining(diff);
    }

    // Run immediately and then every second
    tick(); const timerId = setInterval(tick, 1000);
    // Expose timerId for debugging (no-op if window not available)
    if(typeof window !== 'undefined') window.__the_shop_countdown = timerId;
  }

  // Back to top
  function setupBackToTop(){ const btn=document.getElementById('back-to-top'); if(!btn) return; window.addEventListener('scroll', ()=>{ if(window.scrollY>300) btn.style.display='block'; else btn.style.display='none'; }); btn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'})); }

  // Shop page: render products grid and filters
  function renderProductsGrid(){ const grid=document.getElementById('products-grid'); if(!grid) return; const categoryParam = qp('category');
    const maxPriceEl = document.getElementById('filter-price'); const sortEl = document.getElementById('filter-sort');
    const catFilterEl = document.getElementById('filter-category');
    // populate categories
    const cats = Array.from(new Set(PRODUCTS.map(p=>p.category)));
    if(catFilterEl && catFilterEl.options.length===1){ cats.forEach(c=>{ const opt=document.createElement('option'); opt.value=c; opt.textContent=c; catFilterEl.appendChild(opt); }); }

    function draw(){
      const maxPrice = maxPriceEl?parseInt(maxPriceEl.value,10):Infinity;
      const selectedCat = catFilterEl?catFilterEl.value:'all';
      let items = PRODUCTS.filter(p=>p.price<=maxPrice);
      if(categoryParam) items = items.filter(p=>p.category===categoryParam);
      if(selectedCat && selectedCat!=='all') items = items.filter(p=>p.category===selectedCat);
      const sort = sortEl?sortEl.value:'popular';
      if(sort==='price-asc') items.sort((a,b)=>a.price-b.price);
      if(sort==='price-desc') items.sort((a,b)=>b.price-a.price);
      grid.innerHTML = '';
      items.forEach(p=>{
        const a = document.createElement('div'); a.className='product-card';
        a.innerHTML = `<a href="product.html?id=${p.id}" class="card"><img src="${p.images[0]}" alt="${p.title}"><div class="card-body"><h4>${p.title}</h4><p class="muted">${p.category} • ★ ${p.rating}</p><p class="price">$${p.price}</p><div style="display:flex;gap:.5rem;margin-top:.5rem"><button class="btn btn-outline add-to-cart" data-id="${p.id}">Add to Cart</button><a class="btn" href="product.html?id=${p.id}">Details</a></div></div></a>`;
        grid.appendChild(a);
      });
      document.querySelectorAll('.add-to-cart').forEach(b=>b.addEventListener('click', (e)=>{ const id=b.dataset.id; addToCart(id,1); b.textContent='Added'; setTimeout(()=>b.textContent='Add to Cart',900); }));
    }

    ['change','input'].forEach(ev=>{ if(maxPriceEl) maxPriceEl.addEventListener(ev, draw); if(sortEl) sortEl.addEventListener(ev, draw); if(catFilterEl) catFilterEl.addEventListener(ev, draw); });
    draw();
  }

  // Product detail page
  function renderProductDetail(){ const holder=document.getElementById('product-detail'); if(!holder) return; const id = qp('id'); const p = findProduct(id); if(!p){ holder.innerHTML = '<p>Product not found.</p>'; return; }
    holder.innerHTML = `<div class="product-gallery"><img src="${p.images[0]}" alt="${p.title}"></div><div class="product-info"><h2>${p.title}</h2><p class="muted">${p.category} • ★ ${p.rating}</p><p class="price">$${p.price}</p><p>${p.desc}</p><div style="display:flex;gap:.5rem;margin-top:1rem"><button id="add-to-cart-btn" class="btn btn-primary">Add to Cart</button><button id="buy-now-btn" class="btn btn-outline">Buy Now</button></div><div id="recommended" style="margin-top:1.25rem;"></div></div>`;
    document.getElementById('add-to-cart-btn').addEventListener('click', ()=>{ addToCart(p.id,1); alert('Added to cart'); });
    document.getElementById('buy-now-btn').addEventListener('click', ()=>{ addToCart(p.id,1); location.href='checkout.html'; });
    // recommended
    const rec = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,3);
    const recEl = document.getElementById('recommended'); recEl.innerHTML = '<h3>Recommended for you</h3><div style="display:flex;gap:.5rem">'+rec.map(r=>`<a class="card" href="product.html?id=${r.id}" style="min-width:140px"><img src="${r.images[0]}" alt="${r.title}" style="height:100px;object-fit:cover"><div class="card-body"><h4 style="font-size:0.95rem">${r.title}</h4><p class="muted">$${r.price}</p></div></a>`).join('')+'</div>';
  }

  // Cart page render
  function renderCartPage(){ const holder=document.getElementById('cart-contents'); if(!holder) return; const items = cartItems(); if(items.length===0){ holder.innerHTML='<p>Your cart is empty.</p>'; return; }
    holder.innerHTML = '<div class="cart-list"></div><div class="cart-summary"></div>';
    const list = holder.querySelector('.cart-list'); const sum = holder.querySelector('.cart-summary');
    list.innerHTML = items.map(it=>`<div class="card" style="display:flex;gap:.75rem;align-items:center;padding:0.6rem;margin-bottom:.6rem"><img src="${it.product.images[0]}" alt="" style="width:80px;height:80px;object-fit:cover;border-radius:8px"><div style="flex:1"><h4 style="margin:0">${it.product.title}</h4><p class="muted">$${it.product.price} • Qty: <input data-id="${it.product.id}" type="number" min="0" value="${it.qty}" style="width:64px"></p></div><div><p class="price">$${(it.product.price*it.qty).toFixed(2)}</p><button class="btn btn-outline remove" data-id="${it.product.id}">Remove</button></div></div>`).join('');
    sum.innerHTML = `<div class="card" style="padding:1rem"><h3>Summary</h3><p>Total items: ${items.reduce((s,i)=>s+i.qty,0)}</p><p class="price">Total: $${items.reduce((s,i)=>s+i.qty*i.product.price,0).toFixed(2)}</p><a class="btn btn-primary" href="checkout.html">Proceed to Checkout</a></div>`;
    // listeners
    list.querySelectorAll('input[type=number]').forEach(inp=>inp.addEventListener('change', ()=>{ const id=inp.dataset.id; const v=parseInt(inp.value,10)||0; setQty(id, v); renderCartPage(); }));
    list.querySelectorAll('.remove').forEach(b=>b.addEventListener('click', ()=>{ removeFromCart(b.dataset.id); renderCartPage(); }));
  }

  // Checkout handling
  function setupCheckout(){ const form=document.getElementById('checkout-form'); if(!form) return; form.addEventListener('submit', (e)=>{ e.preventDefault(); localStorage.removeItem('the_shop_cart'); updateCartCount(); alert('Order placed. Thank you!'); form.reset(); location.href='index.html'; }); }
  

  // Boot
  function init(){ updateCartCount(); renderCarousel(); setupCountdown(); setupBackToTop(); renderProductsGrid(); renderProductDetail(); renderCartPage(); setupCheckout();
    // some pages might not exist
  }

  // Run after DOM ready
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();

})();

