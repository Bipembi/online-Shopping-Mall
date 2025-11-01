
// Expanded and beautified product data. Images use Unsplash source queries for royalty-free, high-quality photos.
const PRODUCTS = [
  {id: 'p1', title: 'Classic Leather Jacket', category: 'Fashion', price: 169, rating:4.7, desc: 'Premium leather-look jacket with a tailored silhouette.', images:[
    'leather jacket.webp',
    'tailored blazer.avif'
  ]},
  {id: 'p2', title: 'Wireless Headphones Pro', category: 'Electronics', price: 219, rating:4.8, desc: 'Active noise-cancelling over-ear headphones with long battery life.', images:[
    'wireless headphones.jpg',
    'wireless charger.webp'
  ]},
  {id: 'p3', title: 'Ceramic Table Lamp', category: 'Home', price: 59, rating:4.4, desc: 'Hand-finished ceramic lamp for cozy ambient lighting.', images:[
    'ceramic lamp.jpg',
    'home essentials.jpg'
  ]},
  {id: 'p4', title: 'Organic Skincare Set', category: 'Beauty', price: 79, rating:4.6, desc: 'Three-step natural skincare routine for glowing skin.', images:[
    'organics.jpeg',
    'lips set.jpg'
  ]},
  {id: 'p5', title: 'Everyday Sneakers', category: 'Fashion', price: 89, rating:4.5, desc: 'Lightweight, supportive sneakers for everyday comfort.', images:[
    'sneakers.webp',
    'fashion.webp'
  ]},
  {id: 'p6', title: '4K Smart TV 43"', category: 'Electronics', price: 399, rating:4.6, desc: 'Crisp 4K HDR display with smart apps and voice control.', images:[
    '4k smart TV.webp',
    'electronics.jpeg'
  ]},
  {id: 'p7', title: 'Stainless Steel Cookware Set', category: 'Home', price: 139, rating:4.3, desc: 'Professional-grade cookware for everyday chefs.', images:[
    'stainless steel.webp',
    'home essentials.jpg'
  ]},
  {id: 'p8', title: 'Perfume — Modern Scent', category: 'Beauty', price: 99, rating:4.7, desc: 'A refined fragrance with citrus and amber notes.', images:[
    'perfume.jpg',
    'lips set.jpg'
  ]},
  {id: 'p9', title: 'Smart Watch Series 6', category: 'Electronics', price: 269, rating:4.5, desc: 'Health tracking, notifications, and sleek design.', images:[
    'smart watch series 6.webp',
    'electronics.jpeg'
  ]},
  {id: 'p10', title: 'Cozy Throw Blanket', category: 'Home', price: 49, rating:4.4, desc: 'Ultra-soft knit throw to warm up any space.', images:[
    'cozy blanket.webp',
    'home essentials.jpg'
  ]},
  {id: 'p11', title: 'Tailored Blazer', category: 'Fashion', price: 179, rating:4.7, desc: 'Structured blazer with a modern tailored cut.', images:[
    'tailored blazer.avif',
    'fashion.webp'
  ]},
  {id: 'p12', title: 'Hydrating Lip Care Set', category: 'Beauty', price: 29, rating:4.2, desc: 'Nourishing lip balms with natural oils.', images:[
    'lips set.jpg',
    'beauty.webp'
  ]},
  {id: 'p13', title: 'Minimalist Wallet', category: 'Fashion', price: 45, rating:4.4, desc: 'Slim leather wallet with RFID protection.', images:[
    'wallet.png',
    'fashion.webp'
  ]},
  {id: 'p14', title: 'Wireless Charging Pad', category: 'Electronics', price: 39, rating:4.1, desc: 'Fast wireless charging for all Qi devices.', images:[
    'wireless charger.webp',
    'electronics.jpeg'
  ]},
  {id: 'p15', title: 'Bamboo Cutting Board', category: 'Home', price: 34, rating:4.3, desc: 'Sustainable bamboo board with juice groove.', images:[
    'bamboo.jpeg',
    'home essentials.jpg'
  ]},
  {id: 'p16', title: 'Scented Candle — Amber', category: 'Home', price: 27, rating:4.5, desc: 'Hand-poured soy candle with warm amber scent.', images:[
    'amber candle.webp',
    'cozy blanket.webp'
  ]},
  {id: 'p17', title: 'Vitamin C Serum', category: 'Beauty', price: 59, rating:4.6, desc: 'Brightening serum with stabilized vitamin C.', images:[
    'vitamin-c-serum.jpeg',
    'lips set.jpg'
  ]},
  {id: 'p18', title: 'Portable Espresso Maker', category: 'Home', price: 129, rating:4.4, desc: 'Make espresso on the go with this compact brewer.', images:[
    'maker.jpeg',
    'home essentials.jpg'
  ]}
];

// Utility: find product by id
function findProduct(id){
  return PRODUCTS.find(p => p.id === id);
}
