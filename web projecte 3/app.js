document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('articles-container');
    const cartButton = document.getElementById('cart-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const products = [
        { id: 1, name: 'Rentadora Bosch', model: 'WAT2448XES', price: 299, description: 'Rentadora de 8 kg amb tecnologia EcoSilence i sistema AntiVibració.', image: '/elements/Rentadora Bosch.jpg' },
        { id: 2, name: 'Microones Samsung', model: 'MG23K3515AK', price: 99, description: 'Microones de 23L amb sistema de descongelació ràpida i funció Grill.', image: '/elements/Microones Samsung.jpg' },
        { id: 3, name: 'Aspiradora Dyson', model: 'V11 Absolute', price: 599, description: 'Aspiradora sense cable amb potència màxima i filtres HEPA.', image: '/elements/Aspiradora Dyson.jpg' },
        { id: 4, name: 'Nevera LG', model: 'GBB72MCUFN', price: 649, description: 'Nevera de 330L amb tecnologia No Frost i control de temperatura intel·ligent.', image: '/elements/Nevera LG.jpg' },
        { id: 5, name: 'Cafetera Nespresso', model: 'Essenza Mini', price: 89, description: 'Cafetera compacta amb sistema d\'extracció d\'alta pressió i fàcil ús.', image: '/elements/Cafetera Nespresso.jpg' },
        { id: 6, name: 'Rentavaixella Bosch', model: 'SMS24AW01E', price: 379, description: 'Rentavaixella de 12 coberts amb programes eco i reducció de soroll.', image: '/elements/Rentavaixella Bosch.jpg' },
        { id: 7, name: 'Vitroceràmica Balay', model: '3EB965LR', price: 399, description: 'Vitroceràmica de 3 zones amb control tàctil i funció Booster per escalfar ràpidament.', image: '/elements/Vitroceràmica Balay.jpg' },
        { id: 8, name: 'Secadora Siemens', model: 'WT47W5W0ES', price: 599, description: 'Secadora amb bomba de calor de 9 kg i sistema AutoDry per evitar l\'encongiment de la roba.', image: '/elements/Secadora Siemens.png' },
        { id: 9, name: 'Forn Electrolux', model: 'LKK3111AX', price: 249, description: 'Forn de cuina amb 8 funcions de cocció i sistema de ventilació uniforme per a una cocció perfecta.', image: '/elements/Forn Electrolux.jpg' },
        { id: 10, name: 'Samsung TV LED', model: 'UE32T5305', price: 279, description: 'Extractor amb funció de filtres de carboni i capacitat d\'aspiració de 720 m³/h.', image: '/elements/Samsung TV LED.jpg' },
        { id: 11, name: 'Planxa Tefal', model: 'FV9740', price: 69, description: 'Planxa de vapor amb funció antical i màxima potència per eliminar arrugues de manera eficaç.', image: '/elements/Planxa Tefal.webp' },
        { id: 12, name: 'Caldera Vaillant', model: 'VUW 306/5-5', price: 899, description: 'Caldera de condensació de gas per a calefacció i aigua calenta sanitària amb un rendiment energètic elevat.', image: '/elements/Caldera Vaillant.jpg' }
    ];
    
    // Generar productes en la vista
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4', 'mb-4');
        productDiv.innerHTML = `
            <div class="product-item text-center">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="img-fluid product-image" 
                     loading="lazy">
                <h5>${product.name}</h5>
                <p><strong>Model:</strong> ${product.model}</p>
                <p><strong>Preu:</strong> ${product.price} €</p>
                <p><strong>Descripció:</strong> ${product.description}</p>
                <button class="btn btn-success addToCart" data-id="${product.id}">Afegir al Carret</button>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });

    // Event listener per afegir productes al carret
    productsContainer.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('addToCart')) {
            const productId = event.target.getAttribute('data-id');
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                cart.push(product);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} afegit al carret!`);
            }
        }
    });

    if (cartButton) {
        cartButton.addEventListener('click', () => {
            window.location.href = 'carret.html';
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-center">El carret està buit.</p>';
            totalElement.textContent = '0';
            return;
        }

        cart.forEach((product, index) => {
            totalPrice += product.price;

            const productDiv = document.createElement('div');
            productDiv.classList.add('col-md-4', 'mb-3');
            productDiv.innerHTML = `
                <div class="card">
                    <img src="${product.image}" class="card-img-top img-fluid" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text"><strong>Preu:</strong> ${product.price} €</p>
                        <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">Eliminar</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(productDiv);
        });

        totalElement.textContent = totalPrice.toFixed(2);
    }

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("El carret està buit!");
            return;
        }
        alert("Compra realitzada amb èxit!");
        localStorage.removeItem('cart');
        cart = [];
        renderCart();
    });

    renderCart();
});
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    // Comprobar si las cookies han sido aceptadas previamente
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.style.display = 'none'; // Ocultar el banner si ya fue aceptado
    } else {
        cookieBanner.style.display = 'block'; // Mostrar el banner si no se ha aceptado
    }

    // Evento para aceptar las cookies
    acceptCookiesButton.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true'); // Guardar en localStorage que las cookies han sido aceptadas
        cookieBanner.style.display = 'none'; // Ocultar el banner
    });
});
