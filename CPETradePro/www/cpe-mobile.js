/**
 * CPE Trade Pro — Android mobile shim.
 *
 * The whole desktop main process (src/main.js, bundled as the `main` module by
 * tools/build-android-mobile-assets.js) runs unchanged inside this WebView.
 * This file supplies:
 *   • an `electron` + `child_process` stand-in so main.js boots without Electron
 *   • the `window.cpe` surface the renderer expects (same shape as preload.js)
 *   • wiring from ipcMain handlers -> window.cpe calls, and from
 *     webContents.send(...) -> renderer event listeners
 *   • native hooks (system notification, share sheet, external links)
 *
 * Loaded after cpe-engine.js and before app.js.
 */
(function (global) {
  'use strict';

  var CPERequire = global.CPERequire;
  var NATIVE = global.CPEAndroid || null;

  // Phones get a single toast slot: the newest alert swaps the one on screen
  // instead of queueing behind it. Read by app.js at load time.
  global.CPE_TOAST_SWAP = true;

  if (!CPERequire) {
    console.error('[CPE] engine runtime missing — cpe-engine.js must load first');
    return;
  }

  var handlers = {};
  var listeners = {};

  function listen(channel, cb) {
    if (typeof cb !== 'function') return;
    (listeners[channel] = listeners[channel] || []).push(cb);
  }

  function emit(channel, data) {
    var list = listeners[channel];
    if (!list) return;
    for (var i = 0; i < list.length; i++) {
      try { list[i](data); }
      catch (e) { console.warn('[CPE] listener error on ' + channel, e); }
    }
  }

  /** Mirrors ipcRenderer.invoke — resolves with the handler's return value. */
  function call(channel) {
    var args = Array.prototype.slice.call(arguments, 1);
    return new Promise(function (resolve, reject) {
      var fn = handlers[channel];
      if (!fn) { reject(new Error('Not available on Android: ' + channel)); return; }
      var out;
      try { out = fn.apply(null, [{ sender: null, senderFrame: null }].concat(args)); }
      catch (e) { reject(e); return; }
      Promise.resolve(out).then(resolve, reject);
    });
  }

  /* ================================================================ electron */

  var webContentsStub = {
    send: function (channel, data) { emit(channel, data); return true; },
    on: function () { return webContentsStub; },
    once: function () { return webContentsStub; },
    off: function () { return webContentsStub; },
    addListener: function () { return webContentsStub; },
    removeAllListeners: function () { return webContentsStub; },
    setWindowOpenHandler: function () { return webContentsStub; },
    executeJavaScript: function () { return Promise.resolve(); },
    openDevTools: function () {},
    closeDevTools: function () {},
    isDestroyed: function () { return false; },
    getURL: function () { return global.location ? global.location.href : ''; }
  };

  function BrowserWindowStub() {
    this.webContents = webContentsStub;
    this.isDestroyed = function () { return false; };
    this.isMinimized = function () { return false; };
    this.isVisible = function () { return true; };
    this.maximize = function () {};
    this.unmaximize = function () {};
    this.minimize = function () {};
    this.restore = function () {};
    this.show = function () {};
    this.hide = function () {};
    this.focus = function () {};
    this.blur = function () {};
    this.close = function () {};
    this.destroy = function () {};
    this.flashFrame = function () {};
    this.setTitle = function () {};
    this.setMenu = function () {};
    this.setMenuBarVisibility = function () {};
    this.setBounds = function () {};
    this.getBounds = function () { return { x: 0, y: 0, width: 0, height: 0 }; };
    this.loadFile = function () { return Promise.resolve(); };
    this.loadURL = function () { return Promise.resolve(); };
    this.on = function () { return this; };
    this.once = function () { return this; };
    this.off = function () { return this; };
    this.removeAllListeners = function () { return this; };
  }
  BrowserWindowStub.getAllWindows = function () { return []; };
  BrowserWindowStub.getFocusedWindow = function () { return null; };
  BrowserWindowStub.fromWebContents = function () { return null; };

  var USER_DATA = '/cpe-profile';

  var appStub = {
    getPath: function (name) {
      if (name === 'userData') return USER_DATA;
      if (name === 'pictures') return USER_DATA + '/pictures';
      if (name === 'desktop') return USER_DATA + '/desktop';
      if (name === 'temp') return USER_DATA + '/tmp';
      return USER_DATA + '/' + String(name || '');
    },
    getName: function () { return 'CPE Trade Pro'; },
    getVersion: function () {
      try { return NATIVE && NATIVE.appVersion ? NATIVE.appVersion() : '1.0.0'; }
      catch (e) { return '1.0.0'; }
    },
    getAppPath: function () { return '/cpe-app'; },
    getLocale: function () { return 'en-US'; },
    getSystemLocale: function () { return 'en-US'; },
    isPackaged: false,
    whenReady: function () { return Promise.resolve(); },
    on: function () { return appStub; },
    once: function () { return appStub; },
    off: function () { return appStub; },
    quit: function () {},
    exit: function () {},
    relaunch: function () {},
    setAppUserModelId: function () {},
    setAboutPanelOptions: function () {},
    disableHardwareAcceleration: function () {},
    getAppMetrics: function () { return []; },
    requestSingleInstanceLock: function () { return true; }
  };

  var shellStub = {
    openExternal: function (url) {
      try {
        if (NATIVE && NATIVE.openExternal) NATIVE.openExternal(String(url));
        else if (global.open) global.open(String(url), '_blank');
      } catch (e) { /* ignore */ }
      return Promise.resolve();
    },
    openPath: function () { return Promise.resolve(''); },
    showItemInFolder: function () {},
    beep: function () {}
  };

  var dialogStub = {
    showMessageBox: function () { return Promise.resolve({ response: 1, checkboxChecked: false }); },
    showMessageBoxSync: function () { return 1; },
    showErrorBox: function (title, content) {
      try {
        if (NATIVE && NATIVE.toast) NATIVE.toast(String(title || '') + (content ? ' — ' + content : ''));
      } catch (e) { /* ignore */ }
    },
    showSaveDialog: function () { return Promise.resolve({ canceled: true }); },
    showOpenDialog: function () { return Promise.resolve({ canceled: true, filePaths: [] }); }
  };

  var powerMonitorStub = {
    on: function () { return powerMonitorStub; },
    once: function () { return powerMonitorStub; },
    off: function () { return powerMonitorStub; },
    getSystemIdleState: function () { return 'active'; },
    getSystemIdleTime: function () { return 0; }
  };

  function NotificationStub(opts) { this.opts = opts || {}; }
  NotificationStub.isSupported = function () { return true; };
  NotificationStub.prototype.show = function () {
    try {
      var title = this.opts.title || 'CPE Trade Pro';
      var body = this.opts.body || '';
      if (NATIVE && NATIVE.notifyUser) NATIVE.notifyUser(String(title), String(body));
    } catch (e) { /* ignore */ }
  };
  NotificationStub.prototype.close = function () {};

  var ipcMainStub = {
    handle: function (channel, fn) { if (typeof fn === 'function') handlers[channel] = fn; },
    handleOnce: function (channel, fn) { if (typeof fn === 'function') handlers[channel] = fn; },
    removeHandler: function (channel) { delete handlers[channel]; },
    on: function (channel, fn) { if (typeof fn === 'function') listen(channel, fn); return ipcMainStub; },
    once: function () { return ipcMainStub; },
    removeAllListeners: function () { return ipcMainStub; }
  };

  global.__cpeDefine('electron', function (module) {
    module.exports = {
      app: appStub,
      BrowserWindow: BrowserWindowStub,
      ipcMain: ipcMainStub,
      Notification: NotificationStub,
      shell: shellStub,
      dialog: dialogStub,
      powerMonitor: powerMonitorStub,
      clipboard: { writeText: function () {}, readText: function () { return ''; } },
      nativeImage: {
        createFromPath: function () { return {}; },
        createFromDataURL: function () { return {}; }
      },
      screen: {
        getPrimaryDisplay: function () { return { workAreaSize: { width: 420, height: 860 }, scaleFactor: 1 }; }
      },
      Menu: { setApplicationMenu: function () {}, buildFromTemplate: function () { return {}; } },
      globalShortcut: { register: function () { return true; }, unregisterAll: function () {} },
      ipcRenderer: {
        invoke: function (channel) { return call.apply(null, arguments); },
        send: function (channel, data) { emit(channel, data); },
        on: function () {}
      }
    };
  });

  /* ========================================================= child_process */

  function makeChild() {
    var subs = {};
    var child = {
      pid: 0,
      killed: false,
      stdout: { on: function () { return this; }, setEncoding: function () { return this; } },
      stderr: { on: function () { return this; }, setEncoding: function () { return this; } },
      stdin: { write: function () {}, end: function () {} },
      on: function (ev, fn) {
        (subs[ev] = subs[ev] || []).push(fn);
        if (ev === 'error') {
          setTimeout(function () { try { fn(new Error('Not supported on Android')); } catch (e) { /* ignore */ } }, 0);
        }
        return child;
      },
      once: function (ev, fn) { return child.on(ev, fn); },
      addListener: function (ev, fn) { return child.on(ev, fn); },
      removeAllListeners: function () { subs = {}; return child; },
      kill: function () { return false; }
    };
    return child;
  }

  function execFileStub(file, args, opts, cb) {
    if (typeof args === 'function') { cb = args; }
    else if (typeof opts === 'function') { cb = opts; }
    var err = new Error('child_process is not available on Android (' + file + ')');
    if (typeof cb === 'function') setTimeout(function () { cb(err, '', ''); }, 0);
    return makeChild();
  }

  global.__cpeDefine('child_process', function (module) {
    module.exports = {
      execFile: execFileStub,
      exec: execFileStub,
      fork: function () { return makeChild(); },
      spawn: function () { return makeChild(); },
      execFileSync: function () { throw new Error('Not supported on Android'); },
      spawnSync: function () {
        return { status: 1, error: new Error('Not supported on Android'), stdout: '', stderr: '' };
      }
    };
  });

  /* ======================================================== boot the engine */

  try {
    CPERequire('main');
  } catch (e) {
    console.error('[CPE] engine boot failed', e);
    try { if (NATIVE && NATIVE.toast) NATIVE.toast('Engine failed to start: ' + (e && e.message)); } catch (x) { /* ignore */ }
  }

  // Desktop saves the chart through a file-picker dialog; on Android we hand
  // the PNG to the system share sheet instead. Registered after boot so it
  // replaces the bundled desktop handler.
  handlers['chart:saveImage'] = function (_e, payload) {
    return new Promise(function (resolve) {
      var dataUrl = String((payload && payload.dataUrl) || '');
      var m = /^data:image\/png;base64,(.+)$/.exec(dataUrl);
      if (!m) { resolve({ ok: false, message: 'Invalid image data' }); return; }
      var name = String((payload && payload.name) || 'cpe-chart.png').replace(/[^\w.\-]+/g, '_');
      try {
        if (NATIVE && NATIVE.saveBase64File) {
          NATIVE.saveBase64File(name, m[1]);
          resolve({ ok: true, shared: true });
        } else {
          resolve({ ok: false, message: 'Saving not available' });
        }
      } catch (err) { resolve({ ok: false, message: (err && err.message) || String(err) }); }
    });
  };

  /* ================================================================= window.cpe */

  var cpe = {
    /* ---- licence ---- */
    licenseStatus: function () { return call('license:status'); },
    machineId: function () { return call('license:machineId'); },
    guardStatus: function () { return call('guard:status'); },
    activateLicense: function (key) { return call('license:activate', key); },
    startTrial: function () { return call('license:startTrial'); },
    licensePrice: function (currency) { return call('license:price', currency); },
    owner: function () { return call('license:owner'); },
    verifyOwnerPassword: function (ownerPassword) { return call('license:verifyOwner', ownerPassword); },
    licenseSecurityAlerts: function (ownerPassword) { return call('license:securityAlerts', ownerPassword); },
    generateLicenseForMachine: function (machineId, ownerPassword, plan, days) {
      return call('license:generateForMachine', { machineId: machineId, ownerPassword: ownerPassword, plan: plan, days: days });
    },

    /* ---- exchange keys ---- */
    keysStatus: function (platform) { return call('keys:status', platform); },
    saveKeys: function (payload) { return call('keys:save', payload); },
    clearKeys: function (platform) { return call('keys:clear', platform); },
    testKeys: function (platform) { return call('keys:test', platform); },
    publicIp: function () { return call('net:publicIp'); },

    /* ---- MetaTrader: desktop-only, but keep the same call shapes ---- */
    mt5BridgeStatus: function () { return call('mt5:bridge:status'); },
    mt5BridgeStart: function () { return call('mt5:bridge:start'); },
    mt5BridgeStop: function () { return call('mt5:bridge:stop'); },
    mt5SetupStatus: function () { return call('mt5:setup:status'); },
    mt5SetupInstallPackage: function () { return call('mt5:setup:installPackage'); },
    mt5SetupInstallEa: function () { return call('mt5:setup:installEa'); },
    mt5SetupInstallPython: function () { return call('mt5:setup:installPython'); },
    mt5SetupGetTerminal: function () { return call('mt5:setup:getTerminal'); },
    mt5SetupAutoProvision: function () { return call('mt5:setup:autoProvision'); },
    mt4BridgeStart: function () { return call('mt4:bridge:start'); },
    mt4SetupStatus: function () { return call('mt4:setup:status'); },
    mt4SetupInstallEa: function () { return call('mt4:setup:installEa'); },
    mt4SetupInstallPython: function () { return call('mt4:setup:installPython'); },
    mt4SetupGetTerminal: function () { return call('mt4:setup:getTerminal'); },
    mt4SetupAutoProvision: function () { return call('mt4:setup:autoProvision'); },

    /* ---- market data ---- */
    platforms: function () { return call('platforms:list'); },
    pairs: function (market) { return call('market:pairs', market); },
    tickers: function (market) { return call('market:tickers', market); },
    price: function (opts) { return call('market:price', opts); },
    analyze: function (opts) { return call('market:analyze', opts); },
    scan: function (opts) { return call('market:scan', opts); },
    scanMultiTf: function (opts) { return call('market:scanMultiTf', opts); },
    scanScalp: function (opts) { return call('market:scanScalp', opts); },
    candleEta: function (interval) { return call('market:candleEta', interval); },

    /* ---- trades ---- */
    manualTrade: function (payload) { return call('trade:manual', payload); },
    account: function (market, platform) { return call('trade:account', market, platform); },
    tradesList: function () { return call('trades:list'); },
    clearBrokenTrades: function () { return call('trades:clear-broken'); },
    addPaperTrade: function (trade) { return call('trades:add-paper', trade); },
    closeTrade: function (opts) { return call('trades:close', opts); },
    updateTrade: function (opts) { return call('trades:update', opts); },
    cancelAuto: function (opts) { return call('trades:cancel-auto', opts); },
    closePaper: function (symbol) { return call('trades:close-paper', symbol); },
    pendingOrders: function (opts) { return call('orders:pending', opts); },
    cancelOrder: function (opts) { return call('orders:cancel', opts); },
    forgetTrade: function (opts) { return call('trades:forget', opts); },
    syncTrades: function (opts) { return call('trades:sync', opts); },
    journalList: function () { return call('journal:list'); },

    /* ---- signal lab ---- */
    signalLabList: function () { return call('signallab:list'); },
    signalLabOne: function (id) { return call('signallab:one', id); },
    signalLabLive: function (id) { return call('signallab:liveChart', id); },

    /* ---- watchlist ---- */
    watchList: function () { return call('watch:list'); },
    watchSet: function (list) { return call('watch:set', list); },
    watchAdd: function (item) { return call('watch:add', item); },
    watchToggle: function (item) { return call('watch:toggle', item); },

    /* ---- auto trade / scanner ---- */
    getAuto: function () { return call('auto:get'); },
    setAuto: function (cfg) { return call('auto:set', cfg); },
    setAutoSessions: function (list) { return call('auto:sessions:set', list); },
    startScan: function (ms) { return call('scan:start', ms); },
    stopScan: function () { return call('scan:stop'); },

    /* ---- app / shell ---- */
    openExternal: function (url) { return call('shell:open', url); },
    saveChartImage: function (payload) { return call('chart:saveImage', payload); },
    appInfo: function () { return call('app:info'); },
    settingsGet: function () { return call('settings:get'); },
    settingsSet: function (patch) { return call('settings:set', patch); },
    createShortcuts: function () { return call('app:createShortcuts'); },
    newsBundle: function () { return call('news:bundle'); },

    /* ---- live help chat ---- */
    chatList: function () { return call('chat:list'); },
    chatSend: function (text, toOwner) { return call('chat:send', { text: text, toOwner: toOwner }); },
    chatClear: function () { return call('chat:clear'); },
    chatWhatsApp: function (note) { return call('chat:whatsapp', note); },

    /* ---- owner / referral ---- */
    publicConfig: function () { return call('owner:public'); },
    ownerGetStore: function (ownerPassword) { return call('owner:getStore', ownerPassword); },
    ownerSaveStore: function (ownerPassword, store) {
      return call('owner:saveStore', { ownerPassword: ownerPassword, store: store });
    },
    ownerActivity: function (ownerPassword) { return call('owner:activity', ownerPassword); },
    referralStatus: function () { return call('referral:status'); },
    referralApply: function (code, humanConfirm) {
      return call('referral:apply', { code: code, humanConfirm: humanConfirm });
    },
    referralRedeem: function (proof) { return call('referral:redeem', proof); },
    referralIssueProof: function (eventType) { return call('referral:issueProof', eventType); },
    referralAdmin: function (ownerPassword) { return call('referral:admin', ownerPassword); },
    referralAdminImport: function (ownerPassword, proof) {
      return call('referral:adminImport', { ownerPassword: ownerPassword, proof: proof });
    },
    referralOwnerIssueClaim: function (ownerPassword, claim, customerMachineId) {
      return call('referral:ownerIssueClaim', {
        ownerPassword: ownerPassword,
        claim: claim,
        customerMachineId: customerMachineId
      });
    },

    /* ---- push events (main -> renderer) ---- */
    onNetRecheck: function (cb) { listen('net:recheck', function () { cb(); }); },
    onNotification: function (cb) { listen('notification', cb); },
    onScanTick: function (cb) { listen('scan:tick', function () { cb(); }); },
    onAutoTrade: function (cb) { listen('auto-trade', cb); },
    onScanProgress: function (cb) { listen('scan:progress', cb); },
    onTradesUpdate: function (cb) { listen('trades:update', cb); },
    onTpHint: function (cb) { listen('tp:hint', cb); },
    onAutoDiagnostic: function (cb) { listen('auto:diagnostic', cb); },
    onAccessExpired: function (cb) { listen('access:expired', cb); },
    onAccessTrial: function (cb) { listen('access:trial', cb); },
    onAccessGrace: function (cb) { listen('access:grace', cb); },
    onLicenseWarning: function (cb) { listen('license:warning', cb); },
    onSignalLab: function (cb) { listen('signallab:update', function () { cb(); }); },
    onMt5SetupProgress: function (cb) { listen('mt5:setup:progress', cb); },
    onMt4SetupProgress: function (cb) { listen('mt4:setup:progress', cb); },

    /* ---- platform helpers ---- */
    platform: 'android'
  };

  global.cpe = cpe;
  global.__cpeShim = { call: call, emit: emit, handlers: handlers, listeners: listeners };

  // Let the native side know the bridge is live (MainActivity calls this after
  // the page finishes loading so it can hide the splash screen).
  global.__cpeNativeReady = function () {
    try { emit('native:ready'); } catch (e) { /* ignore */ }
  };

  /* ----------------------------------------------- phone drawer navigation */

  // The desktop sidebar is permanently visible; on a phone it becomes a
  // slide-in drawer opened from a hamburger in the topbar.
  function setupPhoneNav() {
    var appEl = document.getElementById('app');
    if (!appEl || document.getElementById('cpe-menu-btn')) return;
    var sidebar = appEl.querySelector('.sidebar');
    var topbar = appEl.querySelector('.topbar');
    if (!sidebar || !topbar) return;

    var btn = document.createElement('button');
    btn.id = 'cpe-menu-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '&#9776;';
    topbar.insertBefore(btn, topbar.firstChild);

    var scrim = document.createElement('div');
    scrim.id = 'cpe-drawer-scrim';
    document.body.appendChild(scrim);

    function open() { sidebar.classList.add('open'); scrim.classList.add('show'); }
    function close() { sidebar.classList.remove('open'); scrim.classList.remove('show'); }

    btn.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) close(); else open();
    });
    scrim.addEventListener('click', close);
    sidebar.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.closest && t.closest('.nav-btn')) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  setupPhoneNav();

  console.log('[CPE] Android engine ready');
})(typeof window !== 'undefined' ? window : this);
