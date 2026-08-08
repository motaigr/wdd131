// ==========================================================================
// Curitiba Explorer — index.js
// Saudação dinâmica, validação de formulário e contador de favoritos.
// ==========================================================================

const CHAVE_FAVORITOS = 'curitiba-explorer-favoritos';

/**
 * Define uma saudação de acordo com o horário do dispositivo
 * e injeta o resultado no título da seção de destaques.
 */
function saudacaoDinamica() {
  const horaAtual = new Date().getHours();
  const elementoSaudacao = document.getElementById('saudacao');

  let periodo = '';

  if (horaAtual < 12) {
    periodo = 'Bom dia';
  } else if (horaAtual < 18) {
    periodo = 'Boa tarde';
  } else {
    periodo = 'Boa noite';
  }

  elementoSaudacao.textContent = `${periodo}! Bem-vindo(a) ao Curitiba Explorer`;
}

/**
 * Lê o array de favoritos salvo no localStorage (definido em lugares.js)
 * e atualiza o aviso na home com a contagem atual.
 */
function mostrarContadorFavoritos() {
  const textoFavoritos = document.getElementById('texto-favoritos');
  const favoritosSalvos = localStorage.getItem(CHAVE_FAVORITOS);
  const listaFavoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];

  if (listaFavoritos.length === 0) {
    textoFavoritos.textContent = 'Você ainda não favoritou nenhum lugar.';
  } else if (listaFavoritos.length === 1) {
    textoFavoritos.textContent = 'Você tem 1 lugar favoritado.';
  } else {
    textoFavoritos.textContent = `Você tem ${listaFavoritos.length} lugares favoritados.`;
  }
}

/**
 * Valida e "envia" o formulário de contato, mostrando uma mensagem de
 * status para o usuário sem recarregar a página.
 * @param {Event} evento
 */
function validarFormulario(evento) {
  evento.preventDefault();

  const campoNome = document.getElementById('campo-nome');
  const campoEmail = document.getElementById('campo-email');
  const campoMensagem = document.getElementById('campo-mensagem');
  const elementoStatus = document.getElementById('status-formulario');

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const mensagem = campoMensagem.value.trim();

  const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  elementoStatus.classList.remove('oculto');

  if (!nome || !email || !mensagem) {
    elementoStatus.dataset.tipo = 'erro';
    elementoStatus.textContent = 'Preencha nome, e-mail e mensagem antes de enviar.';
    return;
  }

  if (!formatoEmailValido) {
    elementoStatus.dataset.tipo = 'erro';
    elementoStatus.textContent = 'Digite um e-mail válido para que possamos responder.';
    return;
  }

  elementoStatus.dataset.tipo = 'sucesso';
  elementoStatus.textContent = `Obrigado, ${nome}! Recebemos sua mensagem e vamos responder em breve.`;

  evento.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  saudacaoDinamica();
  mostrarContadorFavoritos();

  const formulario = document.getElementById('form-contato');
  formulario.addEventListener('submit', validarFormulario);
});