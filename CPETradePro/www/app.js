/* CPE Trade Pro — complete renderer + multi-language */
const state = {
  market: 'SPOT',
  spotResults: [],
  futResults: [],
  fxResults: [],
  spotBb: [],
  futBb: [],
  fxBb: [],
  spotSelected: null,
  futSelected: null,
  fxSelected: null,
  mtfResults: [],
  mtfMarket: 'SPOT',
  scalpResults: [],
  scalpMarket: 'SPOT',
  autoScan: false,
  watch: [],
  currentView: 'spot',
  editTradeId: null,
  platforms: [],
  labPairs: [],
  labPairsPromise: null,
  labSignal: null,
  labDrawings: [],
  labTool: 'none',
  labDrag: null,
  labSelectedId: null,
  labEdit: null,
  labPan: null,
  labPanOffset: 0,
  labSelectedCandle: null,
  labMtf: null,
  labShowTargets: true,
  labFuture: true,
  labForecast: true,
  labPlain: false,
  labPatternFilter: 'all',
  labFocusPattern: null,
  labFilteredPatterns: [],
  // Chart Lab indicator toggles — RSI on by default so the pane is visible
  // straight away; the rest stay off until the user ticks them.
  labIndicators: { rsi: true, macd: false, volume: false, ema: false, sma50: false, bb: true, stoch: false, adx: false, ichimoku: false, vwap: false, wave: false },
  // TradingView-style chart controls.
  labChartType: 'candles', // candles | heikin | bars | line | area
  labLog: false,           // logarithmic price scale
  labHover: null,          // { x, y, local } crosshair position
  labMeasure: null,        // { a:{i,price}, b:{i,price} } measure tool read-out
  labMeasureDrag: false,
  labPath: null,
  labLivePrice: null,
  labLivePrev: null,
  demoMode: true,
  platformKeySaved: {},
  prices: { month3Usd: 15, lifetimeUsd: 100 },
  demoExpired: false,
  deskPairs: { SPOT: [], FUTURES: [], FOREX: [] },
  // Recently-listed coins per desk (symbol + listing date + signal), refreshed
  // on every scan. Used to show the "New" panel and the NEW badge in tables.
  newListings: { SPOT: [], FUTURES: [] },
  // Coins Binance has announced but not listed yet (from its announcement feed):
  // symbol + listing time + which desk (SPOT/FUTURES). Refreshed on every scan.
  upcomingListings: { SPOT: [], FUTURES: [] },
  deskScanBusy: false,
  license: null,
  popupSignal: null,
  tradeSignal: null,
  lastResultAt: '',
  slMarket: 'SPOT',
  slChartMode: 'live',
  posTab: 'LIVE',
  jrTab: 'LIVE',
  posDetailId: null,
  posDetailSrc: null
};

function $(id) { return document.getElementById(id); }
function t(key) { return window.CPE_I18N ? window.CPE_I18N.t(key) : key; }

const VIEW_KEYS = {
  spot: ['spot_title', 'spot_sub'],
  futures: ['fut_title', 'fut_sub'],
  forex: ['forex_title', 'forex_sub'],
  chartlab: ['chartlab_title', 'chartlab_sub'],
  trade: ['trade_title', 'trade_sub'],
  positions: ['pos_title', 'pos_sub'],
  livehelp: ['livehelp_title', 'livehelp_sub'],
  news: ['news_title', 'news_sub'],
  learn: ['learn_title', 'learn_sub'],
  journal: ['journal_title', 'journal_sub'],
  signallab: ['signallab_title', 'signallab_sub'],
  keys: ['keys_title', 'keys_sub'],
  help: ['help_title', 'help_sub'],
  license: ['license_title', 'license_sub'],
  'owner-tools': ['owner_title', 'owner_sub']
};

function refreshViewTitles() {
  const keys = VIEW_KEYS[state.currentView] || VIEW_KEYS.spot;
  $('view-title').textContent = t(keys[0]);
  $('view-sub').textContent = t(keys[1]);
  if (state.autoScan) $('auto-scan-btn').textContent = `${t('auto_scan_off')} · 15m`;
  else $('auto-scan-btn').textContent = `${t('auto_scan_on')} · 15m`;
}

function refreshHelpLang() {
  document.querySelectorAll('[data-i18n-html="help_html"]').forEach((el) => {
    el.innerHTML = priceTokens(t('help_html'));
  });
  if ($('help-plat-h')) $('help-plat-h').textContent = t('help_plat_h');
  if ($('help-plat-sel')) $('help-plat-sel').textContent = t('help_plat_sel');
  const hid = $('help-platform')?.value || 'BINANCE';
  showPlatformGuide(hid, 'help-api-title', 'help-api-body');
}

function forceRenderLearn() {
  // Force dropdown rebuild so module/platform titles follow language
  const mod = $('learn-module');
  const plat = $('learn-platform');
  if (mod) delete mod.dataset.lang;
  if (plat) delete plat.dataset.lang;
  try { renderLearn(); } catch { /* learn UI may not be ready yet */ }
}

let langReady = false;
window.onCpeLangChange = () => {
  refreshViewTitles();
  refreshKeys();
  refreshLicenseView();
  applyPricesEverywhere();
  refreshHelpLang();
  forceRenderLearn();
  syncDemoUi();
  // Re-filter pair lists (CJK tickers only when Japanese UI is on)
  loadPairCounts();
  ['SPOT', 'FUTURES', 'FOREX'].forEach((m) => {
    try { renderTable(m); fillDeskPairSelect(m, deskIds(m).type && $(deskIds(m).type)?.value); } catch { /* ignore */ }
  });
  if (langReady) toast(t('lang_synced_title'), t('lang_synced_body'), false);
  langReady = true;
  if (!$('tour-overlay')?.classList.contains('hidden')) renderTourStep();
  syncNotifButton();
  try {
    syncTradeFieldVisibility('tr');
    syncTradeFieldVisibility('auto');
  } catch { /* forms may not be ready */ }
  if (state.currentView === 'spot') {
    renderBb('spot-bb-list', state.spotBb, 'SPOT');
    renderUpcoming(state.upcomingListings.SPOT, 'SPOT');
    renderNewList(state.spotResults.length ? (state.newListings.SPOT || []) : [], 'SPOT');
    refreshWatch();
  }
  if (state.currentView === 'futures') {
    renderUpcoming(state.upcomingListings.FUTURES, 'FUTURES');
    renderNewList(state.newListings.FUTURES || [], 'FUTURES');
  }
  if (state.currentView === 'news' && newsCache) renderNewsList(newsTab);
};

const DEMO_KEY = 'cpe_demo_mode_v1';
const DEMO_START_KEY = 'cpe_demo_started_at';
const DEMO_PAID_START_KEY = 'cpe_demo_paid_started_at';
const DEMO_FREE_MS = 7 * 24 * 60 * 60 * 1000; // unpaid / trial: 7 days DEMO
const DEMO_PAID_MS = 90 * 24 * 60 * 60 * 1000; // paid activation: 3 months DEMO
let demoRemindTimer = null;

function isPaidLicense(s) {
  const m = (s || state.license || {}).mode;
  return m === 'LIFETIME' || m === 'FULL' || m === 'MONTH3' || m === 'MONTH3_GRACE';
}

function canUseLiveHelp(s) {
  const st = s || state.license || {};
  // Paid users (even after DEMO ends) + active trial
  return isPaidLicense(st) || st.mode === 'TRIAL';
}

function ensureDemoStartClock() {
  try {
    if (!localStorage.getItem(DEMO_START_KEY)) {
      localStorage.setItem(DEMO_START_KEY, String(Date.now()));
    }
  } catch { /* ignore */ }
}

function markPaidDemoStart() {
  try {
    localStorage.setItem(DEMO_PAID_START_KEY, String(Date.now()));
    // refresh free clock too so strip counts from purchase
    localStorage.setItem(DEMO_START_KEY, String(Date.now()));
    localStorage.setItem(DEMO_KEY, '1');
  } catch { /* ignore */ }
  state.demoExpired = false;
  state.demoMode = true;
}

function isDemoPeriodExpired() {
  try {
    ensureDemoStartClock();
    const s = state.license || {};
    const paid = isPaidLicense(s);
    const freeStart = +localStorage.getItem(DEMO_START_KEY) || Date.now();

    if (!paid) {
      // No purchase: DEMO ends at earlier of 7 days OR trial end
      if (s.mode === 'TRIAL_EXPIRED' || s.reason === 'TRIAL_EXPIRED') return true;
      let end = freeStart + DEMO_FREE_MS;
      if (s.mode === 'TRIAL' && s.trial?.endsAt) {
        const trialEnd = new Date(s.trial.endsAt).getTime();
        if (!Number.isNaN(trialEnd)) end = Math.min(end, trialEnd);
      }
      // Not in trial and not paid (blocked / inactive) after free window
      if (s.mode && s.mode !== 'TRIAL' && Date.now() - freeStart >= DEMO_FREE_MS) return true;
      return Date.now() >= end;
    }

    // Paid activation: DEMO practice for 3 months from purchase mark
    const paidStart = +localStorage.getItem(DEMO_PAID_START_KEY) || freeStart;
    return Date.now() - paidStart >= DEMO_PAID_MS;
  } catch {
    return false;
  }
}

function demoDaysLeft() {
  try {
    ensureDemoStartClock();
    const s = state.license || {};
    const paid = isPaidLicense(s);
    const freeStart = +localStorage.getItem(DEMO_START_KEY) || Date.now();
    let end;
    if (paid) {
      const paidStart = +localStorage.getItem(DEMO_PAID_START_KEY) || freeStart;
      end = paidStart + DEMO_PAID_MS;
    } else {
      end = freeStart + DEMO_FREE_MS;
      if (s.mode === 'TRIAL' && s.trial?.endsAt) {
        const trialEnd = new Date(s.trial.endsAt).getTime();
        if (!Number.isNaN(trialEnd)) end = Math.min(end, trialEnd);
      }
    }
    return Math.max(0, Math.ceil((end - Date.now()) / 86400000));
  } catch {
    return 7;
  }
}

function loadDemoModePref() {
  ensureDemoStartClock();
  state.demoExpired = isDemoPeriodExpired();
  try {
    const v = localStorage.getItem(DEMO_KEY);
    if (state.demoExpired) state.demoMode = false;
    else if (v === '0') state.demoMode = false;
    else state.demoMode = true;
  } catch {
    state.demoMode = !state.demoExpired;
  }
}

function saveDemoModePref() {
  try { localStorage.setItem(DEMO_KEY, state.demoMode ? '1' : '0'); } catch { /* ignore */ }
}

function syncDemoUi() {
  const demo = !!state.demoMode;
  document.body.classList.toggle('mode-demo', demo);
  document.body.classList.toggle('mode-live', !demo);
  $('mode-demo')?.classList.toggle('active', demo);
  $('mode-live')?.classList.toggle('active', !demo);
  if ($('mode-demo')) {
    $('mode-demo').disabled = !!state.demoExpired;
    $('mode-demo').title = state.demoExpired ? t('demo_expired_title') : 'DEMO practice';
  }
  const strip = $('demo-strip');
  if (strip) {
    strip.classList.toggle('hidden', false);
    if ($('demo-strip-title')) {
      $('demo-strip-title').textContent = state.demoExpired
        ? t('demo_expired_title')
        : (demo ? t('demo_strip_title') : t('live_strip_title'));
    }
    if ($('demo-strip-body')) {
      const refTip = t('demo_ref_tip') || 'Referral: License → share code · max +365 days · owner keys only.';
      $('demo-strip-body').textContent = state.demoExpired
        ? `${t('demo_expired_body')} · ${refTip}`
        : (demo
          ? `${t('demo_strip_body')} · ${t('demo_days_left').replace('{d}', String(demoDaysLeft()))} · ${refTip}`
          : `${t('live_strip_body')} · ${refTip}`);
    }
  }
  if ($('tr-submit')) {
    $('tr-submit').textContent = demo ? t('demo_trade_btn') : t('place_live');
  }
  if ($('tr-paper')) {
    $('tr-paper').textContent = t('paper');
    $('tr-paper').classList.toggle('hidden', !demo || state.demoExpired);
  }
  scheduleDemoApiReminders();
  syncLiveHelpAccess();
  updatePlatformBranding();
}

function syncLiveHelpAccess() {
  const ok = canUseLiveHelp();
  const nav = document.querySelector('.nav-btn[data-view="livehelp"]');
  const fab = $('fab-livehelp');
  const panel = $('view-livehelp');
  nav?.classList.toggle('livehelp-locked', !ok);
  if (fab) {
    fab.classList.toggle('hidden', !ok);
    fab.title = ok ? 'Live Help' : 'Live Help — buy activation / active trial required';
  }
  let note = $('livehelp-lock-note');
  if (panel && !ok) {
    if (!note) {
      note = document.createElement('p');
      note.id = 'livehelp-lock-note';
      note.className = 'livehelp-lock-note';
      panel.prepend(note);
    }
    note.textContent = t('livehelp_locked_body') || 'Live Help unlocks with an active trial or after you buy an activation key. Paid users keep Live Help after DEMO ends (DEMO = 3 months for paid).';
  } else {
    note?.remove();
  }
}

async function setDemoMode(on) {
  if (on && isDemoPeriodExpired()) {
    state.demoExpired = true;
    state.demoMode = false;
    saveDemoModePref();
    syncDemoUi();
    toast(t('demo_expired_title'), t('demo_expired_body'));
    return;
  }
  if (!on) {
    // switching to LIVE — require any saved platform key
    let hasKey = false;
    try {
      const plats = state.platforms?.length ? state.platforms : await window.cpe.platforms();
      for (const p of plats) {
        if (p.id === 'FOREX_DEMO') continue;
        const st = await window.cpe.keysStatus(p.id);
        if (st?.saved) { hasKey = true; break; }
      }
    } catch { /* ignore */ }
    if (!hasKey) {
      toast(t('demo_need_key_title'), t('demo_need_key_body'));
      document.querySelector('.nav-btn[data-view="keys"]')?.click();
      state.demoMode = true;
      saveDemoModePref();
      syncDemoUi();
      return;
    }
  }
  state.demoMode = !!on;
  saveDemoModePref();
  syncDemoUi();
  try {
    await window.cpe.setAuto({ forcePaper: !!state.demoMode });
  } catch { /* ignore */ }
  try { refreshAuto(false); } catch { /* ignore */ }
  toast(
    on ? t('demo_on_title') : t('live_on_title'),
    on ? t('demo_on_body') : t('live_on_body')
  );
  if (on) remindDemoApiKey(true);
}

function remindDemoApiKey(force) {
  if (!state.demoMode && !force) return;
  if (!notifEnabled) return;
  toast(t('demo_api_remind_title'), t('demo_api_remind_body'));
}

function scheduleDemoApiReminders() {
  if (demoRemindTimer) {
    clearInterval(demoRemindTimer);
    demoRemindTimer = null;
  }
  if (!state.demoMode) return;
  demoRemindTimer = setInterval(() => remindDemoApiKey(false), 6 * 60 * 1000);
}

function setupDemoMode() {
  loadDemoModePref();
  if (state.demoExpired) {
    state.demoMode = false;
    saveDemoModePref();
  }
  syncDemoUi();
  // Keep the main process in sync with the saved DEMO/LIVE mode on every app start.
  // Without this, a restart leaves the main process on its default (paper) mode
  // while the UI shows LIVE — auto trades go to paper, but manual trades go live.
  try { window.cpe.setAuto({ forcePaper: !!state.demoMode }); } catch { /* ignore */ }
  $('mode-demo')?.addEventListener('click', () => setDemoMode(true));
  $('mode-live')?.addEventListener('click', () => setDemoMode(false));
  $('demo-goto-keys')?.addEventListener('click', () => {
    document.querySelector('.nav-btn[data-view="keys"]')?.click();
    toast(t('demo_api_remind_title'), t('demo_api_remind_body'));
  });
  setTimeout(() => {
    if (state.demoExpired) toast(t('demo_expired_title'), t('demo_expired_body'));
    else if (state.demoMode) remindDemoApiKey(false);
  }, 12000);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function formatNum(n) {
  if (n == null || Number.isNaN(+n)) return '—';
  const x = +n;
  if (x >= 1000) return x.toFixed(2);
  if (x >= 1) return x.toFixed(4);
  if (x >= 0.0001) return x.toFixed(6);
  return x.toPrecision(4);
}

function playSound() {
  const a = $('alert-sound');
  if (!a) return;
  a.currentTime = 0;
  a.play().catch(() => {});
}

function playStrongSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const beep = (freq, at) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq;
      o.type = 'sine';
      g.gain.setValueAtTime(0.0001, ctx.currentTime + at);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + 0.28);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + at);
      o.stop(ctx.currentTime + at + 0.3);
    };
    beep(880, 0);
    beep(1175, 0.18);
  } catch { playSound(); }
}

/** HIGHER STRONG has its own alarm — three rising triangle beeps, clearly different from STRONG. */
function playHigherStrongSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const beep = (freq, at, dur) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq;
      o.type = 'triangle';
      g.gain.setValueAtTime(0.0001, ctx.currentTime + at);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + at);
      o.stop(ctx.currentTime + at + dur + 0.02);
    };
    beep(660, 0, 0.2);
    beep(990, 0.18, 0.2);
    beep(1320, 0.36, 0.4);
  } catch { playSound(); }
}

let notifEnabled = true;

/* Toast queue: show notifications one at a time so the screen is not flooded.
 * Each toast auto-closes and the next one appears after it.
 * On phones (window.CPE_TOAST_SWAP, set by the mobile shim) there is a single
 * slot instead: the newest notification swaps out the one on screen. */
let toastQueue = [];
let toastShowing = false;
let toastTimer = null;
const toastSwap = !!window.CPE_TOAST_SWAP;

function toastClass(kind) {
  return kind === 'higher-strong' ? 'toast toast-higher'
    : kind === 'strong' ? 'toast toast-strong'
    : kind === 'error' ? 'toast toast-error'
      : kind === 'api-key-reminder' ? 'toast toast-reminder'
        : 'toast';
}

function toastDuration(kind) {
  return (kind === 'higher-strong' || kind === 'strong'
    || kind === 'error' || kind === 'api-key-reminder') ? 12000 : 7000;
}

function playToastSound(kind) {
  if (kind === 'higher-strong') playHigherStrongSound();
  else if (kind === 'strong') playStrongSound();
  else playSound();
}

function paintToast(title, body, kind) {
  const stack = $('toast-stack');
  if (!stack) return false;
  if (toastSwap) stack.textContent = ''; // swap: the previous toast goes first
  const el = document.createElement('div');
  el.className = toastClass(kind);
  el.innerHTML = `<b>${escapeHtml(title)}</b><span>${escapeHtml(body || '')}</span>`;
  stack.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.remove();
    if (!toastSwap) setTimeout(dequeueToast, 250);
  }, toastDuration(kind));
  return true;
}

function dequeueToast() {
  if (!toastQueue.length) { toastShowing = false; return; }
  toastShowing = true;
  const { title, body, sound, kind } = toastQueue.shift();
  if (!paintToast(title, body, kind)) { toastShowing = false; return; }
  if (sound !== false) playToastSound(kind);
}

function toast(title, body, sound, kind) {
  // Notifications off means quiet — no toast, no sound, whatever the kind.
  if (!notifEnabled) return;
  if (!$('toast-stack')) return;
  if (toastSwap) {
    if (sound !== false) playToastSound(kind);
    paintToast(title, body, kind); // newest replaces whatever is on screen
    return;
  }
  toastQueue.push({ title, body, sound, kind });
  if (!toastShowing) dequeueToast();
}

function syncNotifButton() {
  const btn = $('notif-toggle');
  if (!btn) return;
  btn.textContent = notifEnabled ? t('notif_on') : t('notif_off');
  btn.classList.toggle('notif-off', !notifEnabled);
}

let notifUiReady = false;
async function initNotificationsToggle() {
  try {
    const s = await window.cpe.settingsGet();
    notifEnabled = s.notificationsEnabled !== false;
  } catch {
    notifEnabled = true;
  }
  syncNotifButton();
  if (notifUiReady) return;
  notifUiReady = true;
  $('notif-toggle')?.addEventListener('click', async () => {
    notifEnabled = !notifEnabled;
    await window.cpe.settingsSet({ notificationsEnabled: notifEnabled });
    syncNotifButton();
    if (notifEnabled) toast(t('notif_on'), t('notif_on_hint'), false);
  });
  $('shortcut-btn')?.addEventListener('click', async () => {
    const r = await window.cpe.createShortcuts();
    if (r.ok) toast(t('shortcuts_ok'), r.message || '', false);
    else toast(t('shortcuts_fail'), r.message || 'Failed', true);
  });
}

function tickClock() {
  $('live-clock').textContent = new Date().toLocaleString();
}

async function tickCandleEta() {
  try {
    const iv = $('interval-select').value;
    const eta = await window.cpe.candleEta(iv);
    const sec = Math.floor(eta.remainingMs / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    $('candle-eta').textContent = `${iv} close: ${m}m ${s}s`;
    if (notifEnabled && sec <= 300 && sec > 295) playSound();
  } catch {}
}

async function initLicenseGate() {
  const status = await window.cpe.licenseStatus();
  const mid = status.machineId || await window.cpe.machineId();
  $('machine-id').textContent = mid;
  if ($('lic-machine')) $('lic-machine').textContent = mid;

  $('wa-link').onclick = (e) => {
    e.preventDefault();
    window.cpe.openExternal('https://wa.me/94774940944');
  };
  $('copy-machine').onclick = async () => {
    try {
      await navigator.clipboard.writeText(mid);
      $('license-msg').textContent = t('copied_mid');
    } catch {
      $('license-msg').textContent = mid;
    }
  };
  $('activate-btn').onclick = async () => {
    const gateRef = $('gate-ref-code')?.value?.trim();
    if (gateRef) {
      const ap = await window.cpe.referralApply(gateRef, !!$('gate-ref-human')?.checked);
      if (!ap.ok) {
        $('license-msg').textContent = ap.message || 'Referral failed';
        return;
      }
    }
    const res = await window.cpe.activateLicense($('license-input').value.trim());
    if (!res.ok) {
      $('license-msg').textContent = res.message || t('activate_fail');
      if (res.locked) {
        toast(t('guard_locked_title'), t('guard_locked_body'), false, 'error');
      } else if (res.strikesLeft != null) {
        toast(t('guard_warn_title'), t('guard_warn_body').replace('{left}', String(res.strikesLeft)), false, 'error');
      }
      return;
    }
    // Paid key → 3-month DEMO window starts now; Live Help stays available
    markPaidDemoStart();
    showApp(res.status);
    if (res.referralProof) {
      toast(t('ref_proof_ready_title') || 'Referral proof ready', t('ref_proof_ready_body') || 'Send the proof to your referrer (License → Referral).');
    }
    toast(t('demo_paid_start_title') || 'DEMO 3 months', t('demo_paid_start_body') || 'Activation OK. DEMO practice for 3 months. Live Help unlocked.');
  };
  $('start-trial-btn')?.addEventListener('click', async () => {
    const gateRef = $('gate-ref-code')?.value?.trim();
    if (gateRef) {
      const ap = await window.cpe.referralApply(gateRef, !!$('gate-ref-human')?.checked);
      if (!ap.ok) {
        $('trial-gate-msg').textContent = ap.message || 'Referral failed';
        return;
      }
    }
    const res = await window.cpe.startTrial();
    if (!res.ok) {
      $('trial-gate-msg').textContent = res.message || 'Trial not available';
      showBuyBox(res.status || status);
      return;
    }
    showApp(res.status);
    if (res.referralProof) {
      toast(t('ref_proof_ready_title') || 'Referral proof ready', t('ref_proof_ready_body') || 'Send the proof to your referrer (License → Referral).');
    }
  });
  $('buy-currency')?.addEventListener('change', () => refreshBuyPrice());

  if (status.allowed) showApp(status);
  else {
    $('license-gate').classList.remove('hidden');
    $('app').classList.add('hidden');
    if (status.message) $('license-msg').textContent = status.message;
    if (
      status.mode === 'TRIAL_EXPIRED' ||
      status.reason === 'TRIAL_EXPIRED' ||
      status.mode === 'MONTH3_EXPIRED' ||
      status.reason === 'MONTH3_EXPIRED'
    ) {
      showBuyBox(status);
      $('trial-box')?.classList.add('hidden');
    } else if (status.canStartTrial) {
      $('trial-box')?.classList.remove('hidden');
      $('buy-box')?.classList.add('hidden');
    } else {
      $('trial-box')?.classList.add('hidden');
    }
  }
}

function showBuyBox(status) {
  $('buy-box')?.classList.remove('hidden');
  $('trial-box')?.classList.add('hidden');
  const m3 = status?.month3Usd || status?.publicConfig?.month3Usd || state.prices.month3Usd || 15;
  const life = status?.lifetimeUsd || status?.priceUsd || status?.publicConfig?.lifetimeUsd || state.prices.lifetimeUsd || 100;
  setAppPrices(m3, life);
  if ($('buy-price-line')) {
    $('buy-price-line').textContent = status?.message || priceTokens(t('buy_choose_plan'));
  }
  if ($('buy-m3-price')) $('buy-m3-price').innerHTML = `<strong>USD ${m3}</strong>`;
  if ($('buy-life-price')) $('buy-life-price').innerHTML = `<strong>USD ${life}</strong>`;
  refreshBuyPrice();
  fillPaymentMethods(status?.owner || status?.publicConfig);
  renderPublicFaq(status?.publicConfig?.faq);
}

async function fillPaymentMethods(ownerFromStatus) {
  let owner = ownerFromStatus;
  if (!owner?.payments) {
    try { owner = await window.cpe.owner(); } catch { owner = null; }
  }
  const p = owner?.payments || {};
  const bank = p.bank || 'Bank / Wire — WhatsApp for account';
  const binance = p.binance || 'Binance USDT / Pay — WhatsApp for UID';
  const paypal = p.paypal || `PayPal — ${owner?.email || 'Anurasiri123@gmail.com'}`;
  if ($('pay-bank')) $('pay-bank').textContent = bank;
  if ($('pay-binance')) $('pay-binance').textContent = binance;
  if ($('pay-paypal')) $('pay-paypal').textContent = paypal;
  if ($('lic-pay-bank')) $('lic-pay-bank').textContent = bank;
  if ($('lic-pay-binance')) $('lic-pay-binance').textContent = binance;
  if ($('lic-pay-paypal')) $('lic-pay-paypal').textContent = paypal;
  if ($('lic-lifetime-note') && owner?.lifetimeLabel) {
    $('lic-lifetime-note').textContent = owner.lifetimeLabel;
  }
}

function renderPublicFaq(faq) {
  const el = $('public-faq-list');
  if (!el) return;
  const list = Array.isArray(faq) ? faq : [];
  if (!list.length) {
    el.innerHTML = '<p class="tiny">Owner can publish FAQ from Owner Tools.</p>';
    return;
  }
  el.innerHTML = list.map((f) =>
    `<details><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`
  ).join('');
}

function applyUpdateBanner(cfg) {
  const el = $('update-banner');
  if (!el) return;
  if (cfg?.update?.enabled && (cfg.update.title || cfg.update.body)) {
    el.classList.remove('hidden');
    el.innerHTML = `<strong>Update ${escapeHtml(cfg.update.version || '')}</strong> — ${escapeHtml(cfg.update.title || '')}<br/>${escapeHtml(cfg.update.body || '')}`;
  } else {
    el.classList.add('hidden');
    el.innerHTML = '';
  }
}

function initTheme() {
  const saved = localStorage.getItem('cpe_theme') || 'dark';
  setTheme(saved);
  const bind = (id) => {
    $(id)?.addEventListener('click', () => {
      const next = (document.documentElement.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
      setTheme(next);
    });
  };
  bind('theme-toggle');
  bind('gate-theme-toggle');
}

const AGREE_VERSION = 'v3';

function initWelcomeAgreement() {
  return new Promise((resolve) => {
    const overlay = $('welcome-overlay');
    if (!overlay) return resolve();
    try {
      if (localStorage.getItem('cpe_agree_version') === AGREE_VERSION) {
        overlay.classList.add('hidden');
        return resolve();
      }
    } catch { /* show agreement */ }

    // Fresh install / new agreement version — require accept before license gate
    overlay.classList.remove('hidden');
    const check = $('agree-check');
    const btn = $('agree-continue');
    const msg = $('agree-msg');

    const syncBtn = () => {
      if (btn) btn.disabled = !check?.checked;
      if (msg) msg.textContent = '';
    };
    check?.addEventListener('change', syncBtn);
    syncBtn();

    $('welcome-wa')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.cpe.openExternal('https://wa.me/94774940944');
    });

    btn?.addEventListener('click', () => {
      if (!check?.checked) {
        if (msg) msg.textContent = t('agree_need');
        return;
      }
      try { localStorage.setItem('cpe_agree_version', AGREE_VERSION); } catch { /* ignore */ }
      overlay.classList.add('hidden');
      resolve();
    });
  });
}

function setTheme(mode) {
  const m = mode === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', m);
  localStorage.setItem('cpe_theme', m);
  const label = m === 'light' ? 'Theme: Light' : 'Theme: Dark';
  if ($('theme-toggle')) $('theme-toggle').textContent = label;
  if ($('gate-theme-toggle')) $('gate-theme-toggle').textContent = label;
}

async function refreshBuyPrice() {
  const cur = $('buy-currency')?.value || 'LKR';
  const p = await window.cpe.licensePrice(cur);
  const m3 = p.month3Usd || state.prices.month3Usd || 15;
  const life = p.lifetimeUsd || p.usd || state.prices.lifetimeUsd || 100;
  state.prices.month3Usd = m3;
  state.prices.lifetimeUsd = life;
  if (p.month3Local != null && p.lifetimeLocal != null) {
    $('buy-local-price').textContent =
      `3-Month ≈ ${p.month3Local} ${p.currency} · Lifetime ≈ ${p.lifetimeLocal} ${p.currency}` +
      (p.rate ? ` (1 USD = ${p.rate} ${p.currency})` : '');
    if ($('buy-m3-price')) $('buy-m3-price').innerHTML = `<strong>USD ${m3}</strong><br/><span class="tiny">≈ ${p.month3Local} ${p.currency}</span>`;
    if ($('buy-life-price')) $('buy-life-price').innerHTML = `<strong>USD ${life}</strong><br/><span class="tiny">≈ ${p.lifetimeLocal} ${p.currency}</span>`;
  } else {
    $('buy-local-price').textContent = p.error
      ? `USD ${m3} / ${life} (local rate unavailable: ${p.error})`
      : `3-Month USD ${m3} · Lifetime USD ${life}`;
  }
}

function updateTrialBanner(trial) {
  const el = $('trial-banner');
  if (!el) return;
  if (!trial) {
    el.classList.add('hidden');
    return;
  }
  el.classList.remove('hidden');
  const m3 = state.prices.month3Usd || 15;
  const life = state.prices.lifetimeUsd || 100;
  const refTip = (trial.daysLeft != null && trial.daysLeft <= 3)
    ? `<br/>${escapeHtml(t('warn_ref_tip') || ' Tip: Referral (License) can add days (max 365).')}`
    : '';
  el.innerHTML = `<strong>FREE TRIAL · ${trial.trialDays || 7} days</strong><br/>Days left: ${trial.daysLeft} (~${trial.hoursLeft}h)<br/>Ends: ${new Date(trial.endsAt).toLocaleString()}<br/>After trial: buy <strong>3-Month USD ${m3}</strong> or <strong>Lifetime USD ${life}</strong>. Open trades auto-close when trial ends.${refTip}`;
}

function setAppPrices(m3, life) {
  state.prices.month3Usd = Math.max(1, +m3 || 15);
  state.prices.lifetimeUsd = Math.max(1, +life || 100);
  applyPricesEverywhere();
}

function priceTokens(str) {
  if (!str) return str;
  return String(str)
    .replace(/\{m3\}/g, String(state.prices.month3Usd))
    .replace(/\{life\}/g, String(state.prices.lifetimeUsd))
    .replace(/USD 15/g, `USD ${state.prices.month3Usd}`)
    .replace(/USD 100/g, `USD ${state.prices.lifetimeUsd}`);
}

function applyPricesEverywhere() {
  const m3 = state.prices.month3Usd;
  const life = state.prices.lifetimeUsd;
  if ($('buy-m3-price') && !$('buy-m3-price').querySelector('.tiny')) {
    $('buy-m3-price').innerHTML = `<strong>USD ${m3}</strong>`;
  }
  if ($('buy-life-price') && !$('buy-life-price').querySelector('.tiny')) {
    $('buy-life-price').innerHTML = `<strong>USD ${life}</strong>`;
  }
  const plan = $('owner-plan');
  if (plan) {
    const o0 = plan.querySelector('option[value="MONTH3"]');
    const o1 = plan.querySelector('option[value="LIFETIME"]');
    if (o0) o0.textContent = `3-Month (USD ${m3})`;
    if (o1) o1.textContent = `Lifetime (USD ${life})`;
  }
  if ($('lic-lifetime-note')) {
    $('lic-lifetime-note').textContent = `3-Month USD ${m3} · Lifetime USD ${life} (this Machine ID).`;
  }
  // dynamic i18n fields that mention prices
  const dyn = ['trial_blurb', 'buy_choose_plan', 'warn_d14', 'warn_d7', 'warn_d1', 'tour_lang_body', 'tour_13_body'];
  dyn.forEach((key) => {
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach((el) => {
      el.textContent = priceTokens(t(key));
    });
  });
  document.querySelectorAll('[data-i18n-html="agree_html"]').forEach((el) => {
    el.innerHTML = priceTokens(t('agree_html'));
  });
  document.querySelectorAll('[data-i18n-html="help_html"]').forEach((el) => {
    el.innerHTML = priceTokens(t('help_html'));
  });
}

function showApp(status) {
  state.license = status || state.license;
  // If already paid but paid-demo clock missing (upgrade path), start 3-month DEMO
  if (isPaidLicense(status) && !localStorage.getItem(DEMO_PAID_START_KEY)) {
    try { localStorage.setItem(DEMO_PAID_START_KEY, localStorage.getItem(DEMO_START_KEY) || String(Date.now())); } catch { /* ignore */ }
  }
  loadDemoModePref();
  $('license-gate').classList.add('hidden');
  $('app').classList.remove('hidden');
  if (canUseLiveHelp(status)) $('fab-livehelp')?.classList.remove('hidden');
  else $('fab-livehelp')?.classList.add('hidden');
  if (status?.mode === 'TRIAL' && status.trial) updateTrialBanner(status.trial);
  else updateTrialBanner(null);
  applyLicenseWarn(status);
  syncDemoUi();
  setupNav();
  setupDemoMode();
  setupChartLab();
  setupChartZoom();
  setupLiveHelp();
  refreshLicenseView();
  refreshKeys();
  setupIpGuard();
  refreshAuto();
  refreshPositions();
  refreshJournal();
  refreshWatch();
  loadPairCounts();
  window.cpe.onNotification((n) => toast(n.title, n.body, n.sound !== false, n.kind));
  window.cpe.onScanTick(async () => {
    const view = currentScanMarket();
    const markets = new Set([view]);
    try {
      const a = await window.cpe.getAuto();
      for (const s of (a.sessions || []).filter((x) => x.enabled)) {
        if (s.market === 'BOTH') { markets.add('SPOT'); markets.add('FUTURES'); }
        else markets.add(s.market);
      }
    } catch { /* ignore */ }
    for (const m of markets) {
      await runScan({ market: m, silent: m !== view });
    }
  });
  window.cpe.onAutoTrade((tr) => { toast('Auto Trade', `${tr.symbol} opened`); refreshAuto(); refreshPositions(); });
  window.cpe.onAutoDiagnostic?.((d) => renderAutoDiagnostic(d));
  window.cpe.onScanProgress((p) => {
    $('scan-progress').classList.remove('hidden');
    const pct = p.total ? Math.round((p.done / p.total) * 100) : 0;
    $('progress-bar').style.width = `${pct}%`;
    $('progress-text').textContent = `Scanning ${p.market}: ${p.done}/${p.total} (${pct}%)`;
  });
  window.cpe.onTradesUpdate(() => { refreshPositions(); refreshAuto(false); refreshJournal(); });
  window.cpe.onMt5SetupProgress?.((p) => {
    const el = $('mt5-setup-progress');
    if (el && p) el.textContent = `Auto setup — ${p.step}: ${p.message}`;
    if (p && p.step === 'done') refreshMt5Setup();
  });
  window.cpe.onMt4SetupProgress?.((p) => {
    const el = $('mt4-setup-progress');
    if (el && p) el.textContent = `Auto setup — ${p.step}: ${p.message}`;
    if (p && p.step === 'done') refreshMt4Setup();
  });
  window.cpe.onSignalLab?.(() => {
    if (state.currentView === 'signallab') refreshSignalLab();
  });
  window.cpe.onTpHint((h) => {
    toast(`TP Hint ${h.level}%`, `${h.symbol} approaching TP1 @ ${h.tp1}`, true);
  });
  window.cpe.onAccessExpired((a) => {
    toast(t('license_ended'), a.message || t('buy_choose_plan'));
    $('app').classList.add('hidden');
    $('fab-livehelp')?.classList.add('hidden');
    $('license-gate').classList.remove('hidden');
    showBuyBox(a);
    if (a.message) $('license-msg').textContent = a.message;
  });
  window.cpe.onAccessTrial((trial) => updateTrialBanner(trial));
  window.cpe.onAccessGrace?.((a) => applyLicenseWarn(a));
  window.cpe.onLicenseWarning?.((w) => {
    applyLicenseWarn({ warnings: [w], mode: w.mode });
    toast(t('license_warn_title'), warnText(w), true);
  });
  initPlatformSelectors();
  setupOwnerAdmin();
  setupReferralUi();
  setupLicenseActivateUi();
  initNotificationsToggle();
  loadPublicConfigUI(status);
  setupDeskPairPickers();
  setupChartPopupUi();
  setupSignalLabUi();
  setupTradeGuideUi();
  // DEMO desks: load pair lists + auto-scan so tables are not empty
  ensureDeskReady('SPOT');
  setTimeout(() => maybeStartTour(), 400);
}

function setupTradeGuideUi() {
  const overlay = $('trade-guide-overlay');
  const btn = $('open-trade-guide-btn');
  const agree = $('tg-agree-btn');
  const dontShow = $('tg-dont-show');

  const showGuide = () => overlay?.classList.remove('hidden');
  const hideGuide = () => {
    overlay?.classList.add('hidden');
    if (dontShow?.checked) {
      try { localStorage.setItem('cpe_trade_guide_seen', '1'); } catch {}
    }
  };

  btn?.addEventListener('click', showGuide);
  agree?.addEventListener('click', hideGuide);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) hideGuide();
  });
}

function warnText(w) {
  if (!w) return '';
  const ref = t('warn_ref_tip') || ' Tip: use Referral (License) to earn extra days (max 365). Only owner-issued keys activate.';
  if (w.code === 'GRACE') return priceTokens(t('warn_grace').replace('{d}', w.daysLeft ?? '?')) + ref;
  if (w.code === 'D14') return priceTokens(t('warn_d14').replace('{d}', w.daysLeft ?? 14)) + ref;
  if (w.code === 'D7') return priceTokens(t('warn_d7').replace('{d}', w.daysLeft ?? 7)) + ref;
  if (w.code === 'D3') return priceTokens(t('warn_d3').replace('{d}', w.daysLeft ?? 3)) + ref;
  if (w.code === 'D1') return priceTokens(t('warn_d1')) + ref;
  return t('license_warn_title') + ref;
}

function applyLicenseWarn(status) {
  const el = $('license-warn-banner');
  if (!el) return;
  const g = (status || state.license || {}).guard;
  if (g?.locked) {
    const title = g.tamper ? t('guard_tamper_title') : t('guard_locked_title');
    const body = g.tamper ? t('guard_tamper_body') : t('guard_locked_body');
    el.classList.remove('hidden');
    el.classList.add('guard-locked');
    el.innerHTML = `<strong>${escapeHtml(title)}</strong><br/>${escapeHtml(body)}`;
    $('scan-btn')?.setAttribute('disabled', 'disabled');
    return;
  }
  el.classList.remove('guard-locked');
  const w = status?.warnings?.[0];
  if (!w && status?.mode !== 'MONTH3_GRACE') {
    el.classList.add('hidden');
    el.innerHTML = '';
    return;
  }
  const msg = warnText(w || { code: 'GRACE', daysLeft: status?.daysLeft });
  el.classList.remove('hidden');
  el.innerHTML = `<strong>${t('license_warn_title')}</strong><br/>${escapeHtml(msg)}`;
}

async function loadPublicConfigUI(status) {
  let cfg = status?.publicConfig;
  if (!cfg) {
    try { cfg = await window.cpe.publicConfig(); } catch { cfg = null; }
  }
  if (!cfg && status) {
    cfg = {
      month3Usd: status.month3Usd,
      lifetimeUsd: status.lifetimeUsd || status.priceUsd,
      priceUsd: status.priceUsd
    };
  }
  if (!cfg) return;
  setAppPrices(cfg.month3Usd || 15, cfg.lifetimeUsd || cfg.priceUsd || 100);
  applyUpdateBanner(cfg);
  renderPublicFaq(cfg.faq);
  fillPaymentMethods({ payments: cfg.payments, lifetimeLabel: cfg.lifetimeLabel, email: cfg.owner?.email });
}

function setupNav() {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.onclick = () => {
      const view = btn.dataset.view;
      if (view === 'livehelp' && !canUseLiveHelp()) {
        toast(t('livehelp_locked_title') || 'Live Help locked', t('livehelp_locked_body'));
        document.querySelector('.nav-btn[data-view="license"]')?.click();
        return;
      }
      document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentView = view;
      document.querySelectorAll('.view').forEach((v) => v.classList.add('hidden'));
      $(`view-${view}`).classList.remove('hidden');
      refreshViewTitles();
      if (view === 'futures') state.market = 'FUTURES';
      else if (view === 'forex') state.market = 'FOREX';
      else if (view === 'spot') state.market = 'SPOT';
      if (view === 'spot' || view === 'futures' || view === 'forex') {
        ensureDeskReady(state.market);
      }
      if (view === 'trade') {
        if (!localStorage.getItem('cpe_trade_guide_seen')) {
          $('trade-guide-overlay')?.classList.remove('hidden');
        }
      }
      if (view === 'keys') {
        updatePlatformBranding();
        renderIpGuard();
        checkPublicIp(false);
      }
      if (view === 'positions') refreshPositions();
      if (view === 'journal') refreshJournal();
      if (view === 'signallab') refreshSignalLab();
      if (view === 'chartlab') {
        state.labPairsPromise = loadLabPairs();
        if (state.labSignal) startLabLiveTimer();
      }
      if (view === 'livehelp') renderChat();
      if (view === 'news') loadNews(false);
      if (view === 'learn') forceRenderLearn();
      if (view === 'help') refreshHelpLang();
      if (view === 'license') {
        refreshLicenseView();
        refreshReferralPanel();
      }
      if (view === 'owner-tools') {
        refreshOwnerChatInbox();
        refreshOwnerActivity();
      }
    };
  });

  setupNewsUi();
  setupLearnUi();

  $('fab-livehelp')?.addEventListener('click', () => {
    if (!canUseLiveHelp()) {
      toast(t('livehelp_locked_title') || 'Live Help locked', t('livehelp_locked_body'));
      document.querySelector('.nav-btn[data-view="license"]')?.click();
      return;
    }
    document.querySelector('.nav-btn[data-view="livehelp"]')?.click();
  });

  // Position manage
  document.querySelectorAll('#pos-mode-tabs .mode-tab').forEach((btn) => {
    btn.onclick = () => {
      state.posTab = btn.dataset.postab || 'LIVE';
      document.querySelectorAll('#pos-mode-tabs .mode-tab').forEach((b) => b.classList.toggle('active', b === btn));
      refreshPositions();
    };
  });
  document.querySelectorAll('#jr-mode-tabs .mode-tab').forEach((btn) => {
    btn.onclick = () => {
      state.jrTab = btn.dataset.jrtab || 'LIVE';
      document.querySelectorAll('#jr-mode-tabs .mode-tab').forEach((b) => b.classList.toggle('active', b === btn));
      refreshJournal();
    };
  });
  $('pos-clear-broken')?.addEventListener('click', async () => {
    const res = await window.cpe.clearBrokenTrades();
    toast('Positions', res?.removed ? `Removed ${res.removed} broken trade(s)` : 'No broken trades found');
    refreshPositions();
  });
  $('pos-sync')?.addEventListener('click', async () => {
    let r = null;
    try { r = await window.cpe.syncTrades({}); } catch (e) { r = null; }
    if (!r) { toast('Sync failed', 'Could not reach the exchange', false, 'error'); return; }
    const parts = [`checked ${r.checked || 0}`];
    if (r.cleared) parts.push(`cleared ${r.cleared}`);
    if (r.promoted) parts.push(`filled ${r.promoted}`);
    if (r.skipped) parts.push(`skipped ${r.skipped}`);
    if (r.errors?.length) parts.push(`${r.errors.length} error(s)`);
    toast('Sync with exchange', parts.join(' · '));
    refreshPositions();
  });
  $('pos-edit-close')?.addEventListener('click', () => $('pos-edit').classList.add('hidden'));
  $('pos-edit')?.addEventListener('click', (e) => {
    if (e.target === $('pos-edit')) $('pos-edit').classList.add('hidden');
  });
  $('pos-save-levels')?.addEventListener('click', async () => {
    const id = $('pos-edit-id').value;
    if (!id) return;
    await window.cpe.updateTrade({
      id,
      tps: collectTps(),
      sl: $('pos-sl').value,
      autoClose: $('pos-autoclose').checked,
      trailingStop: $('pos-trail')?.checked,
      trailPct: $('pos-trail-pct')?.value
    });
    $('pos-edit').classList.add('hidden');
    toast('Updated', 'Levels saved — trade running');
    refreshPositions();
  });
  $('pos-tp-add')?.addEventListener('click', () => addTpRow('', ''));
  const closePct = async (pct) => {
    const id = $('pos-edit-id').value;
    if (!id) return;
    if (!confirm(`Are you sure you want to close ${pct}% of this position?`)) return;
    const ok = await closeTradeNow(id, pct, pct >= 100 ? 'Trade closed and removed from open positions' : `${pct}% closed successfully`);
    if (ok && pct >= 100) $('pos-edit').classList.add('hidden');
  };
  $('pos-close-25')?.addEventListener('click', () => closePct(25));
  $('pos-close-50')?.addEventListener('click', () => closePct(50));
  $('pos-close-75')?.addEventListener('click', () => closePct(75));
  $('pos-close-100')?.addEventListener('click', () => closePct(100));
  $('pos-cancel-auto')?.addEventListener('click', async () => {
    const id = $('pos-edit-id').value;
    if (!id) return;
    if (!confirm('Are you sure you want to cancel Auto Close and switch to Manual control?')) return;
    await window.cpe.cancelAuto({ id });
    toast('Manual', 'Auto cancelled — you control close');
    refreshPositions();
  });
  setupPosDetailUi();

  $('scan-btn').onclick = () => runScan();
  $('multitf-btn').onclick = () => {
    const on = $('multitf-btn').classList.toggle('on');
    $('multitf-btn').textContent = on ? 'Multi-TF · ON' : 'Multi-TF · 5 timeframes';
    // Multi-TF and Scalp are two different desks — only one can be on.
    if (on && scalpActive()) {
      $('scalp-btn').classList.remove('on');
      $('scalp-btn').textContent = 'Scalp · 15m';
      $('scalp-panel').classList.add('hidden');
    }
    if (!on) $('mtf-panel').classList.add('hidden');
    else runScanMultiTf();
    toast('Multi-Timeframe', on
      ? 'Reads every pair on 3m · 15m · 1h · 4h · 1d at once (auto-limits to Top 20).'
      : 'Off — the single-timeframe scan is back.', false);
  };
  $('scalp-btn').onclick = () => {
    const on = $('scalp-btn').classList.toggle('on');
    $('scalp-btn').textContent = on ? 'Scalp · ON' : 'Scalp · 15m';
    // Scalp and Multi-TF are two different desks — only one can be on.
    if (on && multiTfActive()) {
      $('multitf-btn').classList.remove('on');
      $('multitf-btn').textContent = 'Multi-TF · 5 timeframes';
      $('mtf-panel').classList.add('hidden');
    }
    if (!on) $('scalp-panel').classList.add('hidden');
    else runScanScalp();
    toast('Scalp 15m', on
      ? 'Only the strongest 15-minute scalp setups — STRONG read, tight ATR TP/SL (Top 20).'
      : 'Off — the single-timeframe scan is back.', false);
  };
  $('auto-scan-btn').onclick = async () => {
    state.autoScan = !state.autoScan;
    refreshViewTitles();
    if (state.autoScan) {
      const AUTO_MS = 15 * 60 * 1000; // every 15 minutes
      const res = await window.cpe.startScan(AUTO_MS);
      const mins = Math.round((res?.every || AUTO_MS) / 60000);
      toast('Auto Scan', `ON · every ${mins} min (at least once per 15 min)`);
      runScan();
    } else {
      await window.cpe.stopScan();
      toast('Auto Scan', 'OFF', false);
    }
  };

  $('spot-search').oninput = () => renderTable('SPOT');
  $('fut-search').oninput = () => renderTable('FUTURES');
  $('fx-search')?.addEventListener('input', () => renderTable('FOREX'));
  $('mtf-search').oninput = () => renderMtfTable();
  $('scalp-search').oninput = () => renderScalpTable();
  setupDeskPairPickers();
  $('interval-select').onchange = () => tickCandleEta();
  $('tr-market')?.addEventListener('change', () => {
    const m = $('tr-market').value;
    if (m === 'SPOT') $('tr-quote').value = Math.max(11, +$('tr-quote').value || 11);
    if (m === 'FUTURES') $('tr-quote').value = Math.max(1, +$('tr-quote').value || 1);
    if (m === 'FOREX' && [...($('tr-platform')?.options || [])].some((o) => o.value === 'FOREX_DEMO')) {
      $('tr-platform').value = 'FOREX_DEMO';
    }
    renderManualSignals();
  });
  $('tr-platform')?.addEventListener('change', () => {
    syncTradeMarketOptions('tr');
    syncTradeFieldVisibility('tr');
    renderManualSignals();
  });
  document.querySelectorAll('.chart-pop-open').forEach((h) => {
    h.addEventListener('click', () => {
      const market = h.dataset.market;
      const full = state.deskDetail && state.deskDetail[market];
      if (full) openChartPopup(full);
      else toast('Chart', 'Click a signal row first', false);
    });
  });

  $('save-keys').onclick = async () => {
    const platform = $('keys-platform').value;
    const payload = {
      platform,
      apiKey: $('api-key').value.trim(),
      apiSecret: $('api-secret').value.trim(),
      passphrase: $('api-passphrase')?.value.trim(),
      accountId: $('api-account')?.value.trim(),
      login: $('api-login')?.value.trim(),
      password: $('api-password')?.value.trim(),
      server: $('api-server')?.value.trim()
    };
    const meta = state.platforms.find((p) => p.id === platform);
    const fields = meta?.keyFields || [];
    if (fields.includes('apiKey') && !payload.apiKey && platform !== 'FOREX_DEMO') {
      return toast('Keys', t('keys_need_both'));
    }
    if (fields.includes('apiSecret') && !payload.apiSecret && platform !== 'FOREX_DEMO') {
      return toast('Keys', t('keys_need_both'));
    }
    if (fields.includes('passphrase') && !payload.passphrase && ['OKX', 'KUCOIN', 'BITGET'].includes(platform)) {
      return toast('Keys', `${platform}: passphrase required`);
    }
    if (fields.includes('accountId') && !payload.accountId) {
      return toast('Keys', 'OANDA: Account ID required');
    }
    if (fields.includes('login') && (!payload.login || !payload.password || !payload.server)) {
      return toast('Keys', `${platform.replace('FOREX_', '')}: login + password + server required`);
    }
    const res = await window.cpe.saveKeys(payload);
    if (res && res.ok === false) {
      return toast('Keys', res.message || 'Save failed');
    }
    $('api-secret').value = '';
    if ($('api-passphrase')) $('api-passphrase').value = '';
    if ($('api-password')) $('api-password').value = '';
    refreshKeys();
    refreshAuto(false);
    if (platform === 'BINANCE') { refreshBinanceKeyFlag(); checkPublicIp(false); }
    else refreshPlatformKeyFlag(platform);
    toast('Saved', `${platform} — ${t('keys_saved')}`);
    // auto-test after save
    try {
      const test = await window.cpe.testKeys(platform);
      $('account-box').textContent = JSON.stringify(test, null, 2).slice(0, 5000);
      if (test?.ok) toast(t('keys_test_ok'), test.summary || platform);
      else toast(t('keys_test_fail'), test?.summary || test?.error || 'Check key/secret');
    } catch (e) {
      $('account-box').textContent = e.message || String(e);
      toast(t('keys_test_fail'), e.message || String(e));
    }
  };
  $('clear-keys').onclick = async () => {
    const pid = $('keys-platform').value;
    await window.cpe.clearKeys(pid);
    refreshKeys();
    if (pid === 'BINANCE') refreshBinanceKeyFlag();
    else refreshPlatformKeyFlag(pid);
  };
  $('test-account').onclick = async () => {
    const platform = $('keys-platform')?.value || 'BINANCE';
    try {
      $('account-box').textContent = 'Testing…';
      const test = await window.cpe.testKeys(platform);
      const extra = platform === 'BINANCE'
        ? await window.cpe.account(state.market === 'FUTURES' ? 'FUTURES' : 'SPOT', platform).catch(() => null)
        : null;
      $('account-box').textContent = JSON.stringify(extra ? { test, account: extra } : test, null, 2).slice(0, 5000);
      if (test?.ok) toast(t('keys_test_ok'), test.summary || platform);
      else toast(t('keys_test_fail'), test?.summary || test?.error || 'Failed');
    } catch (e) {
      $('account-box').textContent = e.message || String(e);
      toast(t('keys_test_fail'), e.message || String(e));
    }
  };
  $('get-my-ip')?.addEventListener('click', () => checkPublicIp(true));
  $('binance-ip-guard')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-ipg]');
    if (btn) handleIpGuardAction(btn.dataset.ipg);
  });
  $('keys-platform')?.addEventListener('change', () => {
    applyPlatformKeyFields($('keys-platform').value);
    refreshKeys();
    showPlatformGuide($('keys-platform').value, 'api-guide-title', 'api-guide-body');
    updatePlatformBranding();
    renderIpGuard();
  });
  $('mt5-bridge-start')?.addEventListener('click', async () => {
    const tag = bridgeTag();
    const el = $('mt5-bridge-status');
    if (el) el.textContent = `${tag} bridge: starting…`;
    try {
      const r = tag === 'MT4' ? await window.cpe.mt4BridgeStart() : await window.cpe.mt5BridgeStart();
      renderMt5Bridge(r);
      toast(`${tag} Bridge`, r?.ok ? 'Bridge is running' : (r?.error || 'Could not start'), r?.ok);
    } catch (e) {
      if (el) el.textContent = `${tag} bridge: ${e.message || e}`;
      toast(`${tag} Bridge`, e.message || String(e), false);
    }
  });
  $('mt5-bridge-stop')?.addEventListener('click', async () => {
    await window.cpe.mt5BridgeStop();
    setTimeout(() => refreshMt5Bridge(), 300);
  });
  $('mt5-bridge-check')?.addEventListener('click', () => refreshMt5Bridge());
  $('mt5-setup-refresh')?.addEventListener('click', () => refreshMt5Setup());
  $('mt5-setup-auto')?.addEventListener('click', async () => {
    const btn = $('mt5-setup-auto');
    if (btn) btn.disabled = true;
    toast('MT5 setup', 'Installing everything automatically — this can take a few minutes…', true);
    try {
      const r = await window.cpe.mt5SetupAutoProvision();
      toast('MT5 setup', r.ok
        ? 'All MT5 support installed — enter your login/password/server and press Test Account.'
        : 'Setup could not finish automatically — use the individual buttons below.', r.ok);
    } catch (e) {
      toast('MT5 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
      refreshMt5Setup();
      refreshMt5Bridge();
    }
  });
  $('mt5-setup-pip')?.addEventListener('click', async () => {
    const btn = $('mt5-setup-pip');
    if (btn) btn.disabled = true;
    toast('MT5 setup', 'Installing the MetaTrader5 package…', true);
    try {
      const r = await window.cpe.mt5SetupInstallPackage();
      toast('MT5 setup', r.ok ? 'MetaTrader5 package installed' : (r.error || 'Install failed'), r.ok);
    } catch (e) {
      toast('MT5 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
      refreshMt5Setup();
      refreshMt5Bridge();
    }
  });
  $('mt5-setup-python')?.addEventListener('click', async () => {
    const btn = $('mt5-setup-python');
    if (btn) btn.disabled = true;
    toast('MT5 setup', 'Installing Python 3 (this can take a few minutes)…', true);
    try {
      const r = await window.cpe.mt5SetupInstallPython();
      toast('MT5 setup', r.ok
        ? 'Python installed — restart the app, then press “Re-check Setup”.'
        : 'Opened the Python download page in your browser.', r.ok);
    } catch (e) {
      toast('MT5 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
  $('mt5-setup-terminal')?.addEventListener('click', async () => {
    const btn = $('mt5-setup-terminal');
    if (btn) btn.disabled = true;
    toast('MT5 setup', 'Downloading the MetaTrader 5 installer…', true);
    try {
      const r = await window.cpe.mt5SetupGetTerminal();
      toast('MT5 setup', r.ok
        ? 'Installer started — finish it, open MT5 and log in, then press “Re-check Setup”.'
        : 'Opened the MetaTrader 5 download page in your browser.', r.ok);
    } catch (e) {
      toast('MT5 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
      refreshMt5Setup();
    }
  });
  $('mt5-setup-ea')?.addEventListener('click', async () => {
    const btn = $('mt5-setup-ea');
    if (btn) btn.disabled = true;
    toast('MT5 setup', 'Installing the CPE_Bridge expert advisor…', true);
    try {
      const r = await window.cpe.mt5SetupInstallEa();
      toast('MT5 setup', r.ok ? (r.hint || 'CPE bridge EA installed') : (r.error || 'EA install failed'), r.ok);
    } catch (e) {
      toast('MT5 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
      refreshMt5Setup();
      refreshMt5Bridge();
    }
  });
  $('mt4-setup-refresh')?.addEventListener('click', () => refreshMt4Setup());
  $('mt4-setup-auto')?.addEventListener('click', async () => {
    const btn = $('mt4-setup-auto');
    if (btn) btn.disabled = true;
    toast('MT4 setup', 'Installing Python 3 + MetaTrader 4 + CPE bridge EA — this can take a few minutes…', true);
    try {
      const r = await window.cpe.mt4SetupAutoProvision();
      toast('MT4 setup', r.ok
        ? 'All MT4 support installed — attach CPE_Bridge to a chart, click AutoTrading, then save your login/password/server.'
        : 'Setup could not finish automatically — use the individual buttons below.', r.ok);
    } catch (e) {
      toast('MT4 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
      refreshMt4Setup();
      refreshMt5Bridge();
    }
  });
  $('mt4-setup-ea')?.addEventListener('click', async () => {
    const btn = $('mt4-setup-ea');
    if (btn) btn.disabled = true;
    try {
      const r = await window.cpe.mt4SetupInstallEa();
      toast('MT4 setup', r.ok ? (r.hint || 'CPE bridge EA installed') : (r.error || 'EA install failed'), r.ok);
    } catch (e) {
      toast('MT4 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
      refreshMt4Setup();
    }
  });
  $('mt4-setup-python')?.addEventListener('click', async () => {
    const btn = $('mt4-setup-python');
    if (btn) btn.disabled = true;
    toast('MT4 setup', 'Installing Python 3 (this can take a few minutes)…', true);
    try {
      const r = await window.cpe.mt4SetupInstallPython();
      toast('MT4 setup', r.ok
        ? 'Python installed — restart the app, then press “Re-check Setup”.'
        : 'Opened the Python download page in your browser.', r.ok);
    } catch (e) {
      toast('MT4 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
  $('mt4-setup-terminal')?.addEventListener('click', async () => {
    const btn = $('mt4-setup-terminal');
    if (btn) btn.disabled = true;
    toast('MT4 setup', 'Downloading the MetaTrader 4 installer…', true);
    try {
      const r = await window.cpe.mt4SetupGetTerminal();
      toast('MT4 setup', r.ok
        ? 'Installer started — finish it, open MT4 and log in to your broker once, then press “Re-check Setup”.'
        : 'Opened the MetaTrader 4 download page in your browser.', r.ok);
    } catch (e) {
      toast('MT4 setup', e.message || String(e), false);
    } finally {
      if (btn) btn.disabled = false;
      refreshMt4Setup();
    }
  });
  $('help-platform')?.addEventListener('change', () => {
    showPlatformGuide($('help-platform').value, 'help-api-title', 'help-api-body');
  });

  $('tr-submit').onclick = () => placeManual(false);
  $('tr-paper').onclick = () => placePaper();
  $('auto-save').onclick = saveAuto;
  $('auto-stop')?.addEventListener('click', () => stopAllSessions());
  const syncOwnerPlanHint = () => {
    const plan = $('owner-plan')?.value || 'LIFETIME';
    const wrap = $('owner-timed-wrap');
    if (wrap) wrap.style.opacity = plan === 'TIMED' ? '1' : '0.45';
    if ($('owner-plan-hint')) {
      if (plan === 'MONTH3') {
        $('owner-plan-hint').textContent = '① මාස 3 key — customer Machine ID එකට දින ~90. WhatsApp එකට මේ key එක යවන්න.';
      } else if (plan === 'TIMED') {
        $('owner-plan-hint').textContent = '③ Referral timed — days box එකේ දින ගණන (claim slip අනුව). Lifetime referrer reward සඳහා.';
      } else {
        $('owner-plan-hint').textContent = '② Lifetime key — මේ Machine ID එකට සදහට. USD 100 plan.';
      }
    }
  };
  $('owner-plan')?.addEventListener('change', syncOwnerPlanHint);
  syncOwnerPlanHint();
  $('gen-key-btn').onclick = async () => {
    const plan = $('owner-plan')?.value || 'LIFETIME';
    const days = plan === 'TIMED' ? (+$('owner-timed-days')?.value || 30) : undefined;
    const res = await window.cpe.generateLicenseForMachine(
      $('owner-mid').value.trim(),
      $('owner-pass').value,
      plan,
      days
    );
    if (res.ok) {
      const label = plan === 'MONTH3' ? '① මාස 3' : plan === 'TIMED' ? '③ Referral timed' : '② Lifetime';
      $('gen-key-out').textContent =
        `${label} · ${res.plan}${res.timed ? ' TIMED' : ''} · USD ${res.priceUsd}${res.days ? ` · ${res.days} days` : ' · forever'}\n${res.key}`;
      try { await navigator.clipboard.writeText(res.key); } catch {}
      toast('License key', `${label} copied`);
    } else $('gen-key-out').textContent = res.message || 'Failed';
  };

  setupOwnerSecretAccess();
}

/** Owner Tools hidden from customers. Unlock: click CPE logo 7 times, then password. Or Ctrl+Shift+O */
function setupOwnerSecretAccess() {
  const badge = $('logo-badge') || $('logo-area');
  let clicks = 0;
  let timer = null;
  const reset = () => { clicks = 0; };

  if (badge) {
    badge.addEventListener('click', () => {
      clicks += 1;
      clearTimeout(timer);
      timer = setTimeout(reset, 2500);
      if (clicks >= 7) {
        reset();
        openOwnerUnlock();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'O' || e.key === 'o')) {
      e.preventDefault();
      openOwnerUnlock();
    }
  });

  const unlockBtn = $('owner-unlock-btn');
  if (unlockBtn) {
    unlockBtn.onclick = async () => {
      const pass = $('owner-unlock-pass').value;
      const res = await window.cpe.verifyOwnerPassword(pass);
      if (!res.ok) {
        $('owner-unlock-msg').textContent = res.message || 'Denied';
        return;
      }
      sessionStorage.setItem('cpe_owner_ok', '1');
      $('owner-pass').value = pass;
      revealOwnerTools(true);
      $('owner-unlock').classList.add('hidden');
      $('owner-unlock-pass').value = '';
      $('owner-unlock-msg').textContent = '';
      toast('Owner', 'Tools unlocked (this session only)', false);
    };
  }
  $('owner-unlock-cancel')?.addEventListener('click', () => {
    $('owner-unlock').classList.add('hidden');
    $('owner-unlock-pass').value = '';
  });
  $('owner-hide-btn')?.addEventListener('click', () => {
    sessionStorage.removeItem('cpe_owner_ok');
    revealOwnerTools(false);
    document.querySelector('.nav-btn[data-view="license"]')?.click();
  });

  if (sessionStorage.getItem('cpe_owner_ok') === '1') revealOwnerTools(true);
  else revealOwnerTools(false);
}

function openOwnerUnlock() {
  const box = $('owner-unlock');
  if (!box) return;
  box.classList.remove('hidden');
  $('owner-unlock-pass')?.focus();
}

function revealOwnerTools(show) {
  const nav = $('nav-owner');
  if (!nav) return;
  if (show) nav.classList.remove('hidden');
  else {
    nav.classList.add('hidden');
    $('view-owner-tools')?.classList.add('hidden');
  }
}

/** Normalize query: "btc usdt" / "bt/" → BTCUSDT style letters+digits */
function normPairQuery(q) {
  let s = String(q || '').toUpperCase().trim();
  // aliases: gold / xau → XAUUSD
  if (s === 'GOLD' || s === 'XAU' || s === 'XAUUSD' || s === 'GOLDUSD') return 'XAUUSD';
  if (s === 'SILVER' || s === 'XAG' || s === 'XAGUSD') return 'XAGUSD';
  return s.replace(/[^A-Z0-9]/g, '');
}

/** Fuzzy: consecutive subsequence match (b→BTC, bt→BTC, eu→EURUSD) */
function pairFuzzyMatch(symbol, query) {
  const sym = String(symbol || '').toUpperCase();
  const q = normPairQuery(query);
  if (!q) return true;
  if (sym.includes(q)) return true;
  // strip quote suffixes for easier typing
  const bare = sym.replace(/(USDT|BUSD|USD|EUR|GBP|JPY|AUD|CAD|CHF|NZD)$/i, '');
  if (bare.includes(q) || sym.startsWith(q)) return true;
  let si = 0;
  for (let i = 0; i < q.length; i++) {
    const ch = q[i];
    const found = sym.indexOf(ch, si);
    if (found < 0) return false;
    si = found + 1;
  }
  return true;
}

function scorePairMatch(symbol, query) {
  const sym = String(symbol || '').toUpperCase();
  const q = normPairQuery(query);
  if (!q) return 0;
  if (sym === q || sym === `${q}USDT`) return 100;
  if (sym.startsWith(q)) return 80;
  if (sym.includes(q)) return 60;
  if (pairFuzzyMatch(sym, q)) return 40;
  return 0;
}

function filterPairsList(list, query, limit = 250) {
  const base = filterVisiblePairs(list);
  const q = normPairQuery(query);
  if (!q) {
    const popularCrypto = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'DOGEUSDT', 'ADAUSDT'];
    const popularFx = ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'XAUUSD', 'XAGUSD'];
    const popular = (base.some((p) => p === 'EURUSD') ? popularFx : popularCrypto)
      .filter((p) => base.includes(p));
    const rest = base.filter((p) => !popular.includes(p)).slice(0, limit - popular.length);
    return [...popular, ...rest];
  }
  return base
    .map((p) => ({ p, s: scorePairMatch(p, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.p.localeCompare(b.p))
    .slice(0, limit)
    .map((x) => x.p);
}

async function loadDeskPairs(market) {
  try {
    const r = await window.cpe.pairs(market);
    state.deskPairs[market] = r.pairs || [];
    return state.deskPairs[market];
  } catch {
    state.deskPairs[market] = state.deskPairs[market] || [];
    return state.deskPairs[market];
  }
}

function deskIds(market) {
  if (market === 'FUTURES') {
    return { type: 'fut-pair-type', pick: 'fut-pair-pick', go: 'fut-pair-go', hint: 'fut-desk-hint', search: 'fut-search' };
  }
  if (market === 'FOREX') {
    return { type: 'fx-pair-type', pick: 'fx-pair-pick', go: 'fx-pair-go', hint: 'fx-desk-hint', search: 'fx-search' };
  }
  return { type: 'spot-pair-type', pick: 'spot-pair-pick', go: 'spot-pair-go', hint: 'spot-desk-hint', search: 'spot-search' };
}

function pairOptionLabel(p) {
  if (p === 'XAUUSD') return 'XAUUSD · Gold / USD';
  if (p === 'XAGUSD') return 'XAGUSD · Silver / USD';
  return p;
}

function fillDeskPairSelect(market, filter) {
  const ids = deskIds(market);
  const sel = $(ids.pick);
  if (!sel) return;
  const list = state.deskPairs[market] || [];
  const shown = filterPairsList(list, filter, 300);
  const cur = sel.value;
  sel.innerHTML = shown.map((p) => `<option value="${escapeHtml(p)}">${escapeHtml(pairOptionLabel(p))}</option>`).join('')
    || '<option value="">No match — type again</option>';
  if (cur && shown.includes(cur)) sel.value = cur;
  else if (market === 'FOREX' && shown.includes('XAUUSD') && !normPairQuery(filter)) sel.value = 'XAUUSD';
  else if (shown[0]) sel.value = shown[0];
}

let deskPairUiReady = false;
function setupDeskPairPickers() {
  if (deskPairUiReady) return;
  deskPairUiReady = true;
  const bind = (market) => {
    const ids = deskIds(market);
    $(ids.type)?.addEventListener('input', () => {
      fillDeskPairSelect(market, $(ids.type).value);
      // also sync table search for scanned rows
      if ($(ids.search)) {
        $(ids.search).value = $(ids.type).value;
        renderTable(market);
      }
    });
    $(ids.go)?.addEventListener('click', () => openDeskPair(market));
    $(ids.pick)?.addEventListener('change', () => openDeskPair(market));
    $(ids.type)?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        openDeskPair(market);
      }
    });
  };
  bind('SPOT');
  bind('FUTURES');
  bind('FOREX');
}

async function openDeskPair(market) {
  const ids = deskIds(market);
  const typed = $(ids.type)?.value || '';
  if (!$(ids.pick)?.value && !typed) {
    toast('Pair', 'Type a few letters (btc, eth, eu, gold…) then Open chart', false);
    return;
  }
  // Prefer exact select value; else best fuzzy from catalog
  let pick = $(ids.pick)?.value;
  if (!pick || pick.startsWith('No match')) {
    const matches = filterPairsList(state.deskPairs[market] || [], typed || pick, 5);
    pick = matches[0];
  }
  // gold alias
  const alias = normPairQuery(typed);
  if ((alias === 'XAUUSD' || alias === 'XAGUSD') && (state.deskPairs[market] || []).includes(alias)) {
    pick = alias;
  }
  if (!pick) {
    toast('Pair', 'No pair matched — try btc / eth / eurusd / gold', true);
    return;
  }
  state.market = market;
  await selectSymbol(market, pick, { popup: true });
}

function isWeekend() {
  const d = new Date().getDay();
  return d === 0 || d === 6;
}

function checkForexWeekendBanner() {
  const banner = $('fx-weekend-banner');
  if (!banner) return;
  if (isWeekend()) {
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }
}

async function ensureDeskReady(market) {
  const m = market || 'SPOT';
  if (m === 'FOREX') checkForexWeekendBanner();
  await loadDeskPairs(m);
  const ids = deskIds(m);
  fillDeskPairSelect(m, '');
  renderTable(m);
  const rows = rowsFor(m);
  const hint = $(ids.hint);
  if (hint) {
    hint.textContent = rows.length
      ? `${rows.length} signals in this tab — all listed below. Filter box is optional.`
      : 'Loading this tab’s full list…';
  }
  if (!rows.length && !state.deskScanBusy) {
    state.market = m;
    state.deskScanBusy = true;
    try {
      await runScan();
    } finally {
      state.deskScanBusy = false;
      const after = rowsFor(m);
      if (hint) {
        hint.textContent = after.length
          ? `${after.length} signals in this tab — all listed below.`
          : 'List is still loading or the feed is busy. Click Scan Market to refresh this tab.';
      }
    }
  }
}

async function loadPairCounts() {
  const setCount = async (elId, market) => {
    const el = $(elId);
    if (!el) return;
    try {
      const r = await window.cpe.pairs(market);
      state.deskPairs[market] = r.pairs || state.deskPairs[market] || [];
      el.textContent = String(r.count ?? 0);
      el.title = r.source === 'live' ? 'Live from exchange' : (r.warning || r.source || '');
      if (r.warning && r.source !== 'live') {
        el.textContent = `${r.count}*`;
        el.title = r.warning;
      }
      fillDeskPairSelect(market, deskIds(market).type && $(deskIds(market).type)?.value);
    } catch (e) {
      el.textContent = '—';
      el.title = e.message || 'Unavailable';
    }
  };
  await Promise.all([
    setCount('spot-pair-count', 'SPOT'),
    setCount('fut-pair-count', 'FUTURES'),
    setCount('fx-pair-count', 'FOREX')
  ]);
}

function currentScanMarket() {
  return state.market === 'FUTURES' ? 'FUTURES' : state.market === 'FOREX' ? 'FOREX' : 'SPOT';
}

async function runScan(opts = {}) {
  const market = opts.market || currentScanMarket();
  // Scalp / Multi-TF are separate reads — they never touch the single-TF scan below.
  if (scalpActive() && !opts.silent) return runScanScalp(opts);
  if (multiTfActive() && !opts.silent) return runScanMultiTf(opts);
  const interval = $('interval-select').value;
  const limit = +$('scan-limit').value;
  if (!opts.silent) {
    $('scan-btn').disabled = true;
    $('scan-btn').textContent = t('scanning');
    $('scan-progress').classList.remove('hidden');
  }
  try {
    const data = await window.cpe.scan({ market, interval, limit });
    if (data?.blocked) {
      state.spotResults = [];
      state.futResults = [];
      state.fxResults = [];
      state.spotBb = [];
      state.futBb = [];
      state.fxBb = [];
      renderTable('SPOT');
      renderTable('FUTURES');
      renderTable('FOREX');
      applyLicenseWarn({ guard: { locked: true, tamper: !!data.tamper } });
      if (!opts.silent) toast(t('guard_locked_title'), data.message || t('guard_locked_body'), false, 'error');
      return;
    }
    if (market === 'FUTURES') {
      state.futResults = data.results;
      state.futBb = data.bbBuys || [];
      state.newListings.FUTURES = data.newListings || [];
      state.upcomingListings.FUTURES = data.upcoming || [];
      $('fut-buy-count').textContent = data.results.filter((r) => r.type === 'BUY').length;
      $('fut-sell-count').textContent = data.results.filter((r) => r.type === 'SELL').length;
      $('fut-bb-count').textContent = state.futBb.length;
      if ($('fut-new-count')) $('fut-new-count').textContent = state.newListings.FUTURES.length;
      renderTable('FUTURES');
      renderBb('fut-bb-list', state.futBb, 'FUTURES');
      renderUpcoming(state.upcomingListings.FUTURES, 'FUTURES');
      renderNewList(state.newListings.FUTURES, 'FUTURES');
    } else if (market === 'FOREX') {
      checkForexWeekendBanner();
      if (isWeekend() && !opts.silent) {
        toast('Forex Market Closed', 'The Forex market is closed on weekends (Saturday & Sunday). Live price action & new signals resume Monday.', false);
      }
      state.fxResults = data.results;
      state.fxBb = data.bbBuys || [];
      $('fx-pair-count').textContent = data.results.length;
      $('fx-buy-count').textContent = data.results.filter((r) => r.type === 'BUY').length;
      $('fx-sell-count').textContent = data.results.filter((r) => r.type === 'SELL').length;
      $('fx-bb-count').textContent = state.fxBb.length;
      renderTable('FOREX');
    } else {
      state.spotResults = data.results;
      state.spotBb = data.bbBuys || [];
      window._lastNewPairs = data.newPairs || [];
      state.newListings.SPOT = data.newListings || [];
      state.upcomingListings.SPOT = data.upcoming || [];
      $('spot-buy-count').textContent = data.results.filter((r) => r.type === 'BUY').length;
      $('spot-bb-count').textContent = state.spotBb.length;
      $('spot-new-count').textContent = `${state.newListings.SPOT.length} / ${state.watch.length}`;
      renderTable('SPOT');
      renderBb('spot-bb-list', state.spotBb, 'SPOT');
      renderUpcoming(state.upcomingListings.SPOT, 'SPOT');
      renderNewList(state.newListings.SPOT, 'SPOT');
    }
    if (!opts.silent) toast(t('scan_done'), `${market} · ${data.results.length} pairs`, false);
    renderManualSignals();
  } catch (e) {
    // Electron wraps IPC failures as "Error invoking remote method 'market:scan': ..."
    // — strip that so a rate-limit / ban message reads cleanly.
    const msg = String(e?.message || e).replace(/^Error invoking remote method '[^']+':\s*(Error:\s*)?/, '');
    if (!opts.silent) toast(t('scan_err'), msg);
  } finally {
    if (!opts.silent) {
      $('scan-btn').disabled = !!state.license?.guard?.locked;
      $('scan-btn').textContent = t('scan');
      setTimeout(() => $('scan-progress').classList.add('hidden'), 800);
    }
  }
}

/** True while the Multi-TF toggle is active. */
function multiTfActive() {
  return !!$('multitf-btn')?.classList.contains('on');
}

/* ---- Multi-timeframe scan (additive to runScan) --------------------------
 * Reads the same top-volume list on 3m · 15m · 1h · 4h · 1d at once and shows
 * one signal per timeframe plus a confluence summary. The single-timeframe
 * scan above is untouched — this runs only while the Multi-TF toggle is on.
 */
const MTF_ORDER = ['3m', '15m', '1h', '4h', '1d'];

async function runScanMultiTf(opts = {}) {
  const market = opts.market || currentScanMarket();
  if (!opts.silent) {
    $('scan-btn').disabled = true;
    $('scan-btn').textContent = t('scanning');
    $('scan-progress').classList.remove('hidden');
    $('mtf-panel').classList.remove('hidden');
    $('mtf-market-pill').textContent = market;
    $('mtf-summary').textContent = 'Reading 3m · 15m · 1h · 4h · 1d…';
    $('mtf-table').innerHTML = '<tr><td colspan="9" class="tiny" style="padding:14px;color:var(--muted)">Scanning all timeframes…</td></tr>';
  }
  try {
    const limit = +$('scan-limit').value;
    const data = await window.cpe.scanMultiTf({ market, limit, timeframes: MTF_ORDER });
    if (data?.unsupported) {
      state.mtfResults = [];
      state.mtfMarket = market;
      renderMtfTable();
      if (!opts.silent) toast('Multi-Timeframe', 'Not available for FOREX — its feed is daily only.', false, 'error');
      return;
    }
    state.mtfResults = data?.results || [];
    state.mtfMarket = market;
    const buys = state.mtfResults.filter((r) => r.confluence.dir === 'BUY').length;
    const sells = state.mtfResults.filter((r) => r.confluence.dir === 'SELL').length;
    $('mtf-summary').textContent = `${state.mtfResults.length} pairs · ${buys} BUY · ${sells} SELL`;
    renderMtfTable();
    if (!opts.silent) toast('Multi-Timeframe', `${market} · ${state.mtfResults.length} pairs read on 5 timeframes`, false);
  } catch (e) {
    const msg = String(e?.message || e).replace(/^Error invoking remote method '[^']+':\s*(Error:\s*)?/, '');
    if (!opts.silent) toast(t('scan_err'), msg);
  } finally {
    if (!opts.silent) {
      $('scan-btn').disabled = !!state.license?.guard?.locked;
      $('scan-btn').textContent = t('scan');
      setTimeout(() => $('scan-progress').classList.add('hidden'), 800);
    }
  }
}

/** One timeframe cell: direction letter + score, coloured by the signal type. */
function mtfCell(f) {
  if (!f) return '<span class="tiny">—</span>';
  const letter = f.type === 'BUY' ? 'B' : f.type === 'SELL' ? 'S' : 'H';
  const grade = f.grade === 'HIGHER STRONG' ? ' hs' : f.grade === 'STRONG' ? ' strong' : '';
  const score = f.score > 0 ? `+${f.score}` : String(f.score);
  return `<span class="mtf-badge ${f.type}${grade}" title="${escapeHtml(f.grade || '')} · score ${f.score}">${letter}<i>${score}</i></span>`;
}

function renderMtfTable() {
  const tbody = $('mtf-table');
  if (!tbody) return;
  const rows = state.mtfResults || [];
  const q = ($('mtf-search')?.value || '').toLowerCase();
  const filtered = rows.filter((r) => !q || pairFuzzyMatch(r.symbol, q)
    || String(r.confluence.dir).toLowerCase().includes(q));
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="tiny" style="padding:14px;color:var(--muted)">
      ${rows.length ? 'Nothing matches that filter.' : 'Press the Multi-TF button to scan, or Scan Market while it is on.'}
    </td></tr>`;
    return;
  }
  const market = state.mtfMarket || currentScanMarket();
  tbody.innerHTML = filtered.map((r) => `
    <tr data-symbol="${escapeHtml(r.symbol)}" class="${r.confluence.dir === 'BUY' ? 'row-buy' : r.confluence.dir === 'SELL' ? 'row-sell' : ''}">
      <td><strong>${escapeHtml(displayPairSymbol(r.symbol))}</strong></td>
      ${MTF_ORDER.map((tf) => `<td>${mtfCell(r.frames?.[tf])}</td>`).join('')}
      <td><span class="badge ${r.confluence.dir}">${escapeHtml(r.confluence.label)}</span>${r.confluence.strongestGrade === 'HIGHER STRONG' || r.confluence.strongestGrade === 'STRONG' ? ` <span class="badge ${r.confluence.strongestGrade === 'STRONG' ? 'STRONG' : 'HIGHER-STRONG'}">${r.confluence.strongestGrade === 'STRONG' ? 'STRONG' : 'H.STRONG'}</span>` : ''}</td>
      <td>${formatNum(r.price)}</td>
      <td style="color:${r.change24h >= 0 ? 'var(--good,#22c55e)' : 'var(--bad,#ef4444)'}">${r.change24h >= 0 ? '+' : ''}${(r.change24h || 0).toFixed(2)}%</td>
    </tr>
  `).join('');

  tbody.querySelectorAll('tr[data-symbol]').forEach((tr) => {
    tr.onclick = () => selectSymbol(market, tr.dataset.symbol);
    tr.ondblclick = () => selectSymbol(market, tr.dataset.symbol, { popup: true });
  });
}

/* ---- Scalp desk (15m) — additive to runScan -----------------------------
 * Runs only while the Scalp toggle is on. Reads the 15-minute chart (Binance
 * for crypto, Yahoo for Forex) and lists just the strongest quick in/out
 * setups with tight ATR-based TP/SL. The single-TF and Multi-TF paths are
 * left exactly as they were.
 */
function scalpActive() {
  return !!$('scalp-btn')?.classList.contains('on');
}

async function runScanScalp(opts = {}) {
  const market = opts.market || currentScanMarket();
  if (!opts.silent) {
    $('scan-btn').disabled = true;
    $('scan-btn').textContent = t('scanning');
    $('scan-progress').classList.remove('hidden');
    $('scalp-panel').classList.remove('hidden');
    $('scalp-market-pill').textContent = market;
    $('scalp-summary').textContent = 'Reading 15m scalps…';
    $('scalp-table').innerHTML = '<tr><td colspan="9" class="tiny" style="padding:14px;color:var(--muted)">Scanning 15m for scalp setups…</td></tr>';
  }
  try {
    const limit = +$('scan-limit').value;
    const data = await window.cpe.scanScalp({ market, limit });
    if (data?.blocked) {
      state.scalpResults = [];
      state.scalpMarket = market;
      renderScalpTable();
      applyLicenseWarn({ guard: { locked: true, tamper: !!data.tamper } });
      if (!opts.silent) toast(t('guard_locked_title'), data.message || t('guard_locked_body'), false, 'error');
      return;
    }
    state.scalpResults = data?.results || [];
    state.scalpMarket = market;
    const buys = state.scalpResults.filter((r) => r.type === 'BUY').length;
    const sells = state.scalpResults.filter((r) => r.type === 'SELL').length;
    $('scalp-summary').textContent = `${state.scalpResults.length} scalp setup${state.scalpResults.length === 1 ? '' : 's'} · ${buys} BUY · ${sells} SELL`;
    renderScalpTable();
    if (!opts.silent) toast('Scalp 15m', state.scalpResults.length
      ? `${market} · ${state.scalpResults.length} strong scalp setup${state.scalpResults.length === 1 ? '' : 's'}`
      : `${market} · no strong scalp setup right now — chop, wait`, false);
  } catch (e) {
    const msg = String(e?.message || e).replace(/^Error invoking remote method '[^']+':\s*(Error:\s*)?/, '');
    if (!opts.silent) toast(t('scan_err'), msg);
  } finally {
    if (!opts.silent) {
      $('scan-btn').disabled = !!state.license?.guard?.locked;
      $('scan-btn').textContent = t('scan');
      setTimeout(() => $('scan-progress').classList.add('hidden'), 800);
    }
  }
}

function renderScalpTable() {
  const tbody = $('scalp-table');
  if (!tbody) return;
  const rows = state.scalpResults || [];
  const q = ($('scalp-search')?.value || '').toLowerCase();
  const filtered = rows.filter((r) => !q || pairFuzzyMatch(r.symbol, q)
    || String(r.type).toLowerCase().includes(q));
  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="tiny" style="padding:14px;color:var(--muted)">
      ${rows.length ? 'Nothing matches that filter.' : 'No strong 15m scalp setup right now. Press the Scalp button to scan (or Scan Market while it is on).'}
    </td></tr>`;
    return;
  }
  const market = state.scalpMarket || currentScanMarket();
  tbody.innerHTML = filtered.map((r) => `
    <tr data-symbol="${escapeHtml(r.symbol)}" class="${r.type === 'BUY' ? 'row-buy' : 'row-sell'}">
      <td><strong>${escapeHtml(displayPairSymbol(r.symbol))}</strong><div class="tiny">${escapeHtml(r.trend || '')}</div></td>
      <td><span class="badge ${r.type}">${r.type}</span> <span class="badge STRONG">STRONG</span></td>
      <td>${formatNum(r.entry)}<div class="tiny">${escapeHtml(r.entryType || 'MARKET')}</div></td>
      <td class="scalp-tp">${formatNum(r.tp1)}</td>
      <td class="scalp-tp">${formatNum(r.tp2)}</td>
      <td class="scalp-sl">${formatNum(r.sl)}</td>
      <td><strong>${r.rr}</strong></td>
      <td>${r.atrPct}%</td>
      <td>${r.score > 0 ? '+' + r.score : r.score}</td>
    </tr>
  `).join('');

  tbody.querySelectorAll('tr[data-symbol]').forEach((tr) => {
    tr.onclick = () => selectSymbol(market, tr.dataset.symbol);
    tr.ondblclick = () => selectSymbol(market, tr.dataset.symbol, { popup: true });
  });
}

function rowsFor(market) {
  if (market === 'FUTURES') return state.futResults;
  if (market === 'FOREX') return state.fxResults;
  return state.spotResults;
}

function renderTable(market) {
  const rows = rowsFor(market).filter((r) => allowCjkPairs() || isAsciiPairSymbol(r.symbol));
  const searchEl = market === 'FUTURES' ? $('fut-search') : market === 'FOREX' ? $('fx-search') : $('spot-search');
  const q = (searchEl && searchEl.value) || '';
  const qLower = q.toLowerCase();
  const filtered = rows.filter((r) =>
    !q
    || pairFuzzyMatch(r.symbol, q)
    || r.type.toLowerCase().includes(qLower)
    || String(r.grade || '').toLowerCase().includes(qLower)
    || String(r.score || '').includes(qLower)
  );
  const tbody = market === 'FUTURES' ? $('fut-table') : market === 'FOREX' ? $('fx-table') : $('spot-table');
  if (!tbody) return;
  const sel = market === 'FUTURES' ? state.futSelected : market === 'FOREX' ? state.fxSelected : state.spotSelected;
  const isFav = (symbol) => (state.watch || []).some((w) => w.symbol === symbol && w.market === market);
  const isNew = (symbol) => (state.newListings?.[market] || [])
    .some((n) => (typeof n === 'string' ? n : n.symbol) === symbol);
  const withWatch = market !== 'FOREX';
  if (!filtered.length) {
    const cols = withWatch ? 9 : 8;
    tbody.innerHTML = `<tr><td colspan="${cols}" class="tiny" style="padding:14px;color:var(--muted)">
      ${rows.length ? 'Nothing matches that filter — clear the box to see every pair in this tab.' : 'Loading every signal in this tab…'}
    </td></tr>`;
    return;
  }
  tbody.innerHTML = filtered.map((r) => `
    <tr data-symbol="${escapeHtml(r.symbol)}" class="${sel === r.symbol ? 'selected' : ''} ${isFav(r.symbol) ? 'row-fav' : r.type === 'BUY' ? 'row-buy' : r.type === 'SELL' ? 'row-sell' : ''}">
      <td><strong>${escapeHtml(displayPairSymbol(r.symbol))}</strong>${isNew(r.symbol) ? ' <span class="new-flag">NEW</span>' : ''}</td>
      <td><span class="badge ${r.type}">${(market === 'FUTURES' || market === 'FOREX') ? (r.type === 'SELL' ? 'SHORT' : r.type === 'BUY' ? 'LONG' : r.type) : r.type}</span>${(r.type === 'BUY' || r.type === 'SELL') && r.entryType ? ` <span class="badge" style="background:${r.entryType === 'LIMIT' ? 'rgba(251,191,36,.16)' : 'rgba(34,197,94,.16)'};color:${r.entryType === 'LIMIT' ? '#fbbf24' : '#22c55e'};font-weight:700" title="${escapeHtml(r.entryZone ? `${r.entryZone.kind || 'zone'} ${formatNum(r.entryZone.low)}–${formatNum(r.entryZone.high)}` : '')}">${escapeHtml(r.entryType)}</span>` : ''}${r.grade === 'HIGHER STRONG' ? ` <span class="badge HIGHER-STRONG" title="${escapeHtml(r.higherTimeframe?.interval || '')} trend confirmed">HIGHER STRONG</span>` : r.grade === 'STRONG' ? ` <span class="badge STRONG">STRONG</span>` : r.grade === 'CAUTION' ? ` <span class="badge CAUTION">CAUTION</span>` : ''}</td>
      <td>${formatNum(r.price)}</td>
      <td>${formatNum(r.entry)}</td>
      <td>${formatNum(r.tp1)}</td>
      <td>${formatNum(r.tp2)}</td>
      <td>${formatNum(r.sl)}</td>
      <td>${r.score}</td>
      ${withWatch ? `<td><button type="button" class="btn ghost mini watch-btn${isFav(r.symbol) ? ' on' : ''}" data-s="${escapeHtml(r.symbol)}">${isFav(r.symbol) ? '★' : '☆'}</button></td>` : ''}
    </tr>
  `).join('') || `<tr><td colspan="${withWatch ? 9 : 8}">Scan</td></tr>`;

  let rowClickTimer = null;
  tbody.querySelectorAll('tr[data-symbol]').forEach((tr) => {
    tr.onclick = (e) => {
      if (e.target.classList.contains('watch-btn')) return;
      // Wait a beat so a double-click is not wasted on a single-click analyze.
      if (rowClickTimer) { clearTimeout(rowClickTimer); rowClickTimer = null; return; }
      rowClickTimer = setTimeout(() => { rowClickTimer = null; selectSymbol(market, tr.dataset.symbol); }, 200);
    };
    tr.ondblclick = (e) => {
      if (e.target.classList.contains('watch-btn')) return;
      if (rowClickTimer) { clearTimeout(rowClickTimer); rowClickTimer = null; }
      selectSymbol(market, tr.dataset.symbol, { popup: true });
    };
  });
  tbody.querySelectorAll('.watch-btn').forEach((btn) => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      state.watch = await window.cpe.watchToggle({ symbol: btn.dataset.s, market });
      const on = (state.watch || []).some((w) => w.symbol === btn.dataset.s && w.market === market);
      refreshWatch();
      renderTable(market);
      toast(t('watchlist'), `${btn.dataset.s} — ${on ? t('watch_added') : t('watch_removed')}`, false);
    };
  });
}

/** Move the row highlight without rebuilding the table (keeps rows clickable). */
function updateTableSelection(market) {
  const tbody = market === 'FUTURES' ? $('fut-table') : market === 'FOREX' ? $('fx-table') : $('spot-table');
  if (!tbody) return;
  const sel = market === 'FUTURES' ? state.futSelected : market === 'FOREX' ? state.fxSelected : state.spotSelected;
  tbody.querySelectorAll('tr[data-symbol]').forEach((tr) => {
    tr.classList.toggle('selected', tr.dataset.symbol === sel);
  });
}

async function selectSymbol(market, symbol, opts = {}) {
  if (market === 'SPOT') state.spotSelected = symbol;
  else if (market === 'FUTURES') state.futSelected = symbol;
  else state.fxSelected = symbol;
  // Only move the highlight — rebuilding the rows here would replace the <tr>
  // the user just clicked, so a following double-click would never land on it.
  updateTableSelection(market);
  const interval = $('interval-select').value;
  try {
    const full = await window.cpe.analyze({ symbol, market, interval });
    full._demoMode = !!state.demoMode;
    full._liveMode = !state.demoMode;
    const detailId = market === 'FUTURES' ? 'fut-detail' : market === 'FOREX' ? 'fx-detail' : 'spot-detail';
    const chartId = market === 'FUTURES' ? 'fut-chart' : market === 'FOREX' ? 'fx-chart' : 'spot-chart';
    renderDetail(detailId, full);
    window.CPEChart.draw($(chartId), full);
    fillTradeForm(full, market);
    state.deskDetail = state.deskDetail || {};
    state.deskDetail[market] = full;
    if (opts.popup) openChartPopup(full);
  } catch (e) {
    toast('Analyze error', e.message || String(e));
  }
}

/**
 * Open Chart Lab on one pair with a live chart — the double-click target for
 * the upcoming-listings and new-pairs chips.
 */
async function openLiveChart(market, symbol) {
  const m = ['SPOT', 'FUTURES', 'FOREX'].includes(market) ? market : 'SPOT';
  // Set the desk first so the Chart Lab loads the right pair list on open.
  if ($('lab-market')) $('lab-market').value = m;
  document.querySelector('.nav-btn[data-view="chartlab"]')?.click();
  await (state.labPairsPromise || loadLabPairs());
  const sel = $('lab-pair');
  if (sel) {
    // The pair is already in the list for a live symbol; keep it if it is not.
    if (!Array.from(sel.options).some((o) => o.value === symbol)) {
      sel.insertAdjacentHTML('afterbegin', `<option value="${escapeHtml(symbol)}">${escapeHtml(symbol)}</option>`);
    }
    sel.value = symbol;
  }
  await runLabAnalyze();
}

/* ——— projected-path timing ————————————————————————————————————
 * The signal route and the 3M outlook are drawn one after the other — never at
 * the same moment — and slowly enough to follow: entry → TP2, a short breath,
 * then the 3M path, a hold, and (on the looping charts) around again. */
const PROJ_GROW_MS = 2600;   // signal route: entry → TP2
const PROJ_GAP_MS = 500;     // breathe before the 3M outlook starts
const FC_GROW_MS = 2800;     // 3M outlook: start → target
const PROJ_HOLD_MS = 2000;   // pause on the finished picture

/** Where the two reveal bars sit `dt` ms into a cycle. */
function projectionReveal(dt, hasProj, hasFc) {
  const P = hasProj ? PROJ_GROW_MS : 0;
  const G = (hasProj && hasFc) ? PROJ_GAP_MS : 0;
  const F = hasFc ? FC_GROW_MS : 0;
  const ease = (x) => 1 - Math.pow(1 - Math.max(0, Math.min(1, x)), 3);
  const proj = hasProj ? ease(dt / P) : 1;
  let fc = 1;
  if (hasFc) fc = dt <= P + G ? 0 : ease((dt - P - G) / F);
  return { proj, fc, cycle: P + G + F + PROJ_HOLD_MS };
}

let popupProjAnim = null;

function openChartPopup(s) {
  if (!s || !$('chart-popup')) return;
  // Work on a copy so the future pane + projection don't leak onto the desk chart
  const pop = Object.assign({}, s, {
    _future: true,
    _futureRatio: 0.36,
    _panOffset: 0,
    _panPx: 0
  });
  const C = window.CPEChart;
  pop._projection = C && C.buildProjection ? C.buildProjection(pop) : null;
  pop._showProjection = !!pop._projection;
  pop._projProgress = 0;
  // 3M forecast — same future space as the replay path; animates alongside it
  pop._forecast = C && C.buildForecast ? C.buildForecast(pop) : null;
  pop._showForecast = !!pop._forecast;
  pop._forecastProgress = 0;
  state.popupSignal = pop;
  const label = pop.symbol === 'XAUUSD' ? 'XAUUSD · Gold / USD' : (pop.symbol === 'XAGUSD' ? 'XAGUSD · Silver / USD' : pop.symbol);
  if ($('chart-popup-eyebrow')) {
    $('chart-popup-eyebrow').textContent =
      `${pop.market || ''} · Chart ${pop.interval || ''} (${intervalLabel(pop.interval)}) · ${state.demoMode ? 'DEMO' : 'LIVE'}`;
  }
  if ($('chart-popup-title')) {
    const dir = pop._projection ? (pop._projection.long ? ' · LONG' : ' · SHORT') : '';
    $('chart-popup-title').textContent = `${label} · ${pop.type} · score ${pop.score}${dir}`;
  }
  $('chart-popup').classList.remove('hidden');
  if ($('chart-popup-interval') && pop.interval) $('chart-popup-interval').value = pop.interval;
  renderDetail('chart-popup-detail', pop);
  try {
    window.CPEChart.draw($('chart-popup-canvas'), pop);
  } catch { /* ignore */ }
  syncPopupChartToggles();
  startPopupProjection();
}

/** Plays (or replays) the projected path from the entry to the target. */
function startPopupProjection() {
  const C = window.CPEChart;
  const canvas = $('chart-popup-canvas');
  const sig = state.popupSignal;
  if (popupProjAnim) { cancelAnimationFrame(popupProjAnim); popupProjAnim = null; }
  // A HOLD signal has a 3M forecast but no replay projection — animate whichever exists.
  const hasProj = !!(sig && sig._projection && sig._showProjection !== false);
  const hasFc = !!(sig && sig._forecast && sig._showForecast !== false);
  if (!C || !canvas || !sig) return;
  // Both layers hidden — paint the static chart once so the cleared canvas shows.
  if (!hasProj && !hasFc) { try { C.draw(canvas, sig); } catch { /* ignore */ } return; }
  if (hasProj) sig._projProgress = 0;
  if (hasFc) sig._forecastProgress = 0;
  const begin = performance.now();
  let last = 0;
  const loop = (ts) => {
    if (state.popupSignal !== sig || $('chart-popup')?.classList.contains('hidden')) {
      popupProjAnim = null;
      return;
    }
    const dt = ts - begin;
    const r = projectionReveal(dt, hasProj, hasFc);
    if (hasProj) sig._projProgress = r.proj;
    if (hasFc) sig._forecastProgress = r.fc;
    // The final frame is always painted; in-between frames are capped at ~30 fps.
    if (dt >= r.cycle || ts - last >= 33) {
      last = ts;
      try { C.draw(canvas, sig); } catch { /* ignore */ }
    }
    // One-shot: once both routes are fully drawn the canvas is static, so stop the
    // frame loop instead of repainting a large chart forever.
    if (dt >= r.cycle) { popupProjAnim = null; return; }
    popupProjAnim = requestAnimationFrame(loop);
  };
  popupProjAnim = requestAnimationFrame(loop);
}

function closeChartPopup() {
  if (popupProjAnim) { cancelAnimationFrame(popupProjAnim); popupProjAnim = null; }
  $('chart-popup')?.classList.add('hidden');
  state.popupSignal = null;
}

/**
 * Saves a PNG of the popup chart. The chart canvas is composited onto an
 * offscreen canvas with a header (pair / timeframe / signal) and a footer
 * (brand + timestamp) so the shared image stands on its own.
 */
async function savePopupChartImage() {
  const sig = state.popupSignal;
  const canvas = $('chart-popup-canvas');
  if (!sig || !canvas || !canvas.width || !canvas.height) return;
  const C = window.CPEChart;
  // Paint the finished projection / forecast so the shot is not caught mid-animation.
  if (sig._projection && sig._showProjection !== false) sig._projProgress = 1;
  if (sig._forecast && sig._showForecast !== false) sig._forecastProgress = 1;
  try { if (C && C.draw) C.draw(canvas, sig); } catch { /* ignore */ }

  const pad = Math.round(canvas.width * 0.02);
  const headH = Math.round(canvas.height * 0.17);
  const footH = Math.round(canvas.height * 0.09);
  const out = document.createElement('canvas');
  out.width = canvas.width;
  out.height = headH + canvas.height + footH;
  const ctx = out.getContext('2d');
  ctx.fillStyle = '#0b1220';
  ctx.fillRect(0, 0, out.width, out.height);

  const eyebrow = ($('chart-popup-eyebrow')?.textContent || '').trim();
  const title = ($('chart-popup-title')?.textContent
    || `${sig.market || ''} ${sig.symbol || ''} ${sig.type || ''}`).trim();
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#93c5fd';
  ctx.font = `600 ${Math.round(headH * 0.3)}px system-ui, sans-serif`;
  ctx.fillText(eyebrow, pad, headH * 0.32);
  ctx.fillStyle = '#e5e7eb';
  ctx.font = `700 ${Math.round(headH * 0.44)}px system-ui, sans-serif`;
  ctx.fillText(title, pad, headH * 0.7);

  ctx.drawImage(canvas, 0, headH);

  ctx.fillStyle = '#64748b';
  ctx.font = `500 ${Math.round(footH * 0.44)}px system-ui, sans-serif`;
  ctx.fillText('CPE Trade Pro', pad, headH + canvas.height + footH * 0.5);
  ctx.textAlign = 'right';
  ctx.fillText(new Date().toLocaleString(), out.width - pad, headH + canvas.height + footH * 0.5);
  ctx.textAlign = 'left';

  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const name = `CPE_${String(sig.symbol || 'chart').replace(/[^\w.-]+/g, '_')}_${sig.interval || ''}_${stamp}.png`;
  try {
    const r = await window.cpe.saveChartImage({ dataUrl: out.toDataURL('image/png'), name });
    if (r?.ok) toast(t('shot_saved'), r.path || '', false);
    else if (!r?.canceled) toast(t('shot_failed'), r?.message || '', false, 'error');
  } catch (e) {
    toast(t('shot_failed'), e.message || String(e), false, 'error');
  }
}

/** Keep the popup's "Signal targets" / "3M forecast" buttons in step with the signal. */
function syncPopupChartToggles() {
  const sig = state.popupSignal;
  const tb = $('chart-popup-targets');
  const fb = $('chart-popup-forecast');
  if (tb) {
    const on = !!(sig && sig._projection && sig._showProjection !== false);
    tb.classList.toggle('active', on);
    tb.disabled = !(sig && sig._projection);
  }
  if (fb) {
    const on = !!(sig && sig._forecast && sig._showForecast !== false);
    fb.classList.toggle('active', on);
    fb.disabled = !(sig && sig._forecast);
  }
}

/* ——— projected-path animation on the other charts (Chart Lab · live chart) ———
 * The popup draws its forecast once; these charts keep it looping so the line
 * visibly "predicts the future" entry → target, holds, then replays. */
const projectionLoops = new Map(); // canvasId -> { raf }

/** Start (once) an auto-replaying projection animation on a chart canvas. */
function ensureProjectionLoop(canvasId, get) {
  if (projectionLoops.has(canvasId)) return;
  const C = window.CPEChart;
  const canvas = $(canvasId);
  if (!C || !canvas) return;
  const token = { raf: 0 };
  const FRAME_MS = 50; // 20 fps is plenty for this line and keeps the UI thread free
  let t0 = performance.now();
  let last = 0;
  let lastSig = null;
  const loop = (ts) => {
    if (projectionLoops.get(canvasId) !== token) return;
    const sig = get();
    const popup = $('chart-popup');
    // Skip the repaint while the page is hidden, the chart is off-screen, or the
    // signal popup covers it — the frame loop keeps running but costs nothing.
    const idle = document.hidden
      || !canvas.isConnected
      || !canvas.getClientRects().length
      || (popup && !popup.classList.contains('hidden'));
    const hasProj = !!(sig && sig._projection && sig._showProjection !== false);
    const hasFc = !!(sig && sig._forecast && sig._showForecast !== false);
    if (!sig || (!hasProj && !hasFc) || idle) {
      token.raf = requestAnimationFrame(loop);
      return;
    }
    if (sig !== lastSig) { lastSig = sig; t0 = ts; } // new signal → replay from the start
    // Both routes reveal one after the other — signal first, a short breath, then
    // the 3M outlook — then hold on the finished picture and replay.
    const r = projectionReveal(ts - t0, hasProj, hasFc);
    if (hasProj) sig._projProgress = r.proj;
    if (hasFc) sig._forecastProgress = r.fc;
    if (ts - t0 >= r.cycle) t0 = ts;
    if (ts - last >= FRAME_MS) {
      last = ts;
      try { C.draw(canvas, sig); } catch { /* ignore */ }
    }
    token.raf = requestAnimationFrame(loop);
  };
  projectionLoops.set(canvasId, token);
  token.raf = requestAnimationFrame(loop);
}

function stopProjectionLoop(canvasId) {
  const st = projectionLoops.get(canvasId);
  if (!st) return;
  cancelAnimationFrame(st.raf);
  projectionLoops.delete(canvasId);
}

/** Re-run the analysis for the popup's symbol on a new timeframe (popup chart only). */
async function reanalyzePopup(interval) {
  const cur = state.popupSignal;
  if (!cur || !interval || !cur.symbol || !cur.market) return;
  try {
    const full = await window.cpe.analyze({ symbol: cur.symbol, market: cur.market, interval });
    full._demoMode = !!state.demoMode;
    full._liveMode = !state.demoMode;
    openChartPopup(full);
  } catch (e) {
    toast('Analyze error', e.message || String(e));
  }
}

function setupChartPopupUi() {
  $('chart-popup-close')?.addEventListener('click', closeChartPopup);
  $('chart-popup-close-2')?.addEventListener('click', closeChartPopup);
  $('chart-popup')?.addEventListener('click', (e) => {
    if (e.target === $('chart-popup')) closeChartPopup();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('chart-popup')?.classList.contains('hidden')) closeChartPopup();
  });
  const popCanvas = () => $('chart-popup-canvas');
  $('chart-popup-zoom-in')?.addEventListener('click', () => {
    const c = popCanvas();
    if (c) window.CPEChart.zoomCanvas(c, 1);
  });
  $('chart-popup-zoom-out')?.addEventListener('click', () => {
    const c = popCanvas();
    if (c) window.CPEChart.zoomCanvas(c, -1);
  });
  $('chart-popup-zoom-reset')?.addEventListener('click', () => {
    const c = popCanvas();
    if (c) window.CPEChart.resetCanvasZoom(c);
  });
  $('chart-popup-replay')?.addEventListener('click', startPopupProjection);
  $('chart-popup-targets')?.addEventListener('click', () => {
    const sig = state.popupSignal;
    if (!sig || !sig._projection) return;
    sig._showProjection = sig._showProjection === false;
    startPopupProjection();
    syncPopupChartToggles();
  });
  $('chart-popup-forecast')?.addEventListener('click', () => {
    const sig = state.popupSignal;
    if (!sig || !sig._forecast) return;
    sig._showForecast = sig._showForecast === false;
    startPopupProjection();
    syncPopupChartToggles();
  });
  $('chart-popup-interval')?.addEventListener('change', (e) => reanalyzePopup(e.target.value));
  $('chart-popup-shot')?.addEventListener('click', savePopupChartImage);
  $('chart-popup-trade')?.addEventListener('click', () => {
    if (state.popupSignal) fillTradeForm(state.popupSignal, state.popupSignal.market || state.market);
    closeChartPopup();
    document.querySelector('.nav-btn[data-view="trade"]')?.click();
  });
}

function uiLangCode() {
  return (window.CPE_I18N && window.CPE_I18N.current) || 'en';
}
function allowCjkPairs() {
  return uiLangCode() === 'ja';
}
function isAsciiPairSymbol(sym) {
  return /^[A-Z0-9]+$/i.test(String(sym || ''));
}
function displayPairSymbol(sym) {
  const s = String(sym || '');
  if (allowCjkPairs() || isAsciiPairSymbol(s)) return s;
  // Hide CJK / other scripts unless Japanese UI is selected
  return s.replace(/[^\x00-\x7F]/g, '') || s;
}
function filterVisiblePairs(list) {
  const arr = Array.isArray(list) ? list : [];
  if (allowCjkPairs()) return arr;
  return arr.filter(isAsciiPairSymbol);
}

function intervalLabel(iv) {
  const map = {
    '1m': '1 minute', '3m': '3 minutes', '5m': '5 minutes', '15m': '15 minutes',
    '30m': '30 minutes', '1h': '1 hour', '2h': '2 hours', '4h': '4 hours',
    '6h': '6 hours', '12h': '12 hours', '1d': '1 day', '1w': '1 week', '1M': '1 month'
  };
  return map[iv] || iv || '—';
}

function renderDetail(elId, s) {
  if (!s) return;
  const bb = s.bollinger || {};
  const candle = s.candle;
  const biasColor = candle?.bias === 'BUY' ? '#22c55e' : candle?.bias === 'SELL' ? '#ef4444' : '#f0b429';
  const iv = s.interval || $('interval-select')?.value || '—';
  const modeLine = state.demoMode
    ? `<div class="price-line" style="color:var(--fut)">${escapeHtml(t('demo_chart_tag'))}</div>`
    : `<div class="price-line" style="color:#f87171">${escapeHtml(t('live_chart_tag'))}</div>`;
  const patternHtml = `
    <div class="pattern-card" style="border-color:${biasColor}55">
      <span class="pc-label">${escapeHtml(t('candle_stick_pattern'))}</span>
      <strong style="color:${biasColor}">${escapeHtml(candle?.name || t('candle_no_pattern'))}</strong>
      <span class="pc-bias" style="color:${biasColor}">${escapeHtml(candle?.bias || '—')}</span>
      <p>${escapeHtml(candle?.note || t('candle_no_pattern_note'))}</p>
    </div>`;
  const pairShow = displayPairSymbol(s.symbol);
  const dirLabel = (s.market === 'FUTURES' || s.market === 'FOREX')
    ? (s.direction === 'SHORT' ? 'SHORT' : s.direction === 'LONG' ? 'LONG' : s.type)
    : s.type;
  const tradeable = s.type === 'BUY' || s.type === 'SELL';
  const entryBadge = tradeable
    ? ` <span class="badge" style="background:${s.entryType === 'LIMIT' ? 'rgba(251,191,36,.18)' : 'rgba(34,197,94,.18)'};color:${s.entryType === 'LIMIT' ? '#fbbf24' : '#22c55e'};font-weight:700">${escapeHtml(s.entryType || 'MARKET')}${s.entryType === 'LIMIT' && s.entryLimit != null ? ` @ ${formatNum(s.entryLimit)}` : ''}</span>`
    : '';
  const ctx = s.context || {};
  const contextLine = s.context
    ? `<div class="price-line">Trend <strong>${escapeHtml(ctx.trend || 'SIDE')}</strong> · Turn ${escapeHtml(ctx.turn || 'NONE')}${ctx.toppedOut ? ' · <span style="color:#f87171">TOPPED OUT</span>' : ''}${ctx.bottomedOut ? ' · <span style="color:#22c55e">BOTTOM TURN</span>' : ''}${ctx.atLowerBand ? ' · at lower band' : ''}</div>`
    : '';
  const blockedLine = s.blocked
    ? `<div class="price-line" style="color:#f0b429">⏸ ${escapeHtml(s.blocked)}</div>`
    : '';
  const vol = s.volatility || null;
  const volColor = vol?.level === 'EXTREME' ? '#ef4444' : vol?.level === 'HIGH' ? '#f59e0b' : vol?.level === 'LOW' ? '#38bdf8' : '#22c55e';
  const volLine = vol
    ? `<div class="price-line">Volatility <strong style="color:${volColor}">${escapeHtml(vol.level)}</strong> · range ${vol.atrPct}% · x${vol.ratio} normal · BB width ${vol.bbWidthPct}%${s.volatilityDowngraded ? ' · <span style="color:#f59e0b">STRONG → CAUTION</span>' : ''}</div>`
    : '';
  const sent = s.sentiment || null;
  const frTxt = sent && sent.fundingRate != null
    ? `Funding ${sent.fundingRate}%${sent.fundingBias && sent.fundingBias !== 'NEUTRAL' ? ` (${escapeHtml(sent.fundingBias === 'LONG_CROWDED' ? 'longs crowded' : 'shorts crowded')})` : ''}`
    : '';
  const fgTxt = sent && sent.fearGreed ? `Fear & Greed ${sent.fearGreed.value} ${escapeHtml(sent.fearGreed.label)}` : '';
  const sentParts = [frTxt, fgTxt].filter(Boolean).join(' · ');
  const sentimentLine = sentParts
    ? `<div class="price-line">Sentiment ${sentParts}${s.sentimentDowngraded ? ' · <span style="color:#f59e0b">STRONG → CAUTION</span>' : ''}</div>`
    : '';
  const smcData = s.smc || null;
  const struct = smcData && smcData.structure;
  const lastEv = struct && struct.lastEvent;
  const smcLine = struct
    ? `<div class="price-line">SMC <strong style="color:${smcData.bias === 'BULLISH' ? '#22c55e' : smcData.bias === 'BEARISH' ? '#ef4444' : '#f0b429'}">${escapeHtml(smcData.bias)}</strong> (${smcData.score}) · ${escapeHtml(struct.trend)}${lastEv ? ` · last ${escapeHtml(lastEv.type)} ${escapeHtml(lastEv.kind === 'bull' ? 'up' : 'down')} ${formatNum(lastEv.level)}` : ''}${s.entryZone ? ` · entry ${escapeHtml(s.entryZone.kind || 'zone')} ${formatNum(s.entryZone.low)}–${formatNum(s.entryZone.high)}` : ''}</div>`
    : '';
  $(elId).classList.remove('empty');
  $(elId).innerHTML = `
    ${modeLine}
    <div class="price-line chart-tf-line"><strong>Chart time:</strong> ${escapeHtml(iv)} (${escapeHtml(intervalLabel(iv))}) · ${escapeHtml(s.market || '')}</div>
    <div class="price-line"><strong>${escapeHtml(pairShow)}</strong> · ${escapeHtml(dirLabel)}${entryBadge} · ${escapeHtml(s.grade)} · score ${s.score}</div>
    ${smcLine}
    ${contextLine}
    ${blockedLine}
    <div class="price-line">Price ${formatNum(s.price)} | E ${formatNum(s.entry)} | TP1 ${formatNum(s.tp1)} | TP2 ${formatNum(s.tp2)} | SL ${formatNum(s.sl)}</div>
    <div class="price-line">BB U ${formatNum(bb.upper)} · M ${formatNum(bb.mid)} · L ${formatNum(bb.lower)}${bb.touchLower ? ' · LOWER TOUCH' : ''}</div>
    <div class="price-line">RSI ${s.rsi ?? '—'} · MACD hist ${formatNum(s.macdHist)}</div>
    <div class="price-line">ATR ${s.atrPct != null ? s.atrPct + '%' : '—'} · SAR ${s.sar != null ? (s.sarTrend === 'up' ? '▲ ' : '▼ ') + formatNum(s.sar) : '—'} · MFI ${s.mfi ?? '—'} · %R ${s.williamsR ?? '—'} · CCI ${s.cci ?? '—'}</div>
    ${(s.rsiDivergence || s.macdDivergence) ? `<div class="price-line">Divergence ${s.rsiDivergence ? 'RSI ' + escapeHtml(s.rsiDivergence) : ''}${s.rsiDivergence && s.macdDivergence ? ' · ' : ''}${s.macdDivergence ? 'MACD ' + escapeHtml(s.macdDivergence) : ''}</div>` : ''}
    ${volLine}
    ${sentimentLine}
    ${patternHtml}
    <h4>${escapeHtml(t('why'))} · ${escapeHtml(iv)} chart</h4>
    <ul>${(s.reasons || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
    <h4>${escapeHtml(t('psych'))}</h4>
    <ul>${(s.psychology || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
    <h4>${escapeHtml(t('fib'))}</h4>
    <div class="price-line">0 ${formatNum(s.fib?.level0)} · 38.2 ${formatNum(s.fib?.level382)} · 50 ${formatNum(s.fib?.level500)} · 61.8 ${formatNum(s.fib?.level618)} · 100 ${formatNum(s.fib?.level100)}</div>
  `;
}

function renderBb(elId, list, market) {
  const el = $(elId);
  if (!list.length) {
    el.innerHTML = `<span class="tiny">${escapeHtml(t('no_bb'))}</span>`;
    return;
  }
  el.innerHTML = list.map((s) =>
    `<button type="button" class="chip" data-s="${s.symbol}"><strong>${s.symbol}</strong> ${formatNum(s.entry)} → TP ${formatNum(s.tp1)}</button>`
  ).join('');
  el.querySelectorAll('.chip').forEach((c) => {
    c.onclick = () => selectSymbol(market, c.dataset.s, { popup: true });
  });
}

/** Human-readable listing stamp: "Listed 2026-09-01 · 12 days ago". */
function formatListingDate(iso, days) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const date = d.toISOString().slice(0, 10);
  if (days == null) return `Listed ${date}`;
  const rel = days <= 0 ? 'today' : days === 1 ? '1 day ago' : `${days} days ago`;
  return `Listed ${date} · ${rel}`;
}

/** How close an upcoming listing is — drives the highlight tier. */
function listingTier(ms) {
  const diff = ms - Date.now();
  if (diff <= 30 * 60e3) return 'half';    // half an hour away — most urgent
  if (diff <= 3 * 3600e3) return 'soon';   // within 3 hours
  if (diff <= 24 * 3600e3) return 'day1';  // within a day
  if (diff <= 3 * 86400e3) return 'day3';  // within 3 days
  return 'later';
}

/** "25 min" (until), "3h 10m", "4 days". */
function countdownText(ms) {
  const diff = ms - Date.now();
  const mins = Math.round(Math.abs(diff) / 60000);
  if (mins < 60) return diff <= 0 ? `${mins} ${t('min')} ${t('ago')}` : `${mins} ${t('min')}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m`;
  const days = Math.round(hrs / 24);
  return `${days} ${days > 1 ? t('days') : t('day')}`;
}

/**
 * Upcoming-listings panel: coins Binance has announced but NOT listed yet.
 * Sorted soonest first, so the coin opening next sits at the top. Each chip
 * shows the pair, the desk (SPOT/FUTURES), the listing date/time and a
 * countdown; the closer the open, the stronger the highlight. A "now live"
 * notification fires from the main process at the moment of the open.
 */
function renderUpcoming(list, market = 'SPOT') {
  const el = $(market === 'FUTURES' ? 'fut-upcoming-list' : 'spot-upcoming-list');
  if (!el) return;
  const now = Date.now();
  const items = (list || [])
    .filter((x) => x && x.symbol && x.listingAt && x.listingAt > now)
    .sort((a, b) => a.listingAt - b.listingAt);
  if (!items.length) {
    el.innerHTML = `<span class="tiny">${escapeHtml(t('no_upcoming'))}</span>`;
    return;
  }
  el.innerHTML = items.map((x) => {
    const tier = listingTier(x.listingAt);
    const when = new Date(x.listingAt).toLocaleString([], {
      month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
    });
    const label = x.estimated ? `${escapeHtml(t('announced'))} ${escapeHtml(when)}` : escapeHtml(when);
    const desk = x.desk === 'FUTURES' ? 'FUTURES' : 'SPOT';
    return `<span class="chip up-chip up-${tier}" data-t="${tier}" data-m="${desk}" data-s="${escapeHtml(x.symbol)}" title="${escapeHtml(x.title || '')}">
      <strong>${escapeHtml(displayPairSymbol(x.symbol))}</strong>
      <span class="badge desk-badge">${desk}</span>
      ${tier === 'half' ? `<span class="badge BUY">${escapeHtml(t('listing_soon'))}</span>` : ''}
      <span class="tiny listing-date">${label} · ${escapeHtml(countdownText(x.listingAt))}</span>
    </span>`;
  }).join('');
}

/**
 * New-listing panel. Each chip shows the pair, its Binance listing date (and
 * days since), the current signal grade + entry — refreshed on every scan.
 * A brand-new detection (first seen by this app) is flagged with NEW.
 */
function renderNewList(list, market = 'SPOT') {
  const el = $(market === 'FUTURES' ? 'fut-new-list' : 'spot-new-list');
  if (!el) return;
  const items = (list || []).filter((x) => x && (x.symbol || typeof x === 'string'));
  if (!items.length) {
    el.innerHTML = `<span class="tiny">${escapeHtml(t('no_new'))}</span>`;
    return;
  }
  const dirLabel = (sig) => {
    if (!sig) return '';
    if (market === 'FUTURES') return sig.type === 'SELL' ? 'SHORT' : sig.type === 'BUY' ? 'LONG' : sig.type;
    return sig.type;
  };
  el.innerHTML = items.map((x) => {
    const sym = typeof x === 'string' ? x : x.symbol;
    const sig = typeof x === 'string' ? null : x;
    const when = formatListingDate(sig?.onboardISO, sig?.daysSince);
    const badge = sig ? `<span class="badge ${sig.type}">${escapeHtml(dirLabel(sig))}</span>` : '';
    const grade = sig && sig.grade && sig.grade !== 'NONE'
      ? `<span class="badge ${String(sig.grade).replace(/\s+/g, '-')}">${escapeHtml(sig.grade)}</span>`
      : '';
    const entry = sig && (sig.type === 'BUY' || sig.type === 'SELL')
      ? `<span class="tiny listing-entry">Entry ${escapeHtml(formatNum(sig.entry))}</span>`
      : '';
    // Listed today → shout it, since that is the moment worth trading.
    const fresh = sig && Number(sig.daysSince) <= 0;
    const flag = fresh
      ? `<span class="new-flag fresh">${escapeHtml(t('just_listed'))}</span>`
      : sig?.newlyDetected ? '<span class="new-flag">NEW</span>' : '';
    return `<span class="chip new-chip${fresh ? ' just-listed' : sig?.newlyDetected ? ' brand-new' : ''}" data-s="${escapeHtml(sym)}" data-m="${market}" title="${escapeHtml(when)}">
      <strong>${escapeHtml(displayPairSymbol(sym))}</strong>
      ${flag}
      ${badge}${grade}
      <span class="tiny listing-date">${escapeHtml(when)}</span>
      ${entry}
    </span>`;
  }).join('');
  el.querySelectorAll('.chip').forEach((c) => {
    c.onclick = () => selectSymbol(c.dataset.m, c.dataset.s);
    c.ondblclick = () => openLiveChart(c.dataset.m, c.dataset.s);
  });
}

async function refreshWatch() {
  state.watch = await window.cpe.watchList();
  const el = $('watch-list');
  if (!state.watch.length) {
    el.innerHTML = `<span class="tiny">${escapeHtml(t('watch_hint'))}</span>`;
    return;
  }
  el.innerHTML = state.watch.map((w) =>
    `<span class="chip" data-s="${w.symbol}" data-m="${w.market}"><strong>${w.symbol}</strong> ${w.market}</span>`
  ).join('');
  el.querySelectorAll('.chip').forEach((c) => {
    c.onclick = () => selectSymbol(c.dataset.m, c.dataset.s);
  });
}

function fillTradeForm(s, market) {
  if (!s) return;
  state.tradeSignal = {
    symbol: s.symbol,
    market: market || s.market,
    type: s.type === 'SELL' ? 'SELL' : 'BUY',
    grade: ['CAUTION', 'STRONG', 'HIGHER STRONG'].includes(s.grade) ? s.grade : 'NONE',
    score: s.score,
    entry: s.entry || s.price,
    tp1: s.tp1,
    tp2: s.tp2,
    sl: s.sl,
    bbLower: s.bollinger?.lower,
    bbMid: s.bollinger?.mid,
    bbUpper: s.bollinger?.upper
  };
  $('tr-symbol').value = s.symbol;
  $('tr-tp').value = s.tp1;
  $('tr-tp2').value = s.tp2;
  $('tr-sl').value = s.sl;
  $('tr-price').value = s.entry || s.price;
  $('tr-side').value = s.type === 'SELL' ? 'SELL' : 'BUY';
  if (market) {
    $('tr-market').value = market === 'FOREX' ? 'FOREX' : market;
    if (market === 'FOREX') {
      if ([...$('tr-platform').options].some((o) => o.value === 'FOREX_DEMO')) {
        $('tr-platform').value = 'FOREX_DEMO';
      }
    }
    if (market === 'SPOT') $('tr-quote').value = 11;
    if (market === 'FUTURES') $('tr-quote').value = 1;
    syncTradeMarketOptions('tr');
    syncTradeFieldVisibility('tr');
  }
}

function buildTradePayload(paper) {
  const market = $('tr-market').value;
  let quote = +$('tr-quote').value;
  if (market === 'SPOT') quote = Math.max(11, quote || 11);
  if (market === 'FUTURES') quote = Math.max(1, quote || 1);
  if (market === 'FOREX') quote = Math.max(1, quote || 1);
  return {
    platform: $('tr-platform').value,
    market,
    symbol: $('tr-symbol').value.trim().toUpperCase(),
    side: $('tr-side').value,
    type: $('tr-type')?.value || 'MARKET',
    quantity: $('tr-qty').value || undefined,
    quoteUsdt: quote,
    price: $('tr-price').value || undefined,
    takeProfit: $('tr-tp').value || undefined,
    takeProfit2: $('tr-tp2').value || undefined,
    stopLoss: $('tr-sl').value || undefined,
    leverage: +$('tr-leverage')?.value || 5,
    marginType: $('tr-margin')?.value || 'CROSSED',
    forexLots: +$('tr-lots')?.value || 0.01,
    tp1Pct: +$('tr-tp1pct').value || 50,
    tp2Pct: +$('tr-tp2pct').value || 100,
    trailingStop: !!$('tr-trail')?.checked,
    trailPct: Math.max(0.4, +$('tr-trail-pct')?.value || 1.2),
    paper: !!paper,
    moneyMgmt: !!$('tr-money')?.checked,
    martingale: !!$('tr-mart')?.checked,
    martStepPct: +$('tr-mart-step')?.value || 1,
    martMult: +$('tr-mart-mult')?.value || 2,
    martMaxAdds: $('tr-mart-max')?.value != null ? +$('tr-mart-max').value : 2,
    martRiskCapPct: +$('tr-mart-cap')?.value || 5,
    track: true,
    ...signalAttach(symbolFromForm())
  };
}

function symbolFromForm() {
  return ($('tr-symbol').value || '').trim().toUpperCase();
}

function signalAttach(symbol) {
  const s = state.tradeSignal;
  if (!s || !symbol || String(s.symbol || '').toUpperCase() !== symbol) return {};
  if (s.type !== 'BUY' && s.type !== 'SELL') return {};
  const grade = ['CAUTION', 'STRONG', 'HIGHER STRONG'].includes(s.grade) ? s.grade : 'NONE';
  return {
    fromSignal: true,
    signalType: s.type,
    signalScore: s.score,
    signalEntry: s.entry,
    signalGrade: grade,
    trailPct: grade === 'CAUTION' ? 0.8 : 1.6,
    trailArmPct: grade === 'CAUTION' ? 0.45 : 0.8,
    bbLower: s.bbLower,
    bbMid: s.bbMid,
    bbUpper: s.bbUpper
  };
}

async function placeManual() {
  // DEMO mode = always practice (same desk as live, no real money)
  if (state.demoMode) {
    return placePaper();
  }
  const payload = buildTradePayload(false);
  if (!confirm(`Are you sure you want to place a LIVE ${payload.side} order for ${payload.symbol} on ${payload.platform}?`)) return;
  if (payload.platform !== 'FOREX_DEMO') {
    try {
      const st = await window.cpe.keysStatus(payload.platform);
      if (!st?.saved || !st?.liveReady) {
        toast(t('live_need_api_title'), t('live_need_api_body'));
        document.querySelector('.nav-btn[data-view="keys"]')?.click();
        if ($('keys-platform')) {
          $('keys-platform').value = payload.platform;
          $('keys-platform').dispatchEvent(new Event('change'));
        }
        return;
      }
    } catch { /* continue; exchange will reject if missing */ }
  }
  try {
    console.log('Placing trade payload:', payload);
    const res = await window.cpe.manualTrade(payload);
    console.log('Trade result:', res);
    $('tr-result').textContent = JSON.stringify(res, null, 2);
    toast('Started', `${payload.side} ${payload.symbol}`);
    refreshPositions();
  } catch (e) {
    const msg = e.message || String(e);
    $('tr-result').textContent = msg;
    toast(t('order_err'), msg);
    if (/api|key|secret|sign|auth|permission/i.test(msg)) {
      toast(t('live_need_api_title'), t('live_need_api_body'));
    }
  }
}

async function placePaper() {
  const payload = buildTradePayload(true);
  if (!confirm(`Are you sure you want to start DEMO (Paper) trade for ${payload.symbol} (${payload.side})?`)) return;
  try {
    const res = await window.cpe.manualTrade(payload);
    $('tr-result').textContent = JSON.stringify(res, null, 2);
    toast(t('demo_trade_ok'), `${payload.symbol} — ${t('paper_added')}`);
    refreshPositions();
    remindDemoApiKey(true);
  } catch (e) {
    // fallback add-paper
    await window.cpe.addPaperTrade({
      symbol: payload.symbol,
      market: payload.market,
      platform: payload.platform,
      side: payload.side,
      entry: +payload.price,
      tp1: +payload.takeProfit,
      tp2: +payload.takeProfit2,
      sl: +payload.stopLoss,
      qty: payload.quantity || estimateLocalQty(+payload.price, payload.quoteUdt),
      tp1Pct: payload.tp1Pct,
      tp2Pct: payload.tp2Pct,
      trailingStop: payload.trailingStop,
      trailPct: payload.trailPct,
      martEnabled: !!payload.martingale,
      martLevel: 0,
      martBaseQuote: payload.quoteUsdt,
      martStepPct: payload.martStepPct,
      martMult: payload.martMult,
      martMaxAdds: payload.martMaxAdds,
      martRiskCapPct: payload.martRiskCapPct,
      reasons: ['Demo practice'],
      ...signalAttach(payload.symbol)
    });
    toast(t('demo_trade_ok'), payload.symbol);
    refreshPositions();
    remindDemoApiKey(true);
  }
}

function estimateLocalQty(price, quote) {
  if (!price) return 0;
  const raw = quote / price;
  return raw >= 1 ? Math.floor(raw * 1000) / 1000 : Math.floor(raw * 1e6) / 1e6;
}

function marketLabel(m) {
  if (m === 'BOTH') return 'Spot + Futures';
  if (m === 'FUTURES') return 'Futures';
  if (m === 'FOREX') return 'Forex';
  return 'Spot';
}

/** Best-effort: will this session place real orders, or stay paper? */
function sessionLiveInfo(session) {
  const meta = getPlatformMeta(session.platform) || {};
  const name = meta.name || session.platform;
  if (state.demoMode) return { live: false, why: 'DEMO/paper — no real orders' };
  if (session.platform === 'FOREX_DEMO') return { live: false, why: 'Forex Demo — paper only' };
  if (!meta.live) return { live: false, why: `${name}: no live connector — paper` };
  return { live: true, why: `LIVE orders on ${name}` };
}

async function paintSessions(sessions) {
  const el = $('auto-sessions');
  if (!el) return;
  const list = sessions || [];
  if (!list.length) {
    el.innerHTML = '<span class="tiny">No sessions yet. Pick a platform + market below, then press Start / Save Session.</span>';
    return;
  }
  const cards = [];
  for (const s of list) {
    const meta = getPlatformMeta(s.platform) || {};
    const name = meta.name || s.platform;
    const on = !!s.enabled;
    let live = false;
    let why = '';
    if (state.demoMode) {
      why = 'DEMO/paper — no real orders';
    } else if (s.platform === 'FOREX_DEMO') {
      why = 'Forex Demo — paper only';
    } else if (!meta.live) {
      why = 'No live connector — paper';
    } else {
      try {
        const st = await window.cpe.keysStatus(s.platform);
        if (st?.saved && st?.liveReady) { live = true; why = 'LIVE orders'; }
        else why = 'No API key — paper';
      } catch { why = 'Key status unavailable — paper'; }
    }
    const tone = live ? '#22c55e' : '#f59e0b';
    cards.push(
      `<div style="border:1px solid ${on ? tone : 'var(--line,#3a4a5a)'}; border-radius:10px; padding:10px 12px; margin-bottom:8px; display:flex; align-items:center; gap:10px; background:${on ? 'rgba(34,197,94,.06)' : 'transparent'}">
        <span style="font-size:1.05rem">${on ? '🟢' : '⚪'}</span>
        <div style="flex:1; min-width:0">
          <div style="font-weight:600">${escapeHtml(name)} · <span style="color:var(--muted)">${marketLabel(s.market)}</span></div>
          <div class="tiny" style="color:${tone}">${on ? 'RUNNING' : 'STOPPED'} · ${escapeHtml(why)}</div>
          ${s.martingale ? `<div class="tiny" style="color:#f59e0b;font-weight:600">Martingale ON · step ${+s.martStepPct || 1}% × ${+s.martMult || 2} · max adds ${(+s.martMaxAdds != null ? +s.martMaxAdds : 2)} · cap ${+s.martRiskCapPct || 5}% equity</div>` : ''}
        </div>
        <button type="button" class="btn ghost mini" data-toggle="${s.id}" style="width:auto; margin:0; ${on ? 'background:rgba(239,68,68,.15); border-color:rgba(239,68,68,.4); color:#f87171' : 'background:rgba(34,197,94,.15); border-color:rgba(34,197,94,.4); color:#4ade80'}">${on ? '⏹ Stop' : '▶ Start'}</button>
        <button type="button" class="btn ghost mini" data-remove="${s.id}" title="Remove session" style="width:auto; margin:0">✕</button>
      </div>`
    );
  }
  el.innerHTML = cards.join('');
  el.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.onclick = () => toggleSession(btn.dataset.toggle);
  });
  el.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.onclick = () => removeSession(btn.dataset.remove);
  });
}

async function toggleSession(id) {
async function refreshPositions() {
  const list = await window.cpe.tradesList();
  const tbody = $('pos-table');
  if (!tbody) return;
  const open = Array.isArray(list) ? list.filter((t) => t.status === 'OPEN') : [];
  
  if (open.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">No open positions</td></tr>`;
    return;
  }

  tbody.innerHTML = open.map((trd) => {
    const entry = parseFloat(trd.entry) || 0;
    const last = parseFloat(trd.lastPrice) || entry;
    const pnl = entry > 0 ? ((last - entry) / entry * 100) : 0;
    return `
    <tr data-id="${trd.id}">
      <td><strong>${(trd.symbol || trd.pair || 'PAIR').toUpperCase()}</strong><br/>${trd.paper ? '<span class="badge HOLD">DEMO</span>' : '<span class="badge BUY">LIVE</span>'}</td>
      <td>${(trd.market || 'SPOT').toUpperCase()}</td>
      <td>${entry.toFixed(4)}</td>
      <td>${last.toFixed(4)}</td>
      <td style="color:${pnl >= 0 ? '#22c55e' : '#ef4444'}"><strong>${pnl.toFixed(2)}%</strong></td>
      <td>${+(trd.qtyRemain ?? trd.qty ?? 0)}</td>
      <td>
        <button class="btn ghost mini" data-action="edit" data-id="${trd.id}">Edit</button>
        <button class="btn ghost mini" data-action="close" data-id="${trd.id}">Close</button>
      </td>
    </tr>`;
  }).join('');

  tbody.onclick = async (e) => {
    const btn = e.target.closest('button');
    if (!btn || !btn.dataset.action) return;
    const { action, id } = btn.dataset;
    const trd = open.find((x) => x.id === id);
    if (!trd) return;
    if (action === 'edit') {
      $('pos-edit-id').value = trd.id;
      $('pos-edit').classList.remove('hidden');
    } else if (action === 'close') {
      if (!confirm('Close trade?')) return;
      await window.cpe.closeTrade({ id, pct: 100 });
      refreshPositions();
    }
  };
}

async function refreshPositions() {
  const list = await window.cpe.tradesList();
  const tbody = $('pos-table');
  if (!tbody) return;
  const open = list.filter((t) => t.status === 'OPEN');
  
  tbody.innerHTML = open.map((trd) => {
    return `
    <tr data-id="${trd.id}">
      <td><strong>${(trd.symbol || 'PAIR').toUpperCase()}</strong><br/>${trd.paper ? '<span class="badge HOLD">DEMO</span>' : '<span class="badge BUY">LIVE</span>'}</td>
      <td>${(trd.market || 'SPOT').toUpperCase()}</td>
      <td>${trd.entryDate || 'N/A'}</td>
      <td>${(+trd.entry).toFixed(4)}</td>
      <td>${(+trd.lastPrice).toFixed(4)}</td>
      <td style="color:${((+trd.lastPrice - +trd.entry) / +trd.entry * 100) >= 0 ? '#22c55e' : '#ef4444'}">
        <strong>${((+trd.lastPrice - +trd.entry) / +trd.entry * 100).toFixed(2)}%</strong>
      </td>
      <td>
        <button class="btn ghost mini" data-edit="${trd.id}">View/Edit</button>
        <button class="btn ghost mini danger" data-close="${trd.id}">Close</button>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="7">No open positions</td></tr>`;
}

async function refreshPositions() {
  const list = await window.cpe.tradesList();
  const tbody = $('pos-table');
  if (!tbody) return;
  const open = list.filter((t) => t.status === 'OPEN');
  
  tbody.innerHTML = open.map((trd) => {
    const entry = +trd.entry || 0;
    const last = +trd.lastPrice || entry;
    const pnl = entry ? (((last - entry) / entry) * 100) : 0;
    
    return `
    <tr data-id="${trd.id}">
      <td><strong>${(trd.symbol || 'PAIR').toUpperCase()}</strong><br/>${trd.paper ? '<span class="badge HOLD">DEMO</span>' : '<span class="badge BUY">LIVE</span>'}</td>
      <td>${(trd.market || 'SPOT').toUpperCase()}</td>
      <td>${entry.toFixed(4)}</td>
      <td>${last.toFixed(4)}</td>
      <td style="color:${pnl >= 0 ? '#22c55e' : '#ef4444'}"><strong>${pnl.toFixed(2)}%</strong></td>
      <td>${+(trd.qtyRemain ?? trd.qty)}</td>
      <td>${trd.tp2 || trd.tp1 || '-'}</td>
      <td>${trd.autoClose ? 'AUTO' : 'MANUAL'}</td>
      <td>
        <button class="btn ghost mini" data-edit="${trd.id}">Edit</button>
        <button class="btn ghost mini" data-close="${trd.id}">Close</button>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="9">No open positions</td></tr>`;

  // Action listeners
  tbody.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
    const t = open.find(x => x.id === b.dataset.edit);
    if(t) { $('pos-edit-id').value = t.id; $('pos-edit').classList.remove('hidden'); }
  });
  tbody.querySelectorAll('[data-close]').forEach(b => b.onclick = async () => {
    if(confirm('Confirm close 100% of this trade?')) { await window.cpe.closeTrade({id: b.dataset.close, pct: 100}); refreshPositions(); }
  });
}

  const a = await window.cpe.getAuto();
  const list = (a.sessions || []).map((s) => ({ ...s, enabled: s.id === id ? !s.enabled : s.enabled }));
  await window.cpe.setAutoSessions(list);
  const target = list.find((s) => s.id === id);
  if (target) {
    toast('Auto Trade', `${target.enabled ? 'Started' : 'Stopped'} ${getPlatformMeta(target.platform).name || target.platform} · ${marketLabel(target.market)}`, false);
  }
  refreshAuto(false);
}

async function removeSession(id) {
  const a = await window.cpe.getAuto();
  const list = (a.sessions || []).filter((s) => s.id !== id);
  await window.cpe.setAutoSessions(list);
  refreshAuto(false);
}

async function stopAllSessions() {
  const a = await window.cpe.getAuto();
  const list = (a.sessions || []).map((s) => ({ ...s, enabled: false }));
  await window.cpe.setAutoSessions(list);
  toast('Auto Trade', 'All Auto Trading stopped.', false);
  if ($('auto-save-msg')) $('auto-save-msg').textContent = 'All auto sessions stopped.';
  refreshAuto(false);
}

async function refreshAuto(loadForm = true) {
  const a = await window.cpe.getAuto();
  const sessions = a.sessions || [];
  const banner = $('auto-status-banner');
  const title = $('auto-status-title');
  const desc = $('auto-status-desc');
  await paintSessions(sessions);
  if (banner && title && desc) {
    const running = sessions.filter((s) => s.enabled);
    if (running.length) {
      banner.style.display = 'block';
      let anyLive = false;
      const lines = [];
      for (const s of running) {
        const meta = getPlatformMeta(s.platform) || {};
        const name = meta.name || s.platform;
        let live = false;
        const info = sessionLiveInfo(s);
        if (info.live) {
          try {
            const st = await window.cpe.keysStatus(s.platform);
            live = !!(st?.saved && st?.liveReady);
          } catch { live = false; }
        }
        if (live) anyLive = true;
        lines.push(`${live ? '🟢 LIVE' : '🟠 PAPER'} — ${escapeHtml(name)} · ${marketLabel(s.market)}`);
      }
      const tone = anyLive ? '#22c55e' : '#f59e0b';
      banner.style.background = anyLive ? 'rgba(34,197,94,.15)' : 'rgba(245,158,11,.15)';
      banner.style.borderColor = anyLive ? 'rgba(34,197,94,.3)' : 'rgba(245,158,11,.4)';
      title.style.color = tone;
      title.textContent = `${anyLive ? '🟢' : '🟠'} Auto Trading Active · ${running.length} session${running.length > 1 ? 's' : ''} running`;
      desc.innerHTML = lines.join('<br/>') +
        `<br/><span style="opacity:.85">Scanning &amp; auto-executing with TP1 / TP2 / SL / Trailing Stop.</span>`;
      $('auto-stop-btn').onclick = stopAllSessions;
    } else {
      banner.style.display = 'none';
    }
  }
  const activeEl = document.activeElement;
  const isEditingAutoForm = activeEl && activeEl.id && activeEl.id.startsWith('auto-');
  if (isEditingAutoForm || !loadForm) {
    paintAutoOpen(a.open || []);
    return;
  }
  const c = a.config || {};
  $('auto-tp').checked = c.autoTakeProfit !== false;
  if ($('auto-platform') && c.platform) $('auto-platform').value = c.platform;
  syncTradeMarketOptions('auto');
  if ($('auto-market')) $('auto-market').value = c.market || 'SPOT';
  $('auto-max').value = c.maxOrders || 3;
  $('auto-quote').value = Math.max(11, c.quoteAmount || 11);
  if ($('auto-fut-quote')) $('auto-fut-quote').value = Math.max(1, c.futuresQuote || 1);
  if ($('auto-leverage')) $('auto-leverage').value = String(c.leverage || 5);
  if ($('auto-tp1pct')) $('auto-tp1pct').value = c.tp1Pct || 50;
  if ($('auto-tp2pct')) $('auto-tp2pct').value = c.tp2Pct || 100;
  if ($('auto-strong')) $('auto-strong').checked = c.autoStrong !== false;
  if ($('auto-caution')) $('auto-caution').checked = !!c.autoCaution;
  if ($('auto-higher-strong')) $('auto-higher-strong').checked = !!c.autoHigherStrong;
  if ($('auto-money')) $('auto-money').checked = !!c.moneyMgmt;
  if ($('auto-mart')) $('auto-mart').checked = !!c.martingale;
  if ($('auto-mart-step')) $('auto-mart-step').value = c.martStepPct != null ? c.martStepPct : 1;
  if ($('auto-mart-mult')) $('auto-mart-mult').value = c.martMult != null ? c.martMult : 2;
  if ($('auto-mart-max')) $('auto-mart-max').value = c.martMaxAdds != null ? c.martMaxAdds : 2;
  if ($('auto-mart-cap')) $('auto-mart-cap').value = c.martRiskCapPct != null ? c.martRiskCapPct : 5;
  if ($('auto-trail')) $('auto-trail').checked = c.trailingStop !== false;
  if ($('auto-trail-pct')) {
    const tp = +(c.trailPct ?? 1.2);
    $('auto-trail-pct').value = tp < 0.4 ? 1.2 : tp;
  }
  if ($('auto-margin') && c.marginType) $('auto-margin').value = c.marginType;
  if ($('auto-lots') && c.forexLots != null) $('auto-lots').value = c.forexLots;
  syncTradeFieldVisibility('auto');
  paintAutoOpen(a.open || []);
}

/** Shows why the last auto scan did or did not open a trade (mirrors main.js diag). */
function renderAutoDiagnostic(d) {
  const el = $('auto-diag');
  if (!el || !d) return;
  const mode = d.paper === true
    ? `PAPER${d.paperWhy ? ' — ' + d.paperWhy : ''}`
    : d.paper === false ? 'LIVE' : '—';
  const head = `Auto scan · ${escapeHtml(d.market || '')} · ${escapeHtml(d.platform || '')} · ${escapeHtml(mode)}`;
  const sigCount = `${d.total} BUY/SELL signal${d.total === 1 ? '' : 's'} found`;
  const rail = `${sigCount} → ${d.sideOk} right side → ${d.gradeOk} allowed grade → ${d.qualityOk} quality OK → ${d.onBandOk} on band → ${d.candidates} candidate${d.candidates === 1 ? '' : 's'}`;
  const reasonLabel = (key) => {
    if (key === 'not_on_band') return 'price not near a Bollinger band (lower/mid for BUY)';
    if (key === 'grade_NONE') return 'grade NONE — HOLD signal, no trade';
    if (key === 'grade_CAUTION') return 'grade CAUTION — tick "Trade Caution signals" to allow these';
    if (key === 'grade_HIGHER STRONG') return 'grade HIGHER STRONG — tick its separate checkbox to allow these';
    if (key.startsWith('grade_')) return `grade ${key.slice(6)} not enabled`;
    if (key.startsWith('quality:')) return `quality: ${key.slice(8)}`;
    return key;
  };
  const rows = Object.entries(d.reasons || {})
    .map(([k, n]) => `${n}× ${escapeHtml(reasonLabel(k))}`);
  const orderLabel = (key) => {
    if (key === 'already_open') return 'a trade for that symbol is already open';
    if (key === 'money_risk_cap') return 'money-management rejected it (risk per trade / min-size rule)';
    if (key === 'quote_too_low') return 'order size below the exchange minimum — raise the quote amount';
    if (key === 'live_order_failed') return 'Binance rejected the live order — check the notification';
    if (key === 'error') return 'unexpected error — check the notification';
    return key;
  };
  const orderRows = Object.entries(d.orderSkip || {})
    .map(([k, n]) => `${n}× ${escapeHtml(orderLabel(k))}`);
  const skipLine = d.skip ? `<div style="color:#f59e0b;font-weight:600;margin:2px 0">⏭ ${escapeHtml(d.skip)}</div>` : '';
  let body;
  if (d.skip) body = '';
  else if (!d.total) body = 'No BUY/SELL signals were found in this scan yet.';
  else if (d.candidates > 0) body = `${d.opened} of ${d.candidates} candidate(s) opened as trades.`;
  else body = 'No signal passed every filter, so nothing opened. See reasons below.';
  const openedLine = (d.candidates > 0 && d.opened > 0)
    ? `<div style="color:#22c55e;font-weight:600;margin:2px 0">✅ ${d.opened} order(s) sent to ${escapeHtml(d.platform || '')}.</div>`
    : '';
  el.innerHTML = `<div style="font-weight:600;color:var(--fg,#e6edf3)">${head}</div>`
    + skipLine
    + (d.skip ? `<div style="margin:2px 0">${escapeHtml(sigCount)} — the scan itself is fine.</div>` : '')
    + openedLine
    + (d.skip ? '' : `<div style="margin:2px 0">${escapeHtml(rail)}</div>`)
    + (body ? `<div>${body}</div>` : '')
    + (rows.length ? `<ul style="margin:4px 0 0 16px">${rows.map((r) => `<li>${r}</li>`).join('')}</ul>` : '')
    + (orderRows.length ? `<ul style="margin:4px 0 0 16px">${orderRows.map((r) => `<li>${r}</li>`).join('')}</ul>` : '');
}

function paintAutoOpen(list) {
  const el = $('auto-open');
  if (!el) return;
  const open = (list || []).filter((t) => t.status === 'OPEN');
  if (!open.length) {
    el.innerHTML = `<span class="tiny">${escapeHtml(t('no_auto'))}</span>`;
    return;
  }
  el.innerHTML = open.map((trd) => {
    const meta = getPlatformMeta(trd.platform) || {};
    const platName = meta.name || trd.platform || 'BINANCE';
    const mode = trd.paper ? 'PAPER' : 'LIVE';
    const tone = trd.paper ? '#f59e0b' : '#22c55e';
    const qty = trd.qtyRemain ?? trd.qty;
    return `<button type="button" class="chip" data-cancel="${trd.id}" title="Stop auto-managing this trade (it stays open as manual)">
      <strong>${escapeHtml(trd.symbol)}</strong>
      <span style="color:var(--muted)">${escapeHtml(platName)} · ${marketLabel(trd.market)}</span>
      <span style="color:${tone}; font-weight:600">${mode}</span>
      ${trd.martEnabled ? `<span style="color:#f59e0b;font-weight:600">MART${trd.martLevel ? ' r' + trd.martLevel : ''}</span>` : ''}
      qty ${qty} · ⏹ Stop</button>`;
  }).join('');
  el.querySelectorAll('[data-cancel]').forEach((btn) => {
    btn.onclick = async () => {
      await window.cpe.cancelAuto({ id: btn.dataset.cancel });
      toast('Stopped', 'Auto → manual for this trade');
      refreshAuto(false);
      refreshPositions();
    };
  });
}

async function saveAuto() {
  const platform = $('auto-platform')?.value || 'BINANCE';
  const market = $('auto-market').value;
  const settings = {
    platform,
    market,
    maxOrders: +$('auto-max').value,
    quoteAmount: Math.max(11, +$('auto-quote').value || 11),
    futuresQuote: Math.max(1, +$('auto-fut-quote')?.value || 1),
    leverage: +$('auto-leverage')?.value || 5,
    marginType: $('auto-margin')?.value || 'CROSSED',
    forexLots: +$('auto-lots')?.value || 0.01,
    tp1Pct: +$('auto-tp1pct')?.value || 50,
    tp2Pct: +$('auto-tp2pct')?.value || 100,
    trailingStop: !!$('auto-trail')?.checked,
    trailPct: Math.max(0.4, +$('auto-trail-pct')?.value || 1.2),
    trailArmPct: 0.6,
    slConfirmTicks: 2,
    slBufferPct: 0.15,
    onlyBuy: true,
    autoStrong: $('auto-strong') ? $('auto-strong').checked : true,
    autoCaution: $('auto-caution') ? $('auto-caution').checked : false,
    autoHigherStrong: $('auto-higher-strong') ? $('auto-higher-strong').checked : false,
    moneyMgmt: !!$('auto-money')?.checked,
    martingale: !!$('auto-mart')?.checked,
    martStepPct: +$('auto-mart-step')?.value || 1,
    martMult: +$('auto-mart-mult')?.value || 2,
    martMaxAdds: $('auto-mart-max')?.value != null ? +$('auto-mart-max').value : 2,
    martRiskCapPct: +$('auto-mart-cap')?.value || 5,
    autoTakeProfit: $('auto-tp').checked,
    forcePaper: !!state.demoMode
  };
  // Keep as the default template for the next new session too
  await window.cpe.setAuto({ enabled: true, ...settings });

  const a = await window.cpe.getAuto();
  const list = (a.sessions || []).slice();
  const idx = list.findIndex((s) => s.platform === platform && s.market === market);
  if (idx >= 0) list[idx] = { ...list[idx], ...settings, enabled: true };
  else list.push({ ...settings, enabled: true, id: `s-${Date.now().toString(36)}` });
  await window.cpe.setAutoSessions(list);

  const msg = `Session started: ${platform} · ${marketLabel(market)}`;
  toast('Auto', msg, false);
  if ($('auto-save-msg')) $('auto-save-msg').textContent = msg;
  refreshAuto(false);
}

function posMarketBadge(m) {
  const k = String(m || 'SPOT').toUpperCase();
  if (k === 'FUTURES') return '<span class="badge" style="background:rgba(56,189,248,.18);color:#38bdf8;font-weight:700">FUTURES</span>';
  if (k === 'FOREX') return '<span class="badge" style="background:rgba(240,180,41,.18);color:#fbbf24;font-weight:700">FOREX</span>';
  return '<span class="badge" style="background:rgba(167,139,250,.18);color:#a78bfa;font-weight:700">SPOT</span>';
}

function posPair(trd) {
  return (trd.symbol || trd.pair || (trd.base && trd.quote ? `${trd.base}/${trd.quote}` : 'PAIR DATA MISSING')).toUpperCase();
}

function isBrokenPos(trd) {
  const sym = trd.symbol || trd.pair || (trd.base && trd.quote ? `${trd.base}${trd.quote}` : '');
  return !String(sym).trim() || !(+trd.entry > 0) || !(+trd.qty > 0);
}

/** TP levels of a trade as {price, pct} rows (multi-level aware). */
function posTradeTpList(trd) {
  if (Array.isArray(trd.tps) && trd.tps.length) {
    return trd.tps
      .filter((x) => x && +x.price > 0)
      .map((x) => ({ price: x.price, pct: x.pct }));
  }
  return [
    trd.tp1 != null && +trd.tp1 > 0 ? { price: trd.tp1, pct: trd.tp1Pct ?? 50 } : null,
    trd.tp2 != null && +trd.tp2 > 0 ? { price: trd.tp2, pct: trd.tp2Pct ?? 100 } : null
  ].filter(Boolean);
}

/** Read-only text of a trade's TP levels + SL for the positions table. */
function posTpsText(trd) {
  const levels = posTradeTpList(trd).map((l) => formatNum(l.price));
  const tp = levels.length ? levels.join(' / ') : '—';
  return `${tp} / ${formatNum(trd.sl)}`;
}

let posDetailTimer = null;

function fmtTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString();
}

/** Normalize a trade (open) or a journal entry (closed) into one detail shape. */
function normalizeForDetail(src) {
  const closed = !!(src.status && src.status !== 'OPEN') || (src.at != null && src.lastPrice == null);
  const tps = Array.isArray(src.tps) && src.tps.length
    ? src.tps.filter((x) => x && +x.price > 0).map((x) => ({ price: x.price, pct: x.pct, hit: !!x.hit }))
    : [
        src.tp1 != null && +src.tp1 > 0 ? { price: src.tp1, pct: src.tp1Pct ?? 50 } : null,
        src.tp2 != null && +src.tp2 > 0 ? { price: src.tp2, pct: src.tp2Pct ?? 100 } : null
      ].filter(Boolean);
  return {
    id: src.id || null,
    symbol: src.symbol || src.pair || '',
    market: src.market || 'SPOT',
    platform: src.platform || 'BINANCE',
    side: src.side || 'BUY',
    leverage: src.leverage || 1,
    entry: src.entry,
    last: closed ? (src.closePrice != null ? src.closePrice : src.exit) : (src.lastPrice != null ? src.lastPrice : src.entry),
    qty: src.qty,
    qtyRemain: closed ? 0 : (src.qtyRemain != null ? src.qtyRemain : src.qty),
    sl: src.sl,
    tps,
    trailingStop: src.trailingStop,
    trailPct: src.trailPct,
    autoClose: src.autoClose,
    openedAt: src.openedAt,
    closedAt: closed ? (src.closedAt || src.at || null) : null,
    status: src.status,
    reason: closed ? (src.reason || src.status) : null,
    paper: !!src.paper,
    partial: !!src.partial
  };
}

function renderPosDetailInfo(src) {
  const el = $('pos-detail-info');
  if (!el) return;
  const d = normalizeForDetail(src);
  const entry = +d.entry || 0;
  const exitPx = +d.last || entry;
  const pnlPct = entry ? (((exitPx - entry) / entry) * 100) * (d.side === 'SELL' ? -1 : 1) : 0;
  const qty = d.qtyRemain != null && +d.qtyRemain > 0 ? +d.qtyRemain : +d.qty;
  const pnlUsd = (pnlPct / 100) * (entry * qty);
  const pnlColor = pnlPct >= 0 ? 'var(--buy)' : 'var(--sell)';
  const tpHtml = d.tps.length
    ? d.tps.map((l, i) => `${i + 1}) ${formatNum(l.price)} · ${l.pct != null && l.pct !== '' ? l.pct : '—'}%${l.hit ? ' ✔' : ''}`).join('<br/>')
    : '—';
  const closed = !!d.closedAt;
  const cell = (k, v) => `<div class="pi"><span>${k}</span><strong>${v}</strong></div>`;
  let html = '';
  html += cell('Side', d.side);
  html += cell('Market', d.market);
  html += cell('Platform', escapeHtml(d.platform));
  html += cell('Leverage', +d.leverage > 1 ? `${d.leverage}x` : '—');
  html += cell('Entry', formatNum(d.entry));
  html += cell(closed ? 'Exit price' : 'Last price', formatNum(d.last));
  html += cell('P/L', `<span style="color:${pnlColor}">${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(2)}% · ${pnlUsd >= 0 ? '+' : ''}$${pnlUsd.toFixed(2)}</span>`);
  html += cell('Quantity', formatNum(d.qty));
  html += cell(closed ? 'Reason' : 'Left qty', closed ? escapeHtml(String(d.reason || '—')) : formatNum(d.qtyRemain));
  html += cell('Stop Loss', formatNum(d.sl));
  html += cell('Trailing SL', d.trailingStop === false ? 'OFF' : `ON · ${d.trailPct != null ? d.trailPct : '—'}%`);
  html += cell(closed ? 'Mode' : 'Auto close', closed ? (d.paper ? 'DEMO' : 'LIVE') : (d.autoClose === false ? 'MANUAL' : 'AUTO'));
  html += cell('Start time', escapeHtml(fmtTime(d.openedAt)));
  html += cell('End time', escapeHtml(fmtTime(d.closedAt)));
  html += `<div class="pi wide"><span>TP levels (price · close %)</span><strong>${tpHtml}</strong></div>`;
  el.innerHTML = html;
  if ($('pos-detail-live')) {
    $('pos-detail-live').textContent = closed
      ? `Closed trade · started ${fmtTime(d.openedAt)} → ended ${fmtTime(d.closedAt)}`
      : `Live — market follows in real time (updates every few seconds). Lines: E = entry · TP = targets · SL = stop.`;
  }
}

async function drawPosDetailChart(src) {
  const canvas = $('pos-detail-chart');
  if (!canvas) return;
  const d = normalizeForDetail(src);
  const interval = $('interval-select')?.value || '15m';
  try {
    const full = await window.cpe.analyze({ symbol: String(d.symbol).toUpperCase(), market: d.market, interval });
    if (!full || !full.chart) return;
    const tps = d.tps;
    window.CPEChart.draw(canvas, {
      symbol: d.symbol,
      chart: full.chart,
      entry: d.entry,
      sl: d.sl,
      tp1: tps[0] ? tps[0].price : null,
      tp2: tps.length > 1 ? tps[tps.length - 1].price : null,
      triggers: tps.slice(1, -1).map((l) => ({ price: l.price })),
      _zoom: 1,
      _demoMode: d.paper,
      _liveMode: !d.paper
    });
  } catch { /* offline / no chart data */ }
}

function setPosDetailActions(show) {
  ['pos-detail-edit', 'pos-detail-c50', 'pos-detail-c100'].forEach((id) => {
    const btn = $(id);
    if (btn) btn.style.display = show ? '' : 'none';
  });
}

async function openPosDetail(trd) {
  if (!trd) return;
  state.posDetailId = trd.id;
  state.posDetailSrc = trd;
  const d = normalizeForDetail(trd);
  if ($('pos-detail-title')) $('pos-detail-title').textContent = `${posPair(trd)} · ${d.side} · ${d.market} · ${d.paper ? 'DEMO' : 'LIVE'}`;
  $('pos-detail')?.classList.remove('hidden');
  setPosDetailActions(true);
  renderPosDetailInfo(trd);
  await drawPosDetailChart(trd);
  clearInterval(posDetailTimer);
  posDetailTimer = setInterval(async () => {
    const pop = $('pos-detail');
    if (!pop || pop.classList.contains('hidden')) { clearInterval(posDetailTimer); posDetailTimer = null; return; }
    let list = [];
    try { list = await window.cpe.tradesList(); } catch { list = []; }
    const fresh = (list || []).find((x) => x.id === state.posDetailId);
    if (!fresh || fresh.status !== 'OPEN') {
      if (fresh) { state.posDetailSrc = fresh; renderPosDetailInfo(fresh); }
      clearInterval(posDetailTimer);
      posDetailTimer = null;
      return;
    }
    state.posDetailSrc = fresh;
    renderPosDetailInfo(fresh);
    await drawPosDetailChart(fresh);
  }, 5000);
}

function openClosedDetail(r) {
  if (!r) return;
  clearInterval(posDetailTimer);
  posDetailTimer = null;
  state.posDetailId = null;
  state.posDetailSrc = r;
  const s = String(r.symbol || r.pair || '').toUpperCase();
  if ($('pos-detail-title')) $('pos-detail-title').textContent = `${s} · ${r.side || 'BUY'} · ${r.market || 'SPOT'} · ${r.paper ? 'DEMO' : 'LIVE'} · closed`;
  $('pos-detail')?.classList.remove('hidden');
  setPosDetailActions(false);
  renderPosDetailInfo(r);
  drawPosDetailChart(r);
}

function closePosDetail() {
  clearInterval(posDetailTimer);
  posDetailTimer = null;
  state.posDetailId = null;
  $('pos-detail')?.classList.add('hidden');
}

function setupPosDetailUi() {
  $('pos-detail-close')?.addEventListener('click', closePosDetail);
  $('pos-detail')?.addEventListener('click', (e) => {
    if (e.target === $('pos-detail')) closePosDetail();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('pos-detail')?.classList.contains('hidden')) closePosDetail();
  });
  $('pos-detail-refresh')?.addEventListener('click', async () => {
    if (state.posDetailId) {
      let list = [];
      try { list = await window.cpe.tradesList(); } catch { list = []; }
      const tr = (list || []).find((x) => x.id === state.posDetailId);
      if (tr) { state.posDetailSrc = tr; renderPosDetailInfo(tr); await drawPosDetailChart(tr); }
    } else if (state.posDetailSrc) {
      renderPosDetailInfo(state.posDetailSrc);
      await drawPosDetailChart(state.posDetailSrc);
    }
  });
  $('pos-detail-edit')?.addEventListener('click', () => {
    const id = state.posDetailId;
    if (!id) return;
    closePosDetail();
    document.querySelector(`[data-edit="${id}"]`)?.click();
  });
  $('pos-detail-c50')?.addEventListener('click', async () => {
    const id = state.posDetailId;
    if (!id) return;
    if (!confirm('Are you sure you want to close 50% of this position?')) return;
    await closeTradeNow(id, 50, '50% closed');
  });
  $('pos-detail-c100')?.addEventListener('click', async () => {
    const id = state.posDetailId;
    if (!id) return;
    if (!confirm('Are you sure you want to close 100% of this position?')) return;
    const ok = await closeTradeNow(id, 100, 'Trade closed and removed from open positions');
    if (ok) closePosDetail();
  });
}

function posTpsText(trd) {
  const levels = posTradeTpList(trd).map((l) => formatNum(l.price));
  const tp = levels.length ? levels.join(' / ') : '—';
  return `${tp} / ${formatNum(trd.sl)}`;
}

function tpRowHtml(price, pct) {
  return `<div class="tp-row">
    <input type="number" step="any" class="tp-price" placeholder="TP price" value="${price != null && price !== '' ? price : ''}" />
    <input type="number" min="0" max="100" step="1" class="tp-pct" placeholder="close %" value="${pct != null && pct !== '' ? pct : ''}" />
    <button type="button" class="btn ghost mini tp-del" title="Remove">✕</button>
  </div>`;
}

function wireTpRowDeletes(host) {
  host.querySelectorAll('.tp-del').forEach((b) => {
    b.onclick = () => b.closest('.tp-row')?.remove();
  });
}

function renderTpRows(levels) {
  const host = $('pos-tp-list');
  if (!host) return;
  const list = Array.isArray(levels) && levels.length ? levels : [{ price: '', pct: '' }];
  host.innerHTML = list.map((l) => tpRowHtml(l.price, l.pct)).join('');
  wireTpRowDeletes(host);
}

function addTpRow(price, pct) {
  const host = $('pos-tp-list');
  if (!host) return;
  host.insertAdjacentHTML('beforeend', tpRowHtml(price, pct));
  wireTpRowDeletes(host);
}

/** Collect the modal's TP rows into the {tps:[{price,pct}]} payload. */
function collectTps() {
  const host = $('pos-tp-list');
  if (!host) return [];
  return [...host.querySelectorAll('.tp-row')]
    .map((row) => ({
      price: row.querySelector('.tp-price')?.value,
      pct: row.querySelector('.tp-pct')?.value
    }))
    .filter((x) => +x.price > 0);
}

/** Close a trade and report the real result — never claim success when the exchange refused. */
async function closeTradeNow(id, pct, label) {
  if (!id) return false;
  let res;
  try {
    res = await window.cpe.closeTrade({ id, pct });
  } catch (e) {
    res = { ok: false, error: e.message || String(e) };
  }
  if (res && res.ok) {
    toast('Close', label || (pct >= 100 ? 'Trade closed and removed from open positions' : `${pct}% closed`));
    refreshPositions();
    refreshJournal();
    return true;
  }
  toast(
    'Close failed',
    (res && res.error) || 'The exchange did not accept the close order — the position is still open.',
    false,
    'error'
  );
  return false;
}

async function refreshPositions() {
  let raw = [];
  try { raw = await window.cpe.tradesList(); } catch { raw = []; }
  // OPEN = managed position; SL_ALERT = SL hit while auto-close was off (needs a decision)
  const open = (raw || []).filter((t) => t.status === 'OPEN' || t.status === 'SL_ALERT');
  const valid = open.filter((t) => !isBrokenPos(t));

  // Auto-remove broken trades once, then the list re-renders clean.
  if (valid.length !== open.length && !state.brokenClearing) {
    state.brokenClearing = true;
    try { await window.cpe.clearBrokenTrades(); } catch {}
    state.brokenClearing = false;
  }

  // Live and Demo are kept apart.
  const tabLive = state.posTab !== 'DEMO';
  const clean = valid.filter((t) => !!t.paper !== tabLive);

  // Pending (unfilled) limit orders + any order sitting on the exchange.
  await renderPendingOrders(raw || [], tabLive);

  const tbody = $('pos-table');
  const order = ['FUTURES', 'FOREX', 'SPOT'];
  const byMkt = {};
  clean.forEach((t) => {
    const m = String(t.market || 'SPOT').toUpperCase();
    (byMkt[m] = byMkt[m] || []).push(t);
  });
  const markets = [...order.filter((m) => byMkt[m]), ...Object.keys(byMkt).filter((m) => !order.includes(m))];

  let html = '';
  for (const m of markets) {
    const rows = byMkt[m];
    const color = m === 'FUTURES' ? '#38bdf8' : m === 'FOREX' ? '#fbbf24' : '#a78bfa';
    html += `<tr class="pos-group"><td colspan="9" style="background:rgba(255,255,255,.04); font-weight:800; letter-spacing:.5px; color:${color}">⬢ ${m} · ${rows.length} open</td></tr>`;
    html += rows.map((trd) => {
      const prog = Math.round((trd.tpProgress || 0) * 100);
      const entry = +trd.entry || 0;
      const last = +trd.lastPrice || entry;
      const side = trd.side || 'BUY';
      const pnlPct = entry ? (((last - entry) / entry) * 100) * (side === 'SELL' ? -1 : 1) : 0;
      const qty = +trd.qtyRemain != null ? +trd.qtyRemain : +trd.qty;
      const pnlUsd = (pnlPct / 100) * (entry * qty);
      const pnlColor = pnlPct >= 0 ? 'var(--buy)' : 'var(--sell)';
      const modeBadge = trd.paper ? '<span class="badge HOLD" style="background:rgba(56,189,248,.15);color:#38bdf8">DEMO</span>' : '<span class="badge BUY" style="background:rgba(34,197,94,.15);color:#22c55e">LIVE</span>';
      const plat = trd.platform || 'BINANCE';
      const isAlert = trd.status === 'SL_ALERT';
      return `
      <tr data-id="${trd.id}" class="pos-row-click" data-detail="${trd.id}">
        <td style="color:var(--text); font-weight:800; font-size:1.1rem;">
          ${escapeHtml(posPair(trd))}
          <div style="font-size:0.75rem; font-weight:normal; color:var(--muted)">${modeBadge}${trd.auto ? ' ·auto' : ''}${trd.leverage > 1 ? ` ·${trd.leverage}x` : ''}</div>
          <div class="tiny" style="color:var(--muted)">🗓 ${escapeHtml(fmtTime(trd.openedAt))}</div>
          <div class="tp-progress" title="Toward TP1"><i style="width:${prog}%"></i></div>
          <span class="tp-hint-badge">TP path ${prog}%</span>
        </td>
        <td>${posMarketBadge(m)} <span class="tiny" style="color:var(--muted)">${escapeHtml(plat)}</span></td>
        <td>${formatNum(trd.entry)}</td>
        <td>${formatNum(trd.lastPrice)}</td>
        <td style="color:${pnlColor}"><strong>${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%</strong><div class="tiny">${pnlUsd >= 0 ? '+' : ''}$${pnlUsd.toFixed(2)}</div></td>
        <td>${formatNum(trd.qtyRemain ?? trd.qty)}</td>
        <td>${posTpsText(trd)}</td>
        <td>${isAlert ? '<span class="badge" style="background:rgba(239,68,68,.18);color:#ef4444">⚠ SL HIT</span> ' : ''}${trd.autoClose === false ? 'MANUAL' : 'AUTO-CLOSE'}${trd.hitTp1 ? ' ·TP1done' : ''}</td>
        <td>
          <button class="btn ghost mini" data-chart="${trd.id}">📈 Chart</button>
          ${isAlert
            ? `<button class="btn ghost mini" data-reclose="${trd.id}">Close now</button>
               <button class="btn ghost mini" data-forget="${trd.id}">Clear</button>`
            : `<button class="btn ghost mini" data-edit="${trd.id}">Edit</button>
               <button class="btn ghost mini" data-c50="${trd.id}">50%</button>
               <button class="btn ghost mini" data-c100="${trd.id}">100%</button>`}
        </td>
      </tr>`;
    }).join('');
  }
  tbody.innerHTML = html || `<tr><td colspan="9">${escapeHtml(t('no_pos'))}</td></tr>`;

  tbody.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.onclick = () => {
      const tr = clean.find((x) => x.id === btn.dataset.edit);
      if (!tr) return;
      state.editTradeId = tr.id;
      $('pos-edit').classList.remove('hidden');
      $('pos-edit-id').value = tr.id;
      $('pos-edit-sym').textContent = posPair(tr);
      renderTpRows(posTradeTpList(tr));
      $('pos-sl').value = tr.sl ?? '';
      $('pos-autoclose').checked = tr.autoClose !== false;
      if ($('pos-trail')) $('pos-trail').checked = tr.trailingStop !== false;
      if ($('pos-trail-pct')) {
        const tp = +(tr.trailPct ?? 1.2);
        $('pos-trail-pct').value = tp < 0.4 ? 1.2 : tp;
      }
    };
  });
  tbody.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const tr = clean.find((x) => x.id === btn.dataset.chart);
      if (tr) openPosDetail(tr);
    };
  });
  tbody.querySelectorAll('tr[data-detail]').forEach((row) => {
    row.onclick = (e) => {
      if (e.target.closest('button')) return;
      const tr = clean.find((x) => x.id === row.dataset.detail);
      if (tr) openPosDetail(tr);
    };
  });
  tbody.querySelectorAll('[data-c50]').forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm('Are you sure you want to close 50% of this trade?')) return;
      await closeTradeNow(btn.dataset.c50, 50, '50% closed');
    };
  });
  tbody.querySelectorAll('[data-c100]').forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm('Are you sure you want to close (delete) 100% of this trade?')) return;
      const ok = await closeTradeNow(btn.dataset.c100, 100, 'Trade closed and removed from open positions');
      if (ok) $('pos-edit').classList.add('hidden');
    };
  });
  tbody.querySelectorAll('[data-reclose]').forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm('Close this position now (market order on the exchange)?')) return;
      await closeTradeNow(btn.dataset.reclose, 100, 'Position closed');
    };
  });
  tbody.querySelectorAll('[data-forget]').forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm('Remove this trade from the app list? The exchange is not touched.')) return;
      let res = await window.cpe.forgetTrade({ id: btn.dataset.forget });
      if (res && !res.ok && res.stillOpen) {
        if (!confirm(`${res.error}\n\nForce clear anyway?`)) return;
        res = await window.cpe.forgetTrade({ id: btn.dataset.forget, force: true });
      }
      if (res && res.ok) { toast('Cleared', 'Trade removed from the app list'); refreshPositions(); }
      else toast('Clear failed', (res && res.error) || 'Could not clear this trade', false, 'error');
    };
  });

  await renderClosedPositions();
}

/**
 * Pending (unfilled) limit orders. Shows the app's own PENDING records plus any
 * order sitting on the exchange for the same platform/market. Per-platform:
 * a platform without an order-lookup API is labelled and left to the exchange.
 */
async function renderPendingOrders(allTrades, tabLive) {
  const tbody = $('pos-pending');
  const note = $('pos-pending-note');
  if (!tbody) return;
  // Only hit the exchange API while the Positions view is actually open.
  if (state.currentView !== 'positions') return;
  const localPending = (allTrades || []).filter((t) => t.status === 'PENDING' && (!!t.paper !== tabLive));
  const pairs = new Map();
  localPending.forEach((t) =>
    pairs.set(`${t.platform || 'BINANCE'}|${t.market || 'SPOT'}`, { platform: t.platform || 'BINANCE', market: t.market || 'SPOT' })
  );
  // Also surface Binance orders placed directly on the exchange (outside the app).
  pairs.set('BINANCE|SPOT', { platform: 'BINANCE', market: 'SPOT' });
  pairs.set('BINANCE|FUTURES', { platform: 'BINANCE', market: 'FUTURES' });

  const rows = [];
  let supported = true;
  let err = null;
  for (const { platform, market } of pairs.values()) {
    let r = null;
    try { r = await window.cpe.pendingOrders({ platform, market }); } catch (e) { r = null; }
    if (!r) continue;
    if (r.supported === false) { supported = false; err = err || r.error; continue; }
    if (r.error) err = err || r.error;
    const ex = r.exchange || [];
    const locals = localPending.filter((t) => (t.platform || 'BINANCE') === platform && (t.market || 'SPOT') === market);
    const matched = new Set();
    locals.forEach((t) => {
      const m = ex.find((o) => String(o.orderId) === String(t.orderId));
      if (m) matched.add(String(m.orderId));
      rows.push({
        platform, market,
        symbol: t.symbol,
        side: t.side,
        price: m ? m.price : (t.pendingPrice || t.entry),
        filledQty: m ? m.filledQty : 0,
        qty: m ? m.qty : t.qty,
        status: m ? m.status : (t.pendingStatus || 'NEW'),
        orderId: t.orderId,
        localId: t.id
      });
    });
    ex.filter((o) => !matched.has(String(o.orderId))).forEach((o) => {
      rows.push({
        platform, market,
        symbol: o.symbol, side: o.side, price: o.price,
        filledQty: o.filledQty, qty: o.qty, status: o.status,
        orderId: o.orderId, localId: null
      });
    });
  }

  tbody.innerHTML = rows.length
    ? rows.map((r) => `
      <tr>
        <td style="font-weight:800">${escapeHtml(r.symbol || '')}</td>
        <td>${posMarketBadge(r.market)}</td>
        <td style="color:${r.side === 'BUY' ? 'var(--buy)' : 'var(--sell)'}; font-weight:700">${escapeHtml(r.side || '')}</td>
        <td>${formatNum(r.price)}</td>
        <td>${formatNum(r.filledQty)} / ${formatNum(r.qty)}</td>
        <td>${formatNum(r.qty)}</td>
        <td><span class="badge" style="background:rgba(251,191,36,.15);color:#fbbf24">${escapeHtml(r.status || 'NEW')}</span></td>
        <td>${escapeHtml(r.platform)}</td>
        <td>
          <button class="btn ghost mini" data-ocancel="${escapeHtml(r.orderId)}" data-plat="${escapeHtml(r.platform)}" data-mkt="${escapeHtml(r.market)}" data-sym="${escapeHtml(r.symbol)}">✕ Cancel</button>
          ${r.localId ? `<button class="btn ghost mini" data-pforget="${escapeHtml(r.localId)}">Clear</button>` : ''}
        </td>
      </tr>`).join('')
    : '<tr><td colspan="9" style="color:var(--muted)">No pending orders</td></tr>';

  if (note) {
    note.textContent = !supported
      ? '(this platform has no order API — manage pending orders on the exchange)'
      : err ? `(${err})`
      : rows.length ? `${rows.length} waiting` : '';
  }

  tbody.querySelectorAll('[data-ocancel]').forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm(`Cancel this pending order on ${btn.dataset.plat}?`)) return;
      try {
        await window.cpe.cancelOrder({
          platform: btn.dataset.plat,
          market: btn.dataset.mkt,
          symbol: btn.dataset.sym,
          orderId: btn.dataset.ocancel
        });
        toast('Cancelled', `${btn.dataset.sym} pending order cancelled`);
      } catch (e) {
        toast('Cancel failed', e.message || String(e), false, 'error');
      }
      refreshPositions();
    };
  });
  tbody.querySelectorAll('[data-pforget]').forEach((btn) => {
    btn.onclick = async () => {
      const res = await window.cpe.forgetTrade({ id: btn.dataset.pforget });
      if (res && res.ok) toast('Cleared', 'Pending trade removed from the app list');
      else toast('Clear failed', (res && res.error) || 'Could not clear', false, 'error');
      refreshPositions();
    };
  });
}

async function renderClosedPositions() {
  const el = $('pos-closed');
  if (!el) return;
  let j = [];
  try { j = await window.cpe.journalList(); } catch { j = []; }
  const tabLive = state.posTab !== 'DEMO';
  const rows = (j || []).filter((r) => r && (r.symbol || r.pair) && (!!r.paper !== tabLive)).slice(0, 100);
  renderClosedStats(rows);
  if (!rows.length) {
    el.innerHTML = '<tr><td colspan="9">No closed trades yet</td></tr>';
    return;
  }
  el.innerHTML = rows.map((r, i) => {
    const pnl = +r.pnlPct || 0;
    const color = pnl >= 0 ? 'var(--buy)' : 'var(--sell)';
    const m = String(r.market || 'SPOT').toUpperCase();
    return `<tr class="pos-row-click" data-closed="${i}">
      <td style="font-weight:800">${escapeHtml(String(r.symbol || r.pair || '—').toUpperCase())}${r.partial ? ' <span class="tiny" style="color:var(--muted)">partial</span>' : ''}</td>
      <td>${posMarketBadge(m)}</td>
      <td>${formatNum(r.entry)}</td>
      <td>${formatNum(r.exit)}</td>
      <td style="color:${color}"><strong>${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}%</strong></td>
      <td>${formatNum(r.qty)}</td>
      <td>${escapeHtml(r.platform || 'BINANCE')}</td>
      <td>${escapeHtml(r.reason || '')}</td>
      <td class="tiny">${escapeHtml(fmtTime(r.openedAt))}<br/>→ ${escapeHtml(fmtTime(r.at))}</td>
    </tr>`;
  }).join('');
  el.querySelectorAll('tr[data-closed]').forEach((row) => {
    row.onclick = () => {
      const r = rows[+row.dataset.closed];
      if (r) openClosedDetail(r);
    };
  });
}

/** Profit / loss quality review — shows when profit is small and loss is big. */
function renderClosedStats(rows) {
  const el = $('pos-closed-stats');
  if (!el) return;
  const list = rows || [];
  if (!list.length) { el.innerHTML = ''; return; }
  const wins = list.filter((r) => (+r.pnlPct || 0) > 0.05);
  const losses = list.filter((r) => (+r.pnlPct || 0) < -0.05);
  const avg = (arr) => (arr.length ? arr.reduce((s, r) => s + (+r.pnlPct || 0), 0) / arr.length : 0);
  const usd = (r) => journalUsd(r);
  const winUsd = wins.map(usd).filter((n) => n != null && n > 0);
  const lossUsd = losses.map(usd).filter((n) => n != null && n < 0);
  const sumWin = winUsd.reduce((s, n) => s + n, 0);
  const sumLoss = lossUsd.reduce((s, n) => s + n, 0);
  const avgWinPct = avg(wins);
  const avgLossPct = avg(losses);
  const pf = sumLoss !== 0 ? Math.abs(sumWin / sumLoss) : (sumWin > 0 ? Infinity : 0);
  const pfTxt = pf === Infinity ? '∞' : pf.toFixed(2);
  const caution = losses.filter((r) => Math.abs(+r.pnlPct || 0) > Math.abs(avgWinPct)).length;
  const wr = list.length ? (wins.length / list.length) * 100 : 0;
  const pfColor = pf >= 1 ? 'var(--buy)' : 'var(--sell)';
  el.innerHTML = `
    <div class="stat"><span>Win rate</span><strong>${wr.toFixed(0)}%</strong></div>
    <div class="stat"><span>${t('jr_avg_profit')}</span><strong>+${avgWinPct.toFixed(2)}%</strong></div>
    <div class="stat"><span>${t('jr_avg_loss')}</span><strong>${avgLossPct.toFixed(2)}%</strong></div>
    <div class="stat"><span>Biggest win</span><strong>${moneyTxt(sumWin ? Math.max(...winUsd) : 0)}</strong></div>
    <div class="stat"><span>Biggest loss</span><strong>${moneyTxt(sumLoss ? Math.min(...lossUsd) : 0)}</strong></div>
    <div class="stat"><span>Profit factor</span><strong style="color:${pfColor}">${pfTxt}</strong></div>
    <div class="stat"><span>Loss &gt; avg win</span><strong style="color:${caution ? 'var(--sell)' : 'var(--buy)'}">${caution} trade${caution === 1 ? '' : 's'}</strong></div>`;
}

function signalVerdict(r) {
  const pnl = +r.pnlPct || 0;
  if (r.verdict === 'PROFIT' || pnl > 0.05) return 'PROFIT';
  if (r.verdict === 'LOSS' || pnl < -0.05) return 'LOSS';
  return 'FLAT';
}

function signalLesson(r) {
  const v = signalVerdict(r);
  const pnl = (+r.pnlPct || 0).toFixed(2);
  const kind = r.signalType || '';
  const score = r.signalScore != null ? ` · score ${r.signalScore}` : '';
  const head = v === 'PROFIT' ? t('sig_line_profit') : v === 'LOSS' ? t('sig_line_loss') : t('sig_line_flat');
  return `${head}. ${r.symbol} ${kind}${score} · ${r.reason || ''} · ${pnl}%`;
}

async function refreshJournal() {
  const all = await window.cpe.journalList();
  // Live and Demo P/L kept apart in tabs; the signal board always shows every signal.
  const tabLive = state.jrTab !== 'DEMO';
  const j = (all || []).filter((r) => !!r.paper !== tabLive);
  $('journal-table').innerHTML = j.map((r) => `
    <tr>
      <td>${new Date(r.at).toLocaleString()}</td>
      <td>${r.symbol}</td>
      <td>${formatNum(r.entry)}</td>
      <td>${formatNum(r.exit)}</td>
      <td style="color:${r.pnlPct >= 0 ? 'var(--buy)' : 'var(--sell)'}">${(+r.pnlPct).toFixed(2)}%</td>
      <td>${escapeHtml(r.reason)}${r.fromSignal ? `<div class="tiny">${escapeHtml(signalLesson(r))}</div>` : ''}</td>
    </tr>
  `).join('') || `<tr><td colspan="6">${escapeHtml(t('no_journal'))}</td></tr>`;
  renderJournalReal(j);
  renderSignalBoard(all);
  const newest = (all || []).find((r) => r.fromSignal);
  if (newest && newest.at && newest.at !== state.lastResultAt) {
    if (state.lastResultAt) toast(t('sig_board'), signalLesson(newest), signalVerdict(newest) === 'LOSS');
    state.lastResultAt = newest.at;
  } else if (!state.lastResultAt && newest) {
    state.lastResultAt = newest.at;
  }
}

function journalUsd(r) {
  const qty = +r.qty;
  const entry = +r.entry;
  const pct = +r.pnlPct || 0;
  if (!(qty > 0) || !(entry > 0)) return null;
  return (pct / 100) * entry * qty;
}

function renderJournalReal(rows) {
  const el = $('jr-real-stats');
  if (!el) return;
  const list = rows || [];
  const wins = list.filter((r) => (+r.pnlPct || 0) > 0.05);
  const losses = list.filter((r) => (+r.pnlPct || 0) < -0.05);
  const avg = (arr) => (arr.length ? arr.reduce((s, r) => s + (+r.pnlPct || 0), 0) / arr.length : 0);
  const usdRows = list.map((r) => journalUsd(r)).filter((n) => n != null);
  const winUsd = list.map(journalUsd).filter((n) => n != null && n > 0);
  const lossUsd = list.map(journalUsd).filter((n) => n != null && n < 0);
  const avgUsd = (arr) => (arr.length ? arr.reduce((s, n) => s + n, 0) / arr.length : 0);
  const bal = usdRows.reduce((s, n) => s + n, 0);
  const fmt = (n) => `${n >= 0 ? '+' : ''}${(+n || 0).toFixed(2)}`;
  el.innerHTML = `
    <div class="stat"><span>${t('jr_avg_profit')}</span><strong>${fmt(avg(wins))}%</strong></div>
    <div class="stat"><span>${t('jr_avg_loss')}</span><strong>${(+avg(losses) || 0).toFixed(2)}%</strong></div>
    <div class="stat"><span>${t('jr_avg_profit_usd')}</span><strong>${winUsd.length ? fmt(avgUsd(winUsd)) : '—'}</strong></div>
    <div class="stat"><span>${t('jr_balance')}</span><strong>${usdRows.length ? fmt(bal) : '—'}</strong></div>`;
  paintPeriods($('jr-periods'), list, (r) => journalUsd(r) || 0, (r) => new Date(r.at).getTime() || 0);
}

function moneyPlanLine(r) {
  const e = +r.entry;
  const s = +r.sl;
  if (!e || !s || e === s) return '';
  const dist = Math.abs(e - s) / e;
  if (dist < 0.003 || dist > 0.15) return '';
  const notional = Math.min(1000, 10 / dist);
  const planPnl = notional * historyNetPct(r) / 100;
  return `<div class="tiny">1% plan $${notional.toFixed(0)} → ${moneyTxt(planPnl)}</div>`;
}

function moneyTxt(n) {
  const v = +n || 0;
  return `${v >= 0 ? '+' : ''}${v.toFixed(2)}`;
}

function historyFeePct(r) {
  if (r.feePct != null) return +r.feePct;
  if (r.market === 'FUTURES') return 0.08;
  if (r.market === 'FOREX') return 0.03;
  return 0.2;
}

function historyNetPct(r) {
  if (r.pnlGrossPct != null) return +r.pnlPct || 0;
  return (+r.pnlPct || 0) - historyFeePct(r);
}

function historyNetUsd(r) {
  if (r.pnlGrossPct != null) return +r.pnlUsd || 0;
  return (10 * historyNetPct(r)) / 100;
}

async function refreshSignalLab() {
// Fullscreen toggle for Chart Lab
function toggleChartFullScreen() {
  const el = $('lab-chart-container');
  if (el) {
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}

// Draw auto-patterns (M, W, Cup) based on price data
function drawPatterns(ctx, chartData) {
  // Simple pattern detection logic based on chart data
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  // Patterns like M, W will be drawn here dynamically as lines over the canvas
}

  let data = { summary: {}, open: [], closed: [] };
  try { data = await window.cpe.signalLabList(); } catch { return; }
  const market = state.slMarket || 'SPOT';
  document.querySelectorAll('[data-sl-market]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.slMarket === market);
  });
  const dateInput = $('sl-date-filter');
  const selectedDate = dateInput?.value || '';
  const all = [...(data.open || []), ...(data.closed || [])].filter((r) => {
    if ((r.market || 'SPOT') !== market) return false;
    if (!selectedDate) return true;
    const rDate = r.openedAt ? r.openedAt.slice(0, 10) : '';
    return rDate === selectedDate;
  });
  const closed = all.filter((r) => r.status !== 'OPEN' && r.closedAt);
  const wins = closed.filter((r) => historyNetUsd(r) > 0.0001);
  const losses = closed.filter((r) => historyNetUsd(r) < -0.0001);
  const sumUsd = (list) => list.reduce((n, r) => n + historyNetUsd(r), 0);
  const openPnl = all.filter((r) => r.status === 'OPEN').reduce((n, r) => n + historyNetUsd(r), 0);
  if ($('sl-stats')) {
    $('sl-stats').innerHTML = `
      <div class="stat"><span>${t('sl_balance')}</span><strong>${moneyTxt(sumUsd(closed))}</strong></div>
      <div class="stat"><span>${t('sl_equity')}</span><strong>${moneyTxt(sumUsd(closed) + openPnl)}</strong></div>
      <div class="stat"><span>${t('jr_avg_profit')}</span><strong>${moneyTxt(wins.length ? sumUsd(wins) / wins.length : 0)}</strong></div>
      <div class="stat"><span>${t('jr_avg_loss')}</span><strong>${moneyTxt(losses.length ? sumUsd(losses) / losses.length : 0)}</strong></div>`;
  }
  paintPeriods($('sl-periods'), closed, (r) => historyNetUsd(r), (r) => new Date(r.closedAt).getTime() || 0);
  const host = $('sl-markets');
  if (!host) return;
  host.innerHTML = [market].map((key) => {
    const rows = all;
    const label = key === 'FUTURES' ? 'Futures' : key === 'FOREX' ? 'Forex' : 'Spot';
    const openRows = rows.filter((r) => r.status === 'OPEN');
    const trigRows = rows.filter((r) => r.triggered);
    const bigRows = rows.filter((r) => r.bigProfit || ((r.grade === 'STRONG' || r.grade === 'HIGHER STRONG') && r.triggered && (+r.pnlPct || 0) >= 2));
    const tpRows = rows.filter((r) => r.status !== 'OPEN' && (String(r.reason || '').startsWith('TP') || r.reason === 'TRAIL'));
    const slRows = rows.filter((r) => r.status !== 'OPEN' && String(r.reason || '').startsWith('SL'));
    const block = (title, list) => `
      <h4 class="mt">${title} · ${list.length}</h4>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Grade</th><th>Pair</th><th>Side</th><th>Score</th><th>Status</th>
              <th>Entry</th><th>Now / Exit</th><th>TP1</th><th>SL</th><th>P/L $10</th>
            </tr>
          </thead>
          <tbody>${list.length ? list.map((r) => signalHistoryRow(r)).join('') : `<tr><td colspan="10" class="tiny">${escapeHtml(key === 'FOREX' ? 'No Forex history yet. Scanning the Forex desk once. A row is added only when a pair is a clear BUY or SELL.' : t('sl_none'))}</td></tr>`}</tbody>
        </table>
      </div>`;
    return `
      <div class="panel sl-market">
        <h3>${label}</h3>
        ${block('Triggered — SL and TP moved', trigRows)}
        ${block('Strong large profit', bigRows)}
        ${block('Open', openRows)}
        ${block('Take profit / trail lock', tpRows)}
        ${block('Stop loss', slRows)}
      </div>`;
  }).join('');
  host.querySelectorAll('tr[data-sl]').forEach((tr) => {
    tr.onclick = () => openSignalChart(tr.dataset.sl);
  });
  if (state.slFull && state.slChartMode === 'live' && (state.slFull.market || 'SPOT') === market) drawSlChart();
  if (!all.length && !(state.histTried || {})[market]) {
    state.histTried = state.histTried || {};
    state.histTried[market] = true;
    const interval = $('interval-select')?.value || '1d';
    const limit = +$('scan-limit')?.value || 40;
    window.cpe.scan({ market, interval, limit }).then((data) => {
      if (market === 'FOREX') state.fxResults = data.results || [];
      else if (market === 'FUTURES') state.futResults = data.results || [];
      else state.spotResults = data.results || [];
      if (state.currentView === 'signallab' && state.slMarket === market) refreshSignalLab();
    }).catch((e) => toast('Scan', e.message || String(e), false));
  }
}

function signalGradeOf(r) {
  if (r.grade === 'HIGHER STRONG' || r.strength === 'HIGHER STRONG') return 'HIGHER STRONG';
  if (r.grade === 'CAUTION' || r.strength === 'CAUTION') return 'CAUTION';
  return 'STRONG';
}

/** Plain-language "what happened" for a recorded signal. */
function signalOutcomeLabel(r) {
  if (r.status === 'OPEN') return 'OPEN';
  const map = { TP: 'TAKE PROFIT', SL: 'STOP LOSS', TRAIL: 'TRAILED OUT', EXPIRED: 'NO TRIGGER · EXPIRED' };
  return map[r.reason] || (r.reason || 'CLOSED');
}

function signalHistoryRow(r) {
  const grade = signalGradeOf(r);
  const gradeClass = grade === 'HIGHER STRONG' ? 'HIGHER-STRONG' : grade;
  const isStrong = grade === 'STRONG' || grade === 'HIGHER STRONG';
  const open = r.status === 'OPEN';
  const px = open ? r.lastPrice : r.exit;
  return `
    <tr data-sl="${escapeHtml(r.id)}" class="${r.side === 'SELL' ? 'sl-sell' : 'sl-buy'} ${isStrong ? 'sl-strong' : ''} ${r.triggered ? 'sl-trig' : ''} ${(r.bigProfit || (isStrong && r.triggered && (+r.pnlPct || 0) >= 2)) ? 'sl-big' : ''}" style="cursor:pointer">
      <td><span class="badge ${gradeClass}">${escapeHtml(grade)}</span>${r.triggered ? ' <span class="badge STRONG">TRIG</span>' : ''}</td>
      <td><strong>${escapeHtml(r.symbol)}</strong>${r.triggered ? `<div class="tiny">TP +${r.tpLiftPct || 0}% · SL +${r.slLiftPct || 0}%</div>` : ''}</td>
      <td><span class="badge ${r.side === 'SELL' ? 'SELL' : 'BUY'}">${escapeHtml(sideWord(r.side, r.market))}</span>${r.entryType ? ` <span class="badge" style="background:${r.entryType === 'LIMIT' ? 'rgba(251,191,36,.16)' : 'rgba(34,197,94,.16)'};color:${r.entryType === 'LIMIT' ? '#fbbf24' : '#22c55e'};font-weight:700" title="${escapeHtml(r.entryZone ? `${r.entryZone.kind || 'zone'} ${formatNum(r.entryZone.low)}–${formatNum(r.entryZone.high)}` : '')}">${escapeHtml(r.entryType)}</span>` : ''}</td>
      <td>${r.score ?? '—'}</td>
      <td>${open ? 'OPEN' : escapeHtml(signalOutcomeLabel(r))}<div class="tiny">${historyNetPct(r).toFixed(2)}%</div></td>
      <td>${formatNum(r.entry)}</td>
      <td>${formatNum(px)}</td>
      <td>${formatNum(r.tp1)}</td>
      <td>${formatNum(r.sl)}</td>
      <td style="color:${historyNetPct(r) >= 0 ? 'var(--buy)' : 'var(--sell)'}">${moneyTxt(historyNetUsd(r))}<div class="tiny">after ${historyFeePct(r)}% fee</div>${moneyPlanLine(r)}</td>
    </tr>`;
}

async function openSignalChart(id) {
  const full = await window.cpe.signalLabOne(id);
  if (!full) return;
  state.slFull = full;
  state.slChartMode = 'live';
  drawSlChart();
  if (full.status !== 'OPEN') openSignalPopup(full);
}

function openSignalPopup(full) {
  const pop = $('sl-popup');
  if (!pop) return;
  pop.classList.remove('hidden');
  if ($('sl-pop-title')) {
    $('sl-pop-title').textContent = `${full.symbol} · ${full.side} · ${full.reason || ''} · ${moneyTxt(full.pnlUsd)} USD`;
  }
  const pack = (chart) => ({
    chart,
    entry: full.entry,
    tp1: full.tp1,
    tp2: full.tp2,
    sl: full.sl,
    baseTp1: full.baseTp1,
    baseSl: full.baseSl,
    triggers: full.triggers || [],
    _zoom: 1
  });
  try { if (full.chartStart) window.CPEChart.draw($('sl-pop-start'), pack(full.chartStart)); } catch { /* ignore */ }
  try { if (full.chartEnd) window.CPEChart.draw($('sl-pop-end'), pack(full.chartEnd)); } catch { /* ignore */ }
  if ($('sl-pop-detail')) {
    const lift = full.triggered
      ? ` · Triggered: TP widened ${full.tpLiftPct || 0}% · SL moved ${full.slLiftPct || 0}% · gold marks on the chart`
      : '';
    $('sl-pop-detail').textContent = `Start ${full.openedAt ? new Date(full.openedAt).toLocaleString() : '—'} · End ${full.closedAt ? new Date(full.closedAt).toLocaleString() : '—'}${lift}`;
  }
}

function closeSignalPopup() {
  $('sl-popup')?.classList.add('hidden');
}

let slLiveToken = 0;

function paintSignalChart(full, chart, caption, project = false) {
  if ($('sl-chart-title')) {
    $('sl-chart-title').textContent = `${full.symbol} · ${full.side} · ${full.market || ''} · score ${full.score ?? '—'}`;
  }
  if ($('sl-chart-meta')) $('sl-chart-meta').textContent = caption;
  if (!chart?.candles?.length) {
    if ($('sl-detail')) $('sl-detail').textContent = t('sl_no_chart');
    stopProjectionLoop('sl-chart');
    return;
  }
  const C = window.CPEChart;
  const sig = {
    symbol: full.symbol,
    type: full.side || full.type || 'HOLD',
    chart,
    interval: full.interval || '1d',
    volatility: full.volatility || null,
    price: full.lastPrice,
    entry: full.entry,
    entryType: full.entryType || null,
    entryZone: full.entryZone || null,
    tp1: full.tp1,
    tp2: full.tp2,
    sl: full.sl,
    baseTp1: full.baseTp1,
    baseSl: full.baseSl,
    triggers: full.triggers || [],
    _future: !!project,
    _futureRatio: 0.3,
    _zoom: 1
  };
  if (project) {
    sig._projection = C && C.buildProjection ? C.buildProjection(sig) : null;
    sig._showProjection = !!sig._projection;
    sig._projProgress = 0;
    sig._forecast = C && C.buildForecast ? C.buildForecast(sig) : null;
    sig._showForecast = !!sig._forecast;
    if (sig._forecast) sig._forecastProgress = 0;
  }
  state.slChartSignal = sig;
  try { C.draw($('sl-chart'), sig); } catch { /* canvas not ready */ }
  if (project && (sig._projection || sig._forecast)) ensureProjectionLoop('sl-chart', () => state.slChartSignal);
  else stopProjectionLoop('sl-chart');
  if ($('sl-detail')) {
    $('sl-detail').innerHTML = `<p>${escapeHtml((full.reasons || []).join(' · '))}</p>
      <p>Entry ${formatNum(full.entry)} · TP ${formatNum(full.tp1)} · SL ${formatNum(full.sl)} · $10 → ${moneyTxt(full.pnlUsd)}</p>`;
  }
}

async function drawSlChart() {
  const full = state.slFull;
  if (!full || !$('sl-chart')) return;
  if (state.slChartMode === 'live') {
    const token = ++slLiveToken;
    if ($('sl-chart-meta')) $('sl-chart-meta').textContent = `${full.symbol} · live market…`;
    let live = null;
    try { live = await window.cpe.signalLabLive(full.id); } catch { live = null; }
    if (token !== slLiveToken || state.slFull?.id !== full.id || state.slChartMode !== 'live') return;
    const px = live?.price != null ? formatNum(live.price) : formatNum(full.lastPrice);
    if (live?.chart?.candles?.length) {
      paintSignalChart(full, live.chart, `Live ${full.market || ''} · ${live.interval || full.interval || '1d'} · now ${px}`, true);
      return;
    }
    paintSignalChart(full, full.chartEnd || full.chartStart, `Live chart unavailable · now ${px}`);
    return;
  }
  const useEnd = state.slChartMode === 'end' && full.chartEnd;
  const chart = useEnd ? full.chartEnd : full.chartStart;
  const when = useEnd ? full.closedAt : full.openedAt;
  paintSignalChart(
    full,
    chart,
    `${useEnd ? t('sl_chart_end') : t('sl_chart_start')} · ${when ? new Date(when).toLocaleString() : ''} · $${moneyTxt(full.pnlUsd)}`
  );
}

function manualMarket() {
  const plat = $('tr-platform')?.value;
  const meta = getPlatformMeta(plat);
  const allowed = meta.markets || ['SPOT'];
  const selected = $('tr-market')?.value;
  if (allowed.includes(selected)) return selected;
  return allowed[0] || 'SPOT';
}

function paintSideWords(market) {
  const sel = $('tr-side');
  if (!sel) return;
  const v = sel.value === 'SELL' ? 'SELL' : 'BUY';
  const leverageMarket = market === 'FUTURES' || market === 'FOREX';
  sel.innerHTML = leverageMarket
    ? '<option value="BUY">Buy (Long)</option><option value="SELL">Sell (Short)</option>'
    : '<option value="BUY">BUY</option><option value="SELL">SELL</option>';
  sel.value = v;
}

function sideWord(side, market) {
  if (market === 'FUTURES' || market === 'FOREX') {
    return side === 'SELL' ? 'Sell (Short)' : 'Buy (Long)';
  }
  return side === 'SELL' ? 'SELL' : 'BUY';
}

function renderManualSignals() {
  const note = $('tr-signals-note');
  const box = $('tr-signals');
  if (!note || !box) return;
  const market = manualMarket();
  if ($('tr-market') && $('tr-market').value !== market) $('tr-market').value = market;
  const traded = (rowsFor(market) || []).filter((r) => r.type === 'BUY' || r.type === 'SELL');
  const bb = market === 'FUTURES' ? state.futBb : market === 'FOREX' ? state.fxBb : state.spotBb;
  const lowerOnly = (bb || []).filter((b) => b.bollinger?.touchLower && !traded.some((r) => r.symbol === b.symbol));
  const rows = traded.concat(lowerOnly);
  if (!rows.length) {
    note.textContent = state.manualScanBusy
      ? `Loading ${market} signals…`
      : `No ${market} signals yet.`;
    box.innerHTML = '';
    if (!state.manualScanBusy && !(state.manualTried || {})[market]) {
      state.manualTried = state.manualTried || {};
      state.manualTried[market] = true;
      loadManualMarket(market);
    }
    return;
  }
  const label = market === 'FUTURES' ? 'Futures' : market === 'FOREX' ? 'Forex' : 'Spot';
  note.textContent = `${label} — click a pair. Green BUY / Long. Red SELL / Short. BB marks the lower band.`;
  box.innerHTML = rows.slice(0, 36).map((r) => {
    const bbTag = r.bollinger?.touchLower ? ' · BB lower' : '';
    const word = sideWord(r.type, market);
    return `
    <button type="button" class="sig-pick ${r.type} m-${market}" data-symbol="${escapeHtml(r.symbol)}">
      ${escapeHtml(r.symbol)} · ${escapeHtml(word)} · ${escapeHtml(r.grade || 'CAUTION')} · ${r.score}${bbTag}
    </button>`;
  }).join('');
  box.querySelectorAll('.sig-pick').forEach((btn) => {
    btn.onclick = () => {
      const hit = rows.find((r) => r.symbol === btn.dataset.symbol);
      if (!hit) return;
      fillTradeForm(hit, market);
      toast('Manual', `${hit.symbol} ${hit.type} filled — press Start to enter`, false);
    };
  });
}

async function loadManualMarket(market) {
  if (state.manualScanBusy) return;
  state.manualScanBusy = true;
  const prev = state.market;
  state.market = market;
  try {
    await runScan();
  } catch { /* scan toast already reports errors */ }
  finally {
    state.manualScanBusy = false;
    if (state.currentView !== 'futures' && state.currentView !== 'forex' && state.currentView !== 'spot') {
      state.market = prev;
    }
    renderManualSignals();
  }
}

function setupSignalLabUi() {
  document.querySelectorAll('[data-sl-market]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.slMarket = btn.dataset.slMarket || 'SPOT';
      refreshSignalLab();
    });
  });
  $('sl-date-filter')?.addEventListener('change', () => refreshSignalLab());
  $('sl-date-clear')?.addEventListener('click', () => {
    if ($('sl-date-filter')) $('sl-date-filter').value = '';
    refreshSignalLab();
  });
  $('sl-show-live')?.addEventListener('click', () => {
    if (!state.slFull) return;
    state.slChartMode = 'live';
    drawSlChart();
  });
  const popBoth = () => {
    if (!state.slFull) return;
    state.slChartMode = 'start';
    drawSlChart();
    openSignalPopup(state.slFull);
  };
  $('sl-show-start')?.addEventListener('click', popBoth);
  $('sl-show-end')?.addEventListener('click', popBoth);
  $('sl-pop-close')?.addEventListener('click', closeSignalPopup);
  $('sl-popup')?.addEventListener('click', (e) => {
    if (e.target === $('sl-popup')) closeSignalPopup();
  });
}

function signalTradeResults(journal) {
  const groups = new Map();
  const results = [];
  for (const row of (journal || []).filter((r) => r && r.fromSignal)) {
    if (row.tradeId) {
      if (!groups.has(row.tradeId)) groups.set(row.tradeId, []);
      groups.get(row.tradeId).push(row);
    } else if (!row.partial && row.tradeClosed !== false) {
      results.push(row);
    }
  }

  for (const legs of groups.values()) {
    if (!legs.some((leg) => leg.tradeClosed === true)) continue;
    const basis = legs.reduce((sum, leg) => sum + ((+leg.entry || 0) * (+leg.qty || 0)), 0);
    const pnlUsd = legs.reduce((sum, leg) => sum + ((+leg.pnlPct || 0) / 100) * (+leg.entry || 0) * (+leg.qty || 0), 0);
    const finalLeg = legs.find((leg) => leg.tradeClosed === true) || legs[0];
    const pnlPct = basis > 0 ? (pnlUsd / basis) * 100 : (+finalLeg.pnlPct || 0);
    results.push({
      ...finalLeg,
      pnlPct,
      verdict: pnlPct > 0.05 ? 'PROFIT' : pnlPct < -0.05 ? 'LOSS' : 'FLAT',
      partial: false
    });
  }
  return results;
}

function renderSignalBoard(journal) {
  const summary = $('sig-board-summary');
  const stats = $('sig-board-stats');
  const list = $('sig-board-list');
  if (!summary || !stats || !list) return;
  const rows = signalTradeResults(journal);
  if (!rows.length) {
    summary.textContent = t('sig_empty');
    stats.innerHTML = '';
    list.innerHTML = '';
    return;
  }
  const wins = rows.filter((r) => signalVerdict(r) === 'PROFIT').length;
  const losses = rows.filter((r) => signalVerdict(r) === 'LOSS').length;
  const flats = rows.length - wins - losses;
  const avg = rows.reduce((s, r) => s + (+r.pnlPct || 0), 0) / rows.length;
  const rate = Math.round((wins / rows.length) * 100);
  summary.textContent = `${t('sig_count')} ${rows.length} · ${t('sig_profit_n')} ${wins} · ${t('sig_loss_n')} ${losses} · ${t('sig_flat_n')} ${flats} · ${t('sig_rate')} ${rate}% · ${t('sig_avg')} ${avg >= 0 ? '+' : ''}${avg.toFixed(2)}%`;
  stats.innerHTML = `
    <div class="stat"><span>${t('sig_count')}</span><strong>${rows.length}</strong></div>
    <div class="stat"><span>${t('sig_profit_n')}</span><strong>${wins}</strong></div>
    <div class="stat"><span>${t('sig_loss_n')}</span><strong>${losses}</strong></div>
    <div class="stat"><span>${t('sig_rate')}</span><strong>${rate}%</strong></div>`;
  list.innerHTML = rows.slice(0, 8).map((r) => {
    const v = signalVerdict(r);
    return `<div class="sig-item ${v}">${escapeHtml(signalLesson(r))}</div>`;
  }).join('');
}

async function initPlatformSelectors() {
  try {
    state.platforms = await window.cpe.platforms();
  } catch {
    state.platforms = [];
  }
  const fill = (selId) => {
    const sel = $(selId);
    if (!sel) return;
    sel.innerHTML = state.platforms.map((p) =>
      `<option value="${p.id}">${p.name}${p.live ? ' ★' : ''} — ${p.type}</option>`
    ).join('');
  };
  fill('keys-platform');
  fill('help-platform');
  const tradeOpts = state.platforms.map((p) =>
    `<option value="${p.id}">${p.name}${p.live ? ' (live)' : ''}</option>`
  ).join('');
  if ($('tr-platform')) $('tr-platform').innerHTML = tradeOpts;
  if ($('auto-platform')) {
    $('auto-platform').innerHTML = state.platforms
      .map((p) => `<option value="${p.id}">${p.name}${p.live ? ' ★' : ''}</option>`).join('');
  }
  applyPlatformKeyFields($('keys-platform')?.value || 'BINANCE');
  showPlatformGuide($('keys-platform')?.value || 'BINANCE', 'api-guide-title', 'api-guide-body');
  showPlatformGuide($('help-platform')?.value || 'BINANCE', 'help-api-title', 'help-api-body');
  setupTradeFormDynamics();
  syncTradeMarketOptions('tr');
  syncTradeMarketOptions('auto');
  syncTradeFieldVisibility('tr');
  syncTradeFieldVisibility('auto');
  refreshPlatformKeyFlag();
}

function getPlatformMeta(id) {
  return state.platforms.find((p) => p.id === id) || { id, markets: ['SPOT', 'FUTURES'], type: 'CRYPTO', minQuote: { SPOT: 11, FUTURES: 1 }, live: false, note: '' };
}

function syncTradeMarketOptions(prefix) {
  const platSel = $(`${prefix}-platform`);
  const mktSel = $(`${prefix}-market`);
  if (!platSel || !mktSel) return;
  const meta = getPlatformMeta(platSel.value);
  const markets = meta.markets || ['SPOT'];
  const labels = {
    SPOT: 'Spot (min $11)',
    FUTURES: 'Futures (min $1)',
    FOREX: 'Forex'
  };
  const cur = mktSel.value;
  mktSel.innerHTML = markets.map((m) => `<option value="${m}">${labels[m] || m}</option>`).join('');
  if (markets.includes(cur)) mktSel.value = cur;
  else mktSel.value = markets[0];
}

function paintPeriods(el, rows, usdOf, dateOf) {
  if (!el) return;
  const year = new Date().getFullYear();
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year, 11, 31, 23, 59, 59, 999).getTime();
  const inYear = (rows || []).filter((r) => {
    const tms = dateOf(r);
    return tms >= start && tms <= end;
  });
  const sum = (list) => list.reduce((s, r) => s + (usdOf(r) || 0), 0);
  const months = [];
  for (let m = 0; m < 12; m += 1) {
    const list = inYear.filter((r) => new Date(dateOf(r)).getMonth() === m);
    if (!list.length) continue;
    months.push({ m, usd: sum(list), n: list.length });
  }
  const byDay = {};
  inYear.forEach((r) => {
    const d = new Date(dateOf(r));
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!byDay[key]) byDay[key] = { usd: 0, n: 0 };
    byDay[key].usd += usdOf(r) || 0;
    byDay[key].n += 1;
  });
  const days = Object.keys(byDay).sort().reverse().slice(0, 14);
  const monthName = (m) => new Date(year, m, 1).toLocaleString(undefined, { month: 'long' });
  el.innerHTML = `
    <h4>${year} · Jan 1 – Dec 31 · ${moneyTxt(sum(inYear))} USD · ${inYear.length}</h4>
    <h4>Months</h4>
    ${months.length ? months.map((x) => `<div class="period-line"><span>${monthName(x.m)} · ${x.n}</span><strong>${moneyTxt(x.usd)}</strong></div>`).join('') : '<p class="tiny">No closed results in this year yet.</p>'}
    <h4>Days</h4>
    ${days.length ? days.map((k) => `<div class="period-line"><span>${k} · ${byDay[k].n}</span><strong>${moneyTxt(byDay[k].usd)}</strong></div>`).join('') : '<p class="tiny">No days yet.</p>'}`;
}

function syncTradeFieldVisibility(prefix) {
  const plat = $(`${prefix}-platform`)?.value;
  const market = $(`${prefix}-market`)?.value;
  const meta = getPlatformMeta(plat);
  const isFut = market === 'FUTURES';
  const isFx = market === 'FOREX' || meta.type === 'FOREX';
  const isCrypto = !isFx;
  const root = $(`${prefix}-form`) || document;
  root.querySelectorAll('.fld-futures').forEach((el) => el.classList.toggle('hidden', !isFut));
  root.querySelectorAll('.fld-forex').forEach((el) => el.classList.toggle('hidden', !isFx));
  root.querySelectorAll('.fld-crypto').forEach((el) => el.classList.toggle('hidden', !isCrypto));
  const martOn = !!$(`${prefix}-mart`)?.checked;
  root.querySelectorAll('.fld-mart').forEach((el) => el.classList.toggle('hidden', !martOn));
  const hint = $(`${prefix}-hint`);
  if (hint) {
    const minQ = meta.minQuote?.[market] ?? (isFut ? 1 : isFx ? 1 : 11);
    const keys = (meta.keyFields || []).join(', ') || 'none (demo)';
    const trail = isFut
      ? 'BUY → TP+SL move up · SELL → TP+SL move down · Cross or Isolated margin'
      : isFx
        ? 'Forex paper/live rates · same trail TP+SL · lots size'
        : 'Spot min $11 · trail TP+SL upward on BUY';
    const words = (isFut || isFx)
      ? ' BUY = Long. SELL = Short.'
      : ' Spot BUY = buy the coin. Spot SELL = sell the coin.';
    hint.innerHTML = `<strong>${meta.name || plat}</strong> · ${market} · min quote $${minQ}` +
      `${meta.live ? ' · LIVE' : ' · paper / keys later'} · API fields: ${keys}<br/>Hint: ${trail}.${words} ${meta.note || ''}`;
  }
  if (prefix === 'tr') paintSideWords(isFx ? 'FOREX' : market);
  if (prefix === 'tr' && isCrypto && market === 'SPOT' && $('tr-quote')) {
    if (+$('tr-quote').value < 11) $('tr-quote').value = 11;
  }
  if (prefix === 'tr' && isFut && $('tr-quote') && +$('tr-quote').value < 1) $('tr-quote').value = 1;
}

let tradeFormDynamicsReady = false;
function setupTradeFormDynamics() {
  if (tradeFormDynamicsReady) return;
  tradeFormDynamicsReady = true;
  $('tr-platform')?.addEventListener('change', () => {
    syncTradeMarketOptions('tr');
    syncTradeFieldVisibility('tr');
    refreshPlatformKeyFlag();
  });
  $('tr-market')?.addEventListener('change', () => syncTradeFieldVisibility('tr'));
  $('auto-platform')?.addEventListener('change', () => {
    syncTradeMarketOptions('auto');
    syncTradeFieldVisibility('auto');
  });
  $('auto-market')?.addEventListener('change', () => syncTradeFieldVisibility('auto'));
  $('tr-mart')?.addEventListener('change', () => syncTradeFieldVisibility('tr'));
  $('auto-mart')?.addEventListener('change', () => syncTradeFieldVisibility('auto'));
}

/** MT4 and MT5 share one local bridge — label the status line for the selected terminal. */
function bridgeTag() {
  return $('keys-platform')?.value === 'FOREX_MT4' ? 'MT4' : 'MT5';
}

function renderMt5Bridge(h) {
  const tag = bridgeTag();
  const el = $('mt5-bridge-status');
  if (!el) return;
  if (!h) { el.textContent = `${tag} bridge: unknown`; return; }
  if (h.bridge) {
    if (h.account) {
      const a = h.account;
      el.textContent = `${tag} bridge: RUNNING at ${h.url || ''} · account ${a.login} @ ${a.server} · balance ${a.balance} ${a.currency || ''}`;
    } else {
      const terminal = h.terminal_found === false
        ? ' · terminal NOT found'
        : (h.terminal_path ? ` · terminal: ${h.terminal_path}` : '');
      el.textContent = `${tag} bridge: running at ${h.url || ''}${terminal} — ${h.error || `the ${tag} terminal is not connected`}`;
    }
  } else {
    el.textContent = `${tag} bridge: not running — ${h.error || ''}`;
  }
}

async function refreshMt5Bridge() {
  try {
    renderMt5Bridge(await window.cpe.mt5BridgeStatus());
  } catch (e) {
    const el = $('mt5-bridge-status');
    if (el) el.textContent = `${bridgeTag()} bridge: ${e.message || e}`;
  }
}

function renderMt5Setup(s) {
  const el = $('mt5-setup-status');
  if (!el) return;
  if (!s) { el.textContent = 'MT5 setup: unknown'; return; }
  const py = s.python || {};
  const pkg = s.package || {};
  const term = s.terminal || {};
  const ea = s.ea || {};
  const bits = [
    py.ok ? `Python 3 ready${py.version ? ` (${py.version})` : ''}` : 'Python 3 missing',
    pkg.ok ? 'MetaTrader5 package ready' : 'MetaTrader5 package missing',
    term.found ? `MT5 terminal ready${term.path ? ` · ${term.path}` : ''}` : 'MT5 terminal missing',
    ea.installed ? (ea.compiled ? 'CPE_Bridge EA ready' : 'CPE_Bridge EA installed (compile in MetaEditor)') : 'CPE_Bridge EA not installed'
  ];
  el.textContent = `MT5 setup — ${bits.join('  ·  ')}`;
  const hint = $('mt5-setup-hint');
  if (hint) {
    hint.innerHTML = s.ok
      ? 'All set. Save your MT5 login / password / server, then press Save Keys → Test Account. If Test Account shows an IPC timeout, click <strong>Install CPE bridge EA</strong> and attach CPE_Bridge to a chart in MT5.'
      : 'MT5 live orders need: Python 3 → the bridge → MetaTrader 5 terminal. Newer MT5 builds (6230+) break the official Python API, so the app also ships a <strong>CPE_Bridge</strong> EA that trades through local files — click <strong>Install CPE bridge EA</strong>, then attach CPE_Bridge to any chart in MT5 and turn on <strong>Algo Trading</strong>. Use the <em>master</em> password — an investor (read-only) password cannot place trades.';
  }
}

async function refreshMt5Setup() {
  const el = $('mt5-setup-status');
  if (el) el.textContent = 'MT5 setup: checking…';
  try {
    renderMt5Setup(await window.cpe.mt5SetupStatus());
  } catch (e) {
    if (el) el.textContent = `MT5 setup: ${e.message || e}`;
  }
}

function renderMt4Setup(s) {
  const el = $('mt4-setup-status');
  if (!el) return;
  if (!s) { el.textContent = 'MT4 setup: unknown'; return; }
  const py = s.python || {};
  const term = s.terminal || {};
  const ea = s.ea || {};
  const bits = [
    py.ok ? `Python 3 ready${py.version ? ` (${py.version})` : ''}` : 'Python 3 missing',
    term.found ? `MT4 terminal ready${term.path ? ` · ${term.path}` : ''}` : 'MT4 terminal missing',
    ea.installed ? 'CPE bridge EA compiled' : 'CPE bridge EA missing'
  ];
  el.textContent = `MT4 setup — ${bits.join('  ·  ')}`;
  const hint = $('mt4-setup-hint');
  if (hint) {
    hint.textContent = s.ok
      ? 'All set. Now open MT4, attach CPE_Bridge to any chart (Navigator → Expert Advisors) and click AutoTrading. Then save your MT4 login / password / server and press Save Keys → Test Account.'
      : 'MT4 live orders need three things on this PC: Python 3 (to run the bridge) → the MetaTrader 4 terminal → the CPE_Bridge expert advisor. Press “Auto-install everything” to install all three silently. MT4 cannot log in for you — after the install, attach CPE_Bridge to a chart and click AutoTrading. Use the master password — an investor (read-only) password cannot place trades.';
  }
}

async function refreshMt4Setup() {
  const el = $('mt4-setup-status');
  if (el) el.textContent = 'MT4 setup: checking…';
  try {
    renderMt4Setup(await window.cpe.mt4SetupStatus());
  } catch (e) {
    if (el) el.textContent = `MT4 setup: ${e.message || e}`;
  }
}

function applyPlatformKeyFields(platformId) {
  const meta = state.platforms.find((p) => p.id === platformId) || { keyFields: ['apiKey', 'apiSecret'] };
  const fields = meta.keyFields || [];
  const show = (id, on) => { const el = $(id); if (el) el.classList.toggle('hidden', !on); };
  show('lab-api-key', fields.includes('apiKey') || fields.length === 0);
  show('lab-api-secret', fields.includes('apiSecret'));
  show('lab-passphrase', fields.includes('passphrase'));
  show('lab-account', fields.includes('accountId'));
  show('lab-login', fields.includes('login'));
  show('lab-password', fields.includes('password'));
  show('lab-server', fields.includes('server'));
  const mt = platformId === 'FOREX_MT5' ? 'MT5' : (platformId === 'FOREX_MT4' ? 'MT4' : '');
  if ($('lab-login-text')) $('lab-login-text').textContent = `${mt} Login`;
  if ($('lab-password-text')) $('lab-password-text').textContent = `${mt} Password`;
  if ($('lab-server-text')) $('lab-server-text').textContent = `${mt} Server`;
  const isMt5 = platformId === 'FOREX_MT5';
  const isMt4 = platformId === 'FOREX_MT4';
  show('mt5-bridge-box', isMt5 || isMt4);
  show('mt5-setup', isMt5);
  show('mt4-setup', isMt4);
  if (isMt5) {
    refreshMt5Bridge();
    refreshMt5Setup();
  } else if (isMt4) {
    refreshMt5Bridge();
    refreshMt4Setup();
  }
  if ($('keys-platform-note')) {
    $('keys-platform-note').textContent = meta.note || '';
  }
}

function showPlatformGuide(platformId, titleId, bodyId) {
  const lang = (window.CPE_I18N && window.CPE_I18N.current) || 'en';
  const g = window.CPE_getPlatformGuide
    ? window.CPE_getPlatformGuide(platformId, lang)
    : { title: platformId, html: '' };
  if ($(titleId)) $(titleId).textContent = g.title;
  if ($(bodyId)) $(bodyId).innerHTML = g.html;
}

async function refreshKeys() {
  const platform = $('keys-platform')?.value || 'BINANCE';
  const s = await window.cpe.keysStatus(platform);
  if (platform === 'FOREX_DEMO') {
    $('keys-status').textContent = 'No API key needed — Forex Demo Rates (paper)';
    return;
  }
  if (!s.saved) {
    $('keys-status').textContent = `${t('keys_none')} (${platform}) · need: ${(s.keyFields || []).join(', ') || 'apiKey, apiSecret'}`;
    return;
  }
  const live = s.liveReady && s.supportsLive
    ? t('keys_live_ready')
    : (s.liveReady ? t('keys_saved_paper') : t('keys_incomplete'));
  $('keys-status').textContent =
    `${platform}: ${s.apiKey || (s.hasLogin ? 'login OK' : 'saved')} · ${live}` +
    `${s.hasSecret ? ' · secret✓' : ''}${s.hasPassphrase ? ' · pass✓' : ''}${s.hasAccountId ? ' · acct✓' : ''}` +
    `${s.platforms?.length ? ` · saved platforms: ${s.platforms.join(', ')}` : ''}`;
}

/* ---------- Binance-only branding + Smart IP Guard --------------------------
 * Binance exposes NO public REST endpoint for editing a MAIN-account API key's
 * IP whitelist (only sub-account/broker ones exist), so this app cannot change
 * it for you. What it can do: detect your public IP on every start / wake /
 * reconnect, and when it changes walk you straight to the only place that can
 * edit it — Binance → API Management → Edit restrictions. */
const BINANCE_API_MGMT_URL = 'https://www.binance.com/en/my/settings/api-management';

function binanceIpState() {
  if (!state.ipGuard) state.ipGuard = { ip: '', lastIp: '', checked: false, checkedAt: 0, error: '' };
  return state.ipGuard;
}

function updatePlatformBranding() {
  const chip = $('top-platform-chip');
  if (!chip) return;
  const plat = $('tr-platform')?.value || 'BINANCE';
  const meta = getPlatformMeta(plat);
  const live = !state.demoMode;
  const saved = !!state.platformKeySaved?.[plat];
  const isKeysTab = $('keys-platform')?.value || 'BINANCE';
  $('keys-binance-chip')?.classList.toggle('hidden', isKeysTab !== 'BINANCE');
  // Show the chip for the platform you are trading whenever its key is saved
  // (Binance, Bybit, OKX, MT5 …). Forex Demo is paper-only, so always show it.
  const show = saved || plat === 'FOREX_DEMO';
  chip.classList.toggle('hidden', !show);
  const nameEl = $('top-platform-name');
  if (nameEl) nameEl.textContent = meta.name || plat;
  const markEl = $('top-platform-mark');
  if (markEl) {
    const color = PLATFORM_MARK_COLOR[plat];
    if (plat === 'BINANCE') {
      markEl.innerHTML = BINANCE_MARK_SVG;
      markEl.style.background = '';
      markEl.style.color = '';
      markEl.style.fontSize = '';
      markEl.style.fontWeight = '';
    } else {
      const glyph = String(meta.name || plat).replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || 'CP';
      markEl.innerHTML = glyph;
      markEl.style.background = color || 'rgba(255,255,255,.14)';
      markEl.style.color = color ? '#131313' : 'var(--text)';
      markEl.style.fontSize = '.62rem';
      markEl.style.fontWeight = '800';
    }
  }
  const pill = $('top-platform-pill');
  if (pill) {
    pill.textContent = live ? 'LIVE' : 'DEMO';
    pill.classList.toggle('live', live);
  }
  chip.title = saved
    ? `${meta.name || plat} — ${live ? 'LIVE' : 'DEMO'} · orders use the ${meta.name || plat} key saved on the API Keys page`
      + (plat === 'BINANCE' ? ' · its IP whitelist must match this PC public IP' : '')
    : `${meta.name || plat}`;
  updateTopBinanceDot(plat);
}

const BINANCE_MARK_SVG = '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M16.62 13.92l2.72 2.72-7.35 7.35-7.36-7.35 2.72-2.72L12 18.58l4.62-4.66zm2.72-10.04L24 8.62l-2.72 2.72L12 2.03 2.72 11.33 0 8.62l4.66-4.74L7.38 1.16 12 5.81l4.62-4.65 4.72 4.72zm-16.26 5.02l2.72 2.72-2.72 2.72L.36 11.62l2.72-2.72zM19.34 8.9l2.72 2.72-2.72 2.71-2.71-2.71L19.34 8.9zm-8.13-2.72l2.72 2.72L12 11.62 9.28 8.9 11.21 6.18z"/></svg>';
const PLATFORM_MARK_COLOR = {
  BINANCE: '#f0b90b', BYBIT: '#f7a600', OKX: '#ffffff', KUCOIN: '#24ae8f',
  BITGET: '#00f0ff', GATE: '#2354e6', MEXC: '#00c9a7', KRAKEN: '#5741d9',
  COINBASE: '#0052ff', FOREX_OANDA: '#00a3e0', FOREX_FXCM: '#e2231a',
  FOREX_MT5: '#0298d4', FOREX_MT4: '#1b7fbf', FOREX_DEMO: '#8b8b8b'
};

async function refreshPlatformKeyFlag(plat) {
  const id = plat || $('tr-platform')?.value || 'BINANCE';
  if (!state.platformKeySaved) state.platformKeySaved = {};
  try {
    const s = await window.cpe.keysStatus(id);
    state.platformKeySaved[id] = !!s?.saved;
  } catch { state.platformKeySaved[id] = false; }
  updatePlatformBranding();
}

async function refreshBinanceKeyFlag() {
  try {
    const s = await window.cpe.keysStatus('BINANCE');
    state.binanceKeysSaved = !!s.saved;
  } catch { state.binanceKeysSaved = false; }
  updatePlatformBranding();
}

function ipIsChanged() {
  const g = binanceIpState();
  return !!(g.ip && g.lastIp && g.ip !== g.lastIp);
}

function updateTopBinanceDot(plat) {
  const onBinance = !plat || plat === 'BINANCE';
  $('top-binance-dot')?.classList.toggle('hidden', !(onBinance && ipIsChanged()));
}

function renderIpGuard() {
  const box = $('binance-ip-guard');
  if (!box) return;
  const plat = $('keys-platform')?.value || 'BINANCE';
  if (plat !== 'BINANCE') { box.classList.add('hidden'); return; }
  const g = binanceIpState();
  box.classList.remove('hidden', 'ok', 'warn');
  const btn = (act, label) => `<button type="button" class="btn ghost" data-ipg="${act}">${label}</button>`;
  if (!g.checked) {
    box.innerHTML = `<p class="ipg-title"><span class="ico">🛡️</span> Binance IP Guard</p>
      <p class="ipg-line">Checking your public IP…</p>
      <div class="ipg-actions">${btn('recheck', 'Check now')}</div>`;
    return;
  }
  if (g.error || !g.ip) {
    box.classList.add('warn');
    box.innerHTML = `<p class="ipg-title"><span class="ico">⚠️</span> Binance IP Guard — could not read your IP</p>
      <p class="ipg-line">${g.error || 'No public IP detected'}. Check the internet connection, then try again.</p>
      <div class="ipg-actions">${btn('recheck', 'Try again')}</div>`;
    return;
  }
  if (!g.lastIp) {
    box.innerHTML = `<p class="ipg-title"><span class="ico">🛡️</span> Binance IP Guard</p>
      <p class="ipg-line">Your public IP: <span class="ipg-ip">${g.ip}</span></p>
      <p class="ipg-line">Add this to Binance → API Management → your key → IP access restrictions.</p>
      <div class="ipg-actions">${btn('copy', 'Copy IP')}${btn('open', 'Open Binance API Management')}${btn('save', 'I saved it')}</div>`;
    return;
  }
  if (g.ip === g.lastIp) {
    box.classList.add('ok');
    box.innerHTML = `<p class="ipg-title"><span class="ico">✅</span> Binance IP Guard — in sync</p>
      <p class="ipg-line">Public IP <span class="ipg-ip">${g.ip}</span> is the same one you whitelisted last time.</p>
      <p class="ipg-line tiny">Blocks the 90-day key expiry rule and keeps live orders working.</p>
      <div class="ipg-actions">${btn('recheck', 'Re-check')}${btn('open', 'Open Binance API Management')}</div>`;
    return;
  }
  box.classList.add('warn');
  box.innerHTML = `<p class="ipg-title"><span class="ico">⚠️</span> Binance IP changed — update the whitelist</p>
    <p class="ipg-line">Old: <span class="ipg-ip old">${g.lastIp}</span> &nbsp;→&nbsp; New: <span class="ipg-ip">${g.ip}</span></p>
    <p class="ipg-line">Binance will reject live orders until this key's IP list matches.</p>
    <ol class="ipg-steps">
      <li>Press <b>Open Binance API Management</b> (log in if asked).</li>
      <li>Find this key → <b>Edit restrictions</b> → <b>IP access restrictions</b>.</li>
      <li>Replace the old IP with the new one → <b>Save</b>, then come back and press <b>I saved it</b>.</li>
    </ol>
    <div class="ipg-actions">${btn('copy', 'Copy new IP')}${btn('open', 'Open Binance API Management')}${btn('save', 'I saved it')}</div>`;
}

async function handleIpGuardAction(action) {
  const g = binanceIpState();
  if (action === 'recheck') return checkPublicIp(true);
  if (action === 'open') {
    window.cpe.openExternal(BINANCE_API_MGMT_URL);
    toast('Binance', 'API Management → Edit restrictions → paste your IP → Save. Then press “I saved it”.', true);
    return;
  }
  if (action === 'copy') {
    let ok = false;
    try { await navigator.clipboard.writeText(g.ip); ok = true; } catch { /* clipboard optional */ }
    toast('Binance IP', ok ? `Copied ${g.ip}` : `Copy blocked — the IP is ${g.ip}`, ok);
    return;
  }
  if (action === 'save') {
    await window.cpe.settingsSet({ lastPublicIp: g.ip, lastPublicIpAt: Date.now() });
    g.lastIp = g.ip;
    updateTopBinanceDot();
    renderIpGuard();
    toast('Binance IP', 'Saved — the app and Binance API Management are in sync.', true);
  }
}

let ipCheckBusy = false;
let ipCheckAt = 0;
let ipChangedKey = '';
async function checkPublicIp(manual) {
  if (ipCheckBusy) return;
  // Auto checks: at most once a minute, and never while offline — except the
  // very first one, so the guard does not sit on “Checking…” after a cold start.
  if (!manual && Date.now() - ipCheckAt < 60000) return;
  if (!manual && ipCheckAt && !navigator.onLine) return;
  ipCheckBusy = true;
  ipCheckAt = Date.now();
  const g = binanceIpState();
  const box = $('my-ip-box');
  if (manual && box) box.textContent = 'Fetching your public IP…';
  try {
    const [r, st] = await Promise.all([
      window.cpe.publicIp().catch((e) => ({ ok: false, error: e.message || String(e) })),
      window.cpe.settingsGet().catch(() => ({}))
    ]);
    g.checked = true;
    if (r && r.ok && r.ip) { g.ip = r.ip; g.error = ''; g.checkedAt = r.checkedAt || Date.now(); }
    else { g.error = r?.error || 'Could not detect the IP'; }
    if (st && typeof st.lastPublicIp === 'string') g.lastIp = st.lastPublicIp;
    updateTopBinanceDot();
    renderIpGuard();
    if (box) {
      box.textContent = g.ip
        ? `Your public IP: ${g.ip}${ipIsChanged() ? ` (previous: ${g.lastIp})` : ''}`
        : 'Could not detect the IP. Open https://whatismyipaddress.com in a browser.';
    }
    if (ipIsChanged()) {
      const key = `${g.lastIp}->${g.ip}`;
      if (ipChangedKey !== key) {
        ipChangedKey = key;
        toast('⚠ Binance IP changed', `New IP ${g.ip}. Update it in Binance API Management, then press “I saved it” on the API Keys page.`, false);
      }
    }
  } finally {
    ipCheckBusy = false;
  }
}

let ipWatchTimer = null;
function setupIpGuard() {
  updatePlatformBranding();
  refreshBinanceKeyFlag();
  refreshPlatformKeyFlag();
  checkPublicIp(false);
  if (ipWatchTimer) clearInterval(ipWatchTimer);
  ipWatchTimer = setInterval(() => checkPublicIp(false), 5 * 60 * 1000);
  window.addEventListener('online', () => checkPublicIp(false));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checkPublicIp(false); });
  window.cpe.onNetRecheck(() => checkPublicIp(false));
}

// Refresh API Keys guide when language changes (Help/Learn handled in onCpeLangChange)
const _prevLang = window.onCpeLangChange;
window.onCpeLangChange = (...args) => {
  if (typeof _prevLang === 'function') _prevLang(...args);
  const pid = $('keys-platform')?.value || 'BINANCE';
  showPlatformGuide(pid, 'api-guide-title', 'api-guide-body');
};

async function refreshLicenseView() {
  const s = await window.cpe.licenseStatus();
  let text;
  if (s.mode === 'TRIAL') {
    text = `TRIAL — ${s.trial?.daysLeft ?? '?'} / ${s.trialDays || 7} day(s) · then 3-Month USD ${s.month3Usd || 15} or Lifetime USD ${s.lifetimeUsd || 100}`;
  } else if (s.mode === 'LIFETIME' || s.mode === 'FULL') {
    text = `${t('license_active')} · Lifetime`;
  } else if (s.mode === 'MONTH3') {
    text = `3-Month license · ${s.daysLeft ?? '?'} day(s) left · renew or upgrade to Lifetime USD ${s.lifetimeUsd || 100}`;
  } else if (s.mode === 'MONTH3_GRACE') {
    text = `GRACE · ${s.daysLeft ?? '?'} day(s) · close trades or activate new key`;
  } else {
    text = `${t('license_inactive')}: ${s.reason || s.mode || ''}`;
  }
  if ($('lic-status-text')) $('lic-status-text').textContent = text;
  if ($('lic-machine')) $('lic-machine').textContent = s.machineId;
  if (s.month3Usd || s.lifetimeUsd) setAppPrices(s.month3Usd || state.prices.month3Usd, s.lifetimeUsd || state.prices.lifetimeUsd);
  if ($('lic-lifetime-note')) {
    $('lic-lifetime-note').textContent =
      `3-Month USD ${state.prices.month3Usd} · Lifetime USD ${state.prices.lifetimeUsd} (this Machine ID).`;
  }
  if (s.mode === 'TRIAL' && s.trial) updateTrialBanner(s.trial);
  applyLicenseWarn(s);
  fillPaymentMethods(s.owner || s.publicConfig);
  renderPublicFaq(s.publicConfig?.faq);
  applyUpdateBanner(s.publicConfig);
  renderLicenseActivateUi(s);
  refreshReferralPanel();
}

/** License tab: key box for renew / upgrade. Locks itself once Lifetime is active. */
function renderLicenseActivateUi(s) {
  const input = $('lic-key-input');
  const btn = $('lic-key-btn');
  const note = $('lic-activate-note');
  if (!input || !btn) return;
  const mode = String(s?.mode || '').toUpperCase();
  const locked = mode === 'LIFETIME' || mode === 'FULL';
  input.disabled = locked;
  btn.disabled = locked;
  if (locked) {
    input.value = '';
    input.placeholder = '—';
    if (note) note.textContent = t('lic_key_locked');
  } else {
    input.placeholder = 'CPE… / CPE3… / CPEL…';
    if (note) note.textContent = t('lic_key_note');
  }
}

let licActivateUiReady = false;
function setupLicenseActivateUi() {
  if (licActivateUiReady) return;
  licActivateUiReady = true;
  $('lic-key-btn')?.addEventListener('click', async () => {
    const input = $('lic-key-input');
    const msg = $('lic-key-msg');
    const key = (input?.value || '').trim();
    if (!key) {
      if (msg) msg.textContent = t('activate_fail');
      return;
    }
    const res = await window.cpe.activateLicense(key);
    if (msg) msg.textContent = res.ok ? t('lic_key_ok') : (res.message || t('lic_key_fail'));
    if (res.ok) {
      if (input) input.value = '';
      toast(t('lic_key_ok'), res.status?.mode || '', false);
      state.license = res.status || state.license;
      applyLicenseWarn(res.status);
      refreshLicenseView();
    } else if (res.locked) {
      state.license = { ...(state.license || {}), guard: res.guard };
      applyLicenseWarn(state.license);
      toast(t('guard_locked_title'), t('guard_locked_body'), false, 'error');
    } else if (res.strikesLeft != null) {
      toast(t('guard_warn_title'), t('guard_warn_body').replace('{left}', String(res.strikesLeft)), false, 'error');
    }
  });
}

async function refreshReferralPanel() {
  if (!$('referral-panel') || !window.cpe.referralStatus) return;
  try {
    const r = await window.cpe.referralStatus();
    if ($('ref-my-code')) $('ref-my-code').textContent = r.myCode || '—';
    if ($('ref-stats-line')) {
      $('ref-stats-line').textContent =
        `Referrals: ${r.myReferrals?.count || 0} · Bonus used ${r.bonusDaysUsed ?? 0}/${r.maxBonusDays || 365}d · left ${r.bonusDaysLeft ?? '?'}d · Next +${r.nextRewardDays}d` +
        (r.plan === 'LIFETIME' || r.plan === 'FULL' ? ` · Next claim slip: ${r.nextLifetimeKeyDays}d (owner issues real key)` : '') +
        (r.referredBy ? ` · You used: ${r.referredBy.code}` : '');
    }
    if ($('ref-proof-out')) {
      $('ref-proof-out').value = r.pendingProof || (r.proofsIssued?.[0]?.proof) || '';
    }
    if ($('ref-reward-keys')) {
      const keys = r.rewardKeys || [];
      $('ref-reward-keys').textContent = keys.length
        ? keys.map((k, i) => `#${k.forReferral || i + 1} · CLAIM ${k.days}d (owner must issue) · ${k.key}`).join('\n')
        : (t('ref_keys_empty') || 'No claim slips yet (Lifetime referrers only).');
    }
    if ($('ref-list')) {
      const items = r.myReferrals?.items || [];
      $('ref-list').innerHTML = items.length
        ? `<strong>My rewards</strong><br/>${items.map((x) =>
          `#${x.index} ${x.eventType} · +${x.daysAwarded}d · ${x.rewardType}${x.rewardKey ? ` · key ${x.rewardKeyDays}d` : ''} · ${formatChatTime(x.at)}`
        ).join('<br/>')}`
        : '';
    }
  } catch { /* ignore */ }
}

let referralUiReady = false;
function setupReferralUi() {
  if (referralUiReady) return;
  referralUiReady = true;
  $('ref-copy-code')?.addEventListener('click', async () => {
    const c = $('ref-my-code')?.textContent || '';
    try { await navigator.clipboard.writeText(c); toast('Referral', 'Code copied'); } catch { /* ignore */ }
  });
  $('ref-copy-proof')?.addEventListener('click', async () => {
    const c = $('ref-proof-out')?.value || '';
    try { await navigator.clipboard.writeText(c); toast('Referral', 'Proof copied'); } catch { /* ignore */ }
  });
  $('ref-apply-btn')?.addEventListener('click', async () => {
    const res = await window.cpe.referralApply($('ref-apply-code')?.value || '', !!$('ref-human')?.checked);
    if ($('ref-apply-msg')) $('ref-apply-msg').textContent = res.message || (res.ok ? 'OK' : 'Failed');
    if (res.ok) toast('Referral', res.message || 'Applied');
    refreshReferralPanel();
  });
  $('ref-redeem-btn')?.addEventListener('click', async () => {
    const res = await window.cpe.referralRedeem($('ref-redeem-in')?.value || '');
    if ($('ref-redeem-msg')) $('ref-redeem-msg').textContent = res.message || (res.ok ? 'OK' : 'Failed');
    if (res.ok) {
      toast('Referral reward', res.message || 'Redeemed');
      if (res.rewardKey?.key) {
        try { await navigator.clipboard.writeText(res.rewardKey.key); } catch { /* ignore */ }
      }
      if (res.status) {
        state.license = res.status;
        if (res.status.mode === 'TRIAL' && res.status.trial) updateTrialBanner(res.status.trial);
      }
      refreshLicenseView();
    }
    refreshReferralPanel();
  });
  refreshReferralPanel();
}

let chartLabReady = false;
let chartZoomReady = false;
let liveHelpReady = false;
let labLiveTimer = null;
let labPriceTimer = null;
let labDrawSeq = 0;
const nextDrawId = () => ++labDrawSeq;

const PATTERN_FILTERS = [
  ['all', 'All patterns'],
  ['cup', 'Cup & Handle'],
  ['hs', 'Head & Shoulders'],
  ['double', 'Double top / bottom'],
  ['triple', 'Triple top / bottom'],
  ['triangle', 'Triangles & wedges'],
  ['flag', 'Flags & pennants'],
  ['channel', 'Channels'],
  ['rounding', 'Rounding / saucer'],
  ['broadening', 'Broadening formation']
];

function patternCategory(name) {
  const n = String(name || '').toLowerCase();
  if (n.includes('cup')) return 'cup';
  if (n.includes('head')) return 'hs';
  if (n.includes('double')) return 'double';
  if (n.includes('triple')) return 'triple';
  if (n.includes('triangle') || n.includes('wedge')) return 'triangle';
  if (n.includes('flag') || n.includes('pennant')) return 'flag';
  if (n.includes('channel')) return 'channel';
  if (n.includes('rounding')) return 'rounding';
  if (n.includes('broadening')) return 'broadening';
  return 'other';
}

function filteredLabPatterns(signal) {
  const all = (signal && signal.patterns) || [];
  if (!state.labPatternFilter || state.labPatternFilter === 'all') return all.slice();
  return all.filter((p) => patternCategory(p.name) === state.labPatternFilter);
}

function patternFilterLabel() {
  const hit = PATTERN_FILTERS.find(([id]) => id === state.labPatternFilter);
  return hit ? hit[1] : 'All patterns';
}


function startLabLiveTimer() {
  if (labLiveTimer) clearInterval(labLiveTimer);
  labLiveTimer = setInterval(async () => {
    if (state.currentView !== 'chartlab' || !state.labSignal) return;
    try {
      const s = state.labSignal;
      const res = await window.cpe.analyze({ symbol: s.symbol, market: s.market || 'SPOT', interval: s.interval || '4h' });
      if (res && res.price) {
        state.labSignal.price = res.price;
        state.labLivePrev = state.labLivePrice;
        state.labLivePrice = res.price;
        if (res.chart?.candles?.length) {
          state.labSignal.chart = res.chart;
        }
        redrawLabChart();
      }
    } catch {}
  }, 8000);

  // Price tick: refresh the latest price (and the live line) at a calm pace.
  if (labPriceTimer) clearInterval(labPriceTimer);
  labPriceTimer = setInterval(async () => {
    if (state.currentView !== 'chartlab' || !state.labSignal) return;
    const s = state.labSignal;
    if ((s.market || 'SPOT') === 'FOREX') return;
    try {
      const p = await window.cpe.price({ symbol: s.symbol, market: s.market || 'SPOT' });
      if (Number.isFinite(+p) && +p > 0) {
        state.labLivePrev = state.labLivePrice;
        state.labLivePrice = +p;
        redrawLabChart();
        refreshLabBasis(s);
      }
    } catch {}
  }, 4000);
}

async function loadLabPairs() {
  const market = $('lab-market')?.value || 'SPOT';
  try {
    const res = await window.cpe.pairs(market);
    state.labPairs = res.pairs || [];
    fillLabPairSelect($('lab-pair-search')?.value || '');
  } catch (e) {
    if ($('lab-pair')) $('lab-pair').innerHTML = `<option>${e.message || 'Failed to load pairs'}</option>`;
  }
}

function fillLabPairSelect(filter) {
  const sel = $('lab-pair');
  if (!sel) return;
  const market = $('lab-market')?.value || 'SPOT';
  const shown = filterPairsList(state.labPairs || [], filter, 400);
  const cur = sel.value;
  sel.innerHTML = shown.map((p) => `<option value="${p}">${p}</option>`).join('') || '<option value="">No pairs</option>';
  if (cur && shown.includes(cur)) sel.value = cur;
  else if (market === 'FOREX' && shown.includes('EURUSD')) sel.value = 'EURUSD';
  else if (shown.includes('BTCUSDT')) sel.value = 'BTCUSDT';
  else if (shown[0]) sel.value = shown[0];
}

async function runLabAnalyze() {
  const symbol = $('lab-pair')?.value;
  const market = $('lab-market')?.value || 'SPOT';
  const interval = $('lab-interval')?.value || '4h';
  if (!symbol) return toast('Chart Lab', 'Select a Binance pair', false);
  $('lab-analyze').disabled = true;
  $('lab-analyze').textContent = 'Analyzing…';
  try {
    const full = await window.cpe.analyze({ symbol, market, interval });
    full._demoMode = !!state.demoMode;
    full._liveMode = !state.demoMode;
    state.labSignal = full;
    state.labDrawings = [];
    state.labDrag = null;
    state.labEdit = null;
    state.labSelectedId = null;
    state.labPan = null;
    state.labPanOffset = 0;
    state.labSelectedCandle = null;
    state.labMtf = null;
    state.labPath = null;
    state.labFocusPattern = null;
    state.labFilteredPatterns = [];
    state.labLivePrice = full.price || null;
    state.labLivePrev = null;
    renderLabResult(full);
    renderLabMtf();
    startLabLiveTimer();
    refreshLabBasis(full);
  } catch (e) {
    toast('Analyze failed', e.message || String(e), true);
  } finally {
    $('lab-analyze').disabled = false;
    $('lab-analyze').textContent = 'Analyze Chart';
  }
}

function redrawLabChart() {
  const s = state.labSignal;
  if (!s) { stopProjectionLoop('lab-chart'); return; }
  s._demoMode = !!state.demoMode;
  s._liveMode = !state.demoMode;
  s._drawings = state.labDrawings;
  s._selectedId = state.labSelectedId;
  s._overlays = state.labMtf ? state.labMtf.frames : null;
  s._showPatternTargets = !!state.labShowTargets;
  s._patterns = filteredLabPatterns(s);
  s._focusPattern = state.labFocusPattern;
  s._future = !!state.labFuture;
  s._livePrice = state.labLivePrice;
  s._livePricePrev = state.labLivePrev;
  s._panOffset = state.labPanOffset || 0;
  s._selectedAbs = state.labSelectedCandle ? state.labSelectedCandle.abs : null;
  // RSI/MACD/… toggles plus log scale — the chart engine reads them all off one object.
  s._indicators = { ...state.labIndicators, log: !!state.labLog };
  s._chartType = state.labChartType;
  s._hover = state.labHover;
  s._measure = state.labMeasure;
  // "Normal view" — a clean chart with no analysis, waves, levels or projections.
  s._plain = !!state.labPlain;
  const C = window.CPEChart;
  // forecast line into the future space, drawn the same way the signal popup does
  s._projection = (!s._plain && C && C.buildProjection) ? C.buildProjection(s) : null;
  s._showProjection = !!s._projection;
  // 2–3 month forecast (trend drift into the future space) — revealed in
  // step with the replay line by the projection loop.
  s._forecast = (!s._plain && state.labForecast && C && C.buildForecast) ? C.buildForecast(s) : null;
  s._showForecast = !!s._forecast;
  if (s._forecast && s._future && s._forecastProgress == null) s._forecastProgress = 0;
  window.CPEChart.draw($('lab-chart'), s);
  if ((s._projection || s._forecast) && s._future) ensureProjectionLoop('lab-chart', () => state.labSignal);
  else stopProjectionLoop('lab-chart');
  if ($('lab-zoom-label')) {
    const z = window.CPEChart.getCanvasZoom($('lab-chart'));
    $('lab-zoom-label').textContent = `${Math.round(z * 10) / 10}x`;
  }
  renderLabCandleDetail();
}

/** Details of the candle the user clicked on the Chart Lab canvas. */
function renderLabCandleDetail() {
  const box = $('lab-candle-detail');
  const float = $('lab-candle-float');
  if (!box) return;
  const s = state.labSignal;
  const sel = state.labSelectedCandle;
  const c = s && sel ? s.chart?.candles?.[sel.abs] : null;
  if (!c) {
    box.classList.add('hidden');
    if (float) float.classList.add('hidden');
    return;
  }
  box.classList.remove('hidden');
  const up = c.c >= c.o;
  const changePct = c.o ? ((c.c - c.o) / c.o) * 100 : 0;
  const rangePct = c.l ? ((c.h - c.l) / c.l) * 100 : 0;
  const total = s.chart?.candles?.length || 0;
  const barsBack = total ? Math.max(0, total - 1 - sel.abs) : 0;
  const when = c.t
    ? new Date(c.t).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
    })
    : '—';
  if ($('lab-candle-time')) $('lab-candle-time').textContent = when;
  if ($('lab-candle-ohlc')) {
    $('lab-candle-ohlc').innerHTML = [
      ['Open', c.o],
      ['High', c.h],
      ['Low', c.l],
      ['Close', c.c]
    ].map(([k, v]) => `<div class="lab-metric"><span>${k}</span><strong>${formatNum(v)}</strong></div>`).join('');
  }
  const color = up ? 'var(--buy)' : 'var(--sell)';
  // Candle-pattern name that completes on this bar (not just the latest one).
  const pat = (s.chart?.candleNames && sel ? s.chart.candleNames[sel.abs] : null) || null;
  const patName = pat && pat.name
    ? `${pat.name}${pat.bias && pat.bias !== 'NEUTRAL' ? ` · ${pat.bias}` : ''}`
    : '';
  const extra =
    (patName ? `<b style="color:var(--accent-2)">${escapeHtml(patName)}</b> · ` : '')
    + `<span style="color:${color}">${up ? '▲' : '▼'} ${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%</span>`
    + ` · range ${rangePct.toFixed(2)}%`
    + (c.v != null ? ` · vol ${formatNum(c.v)}` : '')
    + (barsBack > 0 ? ` · ${barsBack} bar${barsBack === 1 ? '' : 's'} back` : ' · latest bar');
  if ($('lab-candle-extra')) $('lab-candle-extra').innerHTML = extra;

  // full-screen mode hides the side panel → mirror the details over the chart
  if (float) {
    float.innerHTML = `
      <b>${escapeHtml(when)}</b>
      ${patName ? `<i class="lab-candle-float-pat">${escapeHtml(patName)}</i>` : ''}
      <div class="lab-candle-float-grid">
        <span>O <strong>${formatNum(c.o)}</strong></span>
        <span>H <strong>${formatNum(c.h)}</strong></span>
        <span>L <strong>${formatNum(c.l)}</strong></span>
        <span>C <strong>${formatNum(c.c)}</strong></span>
      </div>
      <i style="color:${color}">${up ? '▲' : '▼'} ${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%</i>
      <i>${barsBack > 0 ? `${barsBack} bars back` : 'latest bar'}</i>`;
    float.classList.remove('hidden');
  }
}

function renderLabResult(s) {
  if (!s) return;
  $('lab-chart-title').textContent = `${s.symbol} · ${s.market} · ${s.interval}`;
  const badge = $('lab-signal-badge');
  badge.textContent = `${s.type} · score ${s.score}`;
  badge.className = `badge ${s.type}`;
  redrawLabChart();

  const candle = s.candle;
  $('lab-candle-name').textContent = candle ? candle.name : 'No clear pattern';
  $('lab-candle-note').textContent = candle
    ? `${candle.note} · bias ${candle.bias || '—'}`
    : 'No major candle pattern on the last bars — still check BB / RSI / MACD below.';
  $('lab-candle-card').style.borderColor = candle?.bias === 'BUY'
    ? 'rgba(34,197,94,.45)'
    : candle?.bias === 'SELL'
      ? 'rgba(239,68,68,.45)'
      : 'rgba(240,180,41,.35)';

  $('lab-metrics').innerHTML = [
    ['Price', s.price],
    ['RSI', s.rsi ?? '—'],
    ['MACD hist', s.macdHist ?? '—'],
    ['BB Lower', s.bollinger?.lower ?? '—'],
    ['BB Mid', s.bollinger?.mid ?? '—'],
    ['BB Upper', s.bollinger?.upper ?? '—']
  ].map(([k, v]) => `<div class="lab-metric"><span>${k}</span><strong>${typeof v === 'number' ? formatNum(v) : v}</strong></div>`).join('');

  $('lab-levels').innerHTML = [
    ['Entry', s.entry],
    ['TP1', s.tp1],
    ['TP2', s.tp2],
    ['SL', s.sl]
  ].map(([k, v]) => `<span><b>${k}</b> ${formatNum(v)}</span>`).join('')
    + (s.supportResistance || [])
      .map((r) => `<span><b>S/R</b> ${formatNum(r.price)} · ${r.hits}×</span>`)
      .join('');

  renderLabPatterns(s);

  $('lab-reasons').innerHTML = `
    <ul>${(s.reasons || []).map((r) => `<li>${r}</li>`).join('')}</ul>
    <h4>Psychology</h4>
    <p>${(s.psychology || []).join(' · ') || '—'}</p>
  `;
}

/** Pattern cards: filter by family, click to zoom to the setup. */
function renderLabPatterns(s) {
  const box = $('lab-patterns');
  if (!box) return;
  const pats = filteredLabPatterns(s);
  state.labFilteredPatterns = pats;
  if (state.labFocusPattern != null && state.labFocusPattern >= pats.length) state.labFocusPattern = null;
  const label = patternFilterLabel();
  if (!pats.length) {
    box.innerHTML = `<span class="lab-patterns-label">Pattern analysis · ${escapeHtml(label)}</span>`
      + '<span class="tiny">No matching pattern on this window — change the pattern family or Analyze again.</span>';
    return;
  }
  box.innerHTML = `<span class="lab-patterns-label">Pattern analysis · ${escapeHtml(label)} · click a card to zoom</span>`
    + pats.map((p, i) => {
      const stars = '★'.repeat(Math.max(1, Math.min(5, p.confidence || 1)));
      const active = state.labFocusPattern === i ? ' focused' : '';
      return `<button type="button" class="lab-pattern ${p.bias}${active}" data-pat="${i}" title="Click to zoom to this pattern">`
        + `<b>${escapeHtml(p.name)}</b><em>${p.bias} · ${stars}</em><i>${escapeHtml(p.note)}</i></button>`;
    }).join('');
}

/** Zoom/pan so a pattern's whole structure is visible. */
function focusLabPattern(index) {
  const s = state.labSignal;
  const pats = state.labFilteredPatterns || [];
  const p = pats[index];
  const canvas = $('lab-chart');
  if (!s || !p || !canvas) return;
  const C = window.CPEChart;
  const idxs = (p.polyline || []).map((pt) => +pt.i).filter(Number.isFinite);
  if (p.neckline && Number.isFinite(+p.neckline.i1)) idxs.push(+p.neckline.i1);
  if (p.neckline && Number.isFinite(+p.neckline.i2)) idxs.push(+p.neckline.i2);
  if (!idxs.length) return;
  const len = s.chart?.candles?.length || 0;
  if (!len) return;
  const minI = Math.min(...idxs);
  const maxI = Math.max(...idxs);
  const span = Math.max(12, maxI - minI);
  const pad = Math.max(8, Math.round(span * 0.3));
  const want = Math.min(len, Math.max(30, span + pad * 2));
  const zoom = Math.max(1, Math.min(20, 160 / want));
  const visible = C.visibleBars(s, zoom);
  const maxStart = Math.max(0, len - visible);
  let start = Math.round(minI - pad);
  start = Math.max(0, Math.min(maxStart, start));
  state.labPanOffset = maxStart - start;
  state.labFocusPattern = index;
  C.setCanvasZoom(canvas, zoom);
  renderLabPatterns(s);
  redrawLabChart();
}

function setLabPatternFilter(id) {
  state.labPatternFilter = id || 'all';
  state.labFocusPattern = null;
  const sel = $('lab-pattern-filter');
  if (sel && sel.value !== state.labPatternFilter) sel.value = state.labPatternFilter;
  if (state.labSignal) renderLabPatterns(state.labSignal);
  redrawLabChart();
}

/* ————— multi-timeframe compare (15m · 1h · 4h overlay + confirmation) ————— */

const MTF_FRAMES = ['15m', '1h', '4h'];
const MTF_COLORS = { '15m': '#38bdf8', '1h': '#e879f9', '4h': '#fbbf24' };
let mtfBusy = false;

const mtfBias = (type) => (type === 'BUY' ? 'BUY' : type === 'SELL' ? 'SELL' : 'HOLD');

function renderLabMtf() {
  const el = $('lab-mtf');
  const btn = $('lab-mtf-toggle');
  const m = state.labMtf;
  if (btn) {
    btn.classList.toggle('active', !!m);
    if (!mtfBusy) btn.textContent = m ? 'Hide compare' : 'Compare 15m·1h·4h';
  }
  if (!el) return;
  if (!m) {
    el.innerHTML = '';
    el.classList.add('hidden');
    return;
  }
  el.classList.remove('hidden');
  const verdict = m.verdict === 'MIXED'
    ? '<span class="mtf-verdict mixed">NO CONFIRMATION · timeframes disagree</span>'
    : `<span class="mtf-verdict ${m.verdict}">✔ CONFIRMED ${m.verdict} · 3/3 agree</span>`;
  const rows = m.frames.map((f) => `
    <div class="mtf-row ${f.type}">
      <span class="mtf-swatch" style="background:${f.color}"></span>
      <b>${f.interval}</b>
      <span class="mtf-bias">${mtfBias(f.type)}</span>
      <span class="tiny">score ${f.score ?? '—'} · RSI ${f.rsi ?? '—'}</span>
    </div>`).join('');
  el.innerHTML = `
    <div class="mtf-head">
      ${verdict}
      <span class="tiny">${m.symbol} · overlay lines on the chart</span>
    </div>
    <div class="mtf-rows">${rows}</div>`;
}

async function toggleLabMtf() {
  const btn = $('lab-mtf-toggle');
  if (state.labMtf) {
    state.labMtf = null;
    renderLabMtf();
    redrawLabChart();
    return;
  }
  const s = state.labSignal;
  if (!s) return toast('Chart Lab', 'Analyze a pair first', false);
  if (mtfBusy) return;
  mtfBusy = true;
  if (btn) { btn.disabled = true; btn.textContent = 'Comparing…'; }
  try {
    const results = await Promise.all(MTF_FRAMES.map((interval) =>
      window.cpe.analyze({ symbol: s.symbol, market: s.market || 'SPOT', interval })
        .then((r) => ({ interval, r }))
    ));
    const frames = results.map(({ interval, r }) => ({
      interval,
      type: mtfBias(r.type),
      score: r.score,
      rsi: r.rsi,
      color: MTF_COLORS[interval],
      series: ((r.chart && r.chart.candles) || []).map((c) => ({ t: c.t, c: c.c }))
    }));
    const allBuy = frames.every((f) => f.type === 'BUY');
    const allSell = frames.every((f) => f.type === 'SELL');
    state.labMtf = {
      symbol: s.symbol,
      market: s.market,
      frames,
      verdict: allBuy ? 'BUY' : allSell ? 'SELL' : 'MIXED'
    };
    renderLabMtf();
    redrawLabChart();
  } catch (e) {
    toast('Compare failed', e.message || String(e), true);
  } finally {
    mtfBusy = false;
    if (btn) btn.disabled = false;
    renderLabMtf();
  }
}

/** Reflect the indicator toggle state on the toolbar buttons. */
function syncLabIndicatorButtons() {
  const bar = $('lab-indicator-toolbar');
  if (!bar) return;
  bar.querySelectorAll('.ind-btn').forEach((btn) => {
    btn.classList.toggle('active', !!state.labIndicators[btn.dataset.ind]);
  });
}

/** Reflect chart type / timeframe / log state on the TradingView-style toolbar. */
function syncLabTvButtons() {
  $('lab-typeseg')?.querySelectorAll('.tv-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.type === state.labChartType);
  });
  const tf = $('lab-interval')?.value;
  $('lab-tfseg')?.querySelectorAll('.tv-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tf === tf);
  });
  $('lab-log-toggle')?.classList.toggle('active', !!state.labLog);
}

/** Download the Chart Lab canvas as a PNG (TradingView "snapshot"). */
function snapshotLabChart() {
  const c = $('lab-chart');
  if (!c) return;
  try {
    const url = c.toDataURL('image/png');
    const a = document.createElement('a');
    const s = state.labSignal;
    a.href = url;
    a.download = `${s?.symbol || 'chart'}-${s?.interval || ''}-${state.labChartType}.png`
      .replace(/[^a-z0-9._-]+/gi, '_');
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast('Chart snapshot', 'Saved as a PNG image.', false);
  } catch (err) {
    toast('Chart snapshot', `Could not export: ${err.message}`, false);
  }
}

/**
 * Spot and futures are separate Binance feeds (api.binance.com vs
 * fapi.binance.com) and only differ by the tiny basis, so both charts look
 * near-identical. Show both prices so the difference is actually visible.
 */
const labBasisCache = { key: '', other: null, at: 0 };

async function refreshLabBasis(s) {
  const el = $('lab-basis');
  if (!el || !s) return;
  const market = s.market || 'SPOT';
  if (market === 'FOREX') { el.textContent = ''; return; }
  const otherMarket = market === 'FUTURES' ? 'SPOT' : 'FUTURES';
  const otherTag = otherMarket === 'FUTURES' ? 'Futures' : 'Spot';
  const key = `${s.symbol}:${market}`;
  try {
    if (labBasisCache.key !== key) {
      labBasisCache.key = key;
      labBasisCache.other = null;
      labBasisCache.at = 0;
    }
    if (labBasisCache.other == null || Date.now() - labBasisCache.at > 30000) {
      labBasisCache.other = await window.cpe.price({ symbol: s.symbol, market: otherMarket });
      labBasisCache.at = Date.now();
    }
    const mine = Number.isFinite(+state.labLivePrice) ? +state.labLivePrice : +s.price;
    const theirs = +labBasisCache.other;
    if (!Number.isFinite(mine) || !Number.isFinite(theirs) || !mine) { el.textContent = ''; return; }
    const basis = ((mine - theirs) / mine) * 100;
    el.innerHTML = `<span class="lab-basis-chip">${escapeHtml(market)} ${formatNum(mine)}`
      + ` · ${otherTag} ${formatNum(theirs)}`
      + ` · basis ${basis >= 0 ? '+' : ''}${basis.toFixed(3)}%</span>`;
  } catch {
    el.textContent = '';
  }
}

function setupChartLab() {
  if (chartLabReady) return;
  chartLabReady = true;
  $('lab-market')?.addEventListener('change', () => loadLabPairs());
  $('lab-pair-search')?.addEventListener('input', (e) => fillLabPairSelect(e.target.value));
  $('lab-analyze')?.addEventListener('click', () => runLabAnalyze());
  // Picking a timeframe from the dropdown re-analyzes too, so the pattern
  // analysis / signal read-out refreshes on every timeframe, not just 1d.
  $('lab-interval')?.addEventListener('change', () => {
    syncLabTvButtons();
    if (state.labSignal) runLabAnalyze();
  });
  $('lab-mtf-toggle')?.addEventListener('click', () => toggleLabMtf());
  $('lab-targets-toggle')?.addEventListener('click', () => {
    state.labShowTargets = !state.labShowTargets;
    $('lab-targets-toggle').classList.toggle('active', state.labShowTargets);
    redrawLabChart();
  });
  $('lab-future-toggle')?.addEventListener('click', () => {
    state.labFuture = !state.labFuture;
    $('lab-future-toggle').classList.toggle('active', state.labFuture);
    redrawLabChart();
  });
  $('lab-forecast-toggle')?.addEventListener('click', () => {
    state.labForecast = !state.labForecast;
    $('lab-forecast-toggle').classList.toggle('active', state.labForecast);
    redrawLabChart();
  });
  $('lab-plain-toggle')?.addEventListener('click', () => {
    state.labPlain = !state.labPlain;
    $('lab-plain-toggle').classList.toggle('active', state.labPlain);
    redrawLabChart();
  });
  $('lab-pattern-filter')?.addEventListener('change', (e) => setLabPatternFilter(e.target.value));
  // Indicator bar: each button is a plain on/off tick for one indicator.
  $('lab-indicator-toolbar')?.querySelectorAll('.ind-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.ind;
      if (!key) return;
      state.labIndicators[key] = !state.labIndicators[key];
      syncLabIndicatorButtons();
      redrawLabChart();
    });
  });
  syncLabIndicatorButtons();
  // —— TradingView-style chart controls ——
  $('lab-typeseg')?.querySelectorAll('.tv-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.labChartType = btn.dataset.type || 'candles';
      syncLabTvButtons();
      redrawLabChart();
    });
  });
  $('lab-tfseg')?.querySelectorAll('.tv-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tf = btn.dataset.tf;
      if (!tf || $('lab-interval')?.value === tf) return;
      if ($('lab-interval')) $('lab-interval').value = tf;
      syncLabTvButtons();
      runLabAnalyze();
    });
  });
  $('lab-log-toggle')?.addEventListener('click', () => {
    state.labLog = !state.labLog;
    syncLabTvButtons();
    redrawLabChart();
  });
  $('lab-snapshot')?.addEventListener('click', () => snapshotLabChart());
  syncLabTvButtons();
  $('lab-pattern-focus')?.addEventListener('click', () => {
    const pats = state.labFilteredPatterns || [];
    if (!pats.length) {
      toast('Pattern analysis', `No ${patternFilterLabel().toLowerCase()} found on this window.`, false);
      return;
    }
    focusLabPattern(0); // filtered list is sorted by confidence
  });
  $('lab-patterns')?.addEventListener('click', (e) => {
    const card = e.target.closest('.lab-pattern[data-pat]');
    if (!card) return;
    focusLabPattern(+card.dataset.pat);
  });
  const formatZoom = (z) => `${Math.round((+z || 1) * 10) / 10}x`;
  /** Zoom around a horizontal anchor (0 = left plot edge, 1 = right edge). */
  const labZoomAt = (factor, fracX) => {
    const c = $('lab-chart');
    const s = state.labSignal;
    if (!c || !s) return;
    const C = window.CPEChart;
    const oldZ = C.getCanvasZoom(c);
    const newZ = Math.max(1, Math.min(20, oldZ * factor));
    if (Math.abs(newZ - oldZ) < 1e-4) return;
    const m = C.map;
    const anchor = Number.isFinite(fracX) ? Math.max(0, Math.min(1, fracX)) : 0.5;
    if (m && m.n) {
      // keep the candle under the pointer at the same screen spot while zooming
      const absAnchor = m.sliceStart + anchor * m.n;
      const newVisible = C.visibleBars(s, newZ);
      const maxStart = Math.max(0, s.chart.candles.length - newVisible);
      let start = absAnchor - anchor * newVisible;
      start = Math.max(0, Math.min(maxStart, start));
      state.labPanOffset = maxStart - start;
    }
    C.setCanvasZoom(c, newZ);
    redrawLabChart();
  };
  const labZoomBy = (factor) => labZoomAt(factor, 0.5);
  $('lab-zoom-in')?.addEventListener('click', () => labZoomBy(1.25));
  $('lab-zoom-out')?.addEventListener('click', () => labZoomBy(0.8));
  $('lab-zoom-reset')?.addEventListener('click', () => {
    window.CPEChart.setCanvasZoom($('lab-chart'), 1);
    state.labPanOffset = 0;
    redrawLabChart();
  });
  // clear the clicked-candle details
  $('lab-candle-close')?.addEventListener('click', () => {
    state.labSelectedCandle = null;
    redrawLabChart();
  });
  $('lab-chart')?.addEventListener('wheel', (e) => {
    if (!state.labSignal) return;
    e.preventDefault();
    const C = window.CPEChart;
    const m = C.map;
    if (!m) return;
    // Shift+wheel (or horizontal trackpad) walks through history; plain wheel zooms at the pointer
    if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const delta = e.shiftKey ? e.deltaY : e.deltaX;
      state.labPanOffset = Math.max(0, Math.min(m.maxStart || 0, (state.labPanOffset || 0) + delta / 24));
      redrawLabChart();
      return;
    }
    const canvas = $('lab-chart');
    const r = canvas.getBoundingClientRect();
    const px = (e.clientX - r.left) * (canvas.clientWidth / (r.width || 1));
    labZoomAt(Math.exp(-e.deltaY * 0.0015), m.xw ? (px - m.pad.l) / m.xw : 0.5);
  }, { passive: false });
  $('lab-chart')?.addEventListener('dblclick', () => {
    if (state.labPath) { finishPath(); return; }
    if (state.labTool !== 'none') return;
    if (!state.labSignal) return;
    window.CPEChart.setCanvasZoom($('lab-chart'), 1);
    state.labPanOffset = 0;
    redrawLabChart();
  });
  $('lab-to-trade')?.addEventListener('click', () => {
    const s = state.labSignal;
    if (!s) return toast('Chart Lab', 'Analyze a pair first', false);
    document.querySelector('.nav-btn[data-view="trade"]')?.click();
    if ($('tr-symbol')) $('tr-symbol').value = s.symbol;
    if ($('tr-market')) $('tr-market').value = s.market === 'FUTURES' ? 'FUTURES' : 'SPOT';
    if ($('tr-tp')) $('tr-tp').value = s.tp1;
    if ($('tr-tp2')) $('tr-tp2').value = s.tp2;
    if ($('tr-sl')) $('tr-sl').value = s.sl;
    toast('Ready', `${s.symbol} levels copied to Manual Trade`, false);
  });
  $('lab-ask-help')?.addEventListener('click', async () => {
    const s = state.labSignal;
    const q = s
      ? `Please help me read ${s.symbol} (${s.market} ${s.interval}). Signal ${s.type}, candle ${s.candle?.name || 'none'}, RSI ${s.rsi}.`
      : 'Please help me with Chart Lab pair analysis.';
    document.querySelector('.nav-btn[data-view="livehelp"]')?.click();
    if ($('chat-input')) $('chat-input').value = q;
    await sendChat(q);
  });

  // —— manual drawing tools ——
  const canvas = $('lab-chart');
  const HANDLE_R = 9;

  const updateDrawHint = () => {
    const el = $('lab-draw-hint');
    if (!el) return;
    const map = {
      none: 'Cursor: scroll to zoom · drag to move through history · click a candle for its details · click a line to edit it · Delete removes it.',
      trend: 'Trend line: click the start point, then click the end point.',
      ray: 'Ray: click the start, then click the point it should point toward.',
      ext: 'Extended line: click two points — it runs on both directions.',
      hline: 'Horizontal: click anywhere to drop a level line.',
      fib: 'Fibonacci: click the swing start, then the opposite end.',
      zone: 'Zone · R:R: click the entry, then the target. Green = entry→TP, red = entry→SL (signal SL or 1:1 mirror). Drag the dots to adjust.',
      target: 'Target: click the entry/breakout level, then the target level — the block extends forward.',
      path: 'Forecast: click each point of your projected path (the blank right side is the future). Enter or double-click finishes; Esc cancels.',
      measure: 'Measure: press and drag between two points to read the Δ price, % move and bar count. Esc clears it.'
    };
    el.textContent = map[state.labTool] || 'Pick a tool, then click on the chart.';
  };

  const setTool = (tool) => {
    cancelDraw();
    state.labTool = tool;
    state.labEdit = null;
    if (tool !== 'measure') { state.labMeasure = null; state.labMeasureDrag = false; }
    if (tool !== 'none') state.labSelectedId = null;
    document.querySelectorAll('#lab-draw-toolbar .draw-btn[data-tool]').forEach((b) => {
      b.classList.toggle('active', b.dataset.tool === tool);
    });
    if (canvas) canvas.style.cursor = tool === 'none' ? 'grab' : 'crosshair';
    updateDrawHint();
    redrawLabChart();
  };
  document.querySelectorAll('#lab-draw-toolbar .draw-btn[data-tool]').forEach((b) => {
    b.addEventListener('click', () => setTool(b.dataset.tool));
  });
  $('lab-draw-clear')?.addEventListener('click', () => {
    state.labDrawings = [];
    state.labDrag = null;
    state.labEdit = null;
    state.labSelectedId = null;
    state.labMeasure = null;
    state.labMeasureDrag = false;
    redrawLabChart();
  });

  const canvasPos = (e) => {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (canvas.clientWidth / (r.width || 1)),
      y: (e.clientY - r.top) * (canvas.clientHeight / (r.height || 1))
    };
  };

  /** Which drawing (and which part) sits under the pointer, top-most first. */
  const hitTest = (px, py) => {
    const C = window.CPEChart;
    const m = C.map;
    if (!m) return null;
    const d2 = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;
    const segDist = (x1, y1, x2, y2) => {
      const L2 = d2(x1, y1, x2, y2);
      if (!L2) return Math.sqrt(d2(px, py, x1, y1));
      let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / L2;
      t = Math.max(0, Math.min(1, t));
      return Math.sqrt(d2(px, py, x1 + t * (x2 - x1), y1 + t * (y2 - y1)));
    };
    for (let k = state.labDrawings.length - 1; k >= 0; k--) {
      const d = state.labDrawings[k];
      if (!d || d._preview) continue;
      if (d.type === 'hline') {
        const y = C.priceToY(d.a && d.a.price);
        if (Number.isFinite(y) && px >= m.pad.l - 6 && px <= m.W - m.pad.r + 6 && Math.abs(py - y) <= 6) {
          return { d, handle: 'move' };
        }
        continue;
      }
      if (d.type === 'path') {
        const pts = d.pts || [];
        for (let pi = pts.length - 1; pi >= 0; pi--) {
          const x = C.indexToX(pts[pi].i);
          const y = C.priceToY(pts[pi].price);
          if (Number.isFinite(x) && Number.isFinite(y) && d2(px, py, x, y) <= HANDLE_R ** 2) {
            return { d, handle: 'pt', idx: pi };
          }
        }
        for (let pi = 1; pi < pts.length; pi++) {
          const x1 = C.indexToX(pts[pi - 1].i);
          const y1 = C.priceToY(pts[pi - 1].price);
          const x2 = C.indexToX(pts[pi].i);
          const y2 = C.priceToY(pts[pi].price);
          if (![x1, y1, x2, y2].every(Number.isFinite)) continue;
          if (segDist(x1, y1, x2, y2) <= 6) return { d, handle: 'move' };
        }
        continue;
      }
      if (!d.a || !d.b) continue;
      const x1 = C.indexToX(d.a.i);
      const y1 = C.priceToY(d.a.price);
      const x2 = C.indexToX(d.b.i);
      const y2 = C.priceToY(d.b.price);
      if (![x1, y1, x2, y2].every(Number.isFinite)) continue;
      if (d2(px, py, x1, y1) <= HANDLE_R ** 2) return { d, handle: 'a' };
      if (d2(px, py, x2, y2) <= HANDLE_R ** 2) return { d, handle: 'b' };
      if (d.type === 'zone') {
        const stop = C.zoneStop(d, state.labSignal);
        const yStop = C.priceToY(stop);
        if (Number.isFinite(yStop) && d2(px, py, x2, yStop) <= HANDLE_R ** 2) return { d, handle: 'sl' };
        const l = Math.min(x1, x2); const r = m.W - m.pad.r;
        const t = Math.min(y1, y2, Number.isFinite(yStop) ? yStop : y1);
        const b = Math.max(y1, y2, Number.isFinite(yStop) ? yStop : y1);
        if (px >= l - 5 && px <= r + 5 && py >= t - 5 && py <= b + 5) return { d, handle: 'move' };
      } else if (d.type === 'target') {
        const l = Math.max(Math.min(x1, x2), m.pad.l);
        const t = Math.min(y1, y2); const b = Math.max(y1, y2);
        if (px >= l - 5 && px <= m.W - m.pad.r + 5 && py >= t - 5 && py <= b + 5) return { d, handle: 'move' };
      } else if (segDist(x1, y1, x2, y2) <= 6) {
        return { d, handle: 'move' };
      }
    }
    return null;
  };

  const cancelPath = () => {
    if (!state.labPath) return;
    state.labDrawings = state.labDrawings.filter((x) => x !== state.labPath.d);
    state.labPath = null;
    redrawLabChart();
  };

  const finishPath = () => {
    const p = state.labPath;
    if (!p) return;
    const d = p.d;
    d._preview = false;
    d.cursor = null;
    const ok = (d.pts || []).length >= 2;
    if (!ok) state.labDrawings = state.labDrawings.filter((x) => x !== d);
    state.labPath = null;
    state.labSelectedId = ok ? d.id : null;
    redrawLabChart();
  };

  const cancelDraw = () => {
    cancelPath();
    if (state.labDrag) {
      state.labDrawings = state.labDrawings.filter((x) => x !== state.labDrag.d);
      state.labDrag = null;
      redrawLabChart();
    }
  };

  const finalizeDraw = (pt) => {
    const drag = state.labDrag;
    if (!drag) return;
    const d = drag.d;
    if (pt) d.b = pt;
    const priceOnly = d.type === 'target' || d.type === 'zone';
    const tooSmall = priceOnly
      ? Math.abs(d.b.price - d.a.price) < 1e-9
      : (Math.abs(d.b.i - d.a.i) < 0.5 && Math.abs(d.b.price - d.a.price) < 1e-9);
    if (tooSmall) state.labDrawings = state.labDrawings.filter((x) => x !== d);
    else {
      if (d.type === 'zone') d.sl = window.CPEChart.zoneStop(d, state.labSignal);
      delete d._preview;
    }
    state.labDrag = null;
    redrawLabChart();
  };

  canvas?.addEventListener('pointerdown', (e) => {
    if (!state.labSignal || !window.CPEChart.map) return;
    const { x, y } = canvasPos(e);
    const pt = window.CPEChart.pointToChart(x, y);
    if (!pt || !Number.isFinite(pt.i) || !Number.isFinite(pt.price)) return;

    if (state.labTool === 'none') {
      // select / edit existing drawings
      const hit = hitTest(x, y);
      state.labSelectedId = hit ? hit.d.id : null;
      if (hit) {
        if (hit.handle === 'move') {
          state.labEdit = {
            d: hit.d,
            handle: 'move',
            start: pt,
            a0: { ...hit.d.a },
            b0: hit.d.b ? { ...hit.d.b } : null,
            sl0: hit.d.sl,
            pts0: hit.d.pts ? hit.d.pts.map((p) => ({ ...p })) : null
          };
        } else if (hit.handle === 'pt') {
          state.labEdit = { d: hit.d, handle: 'pt', idx: hit.idx };
        } else {
          state.labEdit = { d: hit.d, handle: hit.handle };
        }
        if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
        redrawLabChart();
        return;
      }
      // nothing to edit → drag the chart to reveal older candles, or click one candle for details
      state.labPan = { x0: x, pan0: state.labPanOffset || 0 };
      if (canvas) canvas.style.cursor = 'grabbing';
      if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
      redrawLabChart();
      return;
    }

    if (state.labTool === 'hline') {
      state.labDrawings.push({ id: nextDrawId(), type: 'hline', a: { price: pt.price } });
      redrawLabChart();
      return;
    }

    if (state.labTool === 'measure') {
      // TradingView-style: press-drag-release to set A→B; the read-out stays until Esc.
      state.labMeasure = { a: pt, b: { ...pt } };
      state.labMeasureDrag = true;
      if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
      redrawLabChart();
      return;
    }

    if (state.labTool === 'path') {
      let d = state.labPath && state.labPath.d;
      if (!d) {
        d = { id: nextDrawId(), type: 'path', pts: [pt], cursor: null, _preview: true };
        state.labPath = { d };
        state.labDrawings.push(d);
      } else {
        const last = d.pts[d.pts.length - 1];
        const lx = window.CPEChart.indexToX(last.i);
        const ly = window.CPEChart.priceToY(last.price);
        // ignore a click that lands on the previous point (double-click safety)
        if (!(Number.isFinite(lx) && Number.isFinite(ly) && Math.abs(x - lx) < 6 && Math.abs(y - ly) < 6)) {
          d.pts.push(pt);
        }
        d.cursor = null;
      }
      redrawLabChart();
      return;
    }

    // two-click tools (or press → drag → release)
    if (!state.labDrag) {
      const d = { id: nextDrawId(), type: state.labTool, a: pt, b: { ...pt }, _preview: true };
      state.labDrag = { d, startX: x, startY: y, moved: false };
      state.labDrawings.push(d);
      if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
      redrawLabChart();
    } else {
      finalizeDraw(pt);
    }
  });

  canvas?.addEventListener('pointermove', (e) => {
    const { x, y } = canvasPos(e);

    // crosshair read-out: remember the pointer position so chart.js can draw the
    // dashed guides plus the price / time tags on the axes.
    const cm = window.CPEChart.map;
    state.labHover = {
      x,
      y,
      local: cm && cm.n ? Math.max(0, Math.min(cm.n - 1, Math.round((x - cm.pad.l) / cm.slotW - 0.5))) : -1
    };

    if (state.labMeasureDrag && state.labMeasure) {
      const pt = window.CPEChart.pointToChart(x, y);
      if (pt) state.labMeasure.b = pt;
      redrawLabChart();
      return;
    }

    if (state.labPath && state.labPath.d) {
      const pt = window.CPEChart.pointToChart(x, y);
      if (pt) state.labPath.d.cursor = pt;
      redrawLabChart();
      return;
    }

    if (state.labPan) {
      const C = window.CPEChart;
      const dx = x - state.labPan.x0;
      if (Math.abs(dx) > 3) state.labPan.moved = true;
      const perPx = C.pxPerCandle();
      const maxStart = (C.map && C.map.maxStart) || 0;
      // drag right pulls older candles into view (one bar per bar-width moved)
      const pxPerBar = Math.max(1, perPx);
      state.labPanOffset = Math.max(0, Math.min(maxStart, state.labPan.pan0 + dx / pxPerBar));
      redrawLabChart();
      return;
    }

    if (state.labEdit) {
      const pt = window.CPEChart.pointToChart(x, y);
      if (!pt) return;
      const ed = state.labEdit;
      if (ed.handle === 'move') {
        const di = pt.i - ed.start.i;
        const dp = pt.price - ed.start.price;
        if (ed.pts0) {
          ed.d.pts = ed.pts0.map((p) => ({ i: p.i + di, price: p.price + dp }));
        } else {
          ed.d.a = { i: ed.a0.i + di, price: ed.a0.price + dp };
          if (ed.b0) ed.d.b = { i: ed.b0.i + di, price: ed.b0.price + dp };
        }
        if (ed.sl0 != null) ed.d.sl = ed.sl0 + dp;
      } else if (ed.handle === 'pt') {
        if (ed.d.pts && ed.d.pts[ed.idx]) ed.d.pts[ed.idx] = pt;
      } else if (ed.handle === 'sl') {
        ed.d.sl = pt.price;
      } else if (ed.handle === 'a') {
        ed.d.a = pt;
      } else if (ed.handle === 'b') {
        ed.d.b = pt;
      }
      redrawLabChart();
      return;
    }

    if (state.labDrag) {
      if (Math.abs(x - state.labDrag.startX) > 4 || Math.abs(y - state.labDrag.startY) > 4) {
        state.labDrag.moved = true;
      }
      const pt = window.CPEChart.pointToChart(x, y);
      if (pt) state.labDrag.d.b = pt;
      redrawLabChart();
      return;
    }

    // plain hover → repaint so the crosshair + axis tags follow the pointer
    redrawLabChart();
  });

  canvas?.addEventListener('pointerleave', () => {
    if (!state.labHover) return;
    state.labHover = null;
    redrawLabChart();
  });

  canvas?.addEventListener('pointerup', (e) => {
    if (state.labPath) return;
    if (state.labMeasureDrag) {
      state.labMeasureDrag = false;
      return;
    }
    if (state.labPan) {
      const moved = !!state.labPan.moved;
      state.labPan = null;
      if (canvas) canvas.style.cursor = state.labTool === 'none' ? 'grab' : 'crosshair';
      if (!moved) {
        // a plain click (no drag) → show that candle's details, replacing any previous pick
        const { x } = canvasPos(e);
        const at = window.CPEChart.candleAtX(x);
        state.labSelectedCandle = at
          ? { abs: (window.CPEChart.map?.sliceStart || 0) + at.local }
          : null;
        redrawLabChart();
      }
      return;
    }
    if (state.labEdit) {
      state.labEdit = null;
      return;
    }
    if (!state.labDrag) return;
    if (state.labDrag.moved) {
      const { x, y } = canvasPos(e);
      finalizeDraw(window.CPEChart.pointToChart(x, y));
    }
    // otherwise wait for the second click
  });
  canvas?.addEventListener('pointercancel', () => {
    state.labEdit = null;
    state.labPan = null;
    state.labMeasureDrag = false;
    if (canvas) canvas.style.cursor = state.labTool === 'none' ? 'grab' : 'crosshair';
    if (state.labDrag) finalizeDraw(null);
  });

  // —— full screen + keyboard ——
  $('lab-fullscreen')?.addEventListener('click', () => toggleLabFullscreen());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.labPath) { cancelPath(); return; }
      if (state.labDrag) { cancelDraw(); return; }
      if (state.labMeasure) { state.labMeasure = null; state.labMeasureDrag = false; redrawLabChart(); return; }
      if (state.labSelectedId != null) { state.labSelectedId = null; redrawLabChart(); return; }
      if (state.labSelectedCandle) { state.labSelectedCandle = null; redrawLabChart(); return; }
      if (document.body.classList.contains('lab-fullscreen')) toggleLabFullscreen();
      return;
    }
    if (e.key === 'Enter' && state.labPath) {
      e.preventDefault();
      finishPath();
      return;
    }
    if ((e.key === 'Delete' || e.key === 'Backspace') && state.labSelectedId != null && state.currentView === 'chartlab') {
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      e.preventDefault();
      state.labDrawings = state.labDrawings.filter((d) => d.id !== state.labSelectedId);
      state.labSelectedId = null;
      redrawLabChart();
      return;
    }

    // TradingView keyboard shortcuts — ← → pan through history, + / − zoom.
    if (state.currentView !== 'chartlab' || !state.labSignal) return;
    const tag = (document.activeElement?.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const m = window.CPEChart.map;
      if (!m) return;
      e.preventDefault();
      const step = Math.max(1, Math.round((m.n || 8) / 8));
      const maxStart = m.maxStart || 0;
      state.labPanOffset = Math.max(0, Math.min(maxStart, (state.labPanOffset || 0) + (e.key === 'ArrowLeft' ? step : -step)));
      redrawLabChart();
      return;
    }
    if (e.key === '+' || e.key === '=' || e.key === '-' || e.key === '_') {
      e.preventDefault();
      labZoomBy(e.key === '-' || e.key === '_' ? 0.8 : 1.25);
    }
  });

  updateDrawHint();
  renderLabMtf();

  loadLabPairs();
}

/** Wheel-zoom + double-click reset for every chart canvas outside Chart Lab. */
function setupChartZoom() {
  if (chartZoomReady) return;
  chartZoomReady = true;
  const C = window.CPEChart;
  const isChart = (el) => el && el.tagName === 'CANVAS' && el.__cpeSignal && el.id !== 'lab-chart';
  document.addEventListener('wheel', (e) => {
    if (e.defaultPrevented || !isChart(e.target)) return;
    e.preventDefault();
    C.zoomCanvas(e.target, e.deltaY < 0 ? 1 : -1);
  }, { passive: false });
  document.addEventListener('dblclick', (e) => {
    if (!isChart(e.target)) return;
    C.resetCanvasZoom(e.target);
  });
}

function toggleLabFullscreen() {
  const panel = document.querySelector('.chartlab-canvas-panel');
  if (!panel) return;
  const on = panel.classList.toggle('fullscreen');
  document.body.classList.toggle('lab-fullscreen', on);
  const btn = $('lab-fullscreen');
  if (btn) btn.textContent = on ? '⤡ Exit' : '⛶ Full';
  setTimeout(redrawLabChart, 80);
}

function formatChatTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return '';
  }
}

async function renderChat() {
  const box = $('chat-messages');
  if (!box) return;
  const data = await window.cpe.chatList();
  const msgs = data.messages || [];
  box.innerHTML = msgs.map((m) => `
    <div class="chat-bubble ${m.role === 'user' ? 'user' : 'owner'}">
      ${escapeHtml(m.text)}
      <time>${m.role === 'owner' ? 'Owner' : 'You'} · ${formatChatTime(m.at)}${m.auto ? ' · auto' : ''}</time>
    </div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}

async function sendChat(text, toOwner) {
  const msg = (text || $('chat-input')?.value || '').trim();
  if (!msg) return;
  if ($('chat-input')) $('chat-input').value = '';
  await window.cpe.chatSend(msg, !!toOwner);
  await renderChat();
}

async function refreshOwnerChatInbox() {
  const el = $('owner-chat-inbox');
  if (!el) return;
  const data = await window.cpe.chatList();
  const msgs = (data.messages || []).filter((m) => m.role === 'user' || m.toOwner).slice(-40);
  el.innerHTML = msgs.length
    ? msgs.map((m) => `<div class="chat-bubble user">${escapeHtml(m.text)}<time>${formatChatTime(m.at)}</time></div>`).join('')
    : '<p class="tiny">No user messages on this PC yet.</p>';
}

async function refreshOwnerActivity() {
  const el = $('owner-activity');
  if (!el) return;
  const pass = $('owner-cfg-pass')?.value || $('owner-pass')?.value || '';
  if (!pass) {
    el.innerHTML = '<p class="tiny">Enter owner password above (config box) then Refresh activity.</p>';
    return;
  }
  const res = await window.cpe.ownerActivity(pass);
  if (!res.ok) {
    el.innerHTML = `<p class="tiny warn">${escapeHtml(res.message || 'Denied')}</p>`;
    return;
  }
  const rows = res.activity || [];
  el.innerHTML = rows.length
    ? rows.slice(0, 80).map((a) =>
      `<div><strong>${escapeHtml(a.type)}</strong> · ${formatChatTime(a.at)}<br/>${escapeHtml(a.detail || '')}</div>`
    ).join('')
    : '<p class="tiny">No activity yet on this PC.</p>';
}

let ownerAdminReady = false;
function setupOwnerAdmin() {
  if (ownerAdminReady) return;
  ownerAdminReady = true;
  $('owner-refresh-activity')?.addEventListener('click', () => refreshOwnerActivity());
  $('owner-load-cfg')?.addEventListener('click', async () => {
    const pass = $('owner-cfg-pass')?.value || '';
    const res = await window.cpe.ownerGetStore(pass);
    if (!res.ok) {
      $('owner-cfg-msg').textContent = res.message || 'Failed';
      return;
    }
    const s = res.store;
    if ($('owner-price')) $('owner-price').value = s.priceUsd || 100;
    if ($('owner-price-m3')) $('owner-price-m3').value = s.month3Usd || 15;
    if ($('owner-month3-label')) $('owner-month3-label').value = s.month3Label || '';
    if ($('owner-lifetime-label')) $('owner-lifetime-label').value = s.lifetimeLabel || '';
    if ($('owner-pay-bank')) $('owner-pay-bank').value = s.payments?.bank || '';
    if ($('owner-pay-binance')) $('owner-pay-binance').value = s.payments?.binance || '';
    if ($('owner-pay-paypal')) $('owner-pay-paypal').value = s.payments?.paypal || '';
    if ($('owner-faq')) {
      $('owner-faq').value = (s.faq || []).map((f) => `${f.q} || ${f.a}`).join('\n');
    }
    if ($('owner-update-on')) $('owner-update-on').checked = !!s.update?.enabled;
    if ($('owner-update-ver')) $('owner-update-ver').value = s.update?.version || '';
    if ($('owner-update-title')) $('owner-update-title').value = s.update?.title || '';
    if ($('owner-update-body')) $('owner-update-body').value = s.update?.body || '';
    $('owner-cfg-msg').textContent = 'Config loaded';
    setAppPrices(s.month3Usd || 15, s.priceUsd || 100);
    refreshOwnerActivity();
  });
  $('owner-save-cfg')?.addEventListener('click', async () => {
    const pass = $('owner-cfg-pass')?.value || '';
    const faq = ($('owner-faq')?.value || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [q, ...rest] = line.split('||');
        return { q: (q || '').trim(), a: rest.join('||').trim() };
      })
      .filter((f) => f.q && f.a);
    const m3 = Math.max(1, +$('owner-price-m3')?.value || 15);
    const life = Math.max(1, +$('owner-price')?.value || 100);
    const store = {
      priceUsd: life,
      month3Usd: m3,
      lifetime: true,
      lifetimeLabel: $('owner-lifetime-label')?.value || 'Lifetime license (one-time)',
      month3Label: $('owner-month3-label')?.value || '3-month license',
      payments: {
        bank: $('owner-pay-bank')?.value || '',
        binance: $('owner-pay-binance')?.value || '',
        paypal: $('owner-pay-paypal')?.value || ''
      },
      faq,
      update: {
        enabled: !!$('owner-update-on')?.checked,
        version: $('owner-update-ver')?.value || '',
        title: $('owner-update-title')?.value || '',
        body: $('owner-update-body')?.value || '',
        at: new Date().toISOString()
      }
    };
    const res = await window.cpe.ownerSaveStore(pass, store);
    if (!res.ok) {
      $('owner-cfg-msg').textContent = res.message || 'Save failed';
      return;
    }
    setAppPrices(m3, life);
    $('owner-cfg-msg').textContent = `Saved — prices USD ${m3} / ${life} forced to all license screens`;
    toast('Prices updated', `3-Month USD ${m3} · Lifetime USD ${life}`);
    loadPublicConfigUI({ publicConfig: res.publicConfig || await window.cpe.publicConfig() });
    refreshLicenseView();
    refreshBuyPrice();
    refreshOwnerActivity();
  });

  $('owner-ref-load')?.addEventListener('click', async () => {
    const pass = $('owner-ref-pass')?.value || $('owner-cfg-pass')?.value || '';
    const res = await window.cpe.referralAdmin(pass);
    if (!res.ok) {
      if ($('owner-ref-msg')) $('owner-ref-msg').textContent = res.message || 'Denied';
      return;
    }
    const ledger = res.adminLedger || [];
    const local = res.referralsDetailed || [];
    const el = $('owner-ref-ledger');
    if (el) {
      el.innerHTML = [
        `<div><strong>This PC referrals:</strong> ${local.length}</div>`,
        ...local.map((r) =>
          `<div>#${r.index} ${escapeHtml(r.eventType)} · mid ${escapeHtml(r.referredMachineHash)} · net ${escapeHtml(r.referredNetworkHash || '')} · +${r.daysAwarded}d · ${formatChatTime(r.at)}</div>`
        ),
        `<div class="mt"><strong>Imported ledger:</strong> ${ledger.length}</div>`,
        ...ledger.map((r) =>
          `<div>${escapeHtml(r.eventType)} · ref ${escapeHtml(r.referrerMachineHash)} → ${escapeHtml(r.referredMachineHash)} · sameNet=${!!r.sameNetwork} · ${formatChatTime(r.at)}</div>`
        )
      ].join('') || '<p class="tiny">Empty</p>';
    }
    const sec = $('owner-sec-alerts');
    if (sec) {
      const alerts = res.securityAlerts || [];
      sec.innerHTML = alerts.length
        ? alerts.slice(0, 40).map((a) =>
          `<div><strong>${escapeHtml(a.code || 'ALERT')}</strong> · ${formatChatTime(a.at)}<br/>${escapeHtml(a.message || '')} · mid ${escapeHtml((a.machineId || '').slice(0, 12))} · ${escapeHtml(a.keyHint || '')}</div>`
        ).join('')
        : '<p class="tiny">No security alerts.</p>';
    }
    if ($('owner-ref-msg')) $('owner-ref-msg').textContent = 'Ledger loaded';
  });
  $('owner-ref-import')?.addEventListener('click', async () => {
    const pass = $('owner-ref-pass')?.value || $('owner-cfg-pass')?.value || '';
    const res = await window.cpe.referralAdminImport(pass, $('owner-ref-proof')?.value || '');
    if ($('owner-ref-msg')) $('owner-ref-msg').textContent = res.message || (res.ok ? 'Imported' : 'Failed');
    if (res.ok) $('owner-ref-load')?.click();
  });
  $('owner-claim-issue')?.addEventListener('click', async () => {
    const pass = $('owner-ref-pass')?.value || $('owner-pass')?.value || $('owner-cfg-pass')?.value || '';
    const res = await window.cpe.referralOwnerIssueClaim(
      pass,
      $('owner-claim-slip')?.value || '',
      $('owner-claim-mid')?.value || ''
    );
    if (!res.ok) {
      if ($('owner-ref-msg')) $('owner-ref-msg').textContent = res.message || 'Failed';
      return;
    }
    if ($('owner-ref-msg')) {
      $('owner-ref-msg').textContent = `Issued ${res.days}d key:\n${res.key}`;
    }
    try { await navigator.clipboard.writeText(res.key); } catch { /* ignore */ }
    toast('Owner key', `${res.days}d key copied`);
    $('owner-ref-load')?.click();
  });
}

const TOUR_KEY = 'cpe_tour_done_v4';
const TOUR_VIEWS = [
  'chartlab', 'spot', 'futures', 'forex', 'trade',
  'positions', 'livehelp', 'news', 'learn', 'journal', 'keys', 'help', 'license'
];

function getTourSteps() {
  // Always rebuild from current language pack
  const lang = (window.CPE_I18N && window.CPE_I18N.current) || 'en';
  const steps = TOUR_VIEWS.map((view, i) => ({
    view,
    title: t(`tour_${i + 1}_title`),
    body: t(`tour_${i + 1}_body`)
  }));
  return [
    {
      view: 'spot',
      title: t('tour_lang_title'),
      body: t('tour_lang_body').replace('{lang}', lang)
    },
    ...steps
  ];
}

let tourIndex = 0;
let tourReady = false;

function maybeStartTour() {
  try {
    if (localStorage.getItem(TOUR_KEY) === '1') return;
  } catch { /* ignore */ }
  startTour(0);
}

function startTour(i) {
  tourIndex = i || 0;
  $('tour-overlay')?.classList.remove('hidden');
  if (!tourReady) {
    tourReady = true;
    $('tour-skip')?.addEventListener('click', finishTour);
    $('tour-next')?.addEventListener('click', () => {
      const steps = getTourSteps();
      if (tourIndex >= steps.length - 1) finishTour();
      else {
        tourIndex += 1;
        renderTourStep();
      }
    });
    $('tour-prev')?.addEventListener('click', () => {
      if (tourIndex > 0) {
        tourIndex -= 1;
        renderTourStep();
      }
    });
  }
  renderTourStep();
}

function renderTourStep() {
  const steps = getTourSteps();
  const step = steps[tourIndex];
  if (!step) return finishTour();
  $('tour-step-num').textContent = `${tourIndex + 1} / ${steps.length}`;
  $('tour-title').textContent = step.title;
  $('tour-body').textContent = step.body;
  const dots = $('tour-dots');
  if (dots) {
    dots.innerHTML = steps.map((_, i) => `<i class="${i === tourIndex ? 'on' : ''}"></i>`).join('');
  }
  if ($('tour-prev')) $('tour-prev').disabled = tourIndex === 0;
  if ($('tour-next')) {
    $('tour-next').textContent = tourIndex >= steps.length - 1 ? t('tour_finish') : t('tour_next');
  }
  if ($('tour-skip')) $('tour-skip').textContent = t('tour_skip');
  if (step.view) {
    document.querySelector(`.nav-btn[data-view="${step.view}"]`)?.click();
  }
}

function finishTour() {
  try { localStorage.setItem(TOUR_KEY, '1'); } catch { /* ignore */ }
  $('tour-overlay')?.classList.add('hidden');
  document.querySelector('.nav-btn[data-view="keys"]')?.click();
  setTimeout(() => {
    toast(t('api_notice_title'), t('api_notice_body'));
  }, 350);
}

let newsCache = null;
let newsTab = 'crypto';
let newsUiReady = false;
let learnUiReady = false;

async function loadNews(force) {
  const list = $('news-list');
  if (!list) return;
  if (!force && newsCache) {
    renderNewsList(newsTab);
    return;
  }
  list.innerHTML = `<p class="tiny">${escapeHtml(t('news_loading'))}</p>`;
  try {
    newsCache = await window.cpe.newsBundle();
    renderNewsList(newsTab);
  } catch (e) {
    list.innerHTML = `<p class="tiny">${escapeHtml(e.message || String(e))}</p>`;
  }
}

function renderNewsList(tab) {
  newsTab = tab || 'crypto';
  const list = $('news-list');
  if (!list || !newsCache) return;
  document.querySelectorAll('.news-tab').forEach((b) => {
    b.classList.toggle('active', b.dataset.news === newsTab);
  });
  if (newsTab === 'platforms') {
    const rows = newsCache.platforms || [];
    list.innerHTML = rows.map((p) => `
      <article class="news-card">
        <h4>${escapeHtml(p.title || p.platform)}</h4>
        <p>${escapeHtml(p.tip)}</p>
        <div class="meta">${escapeHtml(p.platform)} · API trick</div>
      </article>`).join('') || `<p class="tiny">${escapeHtml(t('news_empty'))}</p>`;
    return;
  }
  const items = newsTab === 'forex' ? (newsCache.forex || []) : (newsCache.crypto || []);
  if (!items.length) {
    list.innerHTML = `<p class="tiny">${escapeHtml(newsCache.cryptoError || t('news_empty'))}</p>`;
    return;
  }
  const note = newsTab === 'crypto' && newsCache.cryptoNote
    ? `<p class="tiny news-note">${escapeHtml(newsCache.cryptoNote)}</p>`
    : '';
  const stamp = newsCache.at ? new Date(newsCache.at).toLocaleTimeString() : '';
  const updated = stamp
    ? `<p class="tiny news-note">${escapeHtml(t('news_updated'))} ${escapeHtml(stamp)}</p>`
    : '';
  list.innerHTML = note + updated + items.map((n) => {
    const link = n.url
      ? `<a href="#" data-url="${escapeHtml(n.url)}">${escapeHtml(t('news_open'))}</a>`
      : '';
    const when = n.at ? new Date(n.at).toLocaleString() : '';
    return `<article class="news-card">
      <h4>${escapeHtml(n.title)}</h4>
      <p>${escapeHtml((n.body || '').slice(0, 280))}${(n.body || '').length > 280 ? '…' : ''}</p>
      <div class="meta">${escapeHtml(n.source || '')} · ${escapeHtml(when)} · ${(n.tags || []).slice(0, 3).map(escapeHtml).join(' · ')}</div>
      ${link}
    </article>`;
  }).join('');
  list.querySelectorAll('a[data-url]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      window.cpe.openExternal(a.dataset.url);
    });
  });
}

function setupNewsUi() {
  if (newsUiReady) return;
  newsUiReady = true;
  $('news-refresh')?.addEventListener('click', () => loadNews(true));
  document.querySelectorAll('.news-tab').forEach((btn) => {
    btn.addEventListener('click', () => renderNewsList(btn.dataset.news));
  });
  // Auto-refresh while the News view is open — keep headlines fresh (~10 min).
  setInterval(() => {
    if (state.currentView === 'news') loadNews(true);
  }, 10 * 60 * 1000);
}

function getLearnPack() {
  const lang = (window.CPE_I18N && window.CPE_I18N.current) || 'en';
  return window.CPE_getLearn ? window.CPE_getLearn(lang) : (window.CPE_LEARN?.en || null);
}

function stickCandle(x, o, c, high, low, bull) {
  const top = Math.min(o, c);
  const bot = Math.max(o, c);
  const bodyH = Math.max(2, bot - top);
  const fill = bull ? '#22c55e' : '#ef4444';
  return `<line x1="${x}" y1="${high}" x2="${x}" y2="${low}" stroke="#94a3b8" stroke-width="1.5"/>
    <rect x="${x - 5}" y="${top}" width="10" height="${bodyH}" rx="1" fill="${fill}" stroke="${fill}"/>`;
}

/** One candle from [open, close, high, low] in a 0..78 box (0 = top of the card). */
function candleRow(list, w = 72) {
  const pad = 12;
  const n = Math.max(1, list.length);
  const gap = (w - pad * 2) / n;
  return list
    .map((k, i) => stickCandle(pad + gap * (i + 0.5), k[0], k[1], k[2], k[3], k[1] >= k[0]))
    .join('');
}

/** SVG drawing for a candlestick-pattern card. */
function learnCandleArt(shape) {
  const G = '#22c55e';
  const R = '#ef4444';
  const M = '#94a3b8';
  const wrap = (inner, w = 72) =>
    `<svg class="learn-art" viewBox="0 0 ${w} 78" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  // Multi-candle shapes as [open, close, high, low] lists — keeps the long tail
  // of patterns readable instead of one hand-written case each.
  const rows = {
    longlegged: [[28, 28, 6, 72], [42, 42, 4, 74], [56, 56, 8, 70]],
    dragonfly: [[14, 14, 12, 70], [40, 40, 10, 72], [54, 54, 14, 68]],
    gravestone: [[64, 64, 8, 66], [40, 40, 6, 68], [30, 30, 10, 64]],
    inside_bar: [[24, 56, 20, 60], [42, 46, 36, 52]],
    outside_bar: [[32, 48, 26, 54], [22, 56, 16, 66]],
    belt_bull: [[64, 16, 14, 64]],
    belt_bear: [[14, 62, 14, 66]],
    kick_bull: [[34, 58, 30, 62], [22, 6, 4, 24]],
    kick_bear: [[20, 44, 16, 48], [52, 74, 50, 76]],
    abandoned: [[22, 58, 18, 62], [10, 10, 8, 12], [44, 18, 16, 48]],
    three_inside_up: [[20, 60, 16, 64], [44, 50, 40, 54], [40, 14, 12, 44]],
    three_inside_down: [[58, 18, 14, 62], [34, 28, 24, 38], [38, 64, 34, 66]],
    three_methods_bull: [[30, 16, 12, 34], [20, 26, 18, 28], [22, 29, 20, 31], [19, 25, 17, 27], [32, 12, 10, 34]],
    three_methods_bear: [[16, 32, 14, 34], [26, 20, 18, 28], [24, 19, 17, 27], [27, 22, 20, 30], [14, 38, 12, 40]],
    tower_bot: [[20, 60, 16, 64], [44, 40, 34, 48], [42, 38, 32, 46], [42, 14, 12, 48]],
    tower_top: [[58, 18, 14, 62], [34, 38, 30, 46], [36, 40, 32, 48], [36, 62, 32, 66]]
  };
  if (rows[shape]) return wrap(candleRow(rows[shape]), 72);
  switch (shape) {
    case 'doji':
      return wrap(`<line x1="36" y1="8" x2="36" y2="70" stroke="${M}" stroke-width="2"/><line x1="22" y1="40" x2="50" y2="40" stroke="${M}" stroke-width="2.5"/>`);
    case 'hammer':
      return wrap(`${stickCandle(36, 28, 34, 26, 70, true)}`);
    case 'invhammer':
      return wrap(`${stickCandle(36, 48, 54, 8, 56, true)}`);
    case 'shooting':
      return wrap(`${stickCandle(36, 48, 54, 8, 56, false)}`);
    case 'hanging':
      return wrap(`${stickCandle(36, 28, 34, 26, 70, false)}`);
    case 'engulf_bull':
      return wrap(`${stickCandle(22, 30, 48, 26, 52, false)}${stickCandle(48, 18, 58, 14, 62, true)}`, 72);
    case 'engulf_bear':
      return wrap(`${stickCandle(22, 48, 28, 24, 52, true)}${stickCandle(48, 58, 18, 14, 62, false)}`, 72);
    case 'morning':
      return wrap(`${stickCandle(16, 22, 50, 18, 54, false)}${stickCandle(36, 52, 56, 48, 60, false)}${stickCandle(56, 48, 20, 16, 52, true)}`, 72);
    case 'evening':
      return wrap(`${stickCandle(16, 50, 22, 18, 54, true)}${stickCandle(36, 24, 28, 16, 32, true)}${stickCandle(56, 22, 52, 18, 56, false)}`, 72);
    case 'maru_bull':
      return wrap(`<rect x="28" y="12" width="16" height="54" rx="2" fill="${G}"/>`);
    case 'maru_bear':
      return wrap(`<rect x="28" y="12" width="16" height="54" rx="2" fill="${R}"/>`);
    case 'spin':
      return wrap(`<line x1="36" y1="10" x2="36" y2="68" stroke="${M}" stroke-width="1.5"/><rect x="30" y="34" width="12" height="10" rx="1" fill="${M}"/>`);
    case 'pierce':
      return wrap(`${stickCandle(24, 22, 52, 18, 56, false)}${stickCandle(50, 58, 30, 26, 62, true)}`, 72);
    case 'darkcloud':
      return wrap(`${stickCandle(24, 52, 24, 20, 56, true)}${stickCandle(50, 18, 42, 14, 54, false)}`, 72);
    case 'soldiers':
      return wrap(`${stickCandle(16, 48, 36, 44, 52, true)}${stickCandle(36, 36, 28, 24, 40, true)}${stickCandle(56, 28, 16, 12, 32, true)}`, 72);
    case 'crows':
      return wrap(`${stickCandle(16, 28, 40, 24, 44, false)}${stickCandle(36, 36, 48, 32, 52, false)}${stickCandle(56, 44, 58, 40, 62, false)}`, 72);
    case 'harami_bull':
      return wrap(`${stickCandle(24, 16, 58, 12, 62, false)}${stickCandle(50, 40, 48, 36, 52, true)}`, 72);
    case 'harami_bear':
      return wrap(`${stickCandle(24, 58, 18, 14, 62, true)}${stickCandle(50, 36, 40, 32, 44, false)}`, 72);
    case 'tweezer_bot':
      return wrap(`${stickCandle(26, 30, 42, 26, 64, false)}${stickCandle(50, 48, 32, 28, 64, true)}`, 72);
    case 'tweezer_top':
      return wrap(`${stickCandle(26, 42, 28, 12, 46, true)}${stickCandle(50, 30, 44, 12, 48, false)}`, 72);
    default:
      return wrap(`${stickCandle(36, 30, 48, 16, 62, true)}`);
  }
}

function learnChartArt(shape) {
  const stroke = '#94a3b8';
  const accent = '#22c55e';
  const danger = '#ef4444';
  const gold = '#f0b429';
  const wrap = (inner) =>
    `<svg class="learn-art learn-art-wide" viewBox="0 0 120 78" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  // Extra structures as point lists (120×78 box). `lines` = dashed guide rails
  // (necklines, wedges, ranges) so the shape reads at a glance.
  const shapes = {
    triple_top: { col: danger, pts: '6,60 20,20 32,44 46,20 58,44 72,20 88,44 104,68 116,72', lines: [[32,44,88,44]] },
    triple_bot: { col: accent, pts: '6,20 20,60 32,36 46,60 58,36 72,60 88,36 104,12 116,6', lines: [[32,36,88,36]] },
    cup_handle: { col: accent, pts: '6,20 18,44 30,58 46,64 62,58 76,44 88,34 96,42 104,26 116,8', lines: [[6,22,100,22]] },
    rounding_bot: { col: accent, pts: '6,18 18,34 30,48 44,58 60,62 76,58 90,48 102,34 116,16' },
    rounding_top: { col: danger, pts: '6,62 18,46 30,32 44,22 60,18 76,22 90,32 102,46 116,64' },
    rising_wedge: { col: danger, pts: '12,54 28,44 44,50 60,38 76,44 92,32 106,36', lines: [[8,54,110,20],[8,64,110,34]] },
    falling_wedge: { col: accent, pts: '12,24 28,36 44,30 60,44 76,38 92,50 106,58', lines: [[8,20,110,54],[8,40,110,66]] },
    asc_triangle: { col: gold, pts: '12,54 28,32 44,48 60,36 76,38 92,30 106,26', lines: [[8,24,112,24],[8,66,112,28]] },
    desc_triangle: { col: gold, pts: '12,34 28,44 44,30 60,46 76,40 92,44 106,50', lines: [[8,54,112,54],[8,12,112,50]] },
    pennant: { col: accent, pts: '6,62 22,16 32,34 44,22 56,32 68,26 88,8 112,4', lines: [[22,16,72,27],[22,48,72,27]] },
    flag_bear: { col: danger, pts: '6,16 36,60 52,50 68,54 82,46 110,74' },
    rectangle: { col: gold, pts: '12,52 26,26 40,54 54,28 68,54 82,26 96,54 110,28', lines: [[8,24,112,24],[8,56,112,56]] },
    broadening: { col: gold, pts: '20,30 32,52 46,20 60,60 74,14 88,66 104,4', lines: [[8,40,112,12],[8,40,112,68]] },
    diamond: { col: gold, pts: '6,56 20,30 32,16 46,30 58,16 72,30 86,52 100,62 114,68' },
    island_rev: { col: danger, pts: '6,26 24,34 38,52 52,48 66,54 80,40 96,68 114,74', lines: [[24,44,84,44]] },
    breakaway_gap: { col: accent, pts: '6,60 22,54 34,56 46,28 60,24 74,30 88,18 112,8', lines: [[34,52,34,30],[46,52,46,26]] },
    v_reversal: { col: accent, pts: '6,14 20,40 34,64 48,34 64,18 84,24 104,12 114,6' },
    harmonic: { col: gold, pts: '6,60 26,20 46,44 66,22 86,40 106,14 114,10' }
  };
  const art = shapes[shape];
  if (art) {
    const rails = (art.lines || []).map((l) =>
      `<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="${stroke}" stroke-width="1.5" stroke-dasharray="4 3"/>`
    ).join('');
    return wrap(`<polyline fill="none" stroke="${art.col}" stroke-width="2.4" stroke-linejoin="round" points="${art.pts}"/>${rails}`);
  }
  switch (shape) {
    case 'double_bot':
      return wrap(`<polyline fill="none" stroke="${accent}" stroke-width="2.5" points="8,28 28,62 48,36 68,62 92,22 112,18"/>
        <line x1="28" y1="62" x2="68" y2="62" stroke="${stroke}" stroke-dasharray="3 3"/>`);
    case 'double_top':
      return wrap(`<polyline fill="none" stroke="${danger}" stroke-width="2.5" points="8,50 28,16 48,42 68,16 92,56 112,60"/>
        <line x1="28" y1="16" x2="68" y2="16" stroke="${stroke}" stroke-dasharray="3 3"/>`);
    case 'hs_top':
      return wrap(`<polyline fill="none" stroke="${danger}" stroke-width="2.5" points="10,48 28,28 40,48 60,12 80,48 92,30 110,58"/>
        <line x1="28" y1="48" x2="92" y2="48" stroke="${stroke}" stroke-dasharray="3 3"/>`);
    case 'ihs':
      return wrap(`<polyline fill="none" stroke="${accent}" stroke-width="2.5" points="10,30 28,50 40,30 60,66 80,30 92,48 110,20"/>
        <line x1="28" y1="30" x2="92" y2="30" stroke="${stroke}" stroke-dasharray="3 3"/>`);
    case 'triangle':
      return wrap(`<polyline fill="none" stroke="${gold}" stroke-width="2" points="10,18 50,32 90,40 110,42"/>
        <polyline fill="none" stroke="${gold}" stroke-width="2" points="10,62 50,48 90,42 110,40"/>
        <polyline fill="none" stroke="${stroke}" stroke-width="1.5" points="12,40 30,50 48,28 66,46 84,34"/>`);
    case 'flag':
      return wrap(`<polyline fill="none" stroke="${accent}" stroke-width="2.5" points="8,60 36,18"/>
        <rect x="36" y="18" width="40" height="22" fill="none" stroke="${stroke}" stroke-width="1.8" transform="rotate(-12 56 29)"/>
        <polyline fill="none" stroke="${accent}" stroke-width="2.5" points="74,28 110,10"/>`);
    case 'channel':
      return wrap(`<line x1="10" y1="58" x2="110" y2="28" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="10" y1="42" x2="110" y2="12" stroke="${stroke}" stroke-width="1.8"/>
        <polyline fill="none" stroke="#38bdf8" stroke-width="2" points="14,50 34,38 52,44 70,30 88,34 106,20"/>`);
    case 'support_res':
      return wrap(`<line x1="8" y1="24" x2="112" y2="24" stroke="#a78bfa" stroke-width="2"/>
        <line x1="8" y1="54" x2="112" y2="54" stroke="#a78bfa" stroke-width="2"/>
        <polyline fill="none" stroke="${stroke}" stroke-width="2" points="12,48 28,28 44,50 60,26 76,52 92,30 108,48"/>
        <text x="10" y="20" fill="#a78bfa" font-size="8">R</text>
        <text x="10" y="66" fill="#a78bfa" font-size="8">S</text>`);
    default:
      return wrap(`<polyline fill="none" stroke="${stroke}" stroke-width="2" points="10,50 40,20 70,55 110,25"/>`);
  }
}

function renderLearnCard(c, artHtml) {
  return `<article class="candle-tile candle-tile-rich">
      <div class="learn-art-box" style="border-color:${escapeHtml(c.color)}">${artHtml}</div>
      <strong>${escapeHtml(c.name)}</strong>
      <span class="bias" style="color:${escapeHtml(c.color)}">${escapeHtml(c.bias)}</span>
      <p>${escapeHtml(c.tip)}</p>
      <p class="learn-also">${escapeHtml(c.also || '')}</p>
    </article>`;
}

function renderLearn() {
  const pack = getLearnPack();
  if (!pack) return;
  if ($('learn-intro')) $('learn-intro').textContent = pack.intro || '';
  const candles = $('learn-candles');
  if (candles) {
    candles.innerHTML = (pack.candles || []).map((c) =>
      renderLearnCard(c, learnCandleArt(c.shape || 'hammer'))
    ).join('');
  }
  const charts = $('learn-charts');
  if (charts) {
    charts.innerHTML = (pack.chartPatterns || []).map((c) =>
      renderLearnCard(c, learnChartArt(c.shape || 'triangle'))
    ).join('');
  }
  const lang = (window.CPE_I18N && window.CPE_I18N.current) || 'en';
  const modSel = $('learn-module');
  const mods = pack.modules || [];
  if (modSel && (!modSel.options.length || modSel.dataset.lang !== lang)) {
    const prev = modSel.value;
    modSel.innerHTML = mods.map((m) =>
      `<option value="${escapeHtml(m.id)}">${escapeHtml(m.title)}</option>`
    ).join('');
    modSel.dataset.lang = lang;
    if (prev && mods.some((m) => m.id === prev)) modSel.value = prev;
  }
  renderLearnModule();
  const sel = $('learn-platform');
  const plats = Object.keys(pack.platforms || {});
  if (sel && (!sel.options.length || sel.dataset.lang !== lang)) {
    const prev = sel.value;
    sel.innerHTML = plats.map((id) =>
      `<option value="${escapeHtml(id)}">${escapeHtml(pack.platforms[id].title || id)}</option>`
    ).join('');
    sel.dataset.lang = lang;
    if (prev && plats.includes(prev)) sel.value = prev;
  }
  renderLearnPlatform();
  const fx = pack.forexAz || {};
  if ($('learn-fx-title')) $('learn-fx-title').textContent = fx.title || 'Forex A → Z';
  const fxList = $('learn-fx-list');
  if (fxList) {
    fxList.innerHTML = (fx.lessons || []).map((L) => `
      <article><strong>${escapeHtml(L.h)}</strong><span>${escapeHtml(L.t)}</span></article>
    `).join('');
  }
}

function renderLearnModule() {
  const pack = getLearnPack();
  if (!pack) return;
  const mods = pack.modules || [];
  const id = $('learn-module')?.value || mods[0]?.id;
  const m = mods.find((x) => x.id === id) || mods[0];
  if (!m) return;
  if ($('learn-mod-summary')) $('learn-mod-summary').textContent = m.summary || '';
  const list = $('learn-mod-list');
  if (list) {
    list.innerHTML = (m.lessons || []).map((L) => `
      <article><strong>${escapeHtml(L.h)}</strong><span>${escapeHtml(L.t)}</span></article>
    `).join('');
  }
}

function renderLearnPlatform() {
  const pack = getLearnPack();
  if (!pack) return;
  const id = $('learn-platform')?.value || 'BINANCE';
  const p = pack.platforms?.[id] || pack.platforms?.BINANCE;
  if (!p) return;
  if ($('learn-plat-title')) $('learn-plat-title').textContent = p.title || id;
  const ol = $('learn-plat-steps');
  if (ol) {
    ol.innerHTML = (p.steps || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('');
  }
}

function setupLearnUi() {
  if (learnUiReady) return;
  learnUiReady = true;
  $('learn-platform')?.addEventListener('change', renderLearnPlatform);
  $('learn-module')?.addEventListener('change', renderLearnModule);
}

function setupLiveHelp() {
  if (liveHelpReady) return;
  liveHelpReady = true;
  $('chat-send')?.addEventListener('click', () => sendChat());
  $('chat-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });
  document.querySelectorAll('.chat-chip').forEach((chip) => {
    chip.addEventListener('click', () => sendChat(chip.dataset.q));
  });
  $('chat-wa')?.addEventListener('click', async () => {
    await window.cpe.chatSend(($('chat-input')?.value || 'Need live help from owner').trim() || 'Need live help', true);
    await window.cpe.chatWhatsApp('Please reply on WhatsApp');
    await renderChat();
    toast('WhatsApp', 'Opening chat with owner…', false);
  });
  $('chat-clear')?.addEventListener('click', async () => {
    await window.cpe.chatClear();
    await renderChat();
  });
  $('owner-refresh-chat')?.addEventListener('click', () => refreshOwnerChatInbox());
  renderChat();
}

setInterval(tickClock, 1000);
setInterval(tickCandleEta, 1000);
tickClock();
tickCandleEta();
if (window.CPE_I18N) window.CPE_I18N.init();
initTheme();
initWelcomeAgreement().then(() => initLicenseGate());
