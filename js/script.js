// Integração com a Rick and Morty API usando Fetch API.
const API_URL = "https://rickandmortyapi.com/api/character";

const characterGrid = document.getElementById("characterGrid");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");
const resultsText = document.getElementById("resultsText");
const pageInfo = document.getElementById("pageInfo");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const retryButton = document.getElementById("retryButton");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let currentPage = 1;
let totalPages = 1;
let currentCharacters = [];

// Traduz o status para português.
function translateStatus(status) {
  const translations = { Alive: "Vivo", Dead: "Morto", unknown: "Desconhecido" };
  return translations[status] || status;
}

// Cria um card a partir dos dados recebidos da API.
// Nenhum card de personagem fica fixo no HTML.
function createCharacterCard(character) {
  const article = document.createElement("article");
  article.className = "character-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "card-image-wrap";

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = character.image;
  image.alt = `Imagem de ${character.name}`;
  image.loading = "lazy";

  const number = document.createElement("span");
  number.className = "card-number";
  number.textContent = `ID // ${String(character.id).padStart(3, "0")}`;

  const info = document.createElement("div");
  info.className = "card-info";

  const name = document.createElement("h3");
  name.className = "card-name";
  name.textContent = character.name;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const status = document.createElement("span");
  status.className = `status status-${character.status.toLowerCase()}`;
  const dot = document.createElement("span");
  dot.className = "status-dot";
  const statusText = document.createElement("span");
  statusText.textContent = translateStatus(character.status);
  status.append(dot, statusText);

  const gender = document.createElement("span");
  gender.textContent = character.gender === "Male" ? "Masculino" :
    character.gender === "Female" ? "Feminino" :
    character.gender === "Genderless" ? "Sem gênero" : "Não informado";

  const species = document.createElement("p");
  species.className = "card-species";
  species.textContent = `Espécie: ${character.species}`;

  meta.append(status, gender);
  info.append(name, meta, species);
  imageWrap.append(image, number);
  article.append(imageWrap, info);

  return article;
}

// Busca uma página de personagens na API.
async function loadCharacters(page = 1) {
  showLoading(true);
  characterGrid.replaceChildren();
  errorMessage.classList.add("hidden");
  emptyMessage.classList.add("hidden");
  resultsText.textContent = "Consultando banco de dados...";

  try {
    const response = await fetch(`${API_URL}?page=${page}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    currentCharacters = data.results;
    currentPage = page;
    totalPages = data.info.pages;

    renderCharacters();
    updatePagination();
    resultsText.textContent = `${data.info.count} personagens cadastrados na API`;
  } catch (error) {
    console.error("Falha ao carregar personagens:", error);
    errorMessage.classList.remove("hidden");
    resultsText.textContent = "Falha na conexão com a API";
  } finally {
    showLoading(false);
  }
}

// Filtra os resultados carregados e cria os cards dinamicamente.
function renderCharacters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  const filteredCharacters = currentCharacters.filter((character) => {
    const matchesName = character.name.toLowerCase().includes(searchTerm);
    const matchesStatus = selectedStatus === "all" || character.status === selectedStatus;
    return matchesName && matchesStatus;
  });

  characterGrid.replaceChildren();

  filteredCharacters.forEach((character) => {
    characterGrid.appendChild(createCharacterCard(character));
  });

  emptyMessage.classList.toggle("hidden", filteredCharacters.length !== 0);
  resultsText.textContent = `${filteredCharacters.length} personagem(ns) nesta página`;
}

function updatePagination() {
  pageInfo.textContent = `PÁGINA ${currentPage} / ${totalPages}`;
  prevButton.disabled = currentPage <= 1;
  nextButton.disabled = currentPage >= totalPages;
}

function showLoading(isLoading) {
  loading.classList.toggle("hidden", !isLoading);
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) loadCharacters(currentPage - 1);
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) loadCharacters(currentPage + 1);
});

retryButton.addEventListener("click", () => loadCharacters(currentPage));
searchInput.addEventListener("input", renderCharacters);
statusFilter.addEventListener("change", renderCharacters);

// Primeira consulta ao abrir o site.
loadCharacters();
