// Sample product data with real stock images
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "USB-C Cable",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Power Bank",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?w=200&auto=format&fit=crop"
    }
    // Phone case has been removed as requested
];

// Cart data
let cart = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
});

// Render products to the page
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productElement);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }

    updateCart();
}

// Update cart display
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                <span>${item.name} (${item.quantity})</span>
            </div>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Toggle cart visibility
function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.toggle('hidden');
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
    cart = [];
    updateCart();
}

// Helper function to update cart
function updateCart() {
    renderCart();
}