// UI Utility Functions
function showToast(message, type = 'info') {
    const toastEl = document.getElementById('liveToast');
    if (!toastEl) return;
    
    const toastBody = toastEl.querySelector('.toast-body');
    const toast = new bootstrap.Toast(toastEl);
    
    // Set message
    toastBody.textContent = message;
    
    // Set color based on type
    const toastHeader = toastEl.querySelector('.toast-header');
    switch(type) {
        case 'success':
            toastHeader.style.borderLeftColor = '#28a745';
            break;
        case 'error':
            toastHeader.style.borderLeftColor = '#dc3545';
            break;
        case 'warning':
            toastHeader.style.borderLeftColor = '#ffc107';
            break;
        default:
            toastHeader.style.borderLeftColor = '#17a2b8';
    }
    
    toast.show();
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return `<span class="food-card-rating">${stars} <span class="ms-1">${rating.toFixed(1)}</span></span>`;
}

// Food filtering and search
function setupFoodFilters() {
    // Category filter buttons
    document.querySelectorAll('.category-filter, .btn-category').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            document.querySelectorAll('.btn-category').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filter food items
            filterFoodItems(category);
        });
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterFoodItems('all', searchTerm);
        });
    }
}

function filterFoodItems(category, searchTerm = '') {
    const container = document.getElementById('foodItemsContainer');
    if (!container) return;
    
    let filteredItems = [...foodItems];
    
    // Filter by category
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Display filtered items
    displayFoodItems(filteredItems, container);
}

function displayFoodItems(items, container) {
    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-4x mb-3 text-muted"></i>
                <h4 class="text-muted">No food items found</h4>
                <p class="text-muted">Try a different search or category</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    items.forEach(item => {
        html += `
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card food-card">
                    <img src="${item.image}" class="card-img-top food-card-img" alt="${item.name}">
                    <div class="card-body food-card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title food-card-title">${item.name}</h5>
                            <span class="food-card-price">₹${item.price}</span>
                        </div>
                        <span class="food-card-category">${item.category}</span>
                        ${generateStarRating(item.rating)}
                        <p class="card-text food-card-description">${item.description}</p>
                        <button class="btn btn-add-to-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            if (!auth.isLoggedIn()) {
                showToast('Please login to add items to cart', 'warning');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                return;
            }
            
            const itemId = parseInt(this.dataset.id);
            const item = foodItems.find(food => food.id === itemId);
            
            if (item) {
                cart.addItem(itemId, item);
                showToast(`${item.name} added to cart!`, 'success');
            }
        });
    });
}

// Initialize theme
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Apply saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    }
}
// UI Functions for PanvelEats

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('panvelEatsCart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const newQuantity = cart[itemIndex].quantity + change;
    
    if (newQuantity < 1) {
        // Remove item if quantity becomes 0
        cart.splice(itemIndex, 1);
        showToast('Item removed from cart', 'warning');
    } else {
        cart[itemIndex].quantity = newQuantity;
        showToast('Cart updated', 'success');
    }
    
    localStorage.setItem('panvelEatsCart', JSON.stringify(cart));
    
    // Update UI
    displayCartItems();
    calculateTotals();
    updateCartCount();
}

// Remove item from cart
function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('panvelEatsCart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const itemName = cart[itemIndex].name;
    cart.splice(itemIndex, 1);
    
    localStorage.setItem('panvelEatsCart', JSON.stringify(cart));
    
    showToast(`${itemName} removed from cart`, 'warning');
    
    // Update UI
    displayCartItems();
    calculateTotals();
    updateCartCount();
}

// Calculate and display totals
function calculateTotals() {
    const cart = JSON.parse(localStorage.getItem('panvelEatsCart')) || [];
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const tax = subtotal * 0.05; // 5% GST
    const total = subtotal + deliveryFee + tax;
    
    // Update UI
    document.getElementById('cart-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('cart-delivery').textContent = `₹${deliveryFee.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `₹${total.toFixed(2)}`;
    
    // Update checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
        checkoutBtn.textContent = cart.length === 0 ? 'Cart is Empty' : `Proceed to Pay ₹${total.toFixed(2)}`;
    }
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('panvelEatsCart');
        showToast('Cart cleared', 'warning');
        
        // Update UI
        displayCartItems();
        calculateTotals();
        updateCartCount();
    }
}

// Apply coupon
function applyCoupon() {
    const couponInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');
    
    if (!couponInput || !couponMessage) return;
    
    const couponCode = couponInput.value.trim().toUpperCase();
    
    // Available coupons
    const validCoupons = {
        'PANVEL10': 10, // 10% discount
        'EATS25': 25,   // 25% discount on orders above ₹500
        'WELCOME50': 50 // ₹50 off on first order
    };
    
    if (!couponCode) {
        showCouponMessage('Please enter a coupon code', 'warning');
        return;
    }
    
    if (validCoupons[couponCode]) {
        showCouponMessage(`Coupon applied! You saved ₹${validCoupons[couponCode]}`, 'success');
        
        // Store applied coupon
        localStorage.setItem('panvelEatsAppliedCoupon', JSON.stringify({
            code: couponCode,
            discount: validCoupons[couponCode]
        }));
        
        // Recalculate totals with discount
        calculateTotalsWithCoupon(validCoupons[couponCode]);
        
        // Disable coupon input
        couponInput.disabled = true;
        document.getElementById('apply-coupon-btn').disabled = true;
        
    } else {
        showCouponMessage('Invalid coupon code', 'danger');
    }
}

// Show coupon message
function showCouponMessage(message, type) {
    const couponMessage = document.getElementById('coupon-message');
    if (!couponMessage) return;
    
    couponMessage.textContent = message;
    couponMessage.className = `alert alert-${type} mt-2`;
    couponMessage.style.display = 'block';
    
    setTimeout(() => {
        couponMessage.style.display = 'none';
    }, 5000);
}

// Calculate totals with coupon discount
function calculateTotalsWithCoupon(discount) {
    const cart = JSON.parse(localStorage.getItem('panvelEatsCart')) || [];
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const tax = subtotal * 0.05;
    const discountAmount = Math.min(discount, subtotal); // Don't discount more than subtotal
    const total = subtotal + deliveryFee + tax - discountAmount;
    
    // Update UI with discount
    document.getElementById('cart-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('cart-delivery').textContent = `₹${deliveryFee.toFixed(2)}`;
    document.getElementById('cart-tax').textContent = `₹${tax.toFixed(2)}`;
    
    // Add discount row if not already present
    let discountRow = document.getElementById('cart-discount');
    if (!discountRow) {
        discountRow = document.createElement('tr');
        discountRow.id = 'cart-discount';
        discountRow.innerHTML = `
            <td colspan="2"><strong>Discount</strong></td>
            <td class="text-end text-success"><strong>-₹${discountAmount.toFixed(2)}</strong></td>
            <td></td>
        `;
        document.querySelector('#cart-summary tbody').insertBefore(discountRow, document.querySelector('#cart-total-row'));
    } else {
        discountRow.querySelector('td:last-child').textContent = `-₹${discountAmount.toFixed(2)}`;
    }
    
    document.getElementById('cart-total').textContent = `₹${total.toFixed(2)}`;
    
    // Update checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.textContent = `Proceed to Pay ₹${total.toFixed(2)}`;
    }
}

// Handle checkout
function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem('panvelEatsCart')) || [];
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'warning');
        return;
    }
    
    // Get user info
    const user = JSON.parse(localStorage.getItem('panvelEatsUser'));
    if (!user) {
        showToast('Please login to checkout', 'warning');
        window.location.href = 'login.html';
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const deliveryFee = subtotal > 500 ? 0 : 40;
    const tax = subtotal * 0.05;
    
    // Check for applied coupon
    let discountAmount = 0;
    const appliedCoupon = JSON.parse(localStorage.getItem('panvelEatsAppliedCoupon'));
    if (appliedCoupon) {
        discountAmount = Math.min(appliedCoupon.discount, subtotal);
    }
    
    const total = subtotal + deliveryFee + tax - discountAmount;
    
    // Create order
    const order = {
        id: Date.now(),
        items: cart,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        tax: tax,
        discount: discountAmount,
        total: total,
        status: 'Pending',
        date: new Date().toISOString(),
        deliveryAddress: user.address || 'Panvel, Navi Mumbai',
        paymentMethod: 'Cash on Delivery'
    };
    
    // Save order to history
    let orders = JSON.parse(localStorage.getItem('panvelEatsOrders')) || [];
    orders.unshift(order); // Add to beginning
    localStorage.setItem('panvelEatsOrders', JSON.stringify(orders));
    
    // Clear cart and applied coupon
    localStorage.removeItem('panvelEatsCart');
    localStorage.removeItem('panvelEatsAppliedCoupon');
    
    // Show success message
    showToast('Order placed successfully!', 'success');
    
    // Redirect to order confirmation
    setTimeout(() => {
        window.location.href = 'orders.html';
    }, 1500);
}