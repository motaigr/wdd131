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

const templos = [
  {
    nomeDoTemplo: "Aba Nigeria",
    localizacao: "Aba, Nigéria",
    consagracao: "2005, 7 de agosto",
    area: 11500,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Manti Utah",
    localizacao: "Manti, Utah, Estados Unidos",
    consagracao: "1888, 21 de maio",
    area: 74792,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Payson Utah",
    localizacao: "Payson, Utah, Estados Unidos",
    consagracao: "2015, 7 de junho",
    area: 96630,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "Yigo Guam",
    localizacao: "Yigo, Guam",
    consagracao: "2020, 2 de maio",
    area: 6861,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    nomeDoTemplo: "Washington D.C.",
    localizacao: "Kensington, Maryland, Estados Unidos",
    consagracao: "1974, 19 de novembro",
    area: 156558,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    nomeDoTemplo: "Lima Peru",
    localizacao: "Lima, Peru",
    consagracao: "1986, 10 de janeiro",
    area: 9600,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    nomeDoTemplo: "San Diego, California",
    localizacao: "San Diego, California",
    consagracao: "1993, 25 de abril",
    area: 72000,
    urlDaImagem:
    "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg"
},
{
    nomeDoTemplo: "Campinas, Brasil",
    localizacao: "Campinas, Brasil",
    consagracao: "2002, 17 de maio",
    area: 49100,
    urlDaImagem:
    "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-6012-main.jpg"
},
{
    nomeDoTemplo: "Londres, Inglaterra",
    localizacao: "Newchapel, Surrey, Inglaterra",
    consagracao: "1958, 7 de setembro",
    area: 42652,
    urlDaImagem:
    "https://churchofjesuschristtemples.org/assets/img/temples/london-england-temple/london-england-temple-56886-main.jpg"
},
  {
    nomeDoTemplo: "Cidade do México, México",
    localizacao: "Cidade do México, México",
    consagracao: "1983, 2 de dezembro",
    area: 116642,
    urlDaImagem:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
];

const container = document.getElementById("temple-cards");

function renderTemplos(lista) {
    container.innerHTML = "";

    lista.forEach((templo) => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = templo.urlDaImagem;
        img.alt = templo.nomeDoTemplo;
        img.loading = "lazy";

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = `
            <h2>${templo.nomeDoTemplo}</h2>
            <p><strong>Localização:</strong> ${templo.localizacao}</p>
            <p><strong>Consagração:</strong> ${templo.consagracao}</p>
            <p><strong>Área:</strong> ${templo.area.toLocaleString("pt-BR")} pés quadrados</p>
        `;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        container.appendChild(figure);
    });
}

// Exibe todos os templos assim que a página carrega
renderTemplos(templos);

// Extrai o ano da consagração (ex: "2005, 7 de agosto" -> 2005)
function anoDaConsagracao(templo) {
    return parseInt(templo.consagracao.split(",")[0], 10);
}

const filtros = {
    home: () => templos,
    antigos: () => templos.filter((t) => anoDaConsagracao(t) < 1900),
    novos: () => templos.filter((t) => anoDaConsagracao(t) > 2000),
    grandes: () => templos.filter((t) => t.area > 90000),
    pequenos: () => templos.filter((t) => t.area < 10000)
};

const linksNav = document.querySelectorAll("#menu-nav a[data-filtro]");

linksNav.forEach((link) => {
    link.addEventListener("click", (evento) => {
        evento.preventDefault();
        const chave = link.dataset.filtro;
        renderTemplos(filtros[chave]());
    });
});