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
    poze: 
      "images/products/amalia.jpg",
      "images/products/amalia1.jpg"
  },
  {
    id: 2,
    nume: "Invitație botez-Urs",
    categorie: "Botez",
    pret: 6.5,
    poze: 
      "images/products/urs.jpg",
      "images/products/urs1.jpg",
      "images/products/urs2.jpg"
  };
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
  const list = activeCategory === "Toate"
    ? products
    : products.filter(p => p.categorie === activeCategory);

  grid.innerHTML = list.map(p => {
    const imagini = p.poze || [p.poza];

    return `
      <article class="product-card">
        <div class="product-photo">
          <img src="${imagini[0]}" alt="${p.nume}" data-product-id="${p.id}">
        </div>

        <div class="product-info">
          <div class="product-category">${p.categorie}</div>
          <div class="product-name">${p.nume}</div>
          <div class="product-price">${money(p.pret)}</div>

          <div class="product-actions">
            <button class="add-cart" onclick="addToCart(${p.id})">
              Adaugă în coș
            </button>
            <button class="fav" onclick="this.classList.toggle('active')">♡</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
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

 // Galerie poze produs
document.addEventListener("click", function(e) {
  const img = e.target.closest(".product-photo img");
  if (!img) return;

  const produs = products.find(p => p.id == img.dataset.productId);
  if (!produs) return;

  const imagini = produs.poze || [produs.poza];
  let index = 0;

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";

  lightbox.innerHTML = `
    <button class="lightbox-close">×</button>
    <button class="lightbox-prev">‹</button>
    <img class="lightbox-image" src="${imagini[index]}" alt="${produs.nume}">
    <button class="lightbox-next">›</button>
  `;

  document.body.appendChild(lightbox);

  const imagineMare = lightbox.querySelector(".lightbox-image");

  function afiseazaImagine() {
    imagineMare.src = imagini[index];
  }

  lightbox.querySelector(".lightbox-prev").onclick = function(e) {
    e.stopPropagation();
    index = (index - 1 + imagini.length) % imagini.length;
    afiseazaImagine();
  };

  lightbox.querySelector(".lightbox-next").onclick = function(e) {
    e.stopPropagation();
    index = (index + 1) % imagini.length;
    afiseazaImagine();
  };

  lightbox.querySelector(".lightbox-close").onclick = function() {
    lightbox.remove();
  };

  lightbox.onclick = function(e) {
    if (e.target === lightbox) {
      lightbox.remove();
    }
  };
});
