document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', function() {
            let input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈'; // Change icon to hidden
            } else {
                input.type = 'password';
                this.textContent = '👁️'; // Change icon to visible
            }
        });
    });

    // --- 2. SIGN UP PAGE LOGIC ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const passInput = document.getElementById('reg-pass');
        const strengthBar = document.getElementById('bar');
        const strengthText = document.getElementById('strength-text');

        // Check password strength live as the user types
        passInput.addEventListener('input', function() {
            let val = this.value;
            let strength = 0;

            if (val.length > 5) strength += 1;
            if (val.length > 7) strength += 1;
            if (/[A-Z]/.test(val)) strength += 1;
            if (/[0-9]/.test(val)) strength += 1;

            if (val.length === 0) {
                strengthBar.style.width = '0%';
                strengthText.innerText = 'Enter password';
                strengthText.style.color = 'white';
            } else if (strength <= 2) {
                strengthBar.style.width = '33%';
                strengthBar.style.background = '#e74c3c'; // Red
                strengthText.innerText = 'Weak: Add numbers and uppercase letters';
                strengthText.style.color = '#e74c3c';
            } else if (strength === 3) {
                strengthBar.style.width = '66%';
                strengthBar.style.background = '#f1c40f'; // Yellow
                strengthText.innerText = 'Medium: Add special characters to be safe';
                strengthText.style.color = '#f1c40f';
            } else {
                strengthBar.style.width = '100%';
                strengthBar.style.background = '#2ecc71'; // Green
                strengthText.innerText = 'Strong Password!';
                strengthText.style.color = '#2ecc71';
            }
        });

        // Handle Sign Up Submission
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let u = document.getElementById('reg-username').value;
            let p = document.getElementById('reg-pass').value;
            let c = document.getElementById('reg-confirm').value;

            if (p !== c) {
                alert("Error: Passwords do not match!");
                return;
            }

            // Save to browser's Local Storage
            localStorage.setItem('hostel_user', u);
            localStorage.setItem('hostel_pass', p);
            
            alert("Account created successfully! Swapping to Login page...");
            window.location.href = 'leave-application.html'; 
        });
    }

    // --- 3. LOGIN PAGE  ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const loginBtn = document.getElementById('login-btn');
        const uInput = document.getElementById('login-username');
        const pInput = document.getElementById('login-pass');
        const cInput = document.getElementById('captcha-answer');
        
        let num1 = Math.floor(Math.random() * 10) + 1; 
        let num2 = Math.floor(Math.random() * 10) + 1;
        let expectedAnswer = num1 * num2;
        document.getElementById('captcha-equation').innerText = `${num1} * ${num2} = ?`;

        // Disable login button initially
        loginBtn.disabled = true;

        function checkInputs() {
            if (uInput.value.trim() !== '' && pInput.value.trim() !== '' && cInput.value.trim() !== '') {
                loginBtn.disabled = false;
            } else {
                loginBtn.disabled = true;
            }
        }

        uInput.addEventListener('input', checkInputs);
        pInput.addEventListener('input', checkInputs);
        cInput.addEventListener('input', checkInputs);

        // Handle Login Submission
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 1. Verify Captcha
            if (parseInt(cInput.value) !== expectedAnswer) {
                alert("Incorrect Captcha Answer. Try again.");
                return;
            }

            // 2. Fetch saved data from Local Storage
            let savedUser = localStorage.getItem('hostel_user');
            let savedPass = localStorage.getItem('hostel_pass');

            // 3. Verify Credentials
            if (uInput.value === savedUser && pInput.value === savedPass) {
                alert(`Login Successful! Welcome to the Hostel Portal, ${uInput.value}.`);
                window.location.href = 'leave-application.html';
                
            } else {
                alert("Invalid Username or Password. Please try again or register.");
            }
        });
    }
});