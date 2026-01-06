// Authentication Module
class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        // Load user from localStorage
        const userData = localStorage.getItem('panvelEatsUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }
    
    // User registration
    register(userData) {
        // Validation
        if (!userData.name || !userData.email || !userData.password || !userData.phone) {
            return { success: false, message: 'All fields are required' };
        }
        
        if (userData.password !== userData.confirmPassword) {
            return { success: false, message: 'Passwords do not match' };
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('panvelEatsUsers') || '[]');
        const existingUser = users.find(u => u.email === userData.email);
        
        if (existingUser) {
            return { success: false, message: 'User with this email already exists' };
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password, // In real app, hash this
            address: '',
            createdAt: new Date().toISOString()
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('panvelEatsUsers', JSON.stringify(users));
        
        // Auto-login
        this.login(userData.email, userData.password);
        
        return { success: true, message: 'Registration successful!' };
    }
    
    // User login
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('panvelEatsUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }
        
        // Remove password from stored user object
        const { password: _, ...userWithoutPassword } = user;
        this.currentUser = userWithoutPassword;
        
        // Save to localStorage
        localStorage.setItem('panvelEatsUser', JSON.stringify(userWithoutPassword));
        
        return { success: true, message: 'Login successful!', user: userWithoutPassword };
    }
    
    // User logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem('panvelEatsUser');
        return { success: true, message: 'Logged out successfully' };
    }
    
    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
    
    // Update user profile
    updateProfile(updatedData) {
        if (!this.currentUser) return { success: false, message: 'Not logged in' };
        
        const users = JSON.parse(localStorage.getItem('panvelEatsUsers') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) return { success: false, message: 'User not found' };
        
        // Update user data
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem('panvelEatsUsers', JSON.stringify(users));
        
        // Update current user (without password)
        const { password: _, ...userWithoutPassword } = users[userIndex];
        this.currentUser = userWithoutPassword;
        localStorage.setItem('panvelEatsUser', JSON.stringify(userWithoutPassword));
        
        return { success: true, message: 'Profile updated successfully' };
    }
}

// Initialize auth instance
const auth = new Auth();

// Event Listeners for Login Page
if (document.getElementById('loginFormElement')) {
    document.getElementById('loginFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        
        const result = auth.login(email, password);
        
        if (result.success) {
            showToast(result.message, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showToast(result.message, 'error');
        }
    });
}

// Event Listeners for Register Page
if (document.getElementById('registerFormElement')) {
    document.getElementById('registerFormElement').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userData = {
            name: document.getElementById('registerName').value.trim(),
            email: document.getElementById('registerEmail').value.trim(),
            phone: document.getElementById('registerPhone').value.trim(),
            password: document.getElementById('registerPassword').value.trim(),
            confirmPassword: document.getElementById('registerConfirmPassword').value.trim()
        };
        
        const result = auth.register(userData);
        
        if (result.success) {
            showToast(result.message, 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showToast(result.message, 'error');
        }
    });
}

// Logout functionality
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        auth.logout();
        window.location.href = 'login.html';
    });
}

// Protect pages that require authentication
function requireAuth() {
    if (!auth.isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}