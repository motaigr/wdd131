let contagem = localStorage.getItem("contadorAvaliacoes");
contagem = contagem ? parseInt(contagem) : 0;

contagem++;

localStorage.setItem("contadorAvaliacoes", contagem);

document.getElementById("contador").textContent = contagem;

const data = new Date(document.lastModified);
const dataFormatada = data.toLocaleString("pt-BR");
const ultimaModificacao = document.getElementById("ultimaModificacao");
ultimaModificacao.textContent = `Última modificação: ${dataFormatada}`;