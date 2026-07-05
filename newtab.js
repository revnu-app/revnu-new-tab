// Wallpaper registry. `ui` picks light or dark chrome for the clock text:
// "dark" wallpapers get Snow text, "light" wallpapers get Undergrowth text.
const WALLPAPERS = [
  { file: 'wallpapers/revnu-01-dark-bleed.png', ui: 'dark' },
  { file: 'wallpapers/revnu-02-snow-banner.png', ui: 'light' },
  { file: 'wallpapers/revnu-03-canopy-pattern.png', ui: 'dark' },
  { file: 'wallpapers/revnu-04-moss-ghost.png', ui: 'dark' },
  { file: 'wallpapers/revnu-05-puffy.png', ui: 'light' },
  { file: 'wallpapers/revnu-06-sprout-duo.png', ui: 'dark' },
  { file: 'wallpapers/revnu-07-bubbles.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-08-clay.jpg', ui: 'light' },
  { file: 'wallpapers/revnu-09-hills.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-10-garden.png', ui: 'light' },
  { file: 'wallpapers/revnu-11-halftone.png', ui: 'dark' },
  { file: 'wallpapers/revnu-12-hedge.png', ui: 'dark' },
  { file: 'wallpapers/revnu-13-puffy-stage.png', ui: 'light' },
  { file: 'wallpapers/revnu-14-scatter.png', ui: 'dark' },
  { file: 'wallpapers/revnu-15-ghost-light.png', ui: 'light' },
  { file: 'wallpapers/revnu-17-meadow.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-19-clay-sculpture.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-20-puffy-spotlight.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-21-papercraft.jpg', ui: 'light' },
  { file: 'wallpapers/revnu-22-balloons.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-23-glass.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-24-topiary.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-25-aerial.jpg', ui: 'dark' },
  { file: 'wallpapers/revnu-26-felt.jpg', ui: 'light' },
];

// Rotate: every new tab advances one step through a shuffled order, so you
// see all wallpapers before any repeats.
function nextWallpaper() {
  let order;
  try { order = JSON.parse(localStorage.getItem('revnu.order')); } catch { order = null; }
  let idx = parseInt(localStorage.getItem('revnu.idx'), 10);

  if (!Array.isArray(order) || order.length !== WALLPAPERS.length || isNaN(idx) || idx >= order.length) {
    order = [...WALLPAPERS.keys()];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    idx = 0;
  }

  const pick = WALLPAPERS[order[idx]];
  const upcoming = WALLPAPERS[order[(idx + 1) % order.length]];

  localStorage.setItem('revnu.order', JSON.stringify(order));
  localStorage.setItem('revnu.idx', String(idx + 1));

  return { pick, upcoming };
}

const { pick, upcoming } = nextWallpaper();
const wp = document.getElementById('wallpaper');
document.body.classList.add(pick.ui);

const img = new Image();
img.onload = () => {
  wp.style.backgroundImage = `url(${pick.file})`;
  wp.classList.add('ready');
};
img.src = pick.file;

// Warm the cache for the next tab's wallpaper.
new Image().src = upcoming.file;

// Clock
function tick() {
  const now = new Date();
  document.getElementById('time').textContent = now.toLocaleTimeString([], {
    hour: 'numeric', minute: '2-digit',
  });
  document.getElementById('date').textContent = now.toLocaleDateString([], {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}
tick();
setInterval(tick, 10_000);

// Search: go through the browser's default engine when available,
// otherwise fall back to Google.
document.getElementById('search').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = document.getElementById('q').value.trim();
  if (!text) return;
  if (chrome?.search?.query) {
    chrome.search.query({ text, disposition: 'CURRENT_TAB' });
  } else {
    location.href = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  }
});

document.getElementById('q').focus();

// Apps launcher dropdown
const appsBtn = document.getElementById('apps-btn');
const appsPanel = document.getElementById('apps-panel');
appsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  appsPanel.hidden = !appsPanel.hidden;
});
document.addEventListener('click', (e) => {
  if (!appsPanel.hidden && !appsPanel.contains(e.target)) appsPanel.hidden = true;
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') appsPanel.hidden = true;
});
