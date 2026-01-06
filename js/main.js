// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Check authentication for protected pages
    const protectedPages = ['cart.html', 'profile.html', 'orders.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !auth.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user info in navbar
    updateUserInfo();
    
    // Load food items on homepage
    if (document.getElementById('foodItemsContainer')) {
        displayFoodItems(foodItems, document.getElementById('foodItemsContainer'));
        setupFoodFilters();
    }
    
    // Add to cart functionality (for index page)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-add-to-cart')) {
            if (!auth.isLoggedIn()) {
                showToast('Please login to add items to cart', 'warning');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                return;
            }
            
            const button = e.target.closest('.btn-add-to-cart');
            const itemId = parseInt(button.dataset.id);
            const item = foodItems.find(food => food.id === itemId);
            
            if (item) {
                cart.addItem(itemId, item);
                showToast(`${item.name} added to cart!`, 'success');
            }
        }
    });
});

// Update user info in navbar
function updateUserInfo() {
    const user = auth.getCurrentUser();
    if (user) {
        // Update cart count
        cart.updateCartCount();
    }
}