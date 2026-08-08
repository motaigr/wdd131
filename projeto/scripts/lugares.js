// ==========================================================================
// Curitiba Explorer — lugares.js
// Renderização de cards, filtro por categoria, busca e favoritos (localStorage).
// ==========================================================================

const CHAVE_FAVORITOS = 'curitiba-explorer-favoritos';

// Objeto com os rótulos de exibição de cada categoria (usado nos cards e nos botões).
const ROTULOS_CATEGORIA = {
  'ponto-turistico': 'Ponto turístico',
  'parque': 'Parque',
};

// Array de objetos: os dados de todos os lugares do site.
const lugares = [
  {
    id: 'jardim-botanico',
    nome: 'Jardim Botânico',
    tipo: 'ponto-turistico',
    bairro: 'Jardim Botânico',
    descricao: 'Cartão-postal da cidade, com sua estufa de vidro em estilo art nouveau e jardins geométricos inspirados em parques franceses.',
    imagem: 'jardim-botanico.webp',
  },
  {
    id: 'opera-de-arame',
    nome: 'Ópera de Arame',
    tipo: 'ponto-turistico',
    bairro: 'Abranches',
    descricao: 'Teatro construído em estrutura tubular metálica dentro de uma antiga pedreira, rodeado por mata nativa e um pequeno lago.',
    imagem: 'opera-de-arame.webp',
  },
  {
    id: 'museu-oscar-niemeyer',
    nome: 'Museu Oscar Niemeyer',
    tipo: 'ponto-turistico',
    bairro: 'Centro Cívico',
    descricao: 'Conhecido como "Museu do Olho" pela forma do seu anexo, reúne exposições de artes visuais em um prédio assinado por Niemeyer.',
    imagem: 'museu-oscar-niemeyer.webp',
  },
  {
    id: 'torre-panoramica',
    nome: 'Torre Panorâmica',
    tipo: 'ponto-turistico',
    bairro: 'Mercês',
    descricao: 'Antiga torre de telecomunicações com mirante a mais de 100 metros de altura, com vista de 360° sobre a cidade.',
    imagem: 'torre-panoramica.webp',
  },
  {
    id: 'largo-da-ordem',
    nome: 'Largo da Ordem',
    tipo: 'ponto-turistico',
    bairro: 'Centro Histórico',
    descricao: 'Coração do centro histórico, com casarios coloniais preservados e a tradicional feira de artesanato aos domingos.',
    imagem: 'largo-da-ordem.webp',
  },
  {
    id: 'parque-barigui',
    nome: 'Parque Barigui',
    tipo: 'parque',
    bairro: 'Santo Inácio',
    descricao: 'Um dos maiores parques urbanos da cidade, com trilhas para caminhada, pista de cooper e um lago cercado de área verde.',
    imagem: 'parque-barigui.webp',
  },
  {
    id: 'parque-tangua',
    nome: 'Parque Tanguá',
    tipo: 'parque',
    bairro: 'Pilarzinho',
    descricao: 'Construído em uma antiga pedreira, tem mirante, túnel de pedra e um lago artificial com cascata.',
    imagem: 'parque-tangua.webp',
  },
  {
    id: 'parque-sao-lourenco',
    nome: 'Parque São Lourenço',
    tipo: 'parque',
    bairro: 'São Lourenço',
    descricao: 'Antiga fábrica de pólvora transformada em parque, com prédios históricos de pedra e um moinho às margens do rio.',
    imagem: 'parque-sao-lourenco.webp',
  },
  {
    id: 'bosque-do-papa',
    nome: 'Bosque do Papa',
    tipo: 'parque',
    bairro: 'Vista Alegre',
    descricao: 'Bosque de araucárias que homenageia a visita do Papa João Paulo II, com trilhas em meio à mata nativa.',
    imagem: 'bosque-do-papa.webp',
  },
  {
    id: 'passeio-publico',
    nome: 'Passeio Público',
    tipo: 'parque',
    bairro: 'Centro',
    descricao: 'O parque mais antigo da cidade, com pontes, um pequeno zoológico e ilhas cercadas por lagos.',
    imagem: 'passeio-publico.webp',
  },
];

// Estado atual dos controles de filtro e busca.
let filtroAtual = 'todos';
let termoBusca = '';

/**
 * Lê o array de favoritos salvo no localStorage.
 * @returns {string[]} lista de ids favoritados
 */
function obterFavoritos() {
  try {
    const favoritosSalvos = localStorage.getItem(CHAVE_FAVORITOS);
    return favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
  } catch (erro) {
    return [];
  }
}

/**
 * Alterna um lugar entre favoritado e não favoritado, salvando no localStorage.
 * @param {string} id
 */
function alternarFavorito(id) {
  const favoritos = obterFavoritos();
  const posicao = favoritos.indexOf(id);

  if (posicao === -1) {
    favoritos.push(id);
  } else {
    favoritos.splice(posicao, 1);
  }

  try {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
  } catch (erro) {
    // Armazenamento indisponível (ex.: navegação privada); segue sem persistir.
  }

  atualizarBotoesFavorito();
}

/**
 * Atualiza o estado visual (aria-pressed e ícone) de todos os botões de favorito
 * de acordo com o que está salvo no localStorage.
 */
function atualizarBotoesFavorito() {
  const favoritos = obterFavoritos();
  const botoes = document.querySelectorAll('.botao-favorito');

  botoes.forEach((botao) => {
    const id = botao.dataset.id;
    const estaFavoritado = favoritos.includes(id);
    botao.setAttribute('aria-pressed', estaFavoritado ? 'true' : 'false');
    botao.textContent = estaFavoritado ? '★' : '☆';
  });
}

/**
 * Aplica o filtro de categoria e o termo de busca sobre o array de lugares,
 * retornando a lista já filtrada.
 * @returns {object[]}
 */
function obterLugaresFiltrados() {
  return lugares
    .filter((lugar) => filtroAtual === 'todos' || lugar.tipo === filtroAtual)
    .filter((lugar) => {
      const alvo = `${lugar.nome} ${lugar.bairro}`.toLowerCase();
      return alvo.includes(termoBusca.toLowerCase());
    });
}

/**
 * Renderiza a lista de lugares na grade, usando template literals
 * exclusivamente para montar o HTML de saída.
 * @param {object[]} lista
 */
function renderizarLugares(lista) {
  const grade = document.getElementById('grade-lugares');
  const contador = document.getElementById('contador-resultados');
  const favoritos = obterFavoritos();

  if (lista.length === 0) {
    grade.innerHTML = `<p class="mensagem-vazia">Nenhum lugar encontrado para esses filtros.</p>`;
  } else {
    grade.innerHTML = lista
      .map((lugar) => {
        const favoritado = favoritos.includes(lugar.id);
        return `
          <article class="cartao-lugar">
            <button
              class="botao-favorito"
              type="button"
              data-id="${lugar.id}"
              aria-pressed="${favoritado}"
              aria-label="Favoritar ${lugar.nome}"
            >${favoritado ? '★' : '☆'}</button>
            <img
              src="imagens/${lugar.imagem}"
              alt="${lugar.nome}"
              loading="lazy"
              width="640"
              height="480"
            >
            <div class="cartao-lugar-corpo">
              <p class="cartao-lugar-categoria">${ROTULOS_CATEGORIA[lugar.tipo]}</p>
              <h3>${lugar.nome}</h3>
              <p class="cartao-lugar-bairro">${lugar.bairro}</p>
              <p class="descricao">${lugar.descricao}</p>
            </div>
          </article>
        `;
      })
      .join('');
  }

  const total = lista.length;
  if (total === 0) {
    contador.textContent = `Nenhum resultado encontrado.`;
  } else if (total === 1) {
    contador.textContent = `1 lugar encontrado.`;
  } else {
    contador.textContent = `${total} lugares encontrados.`;
  }
}

/**
 * Reaplica filtro + busca e renderiza a lista atualizada.
 */
function atualizarLista() {
  const listaFiltrada = obterLugaresFiltrados();
  renderizarLugares(listaFiltrada);
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarLista();

  // Filtro por categoria
  const botoesFiltro = document.querySelectorAll('.filtro-botao');
  botoesFiltro.forEach((botao) => {
    botao.addEventListener('click', () => {
      filtroAtual = botao.dataset.filtro;

      botoesFiltro.forEach((outroBotao) => {
        outroBotao.setAttribute('aria-pressed', outroBotao === botao ? 'true' : 'false');
      });

      atualizarLista();
    });
  });

  // Busca em tempo real
  const campoBusca = document.getElementById('campo-busca-lugar');
  campoBusca.addEventListener('input', (evento) => {
    termoBusca = evento.target.value;
    atualizarLista();
  });

  // Delegação de evento para os botões de favorito, criados dinamicamente
  const grade = document.getElementById('grade-lugares');
  grade.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.botao-favorito');
    if (!botao) return;
    alternarFavorito(botao.dataset.id);
  });
});