// VICE CUT — Cover Studio: the editor.
// Loads the sample photos, wires every control to the renderer, and turns the
// cover into a PNG in one click. Three steps, no account, nothing uploaded:
// pick photos, crop + position them, edit the lettering, export.

import {
  SIZES,
  GRADES,
  CAPTION_STYLES,
  LAYOUTS,
  renderCover,
  exportPNG,
  hitPanel,
  positionPhoto,
  zoomPhoto,
  fillPanels,
  fillAllPanels,
  editCaption,
} from './cover.js';

const SAMPLES = [
  { id: 'hero', name: 'Golden Hour Driver', src: 'samples/hero.jpg', focusY: 0.38 },
  { id: 'driver', name: 'At the Wheel', src: 'samples/driver.jpg', focusY: 0.3 },
  { id: 'window', name: 'Window Light', src: 'samples/window.jpg', focusY: 0.45 },
  { id: 'boat', name: 'Last Boat Out', src: 'samples/boat.jpg', focusY: 0.55 },
  { id: 'miami', name: 'Neon Skyline', src: 'samples/miami.jpg', focusY: 0.5 },
  { id: 'palms', name: 'Palms at Dusk', src: 'samples/palms.jpg', focusY: 0.55 },
  { id: 'pier', name: 'The Pier', src: 'samples/pier.jpg', focusY: 0.5 },
];

const state = {
  layout: 'hero',
  grade: 'sunset',
  captionStyle: 'chrome',
  title: 'VICE CUT',
  tagline: 'Painted in Leonida.',
  showStars: true,
  showBadges: true,
  size: 'square',
  panels: [],
};

const photos = {}; // id -> { id, name, src, img, focusY }
let selectedPanel = 0;
let selectedPhoto = 'hero';
let dragging = null;

const $ = (id) => document.getElementById(id);
const canvas = $('coverCanvas');

function defaultPanels() {
  // Each layout names its own default photo + caption per slot, so a slot's
  // caption always matches its photo (the bottom row of Hero Collage is
  // scenes only — the title sits over its centre).
  return LAYOUTS[state.layout].panels.map((p) => {
    const sample = SAMPLES.find((s) => s.id === p.photo);
    return {
      photo: p.photo ?? null,
      caption: p.caption ?? '',
      zoom: 1,
      panX: 0,
      panY: 0,
      focusY: sample?.focusY ?? 0.5,
    };
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadSamples() {
  for (const s of SAMPLES) {
    const img = await loadImage(s.src);
    photos[s.id] = { ...s, img };
  }
}

function sizeCanvas() {
  const size = SIZES[state.size];
  // Keep the preview sharp but bounded: render at most 1000px on the long side.
  const scale = Math.min(1, 1000 / Math.max(size.w, size.h));
  canvas.width = Math.round(size.w * scale);
  canvas.height = Math.round(size.h * scale);
  canvas.style.aspectRatio = `${size.w} / ${size.h}`;
}

function render() {
  sizeCanvas();
  renderCover(canvas, state, photoImages());
  syncControls();
}

function photoImages() {
  const out = {};
  for (const [id, p] of Object.entries(photos)) out[id] = p.img;
  return out;
}

function syncControls() {
  document.querySelectorAll('[data-layout]').forEach((b) =>
    b.classList.toggle('active', b.dataset.layout === state.layout));
  document.querySelectorAll('[data-grade]').forEach((b) =>
    b.classList.toggle('active', b.dataset.grade === state.grade));
  document.querySelectorAll('[data-style]').forEach((b) =>
    b.classList.toggle('active', b.dataset.style === state.captionStyle));
  document.querySelectorAll('[data-size]').forEach((b) =>
    b.classList.toggle('active', b.dataset.size === state.size));
  $('starsToggle').classList.toggle('active', state.showStars);
  $('badgeToggle').classList.toggle('active', state.showBadges);
  const slot = state.panels[selectedPanel];
  $('panelLabel').textContent = slot
    ? `Panel ${selectedPanel + 1} — ${slot.photo ? photos[slot.photo]?.name ?? slot.photo : 'empty'}`
    : 'No panel selected';
  if (slot) {
    $('captionInput').value = slot.caption ?? '';
    $('zoomSlider').value = String(slot.zoom ?? 1);
    $('zoomValue').textContent = `${Math.round((slot.zoom ?? 1) * 100)}%`;
  }
  document.querySelectorAll('#tray .thumb').forEach((t) =>
    t.classList.toggle('selected', t.dataset.photo === selectedPhoto));
  document.querySelectorAll('#tray .thumb').forEach((t) => {
    const used = state.panels.some((p) => p.photo === t.dataset.photo);
    t.classList.toggle('used', used);
  });
}

function buildTray() {
  const tray = $('tray');
  tray.innerHTML = '';
  for (const p of Object.values(photos)) {
    const d = document.createElement('div');
    d.className = 'thumb';
    d.dataset.photo = p.id;
    d.title = `${p.name} — click, then click a panel to place it`;
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.name;
    const label = document.createElement('span');
    label.textContent = p.name;
    d.append(img, label);
    d.addEventListener('click', () => {
      selectedPhoto = p.id;
      // One click places it straight into the selected panel.
      if (state.panels[selectedPanel]) {
        state.panels[selectedPanel].photo = p.id;
        state.panels[selectedPanel].zoom = 1;
        state.panels[selectedPanel].panX = 0;
        state.panels[selectedPanel].panY = 0;
        state.panels[selectedPanel].focusY = p.focusY ?? 0.5;
        render();
      }
      syncControls();
    });
    tray.append(d);
  }
}

function bindControls() {
  document.querySelectorAll('[data-layout]').forEach((b) =>
    b.addEventListener('click', () => {
      const keep = state.panels;
      state.layout = b.dataset.layout;
      state.panels = defaultPanels();
      // Keep photos the user already placed, slot by slot.
      for (let i = 0; i < state.panels.length && i < keep.length; i++) {
        state.panels[i].photo = keep[i].photo;
        state.panels[i].caption = keep[i].caption;
      }
      selectedPanel = Math.min(selectedPanel, state.panels.length - 1);
      render();
    }));
  document.querySelectorAll('[data-grade]').forEach((b) =>
    b.addEventListener('click', () => { state.grade = b.dataset.grade; render(); }));
  document.querySelectorAll('[data-style]').forEach((b) =>
    b.addEventListener('click', () => { state.captionStyle = b.dataset.style; render(); }));
  document.querySelectorAll('[data-size]').forEach((b) =>
    b.addEventListener('click', () => { state.size = b.dataset.size; render(); }));
  $('titleInput').addEventListener('input', (e) => { state.title = e.target.value; render(); });
  $('taglineInput').addEventListener('input', (e) => { state.tagline = e.target.value; render(); });
  $('captionInput').addEventListener('input', (e) => {
    editCaption(state, selectedPanel, e.target.value);
    render();
  });
  $('zoomSlider').addEventListener('input', (e) => {
    const slot = state.panels[selectedPanel];
    if (slot) { slot.zoom = Number(e.target.value); render(); }
  });
  $('starsToggle').addEventListener('click', () => { state.showStars = !state.showStars; render(); });
  $('badgeToggle').addEventListener('click', () => { state.showBadges = !state.showBadges; render(); });
  $('fillBtn').addEventListener('click', () => {
    fillPanels(state, selectedPhoto);
    render();
  });
  $('fillOneBtn').addEventListener('click', () => {
    fillAllPanels(state, selectedPhoto);
    render();
  });
  $('resetCropBtn').addEventListener('click', () => {
    const slot = state.panels[selectedPanel];
    if (slot) { slot.zoom = 1; slot.panX = 0; slot.panY = 0; render(); }
  });
  document.querySelectorAll('[data-export]').forEach((b) =>
    b.addEventListener('click', () => exportCover(b.dataset.export)));
  $('uploadInput').addEventListener('change', async (e) => {
    for (const file of e.target.files ?? []) {
      if (!file.type.startsWith('image/')) continue;
      const id = `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const src = URL.createObjectURL(file);
      const img = await loadImage(src);
      photos[id] = { id, name: file.name.replace(/\.[^.]+$/, '').slice(0, 18) || 'Your photo', src, img, focusY: 0.5 };
      selectedPhoto = id;
      if (state.panels[selectedPanel]) state.panels[selectedPanel].photo = id;
      buildTray();
      render();
    }
    e.target.value = '';
  });
  // Canvas: click a panel to select it, drag to pan its photo, wheel to zoom.
  canvas.addEventListener('pointerdown', (e) => {
    const pt = canvasPoint(e);
    const hit = hitPanel(pt.x, pt.y);
    if (hit >= 0) {
      selectedPanel = hit;
      dragging = { x: pt.x, y: pt.y, moved: false };
      canvas.setPointerCapture(e.pointerId);
      render();
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const pt = canvasPoint(e);
    const slot = state.panels[selectedPanel];
    if (slot && slot.photo) {
      const dx = (pt.x - dragging.x) / canvas.width;
      const dy = (pt.y - dragging.y) / canvas.height;
      if (Math.abs(dx) + Math.abs(dy) > 0.002) dragging.moved = true;
      positionPhoto(slot, dx * 2, dy * 2);
      dragging.x = pt.x;
      dragging.y = pt.y;
      render();
    }
  });
  canvas.addEventListener('pointerup', () => { dragging = null; });
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const slot = state.panels[selectedPanel];
    if (slot && slot.photo) {
      zoomPhoto(slot, e.deltaY < 0 ? 1.1 : 1 / 1.1);
      render();
    }
  }, { passive: false });
}

function canvasPoint(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width) * canvas.width,
    y: ((e.clientY - rect.top) / rect.height) * canvas.height,
  };
}

/** Render the cover at an exact post size and download it as a PNG. */
export function exportCover(sizeKey) {
  const size = SIZES[sizeKey];
  const out = exportPNG(state, photoImages(), sizeKey);
  out.toBlob((blob) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `vice-cut-${size.w}x${size.h}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }, 'image/png');
  return out;
}

/** Test hook: the exported PNG as a data URL, for automated size checks. */
export function exportPNGDataURL(sizeKey) {
  const out = exportPNG(state, photoImages(), sizeKey);
  return out.toDataURL('image/png');
}

async function init() {
  state.panels = defaultPanels();
  await Promise.all([
    document.fonts.load('400 100px "Bebas Neue"'),
    document.fonts.load('700 60px Caveat'),
    document.fonts.ready,
  ]).catch(() => {});
  await loadSamples();
  buildTray();
  bindControls();
  render();
  window.__vicecut = {
    state,
    photos,
    renderCover,
    exportPNG,
    exportPNGDataURL,
    exportCover,
    fillPanels,
    fillAllPanels,
    editCaption,
    selectPanel: (i) => { selectedPanel = i; render(); },
    placePhoto: (photoId, panelIndex) => {
      if (state.panels[panelIndex]) {
        state.panels[panelIndex].photo = photoId;
        state.panels[panelIndex].focusY = photos[photoId]?.focusY ?? 0.5;
      }
      render();
    },
  };
}

init();
