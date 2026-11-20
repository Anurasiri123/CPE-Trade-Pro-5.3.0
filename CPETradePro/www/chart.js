/** Candlestick + Bollinger canvas chart with zoom, chart patterns and drawing tools */

const FIB_RATIOS = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
const FIB_COLORS = ['#94a3b8', '#f0b429', '#f0b429', '#38bdf8', '#22c55e', '#22c55e', '#94a3b8'];

function fmtPrice(n) {
  if (n == null || !Number.isFinite(+n)) return '—';
  const v = +n;
  return v >= 1 ? v.toFixed(2) : v.toPrecision(5);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function intervalMsOf(interval) {
  const m = /^(\d+)([mhdwM])$/.exec(String(interval || '1h'));
  if (!m) return 3600000;
  const unit = { m: 60000, h: 3600000, d: 86400000, w: 604800000, M: 2592000000 }[m[2]];
  return (+m[1]) * unit;
}

/** Human-friendly price steps (1 / 2 / 2.5 / 5 / 10 × 10ⁿ). */
function niceTicks(min, max, count) {
  const span = max - min;
  if (!(span > 0) || !Number.isFinite(span)) return [];
  const raw = span / Math.max(1, count);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const out = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-6; v += step) out.push(v);
  return out;
}

/** Where the infinite line through (x1,y1) with direction (dx,dy) crosses the plot rect. */
function clipLine(x1, y1, dx, dy, rect) {
  if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) return null;
  const cand = [];
  if (Math.abs(dx) > 1e-9) cand.push((rect.l - x1) / dx, (rect.r - x1) / dx);
  if (Math.abs(dy) > 1e-9) cand.push((rect.t - y1) / dy, (rect.b - y1) / dy);
  const inside = (t) => {
    const x = x1 + dx * t;
    const y = y1 + dy * t;
    return x >= rect.l - 0.5 && x <= rect.r + 0.5 && y >= rect.t - 0.5 && y <= rect.b + 0.5;
  };
  const good = cand.filter(inside);
  if (good.length < 2) return null;
  return [Math.min(...good), Math.max(...good)];
}

/** Same as clipLine but only the forward direction of the ray. */
function raySpan(x1, y1, dx, dy, rect) {
  const span = clipLine(x1, y1, dx, dy, rect);
  if (!span) return null;
  const t0 = Math.max(0, span[0]);
  if (span[1] <= t0) return null;
  return [t0, span[1]];
}

/** Compact axis time label. Named differently from app.js's fmtTime (classic-script global). */
function fmtAxisTime(ts, interval) {
  let t = +ts;
  if (!Number.isFinite(t) || t <= 0) return '';
  if (t < 1e12) t *= 1000;
  const d = new Date(t);
  const p = (x) => String(x).padStart(2, '0');
  const ms = intervalMsOf(interval);
  if (ms < 86400000) return `${p(d.getHours())}:${p(d.getMinutes())}`;
  if (ms < 2592000000) return `${p(d.getDate())} ${MONTHS[d.getMonth()]}`;
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * The blank future block is split into two lanes so the two projections never read
 * as one thing:
 *   · a near "signal" lane (≈36%) — the current signal's route, entry → TP1 → TP2
 *   · the wider "3-month" lane behind it — the long-horizon forecast
 */
function futureSplit(m) {
  const startX = m.pad.l + m.xw;
  const futureW = m.futurePx || 0;
  const sigW = Math.max(26, Math.round(futureW * 0.36));
  return { startX, futureW, sigW, fcW: Math.max(20, futureW - sigW), fcL: startX + sigW };
}

/** True for the chart types that are drawn as bars/candles rather than a line. */
function isCandleChart(type) {
  const ct = type || 'candles';
  return ct === 'candles' || ct === 'heikin' || ct === 'bars';
}

/**
 * Turn a smooth future path into a run of plausible candles, so the projection and
 * the 3M forecast form the way a real chart forms instead of reading as a drawn line.
 * Deterministic (seeded) so the candles do not jitter between animation frames.
 */
function pathToCandles(path, count, seed, opts) {
  const len = path ? path.length : 0;
  if (len < 2) return [];
  const n = Math.max(2, Math.min(48, count | 0));
  const mix = (opts && +opts.mix) || 0;   // share of candles flipped against the path
  const rnd = (i) => {
    const x = Math.sin((i + 1) * 12.9898 + (seed || 0) * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const first = path[0].price;
  const last = path[len - 1].price;
  const avgBody = Math.abs(last - first) / n || Math.abs(first) * 0.002 || 0.001;
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = Math.min(len - 1, Math.floor((i / n) * (len - 1)));
    const b = Math.min(len - 1, Math.max(a, Math.floor(((i + 1) / n) * (len - 1))));
    const o0 = path[a].price;
    const c0 = path[b].price;
    let o = o0;
    let c = c0;
    // A real run is never one solid colour: flip a share of the candles so an up
    // move still carries red pullbacks (and a down move green ones).
    if (mix && rnd(i + 91) < mix) {
      const dir = c0 >= o0 ? 1 : -1;
      const half = Math.max(avgBody * 0.22, Math.abs(c0 - o0) / 2);
      o = (o0 + c0) / 2 + dir * half;
      c = (o0 + c0) / 2 - dir * half;
    }
    let hi = Math.max(o, c);
    let lo = Math.min(o, c);
    for (let k = a; k <= b; k++) {
      hi = Math.max(hi, path[k].price);
      lo = Math.min(lo, path[k].price);
    }
    const wick = avgBody * (0.25 + rnd(i) * 0.6);
    out.push({ u: (i + 0.5) / n, o, h: hi + wick, l: lo - wick, c });
  }
  return out;
}

/** Draws the revealed part of a candle run; the last candle grows with `prog`. */
function drawCandleRun(ctx, cds, xOf, Yof, prog, style) {
  if (!cds || !cds.length) return;
  const p = Math.max(0, Math.min(1, prog == null ? 1 : prog));
  const fpos = p * cds.length;
  const whole = Math.floor(fpos);
  const frac = fpos - whole;
  const total = Math.min(cds.length, whole + (frac > 0 ? 1 : 0));
  const half = Math.max(0.9, (style.bw || 6) / 2);
  for (let i = 0; i < total; i++) {
    const cd = cds[i];
    const partial = i === whole && frac > 0;
    const o = cd.o;
    const c = partial ? o + (cd.c - o) * frac : cd.c;
    const h = partial ? Math.max(o, c) + (cd.h - Math.max(cd.o, cd.c)) * frac : cd.h;
    const l = partial ? Math.min(o, c) - (Math.min(cd.o, cd.c) - cd.l) * frac : cd.l;
    const x = xOf(cd.u);
    const yO = Yof(o);
    const yC = Yof(c);
    const yH = Yof(h);
    const yL = Yof(l);
    if (![x, yO, yC, yH, yL].every(Number.isFinite)) continue;
    const col = c >= o ? style.up : style.down;
    ctx.globalAlpha = style.wickAlpha;
    ctx.strokeStyle = col;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, yH);
    ctx.lineTo(x, yL);
    ctx.stroke();
    const top = Math.min(yO, yC);
    const bodyH = Math.max(1.4, Math.abs(yC - yO));
    ctx.globalAlpha = style.bodyAlpha;
    if (style.hollow) {
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x - half + 0.5, top + 0.5, half * 2 - 1, bodyH);
    } else {
      ctx.fillStyle = col;
      ctx.fillRect(x - half, top, half * 2, bodyH);
    }
  }
  ctx.globalAlpha = 1;
}

/** Deterministic 32-bit hash (FNV-1a) so one signal always yields one path. */
function hashSeed(str) {
  let h = 2166136261;
  const s = String(str == null ? '' : str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Tiny seeded PRNG — same seed, same numbers on every frame. */
function rngFrom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * A smooth, organic wiggle in ±1 that is pinned to 0 at both ends, so a path can
 * be bent to look like a real market move without moving its start or its target.
 * Seeded, so two signals of the same symbol/timeframe still get their own shape.
 */
function organicWiggle(count, rand) {
  const waves = [];
  for (let i = 0; i < 3; i++) {
    waves.push({ f: 1 + i * 1.35 + rand() * 0.8, p: rand() * Math.PI * 2, a: 1 / (i + 1) });
  }
  const out = [];
  let peak = 1e-9;
  for (let k = 0; k <= count; k++) {
    const t = k / count;
    let v = 0;
    for (let i = 0; i < waves.length; i++) {
      const w = waves[i];
      v += w.a * Math.sin(w.p + t * Math.PI * 2 * w.f);
    }
    v *= Math.sin(Math.PI * t);      // 0 at both ends → the target stays put
    peak = Math.max(peak, Math.abs(v));
    out.push(v);
  }
  return out.map((v) => v / peak);
}

/** Ease-out progress so most of a move lands early, like a real impulse. */
function easeOut(t, power) {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, power || 1.7);
}

window.CPEChart = {
  zoom: 1, // 1 = default window (~160 bars) · higher = zoom in (fewer bars)

  setZoom(z) {
    this.zoom = Math.max(1, Math.min(20, +z || 1));
    return this.zoom;
  },

  /** Bars visible for a zoom level, capped by how much history the signal carries. */
  visibleBars(signal, zoom) {
    const len = signal?.chart?.candles?.length || 0;
    if (!len) return 0;
    const base = Math.min(len, signal._viewBars != null ? signal._viewBars : 160);
    return Math.min(len, Math.max(8, Math.ceil(base / Math.max(1, +zoom || 1))));
  },
  zoomIn() { return this.setZoom(this.zoom + 1); },
  zoomOut() { return this.setZoom(this.zoom - 1); },
  zoomReset() { return this.setZoom(1); },

  draw(canvas, signal) {
    if (!canvas || !signal?.chart?.candles?.length) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 640;
    const cssH = canvas.clientHeight || 260;
    // Resizing a canvas reallocates its backing store and clears it. Doing that on
    // every animation frame starves the UI thread on large / high-DPI canvases, so
    // only touch the size when it actually changed.
    const bw = Math.round(cssW * dpr);
    const bh = Math.round(cssH * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width = bw;
      canvas.height = bh;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = cssW;
    const H = cssH;
    const pad = { l: 64, r: 56, t: 18, b: 30 };

    // per-canvas zoom wins so the setting survives signal rebuilds
    const zoom = canvas.__cpeZoom != null
      ? canvas.__cpeZoom
      : (signal._zoom != null ? signal._zoom : this.zoom);
    const all = signal.chart.candles;
    // default window ≈160 bars; zooming in shows fewer, panning reveals older bars
    const visible = this.visibleBars(signal, zoom);
    const maxStart = Math.max(0, all.length - visible);
    const panBack = Math.max(0, Math.min(Math.round(signal._panOffset || 0), maxStart));
    const start = maxStart - panBack;
    // fixed-width window: panning slides it through history instead of compressing all bars
    const candles = all.slice(start, start + visible);
    const n = candles.length;
    const sliceArr = (arr) => (arr || []).slice(start, start + visible);
    const stepMs = intervalMsOf(signal.interval);
    const t0 = candles[0].t;
    const tEnd = t0 + n * stepMs;

    const bbUpper = sliceArr(signal.chart.bbUpper);
    const bbMid = sliceArr(signal.chart.bbMid);
    const bbLower = sliceArr(signal.chart.bbLower);

    // Which indicator overlays / sub-panes are switched on in Chart Lab.
    // Other views don't pass toggles at all, so BB stays on unless the Chart Lab
    // bar explicitly switched it off (`ind.bb === false`).
    const ind = signal._indicators || {};
    // Chart Lab "plain chart" mode: candles only — every analysis overlay off.
    const plain = !!signal._plain;
    const showBB = !plain && ind.bb !== false;
    const ema9Arr = sliceArr(signal.chart.ema9);
    const ema21Arr = sliceArr(signal.chart.ema21);
    const sma50Arr = sliceArr(signal.chart.sma50);

    const highs = candles.map((c) => c.h);
    const lows = candles.map((c) => c.l);
    let min = Math.min(...lows);
    let max = Math.max(...highs);
    if (showBB) {
      const bbU = bbUpper.filter((x) => x != null);
      const bbL = bbLower.filter((x) => x != null);
      if (bbU.length) max = Math.max(max, ...bbU);
      if (bbL.length) min = Math.min(min, ...bbL);
    }
    // Ichimoku cloud / VWAP join the price scale so their lines stay on screen.
    if (ind.ichimoku && signal.chart.ichimoku) {
      const ic = signal.chart.ichimoku;
      [ic.tenkan, ic.kijun, ic.spanA, ic.spanB].forEach((arr) => {
        sliceArr(arr).forEach((v) => {
          if (v == null || !Number.isFinite(+v)) return;
          min = Math.min(min, +v);
          max = Math.max(max, +v);
        });
      });
    }
    if (ind.vwap && signal.chart.vwap) {
      sliceArr(signal.chart.vwap).forEach((v) => {
        if (v == null || !Number.isFinite(+v)) return;
        min = Math.min(min, +v);
        max = Math.max(max, +v);
      });
    }
    // Current-trade levels (entry / TP / SL / live price) only join the Y-scale when they
    // sit near what is on screen — otherwise panning into history would squash the candles.
    const levels = [signal.tp1, signal.tp2, signal.sl, signal.entry, signal.baseTp1, signal.baseSl, signal._livePrice]
      .concat((signal.triggers || []).map((tr) => tr && tr.price));
    const levelReach = ((max - min) || 1) * 0.4;
    levels.forEach((v) => {
      if (v == null || !Number.isFinite(+v)) return;
      const p = +v;
      if (p < min - levelReach || p > max + levelReach) return;
      min = Math.min(min, p);
      max = Math.max(max, p);
    });
    // Forward-looking overlays — the replay path (_projection) and the 3M forecast
    // cone (_forecast) — join the Y-scale so their tips stay on screen. They are
    // clamped to a band around the *real* price action though: a target that sits
    // far away can never squash the candles into a thin sliver (it is clipped
    // instead). The band is measured before the overlays so they add up together.
    const baseSpan = (max - min) || 1;
    const capLo = min - baseSpan * 0.5;
    const capHi = max + baseSpan * 0.5;
    const addForward = (pts) => {
      (pts || []).forEach((pt) => {
        const p = pt && +pt.price;
        if (!Number.isFinite(p)) return;
        min = Math.min(min, Math.max(capLo, Math.min(capHi, p)));
        max = Math.max(max, Math.max(capLo, Math.min(capHi, p)));
      });
    };
    if (signal._projection) addForward(signal._projection.pts);
    if (signal._forecast) addForward(signal._forecast.path);
    // multi-timeframe overlay closes that fall inside the visible window
    (signal._overlays || []).forEach((o) => {
      (o && o.series ? o.series : []).forEach((pt) => {
        const c = +pt.c;
        if (!Number.isFinite(c) || +pt.t < t0 || +pt.t > tEnd) return;
        min = Math.min(min, c);
        max = Math.max(max, c);
      });
    });
    // manual drawings (forecast paths, zones, lines) can sit outside the candle range
    (signal._drawings || []).forEach((d) => {
      if (!d) return;
      const pts = d.type === 'path' ? (d.pts || []) : [d.a, d.b, d.sl != null ? { price: d.sl } : null];
      pts.forEach((pt) => {
        const p = pt && +pt.price;
        if (!Number.isFinite(p)) return;
        min = Math.min(min, p);
        max = Math.max(max, p);
      });
    });
    const span = (max - min) || 1;
    min -= span * 0.03;
    max += span * 0.03;
    const plotW = W - pad.l - pad.r;
    const fullH = H - pad.t - pad.b;

    // ——— indicator sub-panes (RSI / MACD / Volume) ———
    // The candles stay the star: panes only take the leftover height, capped so
    // the price chart always keeps a healthy slice.
    const paneList = [];
    if (!plain) {
      if (ind.rsi) paneList.push('rsi');
      if (ind.stoch) paneList.push('stoch');
      if (ind.macd) paneList.push('macd');
      if (ind.adx) paneList.push('adx');
      if (ind.volume) paneList.push('vol');
    }
    const paneGap = 8;
    let paneH = 0;
    if (paneList.length) {
      // Each pane is capped so the candles always keep the bulk of the height;
      // with several panes on they simply share what is left over.
      const avail = Math.max(0, fullH - 150);
      paneH = Math.max(34, Math.min(110, Math.floor(avail / paneList.length) - paneGap));
    }
    const indTotal = paneList.length ? paneList.length * (paneH + paneGap) : 0;
    const yw = Math.max(90, fullH - indTotal);
    const priceBottom = pad.t + yw;
    const paneBox = (k) => {
      const t = priceBottom + paneGap + k * (paneH + paneGap);
      return { t, b: t + paneH };
    };
    // blank forward area: lets the user project forecast lines into the future
    const futurePx = signal._future
      ? Math.max(24, Math.round(plotW * (signal._futureRatio || 0.24)))
      : 0;
    const xw = plotW - futurePx;
    const slotW = xw / Math.max(1, n);
    // Log scale squeezes the top of the range, so a 2× move looks the same at
    // any price level (standard on TradingView). Linear stays the default.
    const logScale = !!ind.log;
    const lg = (v) => Math.log(Math.max(1e-9, v));
    const lgSpan = lg(max) - lg(min) || 1;
    const yOf = (p) => (logScale
      ? pad.t + ((lg(max) - lg(p)) / lgSpan) * yw
      : pad.t + ((max - p) / (max - min)) * yw);
    const xOf = (i) => pad.l + (i + 0.5) * slotW;
    const cw = Math.max(2, slotW * 0.65);
    const chartType = signal._chartType || 'candles';
    const hover = signal._hover || null;

    // store mapping so drawing tools + patterns can convert pixels ↔ price / index
    this.map = {
      pad, W, H, min, max, n, xw, yw, priceBottom,
      slotW, futurePx, plotW, log: logScale,
      sliceStart: start,
      maxStart,
      chartStart: signal.chart.startIndex || 0,
      allLen: all.length,
      t0, ms: stepMs,
      candles
    };
    this.canvas = canvas;

    ctx.clearRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(19,36,51,0.9)');
    g.addColorStop(1, 'rgba(8,16,24,0.95)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // ——— price (Y) and time (X) axes ———
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    niceTicks(min, max, 5).forEach((v) => {
      const y = yOf(v);
      if (y < pad.t - 4 || y > priceBottom + 4) return;
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.beginPath();
      ctx.moveTo(pad.l, y);
      ctx.lineTo(W - pad.r, y);
      ctx.stroke();
      ctx.fillStyle = '#6b8394';
      ctx.fillText(fmtPrice(v), pad.l - 6, y + 3);
    });

    // adaptive tick count: never place labels closer than their own width
    const sampleLabel = fmtAxisTime((candles[0] && candles[0].t) || Date.now(), signal.interval);
    const labelW = ctx.measureText(sampleLabel).width;
    const minStep = Math.max(1, Math.ceil((labelW + 14) / Math.max(1, slotW)));
    const stepX = Math.max(1, Math.floor(n / 6), minStep);
    const axisRight = futurePx > 0 ? pad.l + xw - 1 : W - pad.r - 1;
    ctx.textAlign = 'center';
    for (let i = 0; i < n; i += stepX) {
      const x = xOf(i);
      if (x < pad.l + 1 || x > axisRight - (futurePx > 0 ? labelW / 2 + 3 : 0)) continue;
      ctx.strokeStyle = 'rgba(255,255,255,0.045)';
      ctx.beginPath();
      ctx.moveTo(x, pad.t);
      ctx.lineTo(x, H - pad.b);
      ctx.stroke();
      ctx.fillStyle = '#6b8394';
      ctx.fillText(fmtAxisTime(candles[i].t, signal.interval), x, H - pad.b + 15);
    }
    ctx.textAlign = 'start';

    // ——— forward (future) space ———
    if (futurePx > 0) {
      const fx = pad.l + xw;
      const futureBars = Math.max(1, Math.floor(futurePx / slotW));
      ctx.save();
      ctx.strokeStyle = 'rgba(148,163,184,.10)';
      ctx.lineWidth = 1;
      for (let k = 1; k <= futureBars; k++) {
        const x = fx + k * slotW;
        if (x > W - pad.r) break;
        ctx.beginPath();
        ctx.moveTo(x, pad.t);
        ctx.lineTo(x, H - pad.b);
        ctx.stroke();
      }
      ctx.strokeStyle = 'rgba(148,163,184,.35)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(fx, pad.t);
      ctx.lineTo(fx, H - pad.b);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(148,163,184,.6)';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText('future →', fx + 5, H - pad.b + 15);
      ctx.restore();
      ctx.textAlign = 'start';
    }

    ctx.beginPath();
    let started = false;
    for (let i = 0; i < n; i++) {
      const u = bbUpper[i];
      if (u == null) continue;
      const x = xOf(i);
      if (!started) { ctx.moveTo(x, yOf(u)); started = true; }
      else ctx.lineTo(x, yOf(u));
    }
    for (let i = n - 1; i >= 0; i--) {
      const l = bbLower[i];
      if (l == null) continue;
      ctx.lineTo(xOf(i), yOf(l));
    }
    ctx.closePath();
    if (showBB) {
      ctx.fillStyle = 'rgba(45, 212, 168, 0.08)';
      ctx.fill();
    }

    const line = (arr, color) => {
      ctx.beginPath();
      let s = false;
      for (let i = 0; i < n; i++) {
        if (arr[i] == null) continue;
        const x = xOf(i); const y = yOf(arr[i]);
        if (!s) { ctx.moveTo(x, y); s = true; } else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };
    if (showBB) {
      line(bbUpper, 'rgba(240,180,41,0.7)');
      line(bbMid, 'rgba(148,163,184,0.5)');
      line(bbLower, 'rgba(45,212,168,0.8)');
    }

    // moving-average overlays (toggled from the Chart Lab indicator bar)
    if (ind.ema) {
      line(ema9Arr, '#38bdf8');
      line(ema21Arr, '#f0b429');
    }
    if (ind.sma50) line(sma50Arr, '#c084fc');

    // Ichimoku Cloud — Senkou A/B ribbon (green above, red below) plus the
    // Tenkan-sen / Kijun-sen lines. The cloud is plotted 26 bars ahead.
    if (ind.ichimoku && signal.chart.ichimoku) {
      const ic = signal.chart.ichimoku;
      const tenkan = sliceArr(ic.tenkan);
      const kijun = sliceArr(ic.kijun);
      const spanA = sliceArr(ic.spanA);
      const spanB = sliceArr(ic.spanB);
      const shift = ic.kijunP || 26;
      const cloudAt = (arr, i) => (i - shift >= 0 ? arr[i - shift] : null);
      for (let i = 0; i < n - 1; i++) {
        const a1 = cloudAt(spanA, i);
        const b1 = cloudAt(spanB, i);
        const a2 = cloudAt(spanA, i + 1);
        const b2 = cloudAt(spanB, i + 1);
        if (a1 == null || b1 == null || a2 == null || b2 == null) continue;
        const x1 = xOf(i);
        const x2 = xOf(i + 1);
        ctx.beginPath();
        ctx.moveTo(x1, yOf(a1));
        ctx.lineTo(x2, yOf(a2));
        ctx.lineTo(x2, yOf(b2));
        ctx.lineTo(x1, yOf(b1));
        ctx.closePath();
        ctx.fillStyle = (a1 + a2) >= (b1 + b2) ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)';
        ctx.fill();
      }
      line(tenkan, '#22d3ee');
      line(kijun, '#f43f5e');
    }

    // VWAP — the volume-weighted benchmark, drawn dashed so it reads apart from
    // the plain moving averages.
    if (ind.vwap) {
      ctx.save();
      ctx.setLineDash([6, 4]);
      line(sliceArr(signal.chart.vwap), '#f0b429');
      ctx.setLineDash([]);
      ctx.restore();
    }

    // Heikin-Ashi transform — smoother trend candles, computed from the visible
    // window so it stays stable while panning.
    let ha = null;
    if (chartType === 'heikin') {
      ha = [];
      for (let i = 0; i < n; i++) {
        const c = candles[i];
        const prev = ha[i - 1];
        const close = (c.o + c.h + c.l + c.c) / 4;
        const open = prev ? (prev.o + prev.c) / 2 : (c.o + c.c) / 2;
        ha.push({ o: open, h: Math.max(c.h, open, close), l: Math.min(c.l, open, close), c: close });
      }
    }
    const barAt = (i) => (ha ? ha[i] : candles[i]);

    // band highlight for the candle the user clicked
    if (signal._selectedAbs != null) {
      const li = signal._selectedAbs - start;
      if (li >= 0 && li < n) {
        const x = xOf(li);
        ctx.save();
        ctx.fillStyle = 'rgba(240,180,41,.12)';
        ctx.fillRect(x - cw / 2 - 2, pad.t, cw + 4, yw);
        ctx.strokeStyle = 'rgba(240,180,41,.85)';
        ctx.setLineDash([3, 2]);
        ctx.strokeRect(x - cw / 2 - 3, pad.t + 1, cw + 6, yw - 2);
        ctx.setLineDash([]);
        ctx.restore();
      }
    }

    if (chartType === 'line' || chartType === 'area') {
      const path = () => {
        ctx.beginPath();
        let st = false;
        for (let i = 0; i < n; i++) {
          const x = xOf(i);
          const y = yOf(candles[i].c);
          if (!st) { ctx.moveTo(x, y); st = true; } else ctx.lineTo(x, y);
        }
      };
      if (chartType === 'area') {
        const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + yw);
        grad.addColorStop(0, 'rgba(56,189,248,.34)');
        grad.addColorStop(1, 'rgba(56,189,248,.02)');
        path();
        ctx.lineTo(xOf(n - 1), pad.t + yw);
        ctx.lineTo(xOf(0), pad.t + yw);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }
      path();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.lineWidth = 1;
    } else if (chartType === 'bars') {
      const half = Math.max(2, cw * 0.55);
      for (let i = 0; i < n; i++) {
        const b = barAt(i);
        const x = xOf(i);
        ctx.strokeStyle = b.c >= b.o ? '#22c55e' : '#ef4444';
        ctx.beginPath();
        ctx.moveTo(x, yOf(b.h));
        ctx.lineTo(x, yOf(b.l));
        ctx.moveTo(x, yOf(b.o));
        ctx.lineTo(x - half, yOf(b.o));
        ctx.moveTo(x, yOf(b.c));
        ctx.lineTo(x + half, yOf(b.c));
        ctx.stroke();
      }
    } else {
      for (let i = 0; i < n; i++) {
        const b = barAt(i);
        const x = xOf(i);
        const up = b.c >= b.o;
        ctx.strokeStyle = up ? '#22c55e' : '#ef4444';
        ctx.fillStyle = up ? '#22c55e' : '#ef4444';
        ctx.beginPath();
        ctx.moveTo(x, yOf(b.h));
        ctx.lineTo(x, yOf(b.l));
        ctx.stroke();
        const y1 = yOf(Math.max(b.o, b.c));
        const y2 = yOf(Math.min(b.o, b.c));
        ctx.fillRect(x - cw / 2, y1, cw, Math.max(1, y2 - y1));
      }
    }

    if (!plain) {
      this.drawOverlays(ctx, signal);
      this.drawSMC(ctx, signal);

      const hline = (price, color, label) => {
        if (price == null) return;
        const y = yOf(price);
        ctx.strokeStyle = color;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(W - pad.r, y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.font = '11px Outfit, sans-serif';
        ctx.fillText(label, W - pad.r + 4, y + 3);
      };
      hline(signal.entry, '#38bdf8', signal.entryType === 'LIMIT' ? 'E · LIMIT' : signal.entryType === 'MARKET' ? 'E · MKT' : 'E');
      hline(signal.baseTp1, 'rgba(34,197,94,.45)', 'TP0');
      hline(signal.baseSl, 'rgba(239,68,68,.45)', 'SL0');
      hline(signal.tp1, '#22c55e', 'TP');
      hline(signal.tp2, '#16a34a', 'TP2');
      hline(signal.sl, '#ef4444', 'SL');
      (signal.triggers || []).forEach((tr, idx) => {
        if (tr?.price == null) return;
        const y = yOf(tr.price);
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(pad.l + 8 + idx * 10, y - 6);
        ctx.lineTo(pad.l + 14 + idx * 10, y);
        ctx.lineTo(pad.l + 8 + idx * 10, y + 6);
        ctx.fill();
        if (idx === 0) {
          ctx.font = '11px Outfit, sans-serif';
          ctx.fillText('TRIGGER', pad.l + 18, y - 4);
        }
      });
    }

    const last = candles[n - 1];
    const livePrice = Number.isFinite(+signal._livePrice) ? +signal._livePrice : (last ? last.c : null);
    const atLatest = panBack === 0;
    if (last) {
      const x = xOf(n - 1);
      if (atLatest) {
        ctx.strokeStyle = 'rgba(56,189,248,.9)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - cw / 2 - 2, yOf(last.h) - 2, cw + 4, Math.max(6, yOf(last.l) - yOf(last.h) + 4));
        ctx.lineWidth = 1;
      }

      // ——— live price line (follows the latest tick) ———
      const y = yOf(livePrice);
      if (y >= pad.t && y <= priceBottom) {
        const prevLive = Number.isFinite(+signal._livePricePrev) ? +signal._livePricePrev : null;
        const up = prevLive != null ? livePrice >= prevLive : (n > 1 ? livePrice >= candles[n - 2].c : true);
        const col = up ? '#22c55e' : '#ef4444';
        ctx.strokeStyle = col;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(W - pad.r, y);
        ctx.stroke();
        ctx.setLineDash([]);

        const tag = fmtPrice(livePrice);
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        const tw = ctx.measureText(tag).width;
        const bw = tw + 10;
        const bx = Math.max(2, pad.l - 6 - bw);
        ctx.fillStyle = col;
        ctx.fillRect(bx, y - 8, bw, 16);
        ctx.fillStyle = '#08131b';
        ctx.fillText(tag, bx + 5, y + 3.5);

        if (atLatest) {
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // ——— indicator panes: RSI / MACD / Volume ———
    if (paneList.length) {
      const plotRight = W - pad.r;
      paneList.forEach((kind, k) => {
        const box = paneBox(k);
        const ph = box.b - box.t;
        ctx.fillStyle = 'rgba(255,255,255,0.025)';
        ctx.fillRect(pad.l, box.t, plotW, ph);
        ctx.strokeStyle = 'rgba(255,255,255,0.09)';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeRect(pad.l + 0.5, box.t + 0.5, plotW - 1, ph - 1);
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#8aa396';

        if (kind === 'rsi') {
          const arr = sliceArr(signal.chart.rsi);
          const yOfR = (v) => box.b - (v / 100) * ph;
          // shaded 30–70 band: staying inside it means "no extreme"
          ctx.fillStyle = 'rgba(148,163,184,0.07)';
          ctx.fillRect(pad.l, yOfR(70), plotW, yOfR(30) - yOfR(70));
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(148,163,184,0.35)';
          [70, 50, 30].forEach((lvl) => {
            const y = yOfR(lvl);
            ctx.beginPath();
            ctx.moveTo(pad.l, y);
            ctx.lineTo(plotRight, y);
            ctx.stroke();
          });
          ctx.setLineDash([]);
          ctx.beginPath();
          let st = false;
          for (let i = 0; i < n; i++) {
            const v = arr[i];
            if (v == null) continue;
            const x = xOf(i);
            const y = yOfR(v);
            if (!st) { ctx.moveTo(x, y); st = true; } else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          const lastV = arr[n - 1];
          ctx.fillStyle = '#8aa396';
          ctx.textAlign = 'left';
          ctx.fillText(`RSI(14)${lastV != null ? ` ${lastV.toFixed(1)}` : ''}`, pad.l + 6, box.t + 11);
          ctx.fillStyle = 'rgba(239,68,68,0.85)';
          ctx.fillText('70', plotRight + 4, yOfR(70) + 3);
          ctx.fillStyle = 'rgba(34,197,94,0.85)';
          ctx.fillText('30', plotRight + 4, yOfR(30) + 3);
        } else if (kind === 'stoch') {
          const stc = signal.chart.stochastic || {};
          const kArr = sliceArr(stc.k);
          const dArr = sliceArr(stc.d);
          const yOfS = (v) => box.b - (v / 100) * ph;
          ctx.fillStyle = 'rgba(148,163,184,0.07)';
          ctx.fillRect(pad.l, yOfS(80), plotW, yOfS(20) - yOfS(80));
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(148,163,184,0.35)';
          [80, 50, 20].forEach((lvl) => {
            const y = yOfS(lvl);
            ctx.beginPath();
            ctx.moveTo(pad.l, y);
            ctx.lineTo(plotRight, y);
            ctx.stroke();
          });
          ctx.setLineDash([]);
          const sLine = (arr, col) => {
            ctx.beginPath();
            let st = false;
            for (let i = 0; i < n; i++) {
              const v = arr[i];
              if (v == null) continue;
              const x = xOf(i);
              const y = yOfS(v);
              if (!st) { ctx.moveTo(x, y); st = true; } else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          };
          sLine(kArr, '#38bdf8');
          sLine(dArr, '#f0b429');
          const kv = kArr[n - 1];
          ctx.fillStyle = '#8aa396';
          ctx.textAlign = 'left';
          ctx.fillText(`Stochastic %K${kv != null ? ` ${kv.toFixed(1)}` : ''} · %D (14,3,3)`, pad.l + 6, box.t + 11);
          ctx.fillStyle = 'rgba(239,68,68,0.85)';
          ctx.fillText('80', plotRight + 4, yOfS(80) + 3);
          ctx.fillStyle = 'rgba(34,197,94,0.85)';
          ctx.fillText('20', plotRight + 4, yOfS(20) + 3);
        } else if (kind === 'macd') {
          const mac = signal.chart.macd || {};
          const mLine = sliceArr(mac.line);
          const mSig = sliceArr(mac.signal);
          const mHist = sliceArr(mac.hist);
          const vals = mLine.concat(mSig, mHist).filter((v) => v != null).map((v) => Math.abs(v));
          const mx = vals.length ? Math.max(...vals) || 1 : 1;
          const yOfM = (v) => box.t + ph / 2 - (v / mx) * (ph / 2 - 4);
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(148,163,184,0.35)';
          ctx.beginPath();
          ctx.moveTo(pad.l, yOfM(0));
          ctx.lineTo(plotRight, yOfM(0));
          ctx.stroke();
          ctx.setLineDash([]);
          const hw = Math.max(1, Math.min(6, slotW * 0.6));
          for (let i = 0; i < n; i++) {
            const h = mHist[i];
            if (h == null) continue;
            const x = xOf(i);
            const y0 = yOfM(0);
            const y1 = yOfM(h);
            ctx.fillStyle = h >= 0 ? 'rgba(34,197,94,0.55)' : 'rgba(239,68,68,0.55)';
            ctx.fillRect(x - hw / 2, Math.min(y0, y1), hw, Math.max(1, Math.abs(y1 - y0)));
          }
          const mline = (arr, col) => {
            ctx.beginPath();
            let st = false;
            for (let i = 0; i < n; i++) {
              if (arr[i] == null) continue;
              const x = xOf(i);
              const y = yOfM(arr[i]);
              if (!st) { ctx.moveTo(x, y); st = true; } else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = col;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          };
          mline(mLine, '#38bdf8');
          mline(mSig, '#f0b429');
          ctx.fillStyle = '#8aa396';
          ctx.textAlign = 'left';
          ctx.fillText('MACD(12,26,9)  —  blue MACD · amber signal · bars histogram', pad.l + 6, box.t + 11);
        } else if (kind === 'adx') {
          const ad = signal.chart.adx || {};
          const adxArr = sliceArr(ad.adx);
          const pArr = sliceArr(ad.plusDI);
          const mArr = sliceArr(ad.minusDI);
          const top = Math.max(25, ...adxArr.concat(pArr, mArr).filter((v) => v != null));
          const yOfA = (v) => box.b - (v / top) * (ph - 4);
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(240,180,41,0.5)';
          ctx.beginPath();
          ctx.moveTo(pad.l, yOfA(25));
          ctx.lineTo(plotRight, yOfA(25));
          ctx.stroke();
          ctx.setLineDash([]);
          const aLine = (arr, col, wdt) => {
            ctx.beginPath();
            let st = false;
            for (let i = 0; i < n; i++) {
              const v = arr[i];
              if (v == null) continue;
              const x = xOf(i);
              const y = yOfA(v);
              if (!st) { ctx.moveTo(x, y); st = true; } else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = col;
            ctx.lineWidth = wdt;
            ctx.stroke();
          };
          aLine(mArr, '#ef4444', 1.1);
          aLine(pArr, '#22c55e', 1.1);
          aLine(adxArr, '#e2e8f0', 1.6);
          const av = adxArr[n - 1];
          ctx.fillStyle = '#8aa396';
          ctx.textAlign = 'left';
          ctx.fillText(`ADX(14)${av != null ? ` ${av.toFixed(1)}` : ''} — white ADX · green +DI · red −DI · 25 = trend line`, pad.l + 6, box.t + 11);
        } else if (kind === 'vol') {
          const vols = candles.map((c) => (Number.isFinite(+c.v) ? +c.v : 0));
          const mx = Math.max(1, ...vols);
          const bw2 = Math.max(2, slotW * 0.65);
          for (let i = 0; i < n; i++) {
            const x = xOf(i);
            const h = (vols[i] / mx) * (ph - 14);
            ctx.fillStyle = candles[i].c >= candles[i].o ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.45)';
            ctx.fillRect(x - bw2 / 2, box.b - 2 - h, bw2, h);
          }
          ctx.fillStyle = '#8aa396';
          ctx.textAlign = 'left';
          ctx.fillText(`Volume  ${Math.round(vols[n - 1] || 0).toLocaleString()}`, pad.l + 6, box.t + 11);
        }
        ctx.textAlign = 'start';
      });
    }

    ctx.fillStyle = '#8aa396';
    ctx.font = '11px JetBrains Mono, monospace';
    const modeTag = signal._demoMode ? 'DEMO' : (signal._liveMode ? 'LIVE' : '');
    ctx.fillText(
      `${signal.symbol} · ${signal.market || 'SPOT'} · ${signal.interval || ''}${modeTag ? ` · ${modeTag}` : ''}${logScale ? ' · LOG' : ''}${chartType !== 'candles' ? ` · ${chartType.toUpperCase()}` : ''}`,
      pad.l + 4,
      12
    );

    // OHLC legend — TradingView-style, follows the crosshair and falls back to
    // the latest bar when the pointer is away.
    {
      const legIdx = hover && Number.isFinite(hover.local)
        ? Math.max(0, Math.min(n - 1, hover.local))
        : n - 1;
      const lc = candles[legIdx];
      if (lc) {
        const prevC = legIdx > 0 ? candles[legIdx - 1].c : lc.o;
        const chg = prevC ? ((lc.c - prevC) / prevC) * 100 : 0;
        const col = lc.c >= lc.o ? '#22c55e' : '#ef4444';
        const segs = [
          ['O ', '#7d93a4', fmtPrice(lc.o), col],
          ['H ', '#7d93a4', fmtPrice(lc.h), col],
          ['L ', '#7d93a4', fmtPrice(lc.l), col],
          ['C ', '#7d93a4', fmtPrice(lc.c), col],
          [`${chg >= 0 ? '▲' : '▼'} ${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`, col, '', col]
        ];
        ctx.font = '11px JetBrains Mono, monospace';
        let lx = pad.l + 4;
        segs.forEach(([lab, lcol, val, vcol]) => {
          ctx.fillStyle = lcol;
          ctx.fillText(lab, lx, 25);
          lx += ctx.measureText(lab).width;
          if (val) {
            ctx.fillStyle = vcol;
            ctx.fillText(val, lx, 25);
            lx += ctx.measureText(val).width;
          }
          lx += 8;
        });
      }
    }

    if (!plain && signal.candle?.name) {
      const bias = signal.candle.bias || '';
      ctx.fillStyle = bias === 'BUY' ? '#22c55e' : bias === 'SELL' ? '#ef4444' : '#f0b429';
      ctx.font = 'bold 12px Outfit, sans-serif';
      ctx.fillText(`Stick: ${signal.candle.name}`, pad.l + 4, 40);
    }

    // Bollinger band legend (top-right)
    if (!plain) {
      ctx.font = '10px JetBrains Mono, monospace';
      [['UB', 'rgba(240,180,41,0.9)'], ['MB', 'rgba(148,163,184,0.7)'], ['LB', 'rgba(45,212,168,0.95)']]
        .forEach(([lab, col], k) => {
          const y = 12 + k * 12;
          const x = W - pad.r - 52;
          ctx.strokeStyle = col;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x + 12, y - 3);
          ctx.stroke();
          ctx.fillStyle = col;
          ctx.fillText(lab, x + 16, y);
        });
    }

    if (signal._demoMode) {
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 42px Outfit, sans-serif';
      ctx.translate(W * 0.28, H * 0.55);
      ctx.rotate(-0.35);
      ctx.fillText('DEMO PRACTICE', 0, 0);
      ctx.restore();
    }

    if (!plain) {
      this.drawPatternTargets(ctx, signal);
      this.drawPatterns(ctx, signal);
      this.drawWaves(ctx, signal);
      this.drawDrawings(ctx, signal);
      // the long-horizon cone sits behind the short-term entry→target path
      this.drawForecast(ctx, signal);
      this.drawProjection(ctx, signal);
    }

    const axisBottom = H - pad.b;

    // ——— measure tool: drag from A to B to read Δ price / % / bars ———
    const meas = signal._measure;
    if (meas && meas.a && meas.b) {
      const mx1 = this.indexToX(meas.a.i);
      const my1 = this.priceToY(meas.a.price);
      const mx2 = this.indexToX(meas.b.i);
      const my2 = this.priceToY(meas.b.price);
      if ([mx1, my1, mx2, my2].every(Number.isFinite)) {
        const up = meas.b.price >= meas.a.price;
        const col = up ? '#22c55e' : '#ef4444';
        const rgb = up ? '34,197,94' : '239,68,68';
        ctx.save();
        ctx.beginPath();
        ctx.rect(pad.l, pad.t, plotW, axisBottom - pad.t);
        ctx.clip();
        ctx.fillStyle = `rgba(${rgb},0.13)`;
        ctx.fillRect(Math.min(mx1, mx2), Math.min(my1, my2), Math.abs(mx2 - mx1), Math.abs(my2 - my1));
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.3;
        ctx.setLineDash([5, 4]);
        ctx.strokeRect(Math.min(mx1, mx2), Math.min(my1, my2), Math.abs(mx2 - mx1), Math.abs(my2 - my1));
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(mx1, my1);
        ctx.lineTo(mx2, my2);
        ctx.stroke();
        ctx.restore();
        [ [mx1, my1], [mx2, my2] ].forEach(([hx2, hy2]) => {
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(hx2, hy2, 3.2, 0, Math.PI * 2);
          ctx.fill();
        });

        const dp = meas.b.price - meas.a.price;
        const pct = meas.a.price ? (dp / meas.a.price) * 100 : 0;
        const bars = Math.round(meas.b.i - meas.a.i);
        const txt = `${dp >= 0 ? '+' : ''}${fmtPrice(dp)}  (${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%)  ${bars >= 0 ? '+' : ''}${bars} bars`;
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        const tw = ctx.measureText(txt).width;
        const lx = Math.max(pad.l + 4, Math.min((mx1 + mx2) / 2 - tw / 2, W - pad.r - tw - 8));
        const lyy = Math.max(pad.t + 16, Math.min((my1 + my2) / 2, axisBottom - 6));
        ctx.fillStyle = col;
        ctx.fillRect(lx - 6, lyy - 13, tw + 12, 18);
        ctx.fillStyle = '#08131b';
        ctx.textAlign = 'left';
        ctx.fillText(txt, lx, lyy);
      }
    }

    // ——— crosshair + axis read-outs ———
    if (hover && Number.isFinite(hover.x) && Number.isFinite(hover.y)) {
      const hx = Math.max(pad.l + 0.5, Math.min(hover.x, pad.l + xw));
      const hy = Math.max(pad.t + 0.5, Math.min(hover.y, priceBottom - 0.5));
      ctx.save();
      ctx.strokeStyle = 'rgba(190,205,220,0.42)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.l, hy);
      ctx.lineTo(W - pad.r, hy);
      ctx.moveTo(hx, pad.t);
      ctx.lineTo(hx, axisBottom);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = 'bold 10px JetBrains Mono, monospace';
      const hp = this.priceAtY(hy);
      const ptag = fmtPrice(hp);
      const pw = Math.max(ctx.measureText(ptag).width + 10, pad.r - 4);
      ctx.fillStyle = '#33475a';
      ctx.fillRect(W - pad.r + 1, hy - 8, pw, 16);
      ctx.fillStyle = '#e6edf3';
      ctx.textAlign = 'left';
      ctx.fillText(ptag, W - pad.r + 5, hy + 3.5);

      const li = Math.round((hx - pad.l) / slotW - 0.5);
      const hc = candles[Math.max(0, Math.min(n - 1, li))];
      if (hc) {
        const ttag = fmtAxisTime(hc.t, signal.interval);
        const tw2 = ctx.measureText(ttag).width + 12;
        const tx = Math.max(pad.l, Math.min(hx - tw2 / 2, pad.l + xw - tw2));
        ctx.fillStyle = '#33475a';
        ctx.fillRect(tx, axisBottom + 2, tw2, 16);
        ctx.fillStyle = '#e6edf3';
        ctx.textAlign = 'center';
        ctx.fillText(ttag, tx + tw2 / 2, axisBottom + 13.5);
      }
      ctx.restore();
      ctx.textAlign = 'start';
    }

    // remember what was drawn so wheel-zoom can repaint this canvas on its own
    canvas.__cpeSignal = signal;
  },

  /* ————— pixel ↔ price / index mapping (from the last draw) ————— */

  map: null,

  priceAtY(y) {
    const m = this.map;
    if (!m) return null;
    const f = (y - m.pad.t) / m.yw;
    if (m.log) {
      const hi = Math.log(Math.max(1e-9, m.max));
      const lo = Math.log(Math.max(1e-9, m.min));
      return Math.exp(hi - f * (hi - lo));
    }
    return m.max - f * (m.max - m.min);
  },

  priceToY(price) {
    const m = this.map;
    if (!m || !Number.isFinite(+price)) return null;
    if (m.log) {
      const hi = Math.log(Math.max(1e-9, m.max));
      const lo = Math.log(Math.max(1e-9, m.min));
      return m.pad.t + ((hi - Math.log(Math.max(1e-9, +price))) / (hi - lo || 1)) * m.yw;
    }
    return m.pad.t + ((m.max - price) / (m.max - m.min)) * m.yw;
  },

  indexToX(absIndex) {
    const m = this.map;
    if (!m) return null;
    return m.pad.l + ((absIndex - m.chartStart - m.sliceStart) + 0.5) * (m.xw / m.n);
  },

  /** Timestamp → x, so series on other timeframes line up with this chart. */
  timeToX(ts) {
    const m = this.map;
    if (!m || !m.ms) return null;
    const local = (+ts - m.t0) / m.ms;
    return m.pad.l + (local + 0.5) * (m.xw / m.n);
  },

  pointToChart(px, py) {
    const m = this.map;
    if (!m) return null;
    const local = (px - m.pad.l) / (m.xw / m.n) - 0.5;
    return { i: m.chartStart + m.sliceStart + local, price: this.priceAtY(py) };
  },

  /* ————— per-canvas zoom (survives signal rebuilds) ————— */

  getCanvasZoom(canvas) {
    return canvas && canvas.__cpeZoom ? canvas.__cpeZoom : 1;
  },

  setCanvasZoom(canvas, z) {
    if (!canvas) return 1;
    canvas.__cpeZoom = Math.max(1, Math.min(20, +z || 1));
    return canvas.__cpeZoom;
  },

  /** Wheel-style zoom on a single canvas; dir > 0 zooms in. */
  zoomCanvas(canvas, dir) {
    if (!canvas || !canvas.__cpeSignal) return null;
    this.setCanvasZoom(canvas, this.getCanvasZoom(canvas) + (dir > 0 ? 1 : -1));
    this.draw(canvas, canvas.__cpeSignal);
    return this.getCanvasZoom(canvas);
  },

  resetCanvasZoom(canvas) {
    if (!canvas) return 1;
    this.setCanvasZoom(canvas, 1);
    if (canvas.__cpeSignal) {
      canvas.__cpeSignal._panOffset = 0;
      canvas.__cpeSignal._panPx = 0;
      this.draw(canvas, canvas.__cpeSignal);
    }
    return 1;
  },

  /** Local candle index (0 = leftmost visible bar) under pixel x, or null. */
  candleIndexAtX(px) {
    const m = this.map;
    if (!m) return null;
    const local = Math.floor((px - m.pad.l) / (m.xw / m.n));
    if (local < 0 || local >= m.n) return null;
    return local;
  },

  /** Candle under pixel x — { local, index (absolute chart bar), candle }. */
  candleAtX(px) {
    const m = this.map;
    const local = this.candleIndexAtX(px);
    if (local == null) return null;
    const candle = m.candles && m.candles[local];
    if (!candle) return null;
    return { local, index: m.chartStart + m.sliceStart + local, candle };
  },

  /** Horizontal pixels per candle on the last draw (pan helper). */
  pxPerCandle() {
    const m = this.map;
    return m && m.n ? m.xw / m.n : 1;
  },

  patternColor(bias) {
    if (bias === 'BUY') return 'rgba(34,197,94,.9)';
    if (bias === 'SELL') return 'rgba(239,68,68,.9)';
    return 'rgba(240,180,41,.95)';
  },

  /** Multi-timeframe close-price lines drawn over the main candles for comparison. */
  drawOverlays(ctx, signal) {
    const m = this.map;
    const list = (signal._overlays || []).filter((o) => o && o.series && o.series.length);
    if (!m || !list.length) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(m.pad.l, m.pad.t, m.W - m.pad.l - m.pad.r, (m.priceBottom != null ? m.priceBottom : m.H - m.pad.b) - m.pad.t);
    ctx.clip();
    list.forEach((o) => {
      ctx.strokeStyle = o.color || '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([]);
      ctx.beginPath();
      let started = false;
      o.series.forEach((pt) => {
        const x = this.timeToX(pt.t);
        const y = this.priceToY(pt.c);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    ctx.restore();
  },

  /**
   * Smart-money overlay: order blocks / FVGs, resting liquidity and the latest
   * BOS / CHoCH structure break, plus the SMC entry zone the trade is placed on.
   * The engine hands every level in absolute candle indices, so they convert
   * through indexToX() just like the patterns do.
   */
  drawSMC(ctx, signal) {
    const m = this.map;
    if (!m || signal._showSMC === false) return;
    const smc = signal.smc || null;
    const entryZone = signal.entryZone || null;
    if (!smc && !entryZone) return;
    const rect = {
      l: m.pad.l,
      r: m.W - m.pad.r,
      t: m.pad.t,
      b: m.priceBottom != null ? m.priceBottom : m.H - m.pad.b
    };
    const Y = (p) => this.priceToY(p);
    const X = (i) => {
      const x = this.indexToX(i);
      return Number.isFinite(x) ? x : null;
    };
    const price = Number.isFinite(+signal._livePrice) ? +signal._livePrice
      : Number.isFinite(+signal.price) ? +signal.price
        : Number.isFinite(+signal.entry) ? +signal.entry : null;
    const inBand = (y) => Number.isFinite(y) && y >= rect.t - 2 && y <= rect.b + 2;

    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.l, rect.t, rect.r - rect.l, rect.b - rect.t);
    ctx.clip();

    // 1) Demand / supply zones (OB + FVG) — the nearest few to price
    const zones = (smc && Array.isArray(smc.zones) ? smc.zones : [])
      .filter((z) => z && Number.isFinite(+z.top) && Number.isFinite(+z.bottom) && +z.top > +z.bottom)
      .sort((a, b) => Math.abs((+a.top + +a.bottom) / 2 - price) - Math.abs((+b.top + +b.bottom) / 2 - price))
      .slice(0, 5);
    zones.forEach((z) => {
      const x0 = X(z.index);
      if (x0 == null) return;
      const x = Math.max(rect.l, Math.min(x0, rect.r - 4));
      const yT = Y(+z.top);
      const yB = Y(+z.bottom);
      if (!inBand(yT) && !inBand(yB)) return;
      const yTop = Math.max(rect.t, Math.min(yT, yB));
      const yBot = Math.min(rect.b, Math.max(yT, yB));
      const h = Math.max(1, yBot - yTop);
      const w = rect.r - x;
      if (w < 3) return;
      const bull = z.type === 'bull';
      const rgb = bull ? '34,197,94' : '239,68,68';
      ctx.fillStyle = `rgba(${rgb},0.09)`;
      ctx.fillRect(x, yTop, w, h);
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${rgb},0.5)`;
      ctx.strokeRect(x + 0.5, yTop + 0.5, w - 1, h - 1);
      ctx.setLineDash([]);
      if (h >= 12 && w >= 26) {
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.fillStyle = `rgba(${rgb},0.95)`;
        ctx.fillText(z.kind || 'ZONE', x + 3, yTop + 9);
      }
    });

    // 2) Resting liquidity (equal highs / lows) as dotted guide lines
    (smc && Array.isArray(smc.liquidityLines) ? smc.liquidityLines : []).forEach((ln) => {
      const y = Y(+ln.price);
      if (!inBand(y)) return;
      ctx.strokeStyle = 'rgba(148,163,184,0.45)';
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rect.l, y);
      ctx.lineTo(rect.r, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(203,213,225,0.8)';
      ctx.fillText('LIQ', rect.r - 4, y - 3);
      ctx.textAlign = 'start';
    });

    // 3) Latest structure breaks — BOS (continuation) / CHoCH (reversal)
    (smc && Array.isArray(smc.structureMarks) ? smc.structureMarks : []).slice(0, 2).forEach((mk) => {
      const y = Y(+mk.level);
      if (!inBand(y)) return;
      const x0 = X(+mk.index);
      const x = x0 == null ? rect.l : Math.max(rect.l, Math.min(x0, rect.r));
      const bull = mk.kind === 'bull';
      const col = bull ? '#22c55e' : '#ef4444';
      ctx.strokeStyle = col;
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(rect.r, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      const txt = `${mk.type} ${bull ? '↑' : '↓'}`;
      const tw = ctx.measureText(txt).width;
      const lx = Math.max(rect.l + 2, Math.min(x - tw / 2, rect.r - tw - 6));
      const ly = y - 6 < rect.t + 12 ? y + 14 : y - 5;
      ctx.fillStyle = col;
      ctx.fillRect(lx - 3, ly - 9, tw + 6, 12);
      ctx.fillStyle = '#08131b';
      ctx.fillText(txt, lx, ly);
    });

    // 4) SMC entry zone — where a LIMIT order waits, or where price already sits
    if (entryZone && Number.isFinite(+entryZone.low) && Number.isFinite(+entryZone.high)) {
      const yT = Y(+entryZone.high);
      const yB = Y(+entryZone.low);
      if (inBand(yT) || inBand(yB)) {
        const yTop = Math.max(rect.t, Math.min(yT, yB));
        const yBot = Math.min(rect.b, Math.max(yT, yB));
        const h = Math.max(1, yBot - yTop);
        ctx.fillStyle = 'rgba(56,189,248,0.10)';
        ctx.fillRect(rect.l, yTop, rect.r - rect.l, h);
        ctx.strokeStyle = 'rgba(56,189,248,0.7)';
        ctx.setLineDash([6, 4]);
        ctx.lineWidth = 1.2;
        ctx.strokeRect(rect.l + 0.5, yTop + 0.5, rect.r - rect.l - 1, h - 1);
        ctx.setLineDash([]);
        const isLimit = signal.entryType === 'LIMIT';
        const txt = `${isLimit ? 'LIMIT' : 'MARKET'} ENTRY · ${entryZone.kind || 'ZONE'}`;
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        const tw = ctx.measureText(txt).width;
        const ly = yTop - 4 < rect.t + 11 ? yTop + 14 : yTop - 4;
        ctx.fillStyle = isLimit ? '#fbbf24' : '#38bdf8';
        ctx.fillRect(rect.l + 4, ly - 10, tw + 8, 13);
        ctx.fillStyle = '#08131b';
        ctx.fillText(txt, rect.l + 8, ly);
      }
    }

    ctx.restore();
  },

  /**
   * Route the trade is expected to take: entry → first target → final target,
   * with a gentle up/down wiggle so it reads like a real move. Green = long,
   * red = short. Returned as normalised points ({ u: 0..1 across the future
   * area, price }) so the renderer can map them once the chart is laid out.
   */
  buildProjection(signal) {
    const type = String(signal?.type || '').toUpperCase();
    const long = type === 'BUY';
    if (!long && type !== 'SELL') return null;
    const entry = Number.isFinite(+signal.entry) ? +signal.entry : +signal.price;
    if (!Number.isFinite(entry) || entry <= 0) return null;

    const side = (v) => (long ? v > entry : v < entry);
    const cands = [+signal.tp1, +signal.tp2]
      .filter((v) => Number.isFinite(v) && v > 0 && side(v))
      .sort((a, b) => (long ? a - b : b - a));
    const mid = cands.length ? cands[0] : entry + (long ? 1 : -1) * entry * 0.015;
    const target = cands.length ? cands[cands.length - 1] : entry + (long ? 1 : -1) * entry * 0.03;
    const stop = Number.isFinite(+signal.sl) ? +signal.sl : entry + (long ? -1 : 1) * entry * 0.02;

    const span1 = Math.abs(mid - entry) || Math.abs(target - entry) * 0.5;
    const span2 = Math.abs(target - mid) || Math.abs(target - entry) * 0.5;
    // Seeded from the signal itself, so the same signal always draws the same
    // route while a different symbol / timeframe / entry draws a different one.
    const candles = (signal && signal.chart && signal.chart.candles) || [];
    const lastClose = candles.length ? +candles[candles.length - 1].close : NaN;
    const rand = rngFrom(hashSeed(`${signal.symbol}|${signal.market}|${signal.interval}|proj|${entry}|${lastClose}`));
    const atrPct = Number.isFinite(+signal.volatility?.atrPct) ? +signal.volatility.atrPct : 1.5;
    // Wiggle is scaled by the leg's own size and the symbol's volatility, so a
    // volatile coin swings harder than a quiet one.
    const amp1 = Math.max(span1 * 0.12, entry * (atrPct / 100) * 0.5);
    const amp2 = Math.max(span2 * 0.10, entry * (atrPct / 100) * 0.4);
    const steps = 72;
    const leg = Math.round(steps * 0.62);
    const w1 = organicWiggle(leg, rand);
    const w2 = organicWiggle(steps - leg, rand);
    const pts = [];
    for (let k = 0; k <= steps; k++) {
      const u = k / steps;
      let price;
      if (k <= leg) {
        const v = k / leg;
        price = entry + (mid - entry) * easeOut(v, 1.5) + w1[k] * amp1;
      } else {
        const j = k - leg;
        const v = j / (steps - leg);
        price = mid + (target - mid) * easeOut(v, 1.7) + w2[j] * amp2;
      }
      pts.push({ u, price: Math.max(1e-9, price) });
    }
    return { long, entry, mid, target, stop, midU: leg / steps, pts };
  },

  /**
   * Draws the animated current-signal route (entry → TP1 → TP2) in the near lane of
   * the future block. On candle charts it forms as ghost candles; elsewhere it stays
   * a glowing line. The wider 3-month lane behind it is drawn by drawForecast, so the
   * two projections are always two separate things.
   */
  drawProjection(ctx, signal) {
    const m = this.map;
    const proj = signal && signal._projection;
    if (!m || !proj || !Array.isArray(proj.pts) || proj.pts.length < 2) return;
    if (signal._showProjection === false) return;
    if ((m.futurePx || 0) <= 2) return;
    const z = futureSplit(m);
    const zoneRight = z.startX + z.sigW;
    const xAt = (u) => z.startX + u * z.sigW;
    const long = !!proj.long;
    const rgb = long ? '34,197,94' : '239,68,68';
    const base = long ? '#22c55e' : '#ef4444';
    const rect = { t: m.pad.t, b: m.priceBottom != null ? m.priceBottom : m.H - m.pad.b };
    // The route stays inside its lane: a far-away target clamps to the top (or
    // bottom) edge so the animation always runs to the edge and finishes on screen.
    const TOP = rect.t + 16;
    const BOT = rect.b - 6;
    const Y = (p) => {
      const y = this.priceToY(p);
      return Number.isFinite(y) ? Math.min(BOT, Math.max(TOP, y)) : y;
    };
    const asCandles = isCandleChart(signal._chartType);
    const prog = signal._projProgress == null ? 1 : Math.max(0, Math.min(1, signal._projProgress));

    ctx.save();
    ctx.beginPath();
    ctx.rect(z.startX, rect.t, z.sigW, rect.b - rect.t);
    ctx.clip();
    ctx.textAlign = 'start';

    // risk level (stop) across the signal lane
    const yStop = Y(proj.stop);
    if (Number.isFinite(yStop) && yStop >= rect.t && yStop <= rect.b) {
      ctx.setLineDash([4, 5]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(239,68,68,0.45)';
      ctx.beginPath();
      ctx.moveTo(z.startX, yStop);
      ctx.lineTo(zoneRight, yStop);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = 'rgba(239,68,68,0.85)';
      ctx.fillText(`SL ${fmtPrice(proj.stop)}`, z.startX + 3, yStop - 3);
    }

    // faint guide so the destination is visible from the first frame
    ctx.beginPath();
    proj.pts.forEach((pt, k) => {
      const x = xAt(pt.u);
      const y = Y(pt.price);
      if (!Number.isFinite(y)) return;
      if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.setLineDash([4, 5]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${rgb},0.20)`;
    ctx.stroke();
    ctx.setLineDash([]);

    // ——— animated reveal ———
    let head = null;
    if (asCandles) {
      const n = Math.max(6, Math.min(36, Math.round(z.sigW / 7)));
      const cds = pathToCandles(proj.pts, n, 3, { mix: 0.34 });
      drawCandleRun(ctx, cds, xAt, Y, prog, {
        up: '#22c55e', down: '#ef4444',
        bw: Math.max(2.2, (z.sigW / n) * 0.62),
        bodyAlpha: 0.95, wickAlpha: 0.9, hollow: false
      });
      if (prog > 0 && cds.length) {
        const k = Math.max(0, Math.min(cds.length - 1, Math.ceil(prog * cds.length) - 1));
        head = { x: xAt(cds[k].u), y: Y(cds[k].c) };
      }
    } else {
      const total = proj.pts.length - 1;
      const pos = prog * total;
      const idx = Math.min(total, Math.floor(pos));
      const frac = pos - idx;
      const shown = [];
      for (let k = 0; k <= idx; k++) shown.push({ x: xAt(proj.pts[k].u), y: Y(proj.pts[k].price) });
      if (idx < total) {
        const a = proj.pts[idx];
        const b = proj.pts[idx + 1];
        shown.push({ x: xAt(a.u + (b.u - a.u) * frac), y: Y(a.price + (b.price - a.price) * frac) });
      }
      const clean = shown.filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
      if (clean.length >= 2) {
        const grad = ctx.createLinearGradient(z.startX, 0, zoneRight, 0);
        grad.addColorStop(0, `rgba(${rgb},0.35)`);
        grad.addColorStop(1, base);
        ctx.save();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.shadowColor = `rgba(${rgb},0.5)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        clean.forEach((p, k) => { if (k === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.6;
        ctx.stroke();
        ctx.restore();
        head = clean[clean.length - 1];
      }
    }

    // entry anchor
    const yE = Y(proj.entry);
    if (Number.isFinite(yE)) {
      ctx.beginPath();
      ctx.arc(z.startX, yE, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#08131b';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`START ${fmtPrice(proj.entry)}`, z.startX + 6, yE - 5);
    }

    // TP1 — the first target the route reaches
    const tp1v = Number.isFinite(+signal.tp1) ? +signal.tp1 : proj.mid;
    const yTp1 = Y(tp1v);
    const tp1u = proj.midU != null ? proj.midU : 0.62;
    if (Number.isFinite(yTp1)) {
      const x1 = xAt(tp1u);
      if (prog >= tp1u) {
        ctx.beginPath();
        ctx.arc(x1, yTp1, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = base;
        ctx.fill();
      }
      ctx.font = 'bold 8.5px JetBrains Mono, monospace';
      ctx.fillStyle = `rgba(${rgb},0.95)`;
      ctx.textAlign = 'center';
      ctx.fillText(`TP1 ${fmtPrice(tp1v)}`, x1, yTp1 - 6);
      ctx.textAlign = 'start';
    }

    // pulsing head at the moving tip
    if (head && Number.isFinite(head.x) && Number.isFinite(head.y)) {
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 220);
      ctx.beginPath();
      ctx.arc(head.x, head.y, 7 + pulse * 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${0.10 + pulse * 0.12})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(head.x, head.y, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = base;
      ctx.fill();
      ctx.strokeStyle = '#08131b';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    ctx.restore();

    // TP2 flag pinned to the lane's right edge
    const t2v = Number.isFinite(+signal.tp2) ? +signal.tp2 : proj.target;
    const yT2 = Y(t2v);
    if (Number.isFinite(yT2)) {
      const label = `${Number.isFinite(+signal.tp2) ? 'TP2' : 'TARGET'} ${fmtPrice(t2v)}`;
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      const tw = ctx.measureText(label).width;
      const bx = Math.max(z.startX + 2, zoneRight - tw - 6);
      const by = Math.max(TOP + 4, Math.min(rect.b - 6, yT2));
      ctx.fillStyle = base;
      ctx.fillRect(bx - 3, by - 9, tw + 7, 13);
      ctx.fillStyle = '#081018';
      ctx.textAlign = 'start';
      ctx.fillText(label, bx, by + 1);
    }

    // lane header + the divider that separates it from the 3M forecast lane
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillStyle = `rgba(${rgb},0.95)`;
    ctx.textAlign = 'start';
    ctx.fillText(long ? 'SIGNAL · LONG' : 'SIGNAL · SHORT', z.startX + 3, rect.t + 11);
    ctx.setLineDash([3, 4]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(148,163,184,0.35)';
    ctx.beginPath();
    ctx.moveTo(zoneRight, rect.t);
    ctx.lineTo(zoneRight, rect.b);
    ctx.stroke();
    ctx.setLineDash([]);
  },

  /**
   * Long-horizon forecast — "how the chart is likely to form over the next
   * couple of months". The centre line drifts from the entry toward the best
   * target the analysis already knows (Elliott wave target › tp2 › a plain
   * extension) and the envelope widens with the square root of time, scaled by
   * the symbol's own volatility. Returned as normalised { u: 0..1, price }
   * points across the future area so the renderer maps them once the chart is
   * laid out (same contract as buildProjection).
   */
  buildForecast(signal) {
    const type = String(signal?.type || '').toUpperCase();
    const candles = (signal && signal.chart && signal.chart.candles) || [];
    const lastClose = candles.length ? +candles[candles.length - 1].close : NaN;
    // BUY/SELL have a clear side. A HOLD (or unknown) signal still gets a forecast
    // by following the most recent trend, so every chart can show the 3M cone.
    let long;
    if (type === 'BUY') long = true;
    else if (type === 'SELL') long = false;
    else {
      const back = candles.length > 20 ? +candles[candles.length - 21].close : NaN;
      long = !(Number.isFinite(lastClose) && Number.isFinite(back) && lastClose < back);
    }
    const price = Number.isFinite(+signal.price) ? +signal.price : lastClose;
    const entryRaw = Number.isFinite(+signal.entry) ? +signal.entry : NaN;
    // Tradeable signals keep their planned entry; a HOLD forecasts from live price.
    const entry = (type === 'BUY' || type === 'SELL') && Number.isFinite(entryRaw) && entryRaw > 0
      ? entryRaw
      : (Number.isFinite(price) && price > 0 ? price : entryRaw);
    if (!Number.isFinite(entry) || entry <= 0) return null;

    const HORIZON_DAYS = 90;                 // ≈ 3 months
    const side = (v) => (long ? v > entry : v < entry);

    // furthest sensible target the engine already gives us
    const cands = [
      signal.waves && Number.isFinite(+signal.waves.target) && side(+signal.waves.target) ? +signal.waves.target : null,
      Number.isFinite(+signal.tp2) && side(+signal.tp2) ? +signal.tp2 : null,
      Number.isFinite(+signal.tp1) && side(+signal.tp1) ? +signal.tp1 : null
    ].filter((v) => v != null).sort((a, b) => (long ? b - a : a - b));
    const target = cands.length ? cands[0] : entry * (long ? 1.12 : 0.88);

    // one bar's ATR% → a daily figure so the read-out means the same on every timeframe
    const atrPct = Number.isFinite(+signal.volatility?.atrPct) ? +signal.volatility.atrPct : 1.5;
    const perDay = { '1m': 1440, '3m': 480, '5m': 288, '15m': 96, '30m': 48, '1h': 24, '2h': 12, '4h': 6, '6h': 4, '12h': 2, '1d': 1, '3d': 1 / 3, '1w': 1 / 7 }[String(signal.interval || '1d')] || 1;
    const dailyVol = Math.max(0.2, Math.min(20, atrPct * Math.sqrt(perDay)));

    // Seeded from the signal: every symbol / timeframe / entry grows its own 3M
    // shape instead of the same fixed curve, so no two outlooks look alike.
    const rand = rngFrom(hashSeed(`${signal.symbol}|${signal.market}|${signal.interval}|3m|${entry}|${lastClose}`));
    const steps = 72;
    const move = Math.abs(target - entry) || entry * 0.05;
    // Wiggle size follows the actual distance to target and the daily volatility,
    // so the path bends like a real chart rather than a straight line.
    const amp = Math.max(move * 0.18, entry * (dailyVol / 100) * 1.2);
    const wig = organicWiggle(steps, rand);
    const path = [];
    for (let k = 0; k <= steps; k++) {
      const u = k / steps;
      const e = easeOut(u, 1.7);            // ease-out: most of the move lands early
      path.push({ u, price: Math.max(1e-9, entry + (target - entry) * e + wig[k] * amp) });
    }
    return {
      long, entry, target, horizonDays: HORIZON_DAYS, months: 3,
      dailyVol: +dailyVol.toFixed(2), path
    };
  },

  /**
   * Draws the long-horizon 3-month forecast in the wider far lane of the future
   * block. It forms as its own faded ghost-candle run on candle charts (so the 3M
   * outlook reads like a chart forming), or as a plain line with an area fill on
   * line/area charts. It never touches the near signal lane — the two projections
   * stay two separate things.
   */
  drawForecast(ctx, signal) {
    const m = this.map;
    const fc = signal && signal._forecast;
    if (!m || !fc || !Array.isArray(fc.path) || fc.path.length < 2) return;
    if (signal._showForecast === false) return;
    if ((m.futurePx || 0) <= 2) return;
    const z = futureSplit(m);
    const xAt = (u) => z.fcL + u * z.fcW;
    const long = !!fc.long;
    const rgb = long ? '34,197,94' : '239,68,68';
    const base = long ? '#22c55e' : '#ef4444';
    const rect = { t: m.pad.t, b: m.priceBottom != null ? m.priceBottom : m.H - m.pad.b, r: m.W - m.pad.r };
    // Same edge-clamping as the replay line, so a far-out 3M target still lands
    // (and labels) at the top / bottom edge instead of running off the canvas.
    const TOP = rect.t + 44;
    const BOT = rect.b - 6;
    const Y = (p) => {
      const y = this.priceToY(p);
      return Number.isFinite(y) ? Math.min(BOT, Math.max(TOP, y)) : y;
    };
    const asCandles = isCandleChart(signal._chartType);
    const prog = signal._forecastProgress == null ? 1 : Math.max(0, Math.min(1, signal._forecastProgress));

    ctx.save();
    ctx.beginPath();
    ctx.rect(z.fcL, rect.t, z.fcW, rect.b - rect.t);
    ctx.clip();

    // ——— month dividers ———
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    for (let mo = 1; mo <= fc.months; mo++) {
      const x = xAt(mo / fc.months);
      if (x >= rect.r - 2) continue;
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = 'rgba(148,163,184,0.30)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, rect.t);
      ctx.lineTo(x, rect.b);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(148,163,184,0.70)';
      ctx.fillText(`M+${mo}`, x, rect.t + 38);
    }
    ctx.textAlign = 'start';

    const line = fc.path.filter((pt) => Number.isFinite(Y(pt.price)));
    if (line.length >= 2) {
      // reveal window — the part of the 3M path drawn so far
      const total = line.length - 1;
      const pos = prog * total;
      const idx = Math.min(total, Math.floor(pos));
      const frac = pos - idx;
      const shown = line.slice(0, idx + 1);
      if (idx < total) {
        const a = line[idx]; const b = line[idx + 1];
        shown.push({ u: a.u + (b.u - a.u) * frac, price: a.price + (b.price - a.price) * frac });
      }
      const trace = (pts) => {
        ctx.beginPath();
        pts.forEach((pt, k) => {
          const x = xAt(pt.u); const y = Y(pt.price);
          if (k === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
      };

      // faint guide so the destination is visible from the first frame
      trace(line);
      ctx.setLineDash([4, 5]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${rgb},0.16)`;
      ctx.stroke();
      ctx.setLineDash([]);

      // ghost candles form under the line, with realistic red/green pullbacks so
      // the run never reads as one flat colour
      if (asCandles) {
        const n = Math.max(8, Math.min(40, Math.round(z.fcW / 9)));
        const cds = pathToCandles(fc.path, n, 7, { mix: 0.4 });
        drawCandleRun(ctx, cds, xAt, Y, prog, {
          up: base, down: long ? '#f87171' : base,
          bw: Math.max(2, (z.fcW / n) * 0.5),
          bodyAlpha: 0.5, wickAlpha: 0.45, hollow: true
        });
      }

      // the trend line running through the ghost candles — green when the 3M
      // outlook is up, red when it is down
      if (signal._chartType === 'area' && !asCandles && shown.length >= 2) {
        trace(shown);
        ctx.lineTo(xAt(shown[shown.length - 1].u), rect.b);
        ctx.lineTo(xAt(shown[0].u), rect.b);
        ctx.closePath();
        const ag = ctx.createLinearGradient(0, rect.t, 0, rect.b);
        ag.addColorStop(0, `rgba(${rgb},0.20)`);
        ag.addColorStop(1, `rgba(${rgb},0.02)`);
        ctx.fillStyle = ag;
        ctx.fill();
      }
      const head = shown[shown.length - 1];
      if (shown.length >= 2) {
        trace(shown);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        ctx.shadowColor = `rgba(${rgb},0.45)`;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = base;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // moving head at the tip while the 3M path is still forming
      if (head && prog < 1 && Number.isFinite(xAt(head.u)) && Number.isFinite(Y(head.price))) {
        const hx = xAt(head.u);
        const hy = Y(head.price);
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 220);
        ctx.beginPath();
        ctx.arc(hx, hy, 7 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${0.10 + pulse * 0.12})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(hx, hy, 3.6, 0, Math.PI * 2);
        ctx.fillStyle = base;
        ctx.fill();
      }

      // destination dot only once the whole path has been drawn
      const yT = Y(fc.target);
      if (prog >= 1 && Number.isFinite(yT)) {
        ctx.beginPath();
        ctx.arc(xAt(1), yT, 4, 0, Math.PI * 2);
        ctx.fillStyle = base;
        ctx.fill();
        ctx.strokeStyle = '#08131b';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    }
    ctx.restore();

    // header tags (kept outside the clip so they always read cleanly)
    ctx.save();
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillStyle = `rgba(${rgb},0.95)`;
    ctx.textAlign = 'start';
    ctx.fillText(`FORECAST · ${fc.months} MONTHS`, z.fcL + 4, rect.t + 11);
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(226,232,240,0.8)';
    ctx.fillText(`${long ? 'UP' : 'DOWN'} ${fmtPrice(fc.target)} · vol ${fc.dailyVol}%/day`, z.fcL + 4, rect.t + 23);
    ctx.restore();
  },

  /**
   * Measured-move target blocks projected forward from detected patterns.
   * Only patterns whose bias agrees with the signal are drawn, so the chart
   * shows the targets that actually belong to this signal (not the opposite side).
   */
  drawPatternTargets(ctx, signal) {
    const m = this.map;
    if (!m || !signal._showPatternTargets) return;
    const side = String(signal.type || '').toUpperCase();
    // BUY/SELL only show the patterns that agree with the signal; a HOLD signal has
    // no side of its own, so it shows every detected target instead of nothing.
    const directional = side === 'BUY' || side === 'SELL';
    const rect = { l: m.pad.l, r: m.W - m.pad.r, t: m.pad.t, b: m.priceBottom != null ? m.priceBottom : m.H - m.pad.b };
    (signal._patterns || signal.patterns || [])
      .filter((p) => p
        && Number.isFinite(+p.target)
        && (!directional || String(p.bias || '').toUpperCase() === side))
      .slice(0, 3)
      .forEach((p) => {
      if (!p || !Number.isFinite(+p.target)) return;
      const neck = p.neckline && Number.isFinite(+p.neckline.price) ? +p.neckline.price : null;
      if (neck == null) return;
      const lastPt = (p.polyline || [])[p.polyline.length - 1];
      const startI = p.neckline && Number.isFinite(+p.neckline.i2) ? +p.neckline.i2 : (lastPt ? lastPt.i : null);
      let x0 = startI != null ? this.indexToX(startI) : null;
      if (!Number.isFinite(x0)) return;
      x0 = Math.max(rect.l, Math.min(x0, rect.r - 40));
      const yA = this.priceToY(neck);
      const yB = this.priceToY(+p.target);
      if (!Number.isFinite(yA) || !Number.isFinite(yB)) return;
      const top = Math.min(yA, yB);
      const h = Math.abs(yB - yA);
      if (h < 3) return;
      const up = +p.target >= neck;
      const line = up ? 'rgba(34,197,94,.8)' : 'rgba(239,68,68,.8)';
      const w = Math.max(0, rect.r - x0);
      ctx.save();
      ctx.fillStyle = up ? 'rgba(34,197,94,.1)' : 'rgba(239,68,68,.1)';
      ctx.fillRect(x0, top, w, h);
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1.3;
      ctx.strokeRect(x0, top, w, h);
      ctx.setLineDash([]);
      const label = `TARGET ${fmtPrice(+p.target)}`;
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      const tw = ctx.measureText(label).width;
      const ly = Math.max(rect.t + 11, top - 4);
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = line;
      ctx.fillRect(x0 + 4, ly - 10, tw + 8, 14);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#081018';
      ctx.fillText(label, x0 + 8, ly);
      ctx.restore();
    });
  },

  /** Elliott wave count — labels the impulse pivots 0-5 and projects wave 5's Fib target. */
  drawWaves(ctx, signal) {
    const m = this.map;
    const ind = signal._indicators || {};
    const w = signal._waves !== undefined ? signal._waves : signal.waves;
    if (!m || !ind.wave || !w || !Array.isArray(w.labels) || w.labels.length < 2) return;
    const pts = w.labels
      .map((p) => ({ x: this.indexToX(p.i), y: this.priceToY(p.price), wave: p.wave, live: !!p.live }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y));
    if (pts.length < 2) return;
    const rect = {
      l: m.pad.l,
      r: m.W - m.pad.r,
      t: m.pad.t,
      b: m.priceBottom != null ? m.priceBottom : m.H - m.pad.b
    };
    const col = w.up ? 'rgba(34,197,94,0.95)' : 'rgba(239,68,68,0.95)';
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.l, rect.t, rect.r - rect.l, rect.b - rect.t);
    ctx.clip();
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    pts.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#0b1620';
      ctx.fill();
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      const tw = ctx.measureText(p.wave).width;
      const bx = p.x + 5;
      const by = p.y - 7;
      ctx.fillStyle = p.live ? '#fbbf24' : col;
      ctx.fillRect(bx - 2, by - 9, tw + 6, 12);
      ctx.fillStyle = '#08131b';
      ctx.fillText(p.wave, bx + 1, by);
    });
    // Fib-extension target for the live/final wave 5.
    if (Number.isFinite(+w.target)) {
      const last = pts[pts.length - 1];
      const ty = this.priceToY(+w.target);
      if (Number.isFinite(ty) && ty >= rect.t && ty <= rect.b) {
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = col;
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(rect.r, ty);
        ctx.stroke();
        ctx.setLineDash([]);
        const label = `${w.complete ? 'W5 DONE · WATCH' : 'W5 TARGET'} ${fmtPrice(+w.target)}`;
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        const tw = ctx.measureText(label).width;
        ctx.fillStyle = col;
        ctx.fillRect(rect.r - tw - 10, ty - 15, tw + 8, 13);
        ctx.fillStyle = '#08131b';
        ctx.fillText(label, rect.r - tw - 6, ty - 5);
      }
    }
    ctx.restore();
  },

  /** Draws the classic chart patterns detected by the analysis engine. */
  drawPatterns(ctx, signal) {
    const m = this.map;
    const patterns = signal._patterns || signal.patterns || [];
    if (!m || !patterns.length) return;
    const placed = [];
    patterns.forEach((p, idx) => {
      const focused = signal._focusPattern != null && signal._focusPattern === idx;
      const color = this.patternColor(p.bias);
      const pts = (p.polyline || [])
        .map((pt) => ({ x: this.indexToX(pt.i), y: this.priceToY(pt.price) }))
        .filter((pt) => Number.isFinite(pt.x) && Number.isFinite(pt.y));
      const inView = pts.filter((pt) => pt.x >= m.pad.l - 60 && pt.x <= m.W - m.pad.r + 60);
      if (inView.length < 2) return;

      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = focused ? 2.8 : idx === 0 ? 2 : 1.4;
      if (focused) ctx.shadowColor = color;
      if (focused) ctx.shadowBlur = 8;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      inView.forEach((pt, k) => { if (k === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
      ctx.stroke();
      ctx.setLineDash([]);
      inView.forEach((pt) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      if (idx < 3 || focused) {
        const last = inView[inView.length - 1];
        ctx.font = 'bold 11px Outfit, sans-serif';
        const tw = ctx.measureText(p.name).width;
        const lx = Math.max(m.pad.l + 4, Math.min(last.x + 8, m.W - m.pad.r - tw - 12));
        let ly = Math.max(m.pad.t + 14, last.y - 8);
        // stagger labels so nearby patterns don't print on top of each other
        const boxAt = (y) => ({ x: lx - 5, y: y - 11, w: tw + 10, h: 15 });
        const hits = (b) => placed.some((r) => b.x < r.x + r.w + 3 && b.x + b.w + 3 > r.x
          && b.y < r.y + r.h + 2 && b.y + b.h + 2 > r.y);
        for (let guard = 0; guard < 12 && hits(boxAt(ly)); guard++) ly += 17;
        if (ly > (m.priceBottom != null ? m.priceBottom : m.H - m.pad.b) - 16) {
          ly = Math.max(m.pad.t + 14, last.y - 8);
          for (let guard = 0; guard < 12 && hits(boxAt(ly)); guard++) ly -= 17;
          ly = Math.max(m.pad.t + 14, ly);
        }
        placed.push(boxAt(ly));
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = color;
        ctx.fillRect(lx - 5, ly - 11, tw + 10, 15);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#081018';
        ctx.fillText(p.name, lx, ly);
      }
      ctx.restore();
    });
  },

  /** Stop level for a risk/reward zone: its own SL, else the signal SL, else a 1:1 mirror. */
  zoneStop(d, signal) {
    if (!d || !d.a || !d.b) return null;
    const entry = +d.a.price;
    const target = +d.b.price;
    if (!Number.isFinite(entry) || !Number.isFinite(target)) return null;
    if (d.sl != null && Number.isFinite(+d.sl)) return +d.sl;
    const up = target >= entry;
    const sigSl = signal && Number.isFinite(+signal.sl) ? +signal.sl : null;
    if (sigSl != null && ((up && sigSl < entry) || (!up && sigSl > entry))) return sigSl;
    const risk = Math.abs(target - entry) || Math.abs(entry) * 0.01 || 1;
    return up ? entry - risk : entry + risk;
  },

  /** Draws the user's manual analysis tools (trend / ray / extended line, fib, zones…). */
  drawDrawings(ctx, signal) {
    const m = this.map;
    const list = signal._drawings || [];
    if (!m || !list.length) return;
    const Y = (p) => this.priceToY(p);
    const rect = { l: m.pad.l, r: m.W - m.pad.r, t: m.pad.t, b: m.priceBottom != null ? m.priceBottom : m.H - m.pad.b };
    const selectedId = signal._selectedId;

    for (const d of list) {
      if (!d || !d.type) continue;
      const selected = selectedId != null && d.id === selectedId;
      const stroke = d._preview ? 'rgba(148,163,184,.85)' : selected ? '#f0b429' : 'rgba(56,189,248,.95)';
      ctx.save();
      ctx.strokeStyle = stroke;
      ctx.fillStyle = stroke;
      ctx.lineWidth = selected ? 2.2 : 1.6;
      ctx.font = '11px JetBrains Mono, monospace';

      if (d.type === 'hline') {
        const y = Y(d.a && d.a.price);
        if (!Number.isFinite(y)) { ctx.restore(); continue; }
        ctx.beginPath();
        ctx.moveTo(rect.l, y);
        ctx.lineTo(rect.r, y);
        ctx.stroke();
        ctx.fillText(fmtPrice(d.a.price), rect.r + 4, y + 3);
        if (selected && !d._preview) this.handles(ctx, [[rect.l + 16, y], [rect.r - 16, y]], stroke);
        ctx.restore();
        continue;
      }

      if (d.type === 'path') {
        const pts = (d.pts || []).slice();
        if (d.cursor && d._preview) pts.push(d.cursor);
        const scr = pts
          .map((pt) => ({ x: this.indexToX(pt.i), y: Y(pt.price) }))
          .filter((pt) => Number.isFinite(pt.x) && Number.isFinite(pt.y));
        if (scr.length < 2) { ctx.restore(); continue; }
        ctx.lineWidth = selected ? 2.6 : 2;
        ctx.beginPath();
        scr.forEach((pt, k) => { if (k === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
        ctx.stroke();
        // arrow head on the final segment
        if (!d._preview) {
          const a = scr[scr.length - 2];
          const b = scr[scr.length - 1];
          const ang = Math.atan2(b.y - a.y, b.x - a.x);
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x - 9 * Math.cos(ang - 0.42), b.y - 9 * Math.sin(ang - 0.42));
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x - 9 * Math.cos(ang + 0.42), b.y - 9 * Math.sin(ang + 0.42));
          ctx.stroke();
        }
        scr.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, selected ? 4 : 3, 0, Math.PI * 2);
          ctx.fill();
        });
        if (!d._preview) {
          const last = scr[scr.length - 1];
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          const label = 'FORECAST';
          const tw = ctx.measureText(label).width;
          const lx = Math.max(rect.l + 4, Math.min(last.x + 8, rect.r - tw - 8));
          ctx.fillStyle = stroke;
          ctx.fillRect(lx - 4, last.y - 22, tw + 8, 14);
          ctx.fillStyle = '#081018';
          ctx.fillText(label, lx, last.y - 11);
        }
        if (selected && !d._preview) this.handles(ctx, scr.map((pt) => [pt.x, pt.y]), stroke);
        ctx.restore();
        continue;
      }

      if (!d.a || !d.b) { ctx.restore(); continue; }
      const x1 = this.indexToX(d.a.i);
      const y1 = Y(d.a.price);
      const x2 = this.indexToX(d.b.i);
      const y2 = Y(d.b.price);
      if (![x1, y1, x2, y2].every(Number.isFinite)) { ctx.restore(); continue; }
      const dx = x2 - x1;
      const dy = y2 - y1;

      if (d.type === 'zone') {
        // risk/reward zone: green from entry to target, red from entry to stop
        const entry = +d.a.price;
        const target = +d.b.price;
        const stop = this.zoneStop(d, signal);
        const yEntry = Y(entry);
        const yTarget = Y(target);
        const yStop = Y(stop);
        if (![yEntry, yTarget, yStop].every(Number.isFinite)) { ctx.restore(); continue; }
        const left = Math.max(Math.min(x1, x2), rect.l);
        const right = rect.r;
        const w = Math.max(2, right - left);
        const up = target >= entry;
        const rTop = Math.min(yEntry, yTarget);
        const rH = Math.max(2, Math.abs(yTarget - yEntry));
        const sTop = Math.min(yEntry, yStop);
        const sH = Math.max(2, Math.abs(yStop - yEntry));
        const alpha = d._preview ? 0.07 : 0.13;
        const reward = up ? 'rgba(34,197,94,.95)' : 'rgba(34,197,94,.85)';
        const risk = 'rgba(239,68,68,.95)';
        ctx.fillStyle = `rgba(34,197,94,${alpha})`;
        ctx.fillRect(left, rTop, w, rH);
        ctx.fillStyle = `rgba(239,68,68,${alpha})`;
        ctx.fillRect(left, sTop, w, sH);
        ctx.setLineDash([6, 4]);
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = reward;
        ctx.strokeRect(left, rTop, w, rH);
        ctx.strokeStyle = risk;
        ctx.strokeRect(left, sTop, w, sH);
        ctx.setLineDash([5, 4]);
        ctx.strokeStyle = d._preview ? 'rgba(148,163,184,.8)' : 'rgba(56,189,248,.9)';
        ctx.beginPath();
        ctx.moveTo(left, yEntry);
        ctx.lineTo(right, yEntry);
        ctx.stroke();
        ctx.setLineDash([]);
        if (!d._preview) {
          const riskDist = Math.abs(entry - stop);
          const rr = riskDist > 0 ? Math.abs(target - entry) / riskDist : 0;
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          const badge = `R:R 1:${rr.toFixed(2)}`;
          const bw = ctx.measureText(badge).width + 10;
          const by = Math.max(rect.t + 11, Math.min(rTop, sTop) + 12);
          ctx.fillStyle = 'rgba(8,16,24,.85)';
          ctx.fillRect(left + 3, by - 10, bw, 14);
          ctx.strokeStyle = 'rgba(148,163,184,.45)';
          ctx.lineWidth = 1;
          ctx.strokeRect(left + 3, by - 10, bw, 14);
          ctx.fillStyle = '#e2e8f0';
          ctx.fillText(badge, left + 8, by);
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillStyle = reward;
          ctx.fillText(`TP ${fmtPrice(target)}`, left + 6, up ? rTop + 12 : rTop + rH - 4);
          ctx.fillStyle = risk;
          ctx.fillText(`SL ${fmtPrice(stop)}`, left + 6, up ? sTop + sH - 4 : sTop + 12);
          ctx.fillStyle = 'rgba(56,189,248,.95)';
          const et = `ENTRY ${fmtPrice(entry)}`;
          const etw = ctx.measureText(et).width;
          ctx.fillText(et, right - etw - 4, yEntry - 4);
        }
        if (selected && !d._preview) {
          this.handles(ctx, [[x1, y1], [x2, y2], [x2, yStop]], stroke);
        }
        ctx.restore();
        continue;
      }
      if (d.type === 'target') {
        // entry level (first click) → target level (second click), projected forward to the edge
        const up = d.b.price >= d.a.price;
        const left = Math.max(Math.min(x1, x2), rect.l);
        const yTop = Math.min(y1, y2);
        const yBot = Math.max(y1, y2);
        const boxW = Math.max(0, rect.r - left);
        if (yBot - yTop >= 3 && boxW >= 2) {
          const edge = up ? 'rgba(34,197,94,.9)' : 'rgba(239,68,68,.9)';
          ctx.fillStyle = up ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)';
          ctx.fillRect(left, yTop, boxW, yBot - yTop);
          ctx.setLineDash([6, 4]);
          ctx.strokeStyle = edge;
          ctx.beginPath();
          ctx.rect(left, yTop, boxW, yBot - yTop);
          ctx.stroke();
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(left, y1);
          ctx.lineTo(rect.r, y1);
          ctx.moveTo(left, y2);
          ctx.lineTo(rect.r, y2);
          ctx.stroke();
          ctx.setLineDash([]);
          if (!d._preview) {
            ctx.font = '10px JetBrains Mono, monospace';
            ctx.fillStyle = 'rgba(148,163,184,.95)';
            ctx.fillText(`ENTRY ${fmtPrice(d.a.price)}`, left + 4, y1 - 3);
            const label = `TARGET ${fmtPrice(d.b.price)}`;
            ctx.font = 'bold 10px JetBrains Mono, monospace';
            const tw = ctx.measureText(label).width;
            const ly = Math.max(rect.t + 11, yTop + 12);
            ctx.fillStyle = edge;
            ctx.fillRect(left + 4, ly - 10, tw + 8, 14);
            ctx.fillStyle = '#081018';
            ctx.fillText(label, left + 8, ly);
          }
        }
      } else if (d.type === 'fib') {
        const hi = Math.max(d.a.price, d.b.price);
        const lo = Math.min(d.a.price, d.b.price);
        const left = Math.min(x1, x2);
        const right = Math.max(x1, x2);
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = 'rgba(148,163,184,.4)';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
        FIB_RATIOS.forEach((r, k) => {
          const price = hi - (hi - lo) * r;
          const y = Y(price);
          if (!Number.isFinite(y)) return;
          ctx.strokeStyle = FIB_COLORS[k];
          ctx.fillStyle = FIB_COLORS[k];
          ctx.setLineDash(r === 0 || r === 1 ? [] : [5, 4]);
          ctx.beginPath();
          ctx.moveTo(left, y);
          ctx.lineTo(right, y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillText(`${(r * 100).toFixed(1)}%  ${fmtPrice(price)}`, left + 3, y - 3);
        });
      } else {
        // trend = segment · ray = forward only · ext = both directions
        let sx = x1; let sy = y1; let ex = x2; let ey = y2;
        if (d.type === 'ext' || d.type === 'ray') {
          const span = (d.type === 'ext' ? clipLine : raySpan)(x1, y1, dx, dy, rect);
          if (span) {
            sx = x1 + dx * span[0];
            sy = y1 + dy * span[0];
            ex = x1 + dx * span[1];
            ey = y1 + dy * span[1];
          }
        }
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      if (!d._preview) {
        ctx.fillStyle = stroke;
        [[x1, y1], [x2, y2]].forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, selected ? 4 : 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      if (selected && !d._preview) this.handles(ctx, [[x1, y1], [x2, y2]], stroke);
      ctx.restore();
    }
  },

  /** Grip handles shown on the selected drawing so its ends can be dragged. */
  handles(ctx, pts, color) {
    pts.forEach(([x, y]) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#0b1620';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.restore();
    });
  }
};
