const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

        // Show Forgot Password Form
        document.getElementById('forgotPasswordLink').addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.sign-in').style.display = 'none';
            document.querySelector('.forgot-password').style.display = 'block';
        });

        // Close Forgot Password Form
        document.getElementById('closeModal').addEventListener('click', function () {
            document.querySelector('.forgot-password').style.display = 'none';
            document.querySelector('.sign-in').style.display = 'block';
        });
        
let adminUsername = 'admin';
let adminPassword = localStorage.getItem('adminPassword') || 'admin123';

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = event.target[0].value;
    const password = event.target[1].value;

    if (username === adminUsername && password === adminPassword) {
        alert('Login successful!');
        window.location.href = 'menu.html';
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('resetForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const newPassword = event.target[0].value;
    const confirmPassword = event.target[1].value;

    if (newPassword === confirmPassword) {
        adminPassword = newPassword;
        localStorage.setItem('adminPassword', newPassword);
        alert('Password has been reset successfully!');
        event.target.reset();
    } else {
        alert('Passwords do not match!');
    }
});
