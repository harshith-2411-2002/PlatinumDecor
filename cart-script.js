document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;

    const fetchProductDetails = async (productId) => {
        // Replace with your API endpoint or mock data
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const product = await response.json();
        return product;
    };

    const renderCartItems = async () => {
        cartItemsContainer.innerHTML = '';
        for (let productId of cartItems) {
            const product = await fetchProductDetails(productId);
            const productItem = document.createElement('div');
            productItem.className = 'cart-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
                <button class="remove-from-cart" data-id="${productId}">Remove</button>
            `;
            cartItemsContainer.appendChild(productItem);
            totalPrice += product.price;
        }
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Add remove button functionality
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.id;
                cartItems = cartItems.filter(id => id !== productId);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                renderCartItems(); // Re-render cart items
                alert('Item removed from cart!');
            });
        });
    };

    renderCartItems();
});
