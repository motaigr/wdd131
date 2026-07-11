// Exibe o ano atual no footer
const anoAtual = document.getElementById("data-atual");
anoAtual.textContent = new Date().getFullYear();

// Exibe a data da última modificação do documento
const data = new Date(document.lastModified);
const dataFormatada = data.toLocaleString("pt-BR");
const ultimaModificacao = document.getElementById("ultimaModificacao");
ultimaModificacao.textContent = `Última modificação: ${dataFormatada}`;

// Menu hambúrguer responsivo
const botaoMenu = document.getElementById("menu-hamburguer");
const menuNav = document.getElementById("menu-nav");

botaoMenu.addEventListener("click", () => {
    const menuAberto = menuNav.classList.toggle("aberto");
    botaoMenu.textContent = menuAberto ? "✕" : "☰";
    botaoMenu.setAttribute("aria-expanded", menuAberto);
});