/* Lógica do site: lê o conteúdo de data.js e desenha a página. */

const state = { tab: "suporte", cat: "Todos", q: "", open: location.hash.slice(1) };
const $ = (id) => document.getElementById(id);

// ---------- utilidades ----------
const normalize = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const stripTags = (s) => s.replace(/<[^>]+>/g, "");
const section = () => CONTENT[state.tab];

// Se o link aponta para um artigo, abre a aba onde ele está
for (const [tab, s] of Object.entries(CONTENT)) {
  if (s.items.some((item) => item.id === state.open)) state.tab = tab;
}

function matches(item) {
  const text = normalize(stripTags([item.title, item.sum, item.cat, ...item.steps].join(" ")));
  const words = normalize(state.q.trim()).split(/\s+/);
  const inCategory = state.cat === "Todos" || item.cat === state.cat;
  return inCategory && words.every((w) => text.includes(w));
}

// ---------- peças da página ----------
function renderTabs() {
  $("tabs").innerHTML = Object.entries(CONTENT)
    .map(([key, s]) => `<button role="tab" data-tab="${key}" aria-selected="${key === state.tab}">${s.label}</button>`)
    .join("");
}

function renderCategories() {
  const items = section().items;
  const names = ["Todos", ...new Set(items.map((i) => i.cat))];
  $("cats").innerHTML = names
    .map((name) => {
      const total = name === "Todos" ? items.length : items.filter((i) => i.cat === name).length;
      return `<button data-cat="${name}" aria-pressed="${name === state.cat}">${name}<small>${total}</small></button>`;
    })
    .join("");
}

function renderItem(item) {
  const isOpen = item.id === state.open;
  const tag = normalize(item.type);
  const list = section().ordered ? "ol" : "ul";
  const image = item.img ? `<img class="shot" src="${item.img.src}" alt="${item.img.alt}" loading="lazy">` : "";
  const note = item.note ? `<div class="note">${item.note}</div>` : "";
  return `
    <article class="item ${isOpen ? "open" : ""}" id="${item.id}">
      <button class="item__head" data-id="${item.id}" aria-expanded="${isOpen}">
        <div>
          <h3>${item.title}</h3>
          <p class="item__sum">${item.sum}</p>
        </div>
        <span class="tag tag--${tag}">${item.type}</span>
        <span class="item__chev" aria-hidden="true">›</span>
      </button>
      <div class="item__body">
        ${image}
        <${list}>${item.steps.map((s) => `<li>${s}</li>`).join("")}</${list}>
        ${note}
      </div>
    </article>`;
}

function renderList() {
  const rows = section().items.filter(matches);
  $("count").textContent = `${rows.length} ${rows.length === 1 ? "artigo" : "artigos"}`;
  $("list").innerHTML = rows.length
    ? rows.map(renderItem).join("")
    : `<div class="empty">Nada encontrado. Tente outra palavra ou fale com a equipe de TI.</div>`;
}

function renderHeader() {
  const s = section();
  $("title").textContent = s.title;
  $("intro").textContent = s.intro;
  $("search").placeholder = s.placeholder;
  $("help").innerHTML = `<h2>${s.help.title}</h2><p>${s.help.text}</p>`;
}

function render() {
  renderTabs();
  renderHeader();
  renderCategories();
  renderList();
}

// ---------- eventos ----------
$("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  Object.assign(state, { tab: btn.dataset.tab, cat: "Todos", q: "", open: "" });
  $("search").value = "";
  history.replaceState(null, "", location.pathname);
  render();
});

$("cats").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  state.cat = btn.dataset.cat;
  renderCategories();
  renderList();
});

$("list").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  state.open = state.open === btn.dataset.id ? "" : btn.dataset.id;
  history.replaceState(null, "", state.open ? "#" + state.open : location.pathname);
  renderList();
});

$("search").addEventListener("input", (e) => {
  state.q = e.target.value;
  renderCategories();
  renderList();
});

render();
