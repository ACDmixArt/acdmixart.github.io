/*
  CUM ADAUGI PRODUSE:
  1. Pune fotografiile în images/products/
  2. Copiază un produs de mai jos.
  3. Schimbă id, nume, categorie, pret și poze.
  4. Salvează fișierul și fă Commit changes în GitHub.
*/

const products = [
  {
    id: 1,
    nume: "Invitație botez – Flori roz",
    categorie: "Botez",
    pret: 9,
    poze: [
      "images/products/amalia.jpg",
      "images/products/amalia1.jpg"
    ]
  },

  {
    id: 2,
    nume: "Invitație botez-Urs",
    categorie: "Botez",
    pret: 6.5,
    poze: [
      "images/products/urs.jpg",
      "images/products/urs1.jpg",
      "images/products/urs2.jpg"
    ]
  },

  {
    id: 3,
    nume: "Exemplu — Cană personalizată",
    categorie: "Cani",
    pret: 35,
    poze: [
      "images/products/cana.jpg"
    ]
  },

  {
    id: 4,
    nume: "Exemplu — Magnet personalizat",
    categorie: "Marturii",
    pret: 4,
    poze: [
      "images/products/magnet.jpg"
    ]
  }
];

const filtre = document.querySelector(".filters");
const grila = document.querySelector(".products-grid");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartPanel = document.querySelector(".cart-panel");
const overlay = document.querySelector(".overlay");

let activeCategory = "Toate";
let cart = [];


/* =========================
   CATEGORII
========================= */

function categories() {
  return [
    "Toate",
    "Botez",
    "Nunta",
    "Nunta-Botez",
    "Marturii",
    "Cani",
    "Toppere",
    "Carti",
    "Party",
    "Set Mot"
  ];
}


/* =========================
   BANI
========================= */

function money(value) {
  return `${value.toFixed(2).replace(".", ",")} lei`;
}


/* =========================
   AFISARE CATEGORII
========================= */

function renderCategories() {
  if (!filtre) return;

  filtre.innerHTML = categories()
    .map(category => `
      <button
        class="filter-btn ${category === activeCategory ? "active" : ""}"
        onclick="setCategory('${category}')"
      >
        ${category}
      </button>
    `)
    .join("");
}


/* =========================
   SCHIMBARE CATEGORIE
========================= */

function setCategory(category) {
  activeCategory = category;
  renderCategories();
  renderProducts();
}


/* =========================
   AFISARE PRODUSE
========================= */

function renderProducts() {
  if (!grila) return;

  const list =
    activeCategory === "Toate"
      ? products
      : products.filter(
          product => product.categorie === activeCategory
        );

  if (list.length === 0) {
    grila.innerHTML = `
      <div class="empty-products">
        Nu există produse în această categorie momentan.
      </div>
    `;
    return;
  }

  grila.innerHTML = list
    .map(product => {
      const imagini = product.poze || [product.poza];

      return `
        <article class="product-card">

          <div class="product-photo">
            <img
              src="${imagini[0]}"
              alt="${product.nume}"
              data-product-id="${product.id}"
            >
          </div>

          <div class="product-info">

            <div class="product-category">
              ${product.categorie}
            </div>

            <div class="product-name">
              ${product.nume}
            </div>

            <div class="product-price">
              ${money(product.pret)}
            </div>

            <div class="product-actions">

              <button
                class="add-cart"
                onclick="addToCart(${product.id})"
              >
                Adaugă în coș
              </button>

              <button
                class="fav"
                onclick="this.classList.toggle('active')"
              >
                ♡
              </button>

            </div>

          </div>

        </article>
      `;
    })
    .join("");
}


/* =========================
   COS
========================= */

function addToCart(productId) {
  const product = products.find(
    product => product.id === productId
  );

  if (!product) return;

  cart.push(product);

  renderCart();
  openCart();
}


function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}


function renderCart() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart">
        Coșul este gol.
      </p>
    `;

    cartTotal.textContent = "0,00 lei";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (product, index) => `
        <div class="cart-item">

          <div>
            <strong>${product.nume}</strong>
            <span>${money(product.pret)}</span>
          </div>

          <button onclick="removeFromCart(${index})">
            ×
          </button>

        </div>
      `
    )
    .join("");

  const total = cart.reduce(
    (sum, product) => sum + product.pret,
    0
  );

  cartTotal.textContent = money(total);
}


/* =========================
   DESCHIDERE COS
========================= */

function openCart() {
  if (cartPanel) {
    cartPanel.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("open");
  }
}


/* =========================
   INCHIDERE COS
========================= */

function closeCart() {
  if (cartPanel) {
    cartPanel.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("open");
  }
}


/* =========================
   BUTON COS
========================= */

document.addEventListener("click", function(event) {

  const cartButton =
    event.target.closest(".cart-button");

  if (cartButton) {
    openCart();
  }

  const closeButton =
    event.target.closest(".cart-close");

  if (closeButton) {
    closeCart();
  }

});


/* =========================
   OVERLAY
========================= */

if (overlay) {
  overlay.addEventListener("click", closeCart);
}


/* =========================
   GALERIE POZE PRODUS
========================= */

document.addEventListener("click", function(event) {

  const img =
    event.target.closest(".product-photo img");

  if (!img) return;

  const productId =
    Number(img.dataset.productId);

  const product =
    products.find(product => product.id === productId);

  if (!product) return;

  const imagini =
    product.poze || [product.poza];

  let index = 0;

  const lightbox =
    document.createElement("div");

  lightbox.className = "image-lightbox";

  lightbox.innerHTML = `
    <button class="lightbox-close">
      ×
    </button>

    <button class="lightbox-prev">
      ‹
    </button>

    <img
      class="lightbox-image"
      src="${imagini[index]}"
      alt="${product.nume}"
    >

    <button class="lightbox-next">
      ›
    </button>
  `;

  document.body.appendChild(lightbox);

  const imagineMare =
    lightbox.querySelector(".lightbox-image");


  function afiseazaImagine() {
    imagineMare.src = imagini[index];
  }


  const butonPrev =
    lightbox.querySelector(".lightbox-prev");

  const butonNext =
    lightbox.querySelector(".lightbox-next");

  const butonClose =
    lightbox.querySelector(".lightbox-close");


  butonPrev.onclick = function(event) {
    event.stopPropagation();

    index =
      (index - 1 + imagini.length)
      % imagini.length;

    afiseazaImagine();
  };


  butonNext.onclick = function(event) {
    event.stopPropagation();

    index =
      (index + 1)
      % imagini.length;

    afiseazaImagine();
  };


  butonClose.onclick = function() {
    lightbox.remove();
  };


  lightbox.onclick = function(event) {
    if (event.target === lightbox) {
      lightbox.remove();
    }
  };

});


/* =========================
   INITIALIZARE
========================= */

renderCategories();
renderProducts();
renderCart();
