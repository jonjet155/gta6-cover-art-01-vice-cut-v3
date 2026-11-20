// VICE CUT — Cover Studio: the cover renderer.
// One canvas draws the whole cover: hero photo, comic panels, captions, the giant
// VICE CUT title and the poster furniture. The same renderer paints the live
// preview and the exported PNGs, so what you see is exactly what you share.

export const SIZES = {
  square: { w: 1080, h: 1080, label: 'Square 1080 x 1080' },
  portrait: { w: 1080, h: 1350, label: 'Portrait 1080 x 1350' },
  wide: { w: 1920, h: 1080, label: 'Wide 1920 x 1080' },
};

export const GRADES = {
  sunset: {
    label: 'Warm Sunset',
    filter: 'saturate(1.28) contrast(1.08) brightness(1.03) sepia(0.16)',
    top: 'rgba(255, 122, 26, 0.10)',
    bottom: 'rgba(196, 38, 150, 0.24)',
    mode: 'overlay',
  },
  neon: {
    label: 'Neon Night',
    filter: 'saturate(1.55) contrast(1.16) brightness(0.94) hue-rotate(-18deg)',
    top: 'rgba(64, 32, 180, 0.22)',
    bottom: 'rgba(255, 47, 146, 0.26)',
    mode: 'soft-light',
  },
  teal: {
    label: 'Teal Coast',
    filter: 'saturate(1.12) contrast(1.06) brightness(1.01) hue-rotate(12deg)',
    top: 'rgba(0, 190, 170, 0.12)',
    bottom: 'rgba(8, 60, 90, 0.22)',
    mode: 'overlay',
  },
  mono: {
    label: 'Ink Mono',
    filter: 'grayscale(1) contrast(1.22) brightness(1.06)',
    top: 'rgba(255, 255, 255, 0.04)',
    bottom: 'rgba(0, 0, 0, 0.18)',
    mode: 'soft-light',
  },
};

export const CAPTION_STYLES = {
  chrome: { label: 'Chrome', bar: 'rgba(12, 6, 22, 0.88)', border: '#f5f0ff', text: '#ffffff', glow: 'rgba(255,255,255,0)' },
  neon: { label: 'Neon', bar: 'rgba(38, 4, 54, 0.92)', border: '#ff4fd8', text: '#ff9dec', glow: '#ff2fb3' },
  sunset: { label: 'Sunset', bar: 'rgba(40, 10, 4, 0.9)', border: '#ffb347', text: '#ffd9a0', glow: '#ff7a1a' },
  mono: { label: 'Mono', bar: 'rgba(0, 0, 0, 0.92)', border: '#ffffff', text: '#ffffff', glow: 'rgba(255,255,255,0)' },
};

// Layouts: panels in fractions of the cover (x, y, w, h, slant). Slot 0 is always
// the hero — the big face-led photo. The rest are the small comic panels. Panels
// fill the cover down to 0.80 of the height, and the giant title OVERLAPS the
// photo grid the way GTA posters do — never in its own empty band, and never
// over a face (faces live in the hero and the top row; the bottom row is scenes).
// Captions sit at the TOP of each small panel, so the title overlapping the
// panel bottoms can never hide one.
export const LAYOUTS = {
  hero: {
    label: 'Hero Collage',
    panels: [
      { x: 0, y: 0, w: 1, h: 0.46, slant: 0.028, photo: 'hero', caption: '' },
      { x: 0, y: 0.46, w: 0.34, h: 0.17, slant: 0.02, photo: 'driver', caption: 'WHEEL IN HAND — 7:40 PM' },
      { x: 0.34, y: 0.46, w: 0.33, h: 0.17, slant: -0.02, photo: 'window', caption: 'GOLDEN HOUR, NO WITNESSES' },
      { x: 0.67, y: 0.46, w: 0.33, h: 0.17, slant: 0.02, photo: 'miami', caption: 'THE CITY NEVER BLINKS' },
      // Bottom row: two side panels only. The centre is the title's ground —
      // a panel there would sit dead-centre under the densest title glyphs
      // and vanish, caption and all.
      { x: 0, y: 0.63, w: 0.33, h: 0.17, slant: 0.02, photo: 'boat', caption: 'LAST BOAT OUT OF LEONIDA' },
      { x: 0.67, y: 0.63, w: 0.33, h: 0.17, slant: -0.02, photo: 'pier', caption: 'THE PIER AT LOW TIDE' },
    ],
  },
  comic: {
    label: 'Comic',
    panels: [
      { x: 0, y: 0, w: 0.6, h: 0.52, slant: 0.02, photo: 'hero', caption: '' },
      { x: 0.6, y: 0, w: 0.4, h: 0.26, slant: -0.02, photo: 'driver', caption: 'WHEEL IN HAND — 7:40 PM' },
      { x: 0.6, y: 0.26, w: 0.4, h: 0.26, slant: -0.02, photo: 'window', caption: 'GOLDEN HOUR, NO WITNESSES' },
      { x: 0, y: 0.52, w: 0.34, h: 0.28, slant: 0.02, photo: 'miami', caption: 'THE CITY NEVER BLINKS' },
      { x: 0.34, y: 0.52, w: 0.33, h: 0.28, slant: -0.02, photo: 'boat', caption: 'LAST BOAT OUT OF LEONIDA' },
      { x: 0.67, y: 0.52, w: 0.33, h: 0.28, slant: 0.02, photo: 'palms', caption: 'PALMS AT DUSK' },
    ],
  },
  hero3: {
    label: 'Hero + 4',
    panels: [
      { x: 0, y: 0, w: 1, h: 0.5, slant: 0.024, photo: 'hero', caption: '' },
      { x: 0, y: 0.5, w: 0.5, h: 0.15, slant: 0.02, photo: 'driver', caption: 'WHEEL IN HAND — 7:40 PM' },
      { x: 0.5, y: 0.5, w: 0.5, h: 0.15, slant: -0.02, photo: 'window', caption: 'GOLDEN HOUR, NO WITNESSES' },
      { x: 0, y: 0.65, w: 0.5, h: 0.15, slant: 0.02, photo: 'miami', caption: 'THE CITY NEVER BLINKS' },
      { x: 0.5, y: 0.65, w: 0.5, h: 0.15, slant: -0.02, photo: 'boat', caption: 'LAST BOAT OUT OF LEONIDA' },
    ],
  },
  strip: {
    label: 'Film Strip',
    panels: [
      { x: 0, y: 0, w: 1, h: 0.5, slant: 0.024, photo: 'hero', caption: '' },
      { x: 0, y: 0.5, w: 0.2, h: 0.3, slant: 0, photo: 'driver', caption: 'WHEEL IN HAND — 7:40 PM' },
      { x: 0.2, y: 0.5, w: 0.2, h: 0.3, slant: 0, photo: 'window', caption: 'GOLDEN HOUR, NO WITNESSES' },
      { x: 0.4, y: 0.5, w: 0.2, h: 0.3, slant: 0, photo: 'miami', caption: 'THE CITY NEVER BLINKS' },
      { x: 0.6, y: 0.5, w: 0.2, h: 0.3, slant: 0, photo: 'boat', caption: 'LAST BOAT OUT OF LEONIDA' },
      { x: 0.8, y: 0.5, w: 0.2, h: 0.3, slant: 0, photo: 'palms', caption: 'PALMS AT DUSK' },
    ],
  },
  fourcut: {
    label: 'Four-Cut',
    panels: [
      { x: 0, y: 0, w: 0.66, h: 0.52, slant: 0.02, photo: 'hero', caption: '' },
      { x: 0.66, y: 0, w: 0.34, h: 0.52, slant: -0.02, photo: 'driver', caption: 'WHEEL IN HAND — 7:40 PM' },
      { x: 0, y: 0.52, w: 0.34, h: 0.28, slant: 0.02, photo: 'window', caption: 'GOLDEN HOUR, NO WITNESSES' },
      { x: 0.34, y: 0.52, w: 0.33, h: 0.28, slant: -0.02, photo: 'miami', caption: 'THE CITY NEVER BLINKS' },
      { x: 0.67, y: 0.52, w: 0.33, h: 0.28, slant: 0.02, photo: 'boat', caption: 'LAST BOAT OUT OF LEONIDA' },
    ],
  },
};

export const DEFAULT_CAPTIONS = [
  '',
  'WHEEL IN HAND — 7:40 PM',
  'GOLDEN HOUR, NO WITNESSES',
  'THE CITY NEVER BLINKS',
  'LAST BOAT OUT OF LEONIDA',
  'PALMS AT DUSK',
  'THE PIER AT LOW TIDE',
];

// Last painted panel rects in canvas pixels, for click hit-testing in the editor.
export let lastPanelRects = [];

/** Cover-fit source rect for a photo inside a panel, with zoom and pan. */
export function cropPhoto(img, rectW, rectH, crop) {
  const zoom = crop?.zoom ?? 1;
  const panX = crop?.panX ?? 0;
  const panY = crop?.panY ?? 0;
  const focusY = crop?.focusY ?? 0.5;
  const base = Math.max(rectW / img.naturalWidth, rectH / img.naturalHeight);
  const scale = base * zoom;
  const sw = rectW / scale;
  const sh = rectH / scale;
  let sx = (img.naturalWidth - sw) / 2 + panX * sw * 0.5;
  let sy = (img.naturalHeight - sh) * focusY + panY * sh * 0.5;
  sx = Math.max(0, Math.min(img.naturalWidth - sw, sx));
  sy = Math.max(0, Math.min(img.naturalHeight - sh, sy));
  return { sx, sy, sw, sh };
}

/** Move a photo inside its panel (drag to pan). Pan is in -1..1 of the crop slack. */
export function positionPhoto(panel, dxFrac, dyFrac) {
  panel.panX = Math.max(-1, Math.min(1, (panel.panX ?? 0) + dxFrac * 1.6));
  panel.panY = Math.max(-1, Math.min(1, (panel.panY ?? 0) + dyFrac * 1.6));
}

/** Zoom a photo inside its panel (wheel / slider). */
export function zoomPhoto(panel, factor) {
  panel.zoom = Math.max(1, Math.min(3, (panel.zoom ?? 1) * factor));
}

/** Fill every panel that has no photo yet from one photo. */
export function fillPanels(state, photoId) {
  for (const panel of state.panels) {
    if (!panel.photo) panel.photo = photoId;
  }
}

/** Fill ALL panels from one photo (the one-photo cover). */
export function fillAllPanels(state, photoId) {
  for (const panel of state.panels) panel.photo = photoId;
}

/** Change one panel's caption text. */
export function editCaption(state, index, text) {
  if (state.panels[index]) state.panels[index].caption = text;
}

function panelPath(ctx, r) {
  const s = r.slant * r.w;
  ctx.beginPath();
  ctx.moveTo(r.x + s, r.y);
  ctx.lineTo(r.x + r.w, r.y);
  ctx.lineTo(r.x + r.w - s, r.y + r.h);
  ctx.lineTo(r.x, r.y + r.h);
  ctx.closePath();
}

function drawPhotoPanel(ctx, img, r, grade, crop) {
  ctx.save();
  panelPath(ctx, r);
  ctx.clip();
  ctx.filter = grade.filter;
  const src = cropPhoto(img, r.w, r.h, crop);
  ctx.drawImage(img, src.sx, src.sy, src.sw, src.sh, r.x, r.y, r.w, r.h);
  ctx.filter = 'none';
  // Warm wash inside the panel so the grade unifies every photo.
  const wash = ctx.createLinearGradient(r.x, r.y, r.x, r.y + r.h);
  wash.addColorStop(0, grade.top);
  wash.addColorStop(1, grade.bottom);
  ctx.globalCompositeOperation = grade.mode;
  ctx.fillStyle = wash;
  ctx.fillRect(r.x, r.y, r.w, r.h);
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
  // Comic gutter: dark outline around the panel.
  ctx.save();
  panelPath(ctx, r);
  ctx.lineWidth = Math.max(2, r.w * 0.008);
  ctx.strokeStyle = '#160a24';
  ctx.stroke();
  ctx.restore();
}

function drawCaptionBar(ctx, r, text, style, isHero) {
  if (!text) return;
  // Caption box at the TOP of the panel: the giant title overlaps panel
  // bottoms, so a bottom caption would hide under it.
  const barH = Math.max(20, r.h * 0.26);
  const barY = r.y;
  const pad = barH * 0.32;
  ctx.save();
  ctx.beginPath();
  ctx.rect(r.x, barY, r.w, barH);
  ctx.clip();
  ctx.fillStyle = style.bar;
  ctx.fillRect(r.x, barY, r.w, barH);
  ctx.strokeStyle = style.border;
  ctx.lineWidth = Math.max(1.5, barH * 0.06);
  ctx.strokeRect(r.x + 1, barY + 1, r.w - 2, barH - 2);
  let size = barH * 0.52;
  ctx.font = `${size}px "Bebas Neue", sans-serif`;
  ctx.textBaseline = 'middle';
  const maxW = r.w - pad * 2;
  while (size > 8 && ctx.measureText(text).width > maxW) {
    size -= 1;
    ctx.font = `${size}px "Bebas Neue", sans-serif`;
  }
  ctx.fillStyle = style.text;
  if (style.glow && style.glow !== 'rgba(255,255,255,0)') {
    ctx.shadowColor = style.glow;
    ctx.shadowBlur = barH * 0.25;
  }
  ctx.fillText(text, r.x + pad, barY + barH / 2 + 1);
  ctx.restore();
}

function drawTitle(ctx, W, H, title, tagline) {
  // The title OVERLAPS the photo grid like a GTA poster: panels fill the cover
  // to 0.80H, and the title straddles that edge — its top over the bottom row
  // of (faceless scene) panels, its bottom over the dark band below. Giant:
  // fit to 94% of the width, never taller than 26% of the cover — and the fit
  // loop also guarantees the tagline clears the footer, so it can never be
  // buried under it.
  const footerTop = H * 0.965;
  let size = H * 0.26;
  const setFont = (s) => {
    ctx.font = `${s}px "Bebas Neue", sans-serif`;
    try { ctx.letterSpacing = `${-s * 0.012}px`; } catch { /* older canvas */ }
  };
  setFont(size);
  const titleTop = () => H * 0.8 - size * 0.6;
  const fits = () => {
    const tagSize = size * 0.2;
    return ctx.measureText(title).width <= W * 0.94
      && titleTop() + size + tagSize * 1.3 <= footerTop - 2;
  };
  while (size > 40 && !fits()) {
    size -= 4;
    setFont(size);
  }
  const titleH = size;
  const top = titleTop();
  const cx = W / 2;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const grad = ctx.createLinearGradient(0, top, 0, top + titleH);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.42, '#ffd7f2');
  grad.addColorStop(0.72, '#ff7ad9');
  grad.addColorStop(1, '#a855f7');
  // Neon glow pass.
  ctx.save();
  ctx.shadowColor = '#ff4fd8';
  ctx.shadowBlur = size * 0.14;
  ctx.fillStyle = grad;
  ctx.fillText(title, cx, top);
  ctx.shadowColor = '#7c3aed';
  ctx.shadowBlur = size * 0.07;
  ctx.fillText(title, cx, top);
  ctx.restore();
  // Crisp pass: thick dark outline, gradient fill, hard drop shadow.
  ctx.save();
  ctx.shadowColor = 'rgba(10, 2, 24, 0.65)';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = size * 0.035;
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(4, size * 0.05);
  ctx.strokeStyle = '#1c0b2e';
  ctx.strokeText(title, cx, top);
  ctx.fillStyle = grad;
  ctx.fillText(title, cx, top);
  ctx.restore();
  // Tagline in script, tucked tight under the title, never overlapping it.
  const tagSize = Math.max(20, size * 0.2);
  ctx.save();
  ctx.translate(cx, top + titleH + tagSize * 0.55);
  ctx.rotate(-0.03);
  ctx.font = `700 ${tagSize}px Caveat, cursive`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#ff4fd8';
  ctx.shadowBlur = tagSize * 0.35;
  ctx.fillStyle = '#fff6fd';
  ctx.fillText(tagline, 0, 0);
  ctx.restore();
  try { ctx.letterSpacing = '0px'; } catch { /* older canvas */ }
  ctx.textAlign = 'left';
}

function drawBadges(ctx, W, H, showBadges, showStars) {
  const pad = W * 0.02;
  const chipH = Math.max(22, H * 0.026);
  ctx.textBaseline = 'middle';
  if (showBadges) {
    const left = `★  ORIGINAL COVER ART`;
    ctx.font = `${chipH * 0.62}px "Bebas Neue", sans-serif`;
    const lw = ctx.measureText(left).width + chipH * 1.1;
    ctx.fillStyle = 'rgba(16, 5, 30, 0.88)';
    ctx.strokeStyle = '#ff4fd8';
    ctx.lineWidth = Math.max(1.5, chipH * 0.06);
    roundRect(ctx, pad, pad, lw, chipH, chipH * 0.5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffe9f8';
    ctx.fillText(left, pad + chipH * 0.55, pad + chipH / 2 + 1);
    const right = 'VOL. 06  ·  EST. 2026';
    ctx.font = `${chipH * 0.62}px "Bebas Neue", sans-serif`;
    const rw = ctx.measureText(right).width + chipH * 1.1;
    ctx.fillStyle = 'rgba(16, 5, 30, 0.88)';
    ctx.strokeStyle = '#ffb347';
    roundRect(ctx, W - pad - rw, pad, rw, chipH, chipH * 0.5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffedc9';
    ctx.fillText(right, W - pad - rw + chipH * 0.55, pad + chipH / 2 + 1);
  }
  // Footer strip: stars + the line that sells the fantasy.
  const stripH = H * 0.035;
  const stripY = H - stripH;
  ctx.fillStyle = 'rgba(10, 4, 20, 0.88)';
  ctx.fillRect(0, stripY, W, stripH);
  ctx.fillStyle = '#ff4fd8';
  ctx.fillRect(0, stripY, W, Math.max(2, stripH * 0.08));
  const footSize = stripH * 0.52;
  ctx.font = `${footSize}px "Bebas Neue", sans-serif`;
  ctx.fillStyle = '#f5e9ff';
  const line = 'ONE COAST  ·  NO RULES  ·  COMING SOON';
  const lineW = ctx.measureText(line).width;
  if (showStars) {
    const stars = '★★★★★';
    ctx.fillStyle = '#ffc93c';
    ctx.font = `${footSize * 1.15}px sans-serif`;
    const starW = ctx.measureText(stars).width;
    const total = starW + W * 0.02 + lineW;
    let x = (W - total) / 2;
    ctx.fillText(stars, x, stripY + stripH / 2 + 1);
    ctx.fillStyle = '#f5e9ff';
    ctx.font = `${footSize}px "Bebas Neue", sans-serif`;
    ctx.fillText(line, x + starW + W * 0.02, stripY + stripH / 2 + 1);
  } else {
    ctx.fillText(line, (W - lineW) / 2, stripY + stripH / 2 + 1);
  }
  ctx.textAlign = 'left';
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Paint the cover on a canvas. `photos` maps photo id -> loaded HTMLImageElement.
 * Returns the painted panel rects (canvas pixels) for editor hit-testing.
 */
export function renderCover(canvas, state, photos) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext('2d');
  const layout = LAYOUTS[state.layout] ?? LAYOUTS.hero;
  const grade = GRADES[state.grade] ?? GRADES.sunset;
  const style = CAPTION_STYLES[state.captionStyle] ?? CAPTION_STYLES.chrome;
  // Deep plum ground; gutters read as comic ink.
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#160a24';
  ctx.fillRect(0, 0, W, H);
  const gutter = Math.max(4, Math.min(W, H) * 0.008);
  lastPanelRects = layout.panels.map((p, i) => {
    const r = {
      x: p.x * W + gutter / 2,
      y: p.y * H + gutter / 2,
      w: p.w * W - gutter,
      h: p.h * H - gutter,
      slant: p.slant ?? 0,
    };
    const slot = state.panels[i];
    const img = slot?.photo ? photos[slot.photo] : null;
    if (img && img.naturalWidth) {
      drawPhotoPanel(ctx, img, r, grade, slot);
    } else {
      ctx.save();
      panelPath(ctx, r);
      ctx.fillStyle = '#241335';
      ctx.fill();
      ctx.restore();
    }
    if (i > 0) drawCaptionBar(ctx, r, slot?.caption ?? '', style, false);
    if (state.layout === 'strip') drawSprockets(ctx, r);
    return { ...r, index: i };
  });
  // Full-cover grade wash + vignette, unifying hero and panels.
  const wash = ctx.createLinearGradient(0, 0, 0, H);
  wash.addColorStop(0, grade.top);
  wash.addColorStop(1, grade.bottom);
  ctx.save();
  ctx.globalCompositeOperation = grade.mode;
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();
  const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.42, W / 2, H / 2, Math.max(W, H) * 0.75);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(10,2,20,0.34)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
  // Title + tagline sit over the photos, clear of every face (faces live up top).
  drawTitle(ctx, W, H, state.title || 'VICE CUT', state.tagline || 'Painted in Leonida.');
  drawBadges(ctx, W, H, state.showBadges !== false, state.showStars !== false);
  // Comic frame.
  ctx.lineWidth = Math.max(3, Math.min(W, H) * 0.006);
  ctx.strokeStyle = '#0d0518';
  ctx.strokeRect(0, 0, W, H);
  ctx.lineWidth = Math.max(1, Math.min(W, H) * 0.0016);
  ctx.strokeStyle = 'rgba(255, 79, 216, 0.55)';
  ctx.strokeRect(ctx.lineWidth * 2, ctx.lineWidth * 2, W - ctx.lineWidth * 4, H - ctx.lineWidth * 4);
  return lastPanelRects;
}

function drawSprockets(ctx, r) {
  // Film-strip holes along the bottom edge only: captions now live at the
  // top of each panel, so top holes would sit under the caption bar.
  const n = Math.max(3, Math.floor(r.w / 46));
  ctx.fillStyle = 'rgba(22, 10, 36, 0.9)';
  for (let i = 0; i < n; i++) {
    const x = r.x + ((i + 0.5) / n) * r.w;
    ctx.fillRect(x - 4, r.y + r.h - 7, 8, 5);
  }
}

/** Render the cover at an exact post size and hand back the canvas. */
export function exportPNG(state, photos, sizeKey) {
  const size = SIZES[sizeKey] ?? SIZES.square;
  const canvas = document.createElement('canvas');
  canvas.width = size.w;
  canvas.height = size.h;
  renderCover(canvas, state, photos);
  return canvas;
}

/** Which panel (if any) sits under a point in canvas pixels. */
export function hitPanel(x, y) {
  for (let i = lastPanelRects.length - 1; i >= 0; i--) {
    const r = lastPanelRects[i];
    if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) return i;
  }
  return -1;
}
