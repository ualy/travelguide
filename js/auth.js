document.addEventListener('DOMContentLoaded', function() {

    if (!localStorage.getItem('travelExplorerUsers')) {
        localStorage.setItem('travelExplorerUsers', JSON.stringify([]));
    }

    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            
        
            if (!name || !email || !password) {
                showSignupMessage('Please fill in all fields', false);
                return;
            }
            
            if (password.length < 6) {
                showSignupMessage('Password must be at least 6 characters', false);
                return;
            }
            
            
            const users = JSON.parse(localStorage.getItem('travelExplorerUsers'));
            const existingUser = users.find(user => user.email === email);
            
            if (existingUser) {
                showSignupMessage('Email already registered. Please login.', false);
                return;
            }
            
            
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                password: password, 
                signupDate: new Date().toISOString()
            };
            
            
            users.push(newUser);
            localStorage.setItem('travelExplorerUsers', JSON.stringify(users));
            
            
            showSignupMessage('Registration successful! You can now login.', true);
            
            
            signupForm.reset();
        });
    }
    
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            
            
            if (!email || !password) {
                showLoginMessage('Please fill in all fields');
                return;
            }
            
            
            const users = JSON.parse(localStorage.getItem('travelExplorerUsers'));
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                
                localStorage.setItem('travelExplorerCurrentUser', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
                
            
                window.location.href = 'index.html';
            } else {
                showLoginMessage('Invalid email or password');
            }
        });
    }
    
    function showSignupMessage(message, isSuccess) {
        const messageDiv = document.getElementById('signup-success');
        messageDiv.textContent = message;
        messageDiv.className = isSuccess ? 'text-success mt-2' : 'text-danger mt-2';
    }
    
    function showLoginMessage(message) {
        const messageDiv = document.getElementById('login-error');
        messageDiv.textContent = message;
    }
    

    if (localStorage.getItem('travelExplorerCurrentUser')) {
    }
});