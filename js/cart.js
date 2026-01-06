// Cart Module
class Cart {
    constructor() {
        this.cart = [];
        this.init();
    }
    
    init() {
        // Load cart from localStorage
        this.loadCart();
    }
    
    // Load cart from localStorage
    loadCart() {
        const cartData = localStorage.getItem('panvelEatsCart');
        if (cartData) {
            this.cart = JSON.parse(cartData);
        }
        this.updateCartCount();
    }
    
    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('panvelEatsCart', JSON.stringify(this.cart));
        this.updateCartCount();
    }
    
    // Update cart count in UI
    updateCartCount() {
        const count = this.getCartCount();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }
    
    // Get cart count
    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Add item to cart
    addItem(itemId, itemData) {
        const existingItem = this.cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: itemId,
                name: itemData.name,
                price: itemData.price,
                image: itemData.image,
                category: itemData.category,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        return true;
    }
    
    // Remove item from cart
    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
    }
    
    // Update item quantity
    updateQuantity(itemId, newQuantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            if (newQuantity < 1) {
                this.removeItem(itemId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
            }
        }
        this.updateCartCount();
    }
    
    // Get cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Clear cart
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
    }
    
    // Display cart items
    displayCart() {
        const container = document.getElementById('cartItemsContainer');
        if (!container) return;
        
        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5" id="emptyCartMessage">
                    <i class="fas fa-shopping-cart fa-4x mb-3 text-muted"></i>
                    <h4 class="text-muted">Your cart is empty</h4>
                    <p class="text-muted">Add some delicious food items from our menu!</p>
                    <a href="index.html" class="btn btn-primary">Browse Menu</a>
                </div>
            `;
            return;
        }
        
        let html = '';
        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="row align-items-center">
                        <div class="col-md-2 mb-3 mb-md-0">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        </div>
                        <div class="col-md-4 mb-3 mb-md-0">
                            <h5 class="cart-item-title">${item.name}</h5>
                            <p class="text-muted small">${item.category}</p>
                            <button class="btn btn-remove btn-sm remove-item" data-id="${item.id}">
                                <i class="fas fa-trash me-1"></i>Remove
                            </button>
                        </div>
                        <div class="col-md-3 mb-3 mb-md-0">
                            <div class="quantity-control">
                                <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <div class="col-md-3 text-md-end">
                            <h5 class="cart-item-price">₹${itemTotal}</h5>
                            <p class="text-muted small">₹${item.price} each</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Update cart count display
        document.getElementById('cartItemCount').textContent = this.getCartCount();
        
        // Add event listeners
        this.addCartEventListeners();
    }
    
    // Update cart summary
    updateCartSummary() {
        const subtotal = this.getCartTotal();
        const deliveryFee = subtotal > 500 ? 0 : 30;
        const tax = subtotal * 0.05;
        const total = subtotal + deliveryFee + tax;
        
        if (document.getElementById('subtotal')) {
            document.getElementById('subtotal').textContent = `₹${subtotal}`;
        }
        if (document.getElementById('deliveryFee')) {
            document.getElementById('deliveryFee').textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
        }
        if (document.getElementById('tax')) {
            document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
        }
        if (document.getElementById('totalAmount')) {
            document.getElementById('totalAmount').textContent = `₹${(subtotal + deliveryFee + tax).toFixed(2)}`;
        }
        
        // Enable/disable checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.disabled = subtotal === 0;
        }
    }
    
    // Add event listeners for cart operations
    addCartEventListeners() {
        // Decrease quantity
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.decrease-quantity').dataset.id);
                const item = this.cart.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity - 1);
                    this.displayCart();
                    this.updateCartSummary();
                    showToast('Item quantity updated', 'success');
                }
            });
        });
        
        // Increase quantity
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.increase-quantity').dataset.id);
                const item = this.cart.find(item => item.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity + 1);
                    this.displayCart();
                    this.updateCartSummary();
                    showToast('Item quantity updated', 'success');
                }
            });
        });
        
        // Remove item
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.closest('.remove-item').dataset.id);
                this.removeItem(itemId);
                this.displayCart();
                this.updateCartSummary();
                showToast('Item removed from cart', 'success');
            });
        });
    }
    
    // Create order from cart
    createOrder() {
        if (this.cart.length === 0) {
            showToast('Cart is empty!', 'error');
            return null;
        }
        
        const user = auth.getCurrentUser();
        if (!user) {
            showToast('Please login to place order', 'error');
            return null;
        }
        
        const order = {
            id: Date.now(),
            userId: user.id,
            items: [...this.cart],
            subtotal: this.getCartTotal(),
            deliveryFee: this.getCartTotal() > 500 ? 0 : 30,
            tax: this.getCartTotal() * 0.05,
            total: this.getCartTotal() + (this.getCartTotal() > 500 ? 0 : 30) + (this.getCartTotal() * 0.05),
            address: JSON.parse(localStorage.getItem('panvelEatsDeliveryAddress') || '{}'),
            status: 'pending',
            date: new Date().toISOString()
        };
        
        // Save order to history
        let orders = JSON.parse(localStorage.getItem('panvelEatsOrders') || '[]');
        orders.unshift(order);
        localStorage.setItem('panvelEatsOrders', JSON.stringify(orders));
        
        // Clear cart
        this.clearCart();
        
        return order;
    }
    
    // Get user's order history
    getOrderHistory(userId) {
        const orders = JSON.parse(localStorage.getItem('panvelEatsOrders') || '[]');
        return orders.filter(order => order.userId === userId);
    }
}

// Initialize cart instance
const cart = new Cart();