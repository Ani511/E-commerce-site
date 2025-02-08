document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        });
});
const products = [
    { id: 1, name: "Laptop", price: 899, image: "images/laptop.jpg" },
    { id: 2, name: "Headphones", price: 199, image: "images/headphones.jpg" },
    { id: 3, name: "Smartphone", price: 699, image: "images/smartphone.jpg" },
    { id: 4, name: "Camera", price: 499, image: "images/camera.jpg" },
];

function displayProducts(products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    alert(`${product.name} added to the cart!`);
}
function viewCart() {
    const cartList = document.getElementById("cartList");
    cartList.innerHTML = ""; // Clear the cart display

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("totalPrice").textContent = `Total: $${total}`;
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    viewCart();
}

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    viewCart();
});