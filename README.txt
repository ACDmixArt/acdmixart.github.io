ACDmixArt — catalog ușor de administrat

1. POZE
- Creează/folosește folderul images/products/
- Încarcă fotografiile produselor acolo.
- Numele fișierului trebuie să fie exact ca în câmpul "poza".

2. PRODUSE ȘI PREȚURI
- Deschide script.js.
- La începutul fișierului găsești const products = [...]
- Pentru fiecare produs modifică:
  id
  nume
  categorie
  pret
  poza

Exemplu:
{
  id: 5,
  nume: "Invitație florală",
  categorie: "Nuntă",
  pret: 7,
  poza: "images/products/invitatie-florala.jpg"
}

3. CATEGORII
Nu trebuie să le scrii separat. Site-ul le creează automat din produsele tale.

4. DUPĂ MODIFICĂRI
În GitHub apasă "Commit changes". Site-ul se actualizează automat după publicarea GitHub Pages.

5. CULORI ȘI FONTURI
Deschide style.css și modifică valorile de la început:
--burgundy
--cream
--paper
--gold
--ink

Fonturile sunt Cormorant Garamond pentru titluri și Montserrat pentru text.

6. WHATSAPP
În script.js, funcțiile de comandă deschid WhatsApp cu cererea clientului. Pentru a trimite direct către numărul ACDmixArt, înlocuiește:
https://wa.me/?text=
cu:
https://wa.me/NUMARUL_TAU?text=
și pune numărul în format internațional, fără + sau spații.
