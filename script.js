// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Product Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Active button highlight
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter products
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add to Cart Logic
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total span');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;

        // Add to cart count
        cartCount++;
        cartCountElement.textContent = cartCount;

        // Add item to mini-cart
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${productName}</p>
            <p>${productPrice}</p>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Update total
        updateCartTotal();
    });
});

function updateCartTotal() {
    const prices = document.querySelectorAll('.cart-items .cart-item p:nth-child(2)');
    let total = 0;
    prices.forEach(priceEl => {
        const price = parseFloat(priceEl.textContent.replace('$', ''));
        total += price;
    });
    cartTotalElement.textContent = total.toFixed(2);
}
