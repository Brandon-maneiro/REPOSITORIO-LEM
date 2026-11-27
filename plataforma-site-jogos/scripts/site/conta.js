const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const errorContainer = document.getElementById('error-container');
const successContainer = document.getElementById('success-container');
const fechar = document.getElementById('fechar');

if (errorMessage.innerHTML != '') {
    errorContainer.classList.remove('invisivel');
    fechar.addEventListener('click', () => {
        errorContainer.classList.add('invisivel');
    })
}

if (successMessage && successMessage.innerHTML != '') {
    successContainer.classList.remove('invisivel');
}

