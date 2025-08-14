
// Simple interactivity for AniVerse
const catalogGrid = document.getElementById('catalog-grid');
const searchInput = document.getElementById('search');
const genreSelect = document.getElementById('genre');
const sortSelect = document.getElementById('sort');

async function loadAnime(){
  try{
    const res = await fetch('data/anime.json');
    const data = await res.json();
    window.__ANIME = data;
    renderCatalog(data);
    populateGenres(data);
  }catch(e){
    console.error('Failed to load anime.json', e);
  }
}

function populateGenres(list){
  if(!genreSelect) return;
  const set = new Set();
  list.forEach(a => a.genres.forEach(g => set.add(g)));
  const sorted = Array.from(set).sort();
  sorted.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = g;
    genreSelect.appendChild(opt);
  });
}

function renderCatalog(list){
  if(!catalogGrid) return;
  catalogGrid.innerHTML = '';
  if(!list.length){
    const empty = document.createElement('p');
    empty.textContent = 'Nenhum anime encontrado.';
    catalogGrid.appendChild(empty);
    return;
  }
  list.forEach(anime => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title} poster" loading="lazy">
      <div class="content">
        <h3>${anime.title}</h3>
        <div class="meta">
          <span>${anime.year}</span><span class="dot"></span>
          <span>⭐ ${anime.rating}</span><span class="dot"></span>
          <span>${anime.episodes} eps</span>
        </div>
        <p>${anime.synopsis}</p>
        <div class="badges">
          ${anime.genres.map(g => `<span class="badge">${g}</span>`).join('')}
        </div>
        <a class="btn" href="review.html#${anime.id}">Ver review</a>
      </div>
    `;
    catalogGrid.appendChild(card);
  })
}

function filterAndSort(){
  if(!window.__ANIME) return;
  const q = (searchInput?.value || '').toLowerCase();
  const g = genreSelect?.value || '';
  const s = sortSelect?.value || 'title_asc';
  let list = window.__ANIME.filter(a => {
    const matchesQ = a.title.toLowerCase().includes(q) || a.synopsis.toLowerCase().includes(q);
    const matchesG = !g || a.genres.includes(g);
    return matchesQ && matchesG;
  });
  switch(s){
    case 'rating_desc': list.sort((a,b)=>b.rating - a.rating); break;
    case 'year_desc': list.sort((a,b)=>b.year - a.year); break;
    case 'year_asc': list.sort((a,b)=>a.year - b.year); break;
    default: list.sort((a,b)=>a.title.localeCompare(b.title));
  }
  renderCatalog(list);
}

if(searchInput) searchInput.addEventListener('input', filterAndSort);
if(genreSelect) genreSelect.addEventListener('change', filterAndSort);
if(sortSelect) sortSelect.addEventListener('change', filterAndSort);

document.addEventListener('DOMContentLoaded', () => {
  loadAnime();
  hydrateReview();
});

// Review page hydration
function hydrateReview(){
  const anchor = location.hash.replace('#','');
  if(!anchor) return;
  const target = document.getElementById('review-target');
  if(!target) return;
  // Wait for data then render
  const wait = setInterval(()=>{
    if(window.__ANIME){
      clearInterval(wait);
      const item = window.__ANIME.find(a => a.id === anchor);
      if(!item){ target.innerHTML = '<p>Review não encontrada.</p>'; return; }
      target.innerHTML = `
        <header class="section">
          <h1>${item.title}</h1>
          <div class="meta">
            <span>${item.year}</span><span class="dot"></span>
            <span>⭐ ${item.rating}</span><span class="dot"></span>
            <span>${item.episodes} eps</span>
          </div>
        </header>
        <img src="${item.image}" alt="${item.title} poster">
        <section class="section">
          <h2>Sinopse</h2>
          <p>${item.synopsis}</p>
        </section>
        <section class="section">
          <h2>Onde assistir</h2>
          <p>${item.where_to_watch.join(', ')}</p>
        </section>
        <section class="section">
          <h2>Minha opinião</h2>
          <p>Escreva aqui sua review! Use este espaço para falar de personagens, trilha sonora, animação e o que mais curtir.</p>
        </section>
      `;
    }
  }, 50);
}
