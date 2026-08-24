const products = [
  {brand:"JOHN JACOBS", name:"Tortoise Round Eyeglasses", price:1299, old:2199, img:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=700&q=80"},
  {brand:"VINCENT CHASE", name:"Black Rectangle Eyeglasses", price:999, old:1799, img:"https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=700&q=80"},
  {brand:"AIR FLEX", name:"Blue Square Eyeglasses", price:1199, old:1999, img:"https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=700&q=80"},
  {brand:"IDEE", name:"Brown Wayfarer Eyeglasses", price:1099, old:1899, img:"https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=700&q=80"},
  {brand:"FASTRACK", name:"Black & Red Eyeglasses", price:949, old:1599, img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"},
  {brand:"RAY-BAN", name:"Aviator Sunglasses", price:2699, old:4499, img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"},
  {brand:"VINCENT CHASE", name:"Polarized Sunglasses", price:1599, old:2799, img:"https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=700&q=80"},
  {brand:"OAKLEY", name:"Sports Sunglasses", price:3499, old:5999, img:"https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=700&q=80"},
  {brand:"FASTRACK", name:"Brown Wayfarer Sunglasses", price:1299, old:2199, img:"https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=700&q=80"},
  {brand:"IDEE", name:"Round Sunglasses", price:1199, old:1999, img:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=700&q=80"}
];

const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
let cart = 0;

function renderProducts(list = products){
  grid.innerHTML = list.map((p,i) => {
    const discount = Math.round((1 - p.price/p.old)*100);
    return `<article class="product">
      <div class="product-img">
        <button class="heart" aria-label="Add to wishlist">♡</button>
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-info">
        <div class="brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <span class="price">₹${p.price.toLocaleString("en-IN")}</span>
        <span class="old">₹${p.old.toLocaleString("en-IN")}</span>
        <span class="discount">${discount}% OFF</span>
        <button class="add" data-index="${products.indexOf(p)}">ADD TO CART</button>
      </div>
    </article>`;
  }).join("");
}

renderProducts();

grid.addEventListener("click", e => {
  const add = e.target.closest(".add");
  const heart = e.target.closest(".heart");
  if(add){
    cart++;
    cartCount.textContent = cart;
    showToast("Product added to cart");
  }
  if(heart){
    heart.textContent = heart.textContent === "♡" ? "♥" : "♡";
    showToast(heart.textContent === "♥" ? "Added to wishlist" : "Removed from wishlist");
  }
});

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.getElementById("cartButton").addEventListener("click", () => {
  showToast(cart ? `${cart} item${cart > 1 ? "s" : ""} in your cart` : "Your cart is empty");
});

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  if(!q) return renderProducts();
  const filtered = products.filter(p => `${p.brand} ${p.name}`.toLowerCase().includes(q));
  renderProducts(filtered);
});

document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  showToast("Thanks! You are subscribed.");
  e.target.reset();
});
