/*
  CUM ADAUGI PRODUSE:
  1. Pune fotografia în images/products/
  2. Copiază un produs de mai jos.
  3. Schimbă id, nume, categorie, pret și poza.
  4. Salvează fișierul și fă Commit changes în GitHub.
*/
const products = [

    {
  id: 1,
  nume: "Invitație botez – Flori roz",
  categorie: "Botez",
  pret: 9,
  poza: "images/products/amalia.jpg"
},
  {
    id: 2,
    nume: "Exemplu — Topper 3D",
    categorie: "Botez",
    pret: 25,
    poza: "images/products/topper-botez.jpg"
  },
  {
    id: 3,
    nume: "Exemplu — Cană personalizată",
    categorie: "Cadouri",
    pret: 35,
    poza: "images/products/cana.jpg"
  },
  {
    id: 4,
    nume: "Exemplu — Magnet personalizat",
    categorie: "Nuntă & Botez",
    pret: 4,
    poza: "images/products/magnet.jpg"
  }
];

const filters = document.querySelector("#filters");
const grid = document.querySelector("#productsGrid");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartPanel = document.querySelector("#cartPanel");
const overlay = document.querySelector("#overlay");
let activeCategory = "Toate";
let cart = [];

const money = n => `${n} lei`;

function categories(){
  return ["Toate", ...new Set(products.map(p => p.categorie))];
}

function renderFilters(){
  filters.innerHTML = categories().map(c =>
    `<button class="filter ${c===activeCategory?'active':''}" data-category="${c}">${c}</button>`
  ).join("");
  filters.querySelectorAll(".filter").forEach(btn => btn.onclick = () => {
    activeCategory = btn.dataset.category;
    renderFilters();
    renderProducts();
  });
}

function renderProducts(){
  const list = activeCategory === "Toate" ? products : products.filter(p => p.categorie === activeCategory);
  grid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-photo">
        <img src="${p.poza}" alt="${p.nume}" onerror="this.style.display='none';this.parentElement.innerHTML='<span>Adaugă fotografia<br>în ${p.poza}</span>'">
      </div>
      <div class="product-info">
        <div class="product-category">${p.categorie}</div>
        <div class="product-name">${p.nume}</div>
        <div class="product-price">${money(p.pret)}</div>
        <div class="product-actions">
          <button class="add-cart" onclick="addToCart(${p.id})">Adaugă în coș</button>
          <button class="fav" onclick="this.classList.toggle('active')">♡</button>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if(existing) existing.qty++;
  else cart.push({...p, qty:1});
  renderCart();
  openCart();
}

function renderCart(){
  cartCount.textContent = cart.reduce((s,p)=>s+p.qty,0);
  cartItems.innerHTML = cart.length ? cart.map(p => `
    <div class="cart-row">
      <div><strong>${p.nume}</strong><br><small>${p.qty} × ${money(p.pret)}</small></div>
      <button class="remove" onclick="removeFromCart(${p.id})">Șterge</button>
    </div>`).join("") : "<p>Coșul este gol.</p>";
  cartTotal.textContent = money(cart.reduce((s,p)=>s+p.pret*p.qty,0));
}
function removeFromCart(id){ cart = cart.filter(p=>p.id!==id); renderCart(); }
function openCart(){ cartPanel.classList.add("open"); overlay.classList.add("open"); cartPanel.setAttribute("aria-hidden","false"); }
function closeCart(){ cartPanel.classList.remove("open"); overlay.classList.remove("open"); cartPanel.setAttribute("aria-hidden","true"); }
document.querySelector("#openCart").onclick = openCart;
document.querySelector("#closeCart").onclick = closeCart;
overlay.onclick = closeCart;

function populateForm(){
  const cat = document.querySelector("#formCategory");
  cat.innerHTML = categories().filter(x=>x!=="Toate").map(x=>`<option>${x}</option>`).join("");
  const productSelect = document.querySelector("#formProduct");
  function update(){
    const selected = products.filter(p=>p.categorie===cat.value);
    productSelect.innerHTML = selected.map(p=>`<option value="${p.id}">${p.nume} — ${money(p.pret)}</option>`).join("");
  }
  cat.onchange = update;
  update();
}
document.querySelector("#orderForm").onsubmit = e => {
  e.preventDefault();
  const product = products.find(p=>p.id == document.querySelector("#formProduct").value);
  const qty = document.querySelector("#formQuantity").value;
  const colors = document.querySelector("#formColors").value || "nespecificate";
  const date = document.querySelector("#formDate").value || "nespecificată";
  const details = document.querySelector("#formDetails").value || "fără alte detalii";
  const text = `Bună! Vreau o ofertă ACDmixArt.%0A%0AProdus: ${product.nume}%0ACantitate: ${qty}%0ACulori: ${colors}%0AData evenimentului: ${date}%0ADetalii: ${details}`;
  window.open(`https://wa.me/?text=${text}`, "_blank");
};

document.querySelector("#cartWhatsapp").onclick = () => {
  if(!cart.length) return alert("Coșul este gol.");
  const lines = cart.map(p=>`• ${p.nume} — ${p.qty} buc. × ${money(p.pret)}`).join("%0A");
  const total = cart.reduce((s,p)=>s+p.pret*p.qty,0);
  window.open(`https://wa.me/?text=Bună!%20Vreau%20să%20comand:%0A${lines}%0A%0ATotal%20estimativ:%20${money(total)}`, "_blank");
};

document.querySelector("#year").textContent = new Date().getFullYear();
renderFilters();
renderProducts();
populateForm();
renderCart();
// Deschidere mare pentru pozele produselor
document.addEventListener("click", function(e) {
  if (e.target.closest(".product-photo img")) {
    const img = e.target.closest(".product-photo img");

    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";

    lightbox.innerHTML = `
      <button class="lightbox-close">×</button>
      <img src="${img.src}" alt="${img.alt}">
    `;

    document.body.appendChild(lightbox);

    lightbox.onclick = function(e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        lightbox.remove();
      }
    };
  }
});
