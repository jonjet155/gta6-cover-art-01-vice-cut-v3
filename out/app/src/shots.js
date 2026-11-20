// VICE CUT — Cover Studio: screenshot modes.
// ?shot=cover shows the cover alone, full frame. ?shot=editor shows the studio
// with the samples loaded and a caption mid-edit. Both honour the same params
// the editor uses, so a screenshot is always the app's real output.

const params = new URLSearchParams(location.search);

function applyShotParams(vicecut) {
  const state = vicecut.state;
  const get = (key) => params.get(key);
  if (get('layout')) state.layout = get('layout');
  if (get('grade')) state.grade = get('grade');
  if (get('style')) state.captionStyle = get('style');
  if (get('title')) state.title = get('title');
  if (get('tagline')) state.tagline = get('tagline');
  if (get('size')) state.size = get('size');
  if (get('stars') === '0') state.showStars = false;
  if (get('stars') === '1') state.showStars = true;
  if (get('badge') === '0') state.showBadges = false;
  if (get('badge') === '1') state.showBadges = true;
  return state;
}

function paintShotCover(vicecut) {
  // The cover alone, filling the viewport: this is the exported art, as-is.
  const canvas = document.getElementById('coverCanvas');
  const wrap = document.querySelector('.preview');
  document.body.classList.add('shot-cover');
  const size = vicecut.state.size;
  const dims = { square: [1080, 1080], portrait: [1080, 1350], wide: [1920, 1080] }[size] ?? [1920, 1080];
  canvas.width = dims[0];
  canvas.height = dims[1];
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.objectFit = 'contain';
  if (wrap) wrap.style.background = '#160a24';
  const images = {};
  for (const [id, p] of Object.entries(vicecut.photos)) images[id] = p.img;
  vicecut.renderCover(canvas, vicecut.state, images);
}

async function readyShot() {
  // Wait until the editor finished loading, then apply the shot params.
  for (let i = 0; i < 100 && !window.__vicecut; i++) {
    await new Promise((r) => setTimeout(r, 50));
  }
  if (!window.__vicecut) {
    window.__shotReady = true;
    return;
  }
  applyShotParams(window.__vicecut);
  const mode = params.get('shot');
  if (mode === 'cover') {
    paintShotCover(window.__vicecut);
  } else {
    // Editor mode: re-render with the shot params, select a panel and mark its
    // caption field as the one being edited. Stay at the top of the page so the
    // photo tray and the crop controls are in frame with the live preview.
    window.__vicecut.selectPanel(1);
    const caption = document.getElementById('captionInput');
    if (caption) caption.classList.add('editing');
    window.scrollTo(0, 0);
  }
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  window.__shotReady = true;
}

if (params.has('shot')) readyShot();
