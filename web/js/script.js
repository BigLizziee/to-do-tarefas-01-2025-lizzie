const API_BASE = 'http://localhost:3000/api'; // Ajuste conforme necessário

function mostrarMensagem(idElemento, texto, erro = false) {
    const elemento = document.getElementById(idElemento);
    elemento.style.color = erro ? 'red' : 'green';
    elemento.innerText = texto;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
