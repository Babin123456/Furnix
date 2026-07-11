import { signUp, googleSignIn, friendlyAuthError } from "./auth.js";

const form = document.getElementById('signupForm');
const messageBox = document.getElementById('formMessage');
const submitBtn = document.getElementById('signupSubmitBtn');
const googleBtn = document.getElementById('googleSignUpBtn');

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'form-message ' + type;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword')?.value;

    if (confirmPassword && password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    try {
        await signUp(name, email, password);
        showMessage('Account created! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
    } catch (err) {
        showMessage(friendlyAuthError(err), 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
    }
});

googleBtn.addEventListener('click', async () => {
    try {
        await googleSignIn();
        showMessage('Account created! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
    } catch (err) {
        showMessage(friendlyAuthError(err), 'error');
    }
});