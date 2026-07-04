// Exibe o ano atual no footer
const anoAtual = document.getElementById("data-atual");
anoAtual.textContent = new Date().getFullYear();

// Exibe a data da última modificação do documento
const data = new Date(document.lastModified);
const dataFormatada = data.toLocaleString("pt-BR");
ultimaModificacao.textContent = `Última modificação: ${dataFormatada}`;