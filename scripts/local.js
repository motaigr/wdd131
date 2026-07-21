// Rodapé: ano atual e última modificação
document.getElementById("ano").textContent = new Date().getFullYear();
document.getElementById("ultimaModificacao").textContent = document.lastModified;

// Valores estáticos de clima (Curitiba, °C)
const temperatura = 9.5;
const velocidadeVento = 12;
const condicoes = "Parcialmente nublado";

// Exibe temperatura e condições na página
document.getElementById("temperatura").textContent = `${temperatura} °C`;
document.getElementById("condicoes").textContent = condicoes;
document.getElementById("vento").textContent = `${velocidadeVento} km/h`;

// Fórmula de sensação térmica (Wind Chill - métrico, °C e km/h)
function calcularSensacaoTermica(temp, vento) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(vento, 0.16) + 0.3965 * temp * Math.pow(vento, 0.16);
}

// Só calcula se as condições forem viáveis (<=10°C e vento > 4.8 km/h)
let sensacao;
if (temperatura <= 10 && velocidadeVento > 4.8) {
    sensacao = calcularSensacaoTermica(temperatura, velocidadeVento).toFixed(1) + " °C";
} else {
    sensacao = "N/A";
}
document.getElementById("sensacaoTermica").textContent = sensacao;