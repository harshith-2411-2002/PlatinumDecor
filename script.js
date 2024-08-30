document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const updateCartCount = () => {
        cartCount.textContent = cartItems.length;
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.closest('.product-item').dataset.id;
            if (!cartItems.includes(productId)) {
                cartItems.push(productId);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartCount();
                alert('Item added to cart!');
            }
        });
    });

    updateCartCount(); // Initialize cart count
});
