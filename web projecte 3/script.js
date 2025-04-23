document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('carret-quantitat');
    const cartItems = document.getElementById('cartItems');
    const productsContainer = document.getElementById('articles-container');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    const confirmCheckoutBtn = document.getElementById('confirmCheckout');

    const products = [
        { id: 1, name: 'Article 1', description: 'Una descripció breu de l\'Article 1.', price: 10, image: 'https://via.placeholder.com/200x200?text=Article+1' },
        { id: 2, name: 'Article 2', description: 'Una descripció breu de l\'Article 2.', price: 15, image: 'https://via.placeholder.com/200x200?text=Article+2' },
        // Agregar el resto de los productos...
    ];

    // Mostrar productos
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4');
        productDiv.innerHTML = `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <h5>${product.name}</h5>
                <p><strong>Preu:</strong> ${product.price} €</p>
                <p><strong>Descripció:</strong> ${product.description}</p>
                <button class="btn btn-success addToCart" data-id="${product.id}">Afegir al Carret</button>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });

    // Agregar artículos al carrito
    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });

    // Actualizar carrito
    function updateCart() {
        let total = 0;
        let itemCount = 0;
        cartItems.innerHTML = '';

        cart.forEach(item => {
            const itemDiv = document.createElement('li');
            itemDiv.classList.add('list-group-item');
            itemDiv.innerHTML = `${item.name} - ${item.quantity} x ${item.price} € 
            <button class="btn btn-danger btn-sm float-end removeItem" data-id="${item.id}">Eliminar</button>`;
            cartItems.appendChild(itemDiv);

            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        cartCount.textContent = itemCount;
        document.getElementById('cartTotal').textContent = `${total} €`;
    }

    // Eliminar artículo
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('removeItem')) {
            const productId = parseInt(e.target.dataset.id);
            const index = cart.findIndex(item => item.id === productId);
            if (index !== -1) {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        }
    });

    // Mostrar modal al hacer clic en "Finalitzar Compra"
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El teu carret està buit!');
        } else {
            checkoutModal.show();
        }
    });

    // Confirmar compra
    confirmCheckoutBtn.addEventListener('click', () => {
        // Aquí puedes procesar la compra, por ejemplo, enviarla a un servidor.
        alert('Compra confirmada! Gràcies per comprar amb nosaltres.');

        // Limpiar el carrito después de la compra
        localStorage.removeItem('cart');
        updateCart();
        
        // Cerrar el modal
        checkoutModal.hide();
    });

    // Inicializar carrito
    updateCart();
});
