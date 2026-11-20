/**
 * Full UI language packs — merges over D.en so every menu/button/help string
 * follows the selected language (not only English / Sinhala).
 * Learning Class deep lesson text: EN + SI in learningData.js; other langs use EN lessons with localized chrome.
 */
(function () {
  if (!window.CPE_I18N?.dict?.en) return;
  const D = window.CPE_I18N.dict;
  const en = D.en;
  const M = (o) => Object.assign({}, en, o);

  const helpBlock = (title, a1, a2, a3, a4, a5) => `
    <h3>${title}</h3>
    <article><h4>1) ${a1.h}</h4><p>${a1.p}</p></article>
    <article><h4>2) ${a2.h}</h4><ul>${a2.lis.map((x) => `<li>${x}</li>`).join('')}</ul></article>
    <article><h4>3) ${a3.h}</h4><ul>${a3.lis.map((x) => `<li>${x}</li>`).join('')}</ul></article>
    <article><h4>4) ${a4.h}</h4><ul>${a4.lis.map((x) => `<li>${x}</li>`).join('')}</ul></article>
    <article><h4>5) ${a5.h}</h4><p>${a5.p}</p></article>
  `;

  const agreeBlock = (parts) => `
    <h4>1. ${parts.a1h}</h4><p>${parts.a1p}</p>
    <h4>2. ${parts.a2h}</h4><ul>
      <li><strong>${parts.trial}</strong></li>
      <li><strong>${parts.m3}</strong></li>
      <li><strong>${parts.life}</strong></li>
      <li>${parts.local}</li>
      <li>${parts.onekey}</li>
    </ul>
    <h4>3. ${parts.a3h}</h4><p>${parts.a3p}</p>
    <h4>4. ${parts.a4h}</h4><p>${parts.a4p}</p>
    <h4>5. ${parts.a5h}</h4><p>${parts.a5p}</p>
    <h4>6. ${parts.a6h}</h4><p>${parts.a6p}</p>
  `;

  const apiGuide = (t) => `
    <h4>${t.steps}</h4>
    <ol>
      <li>${t.s1}</li><li>${t.s2}</li><li>${t.s3}</li><li>${t.s4}</li>
      <li>${t.s5}</li><li>${t.s6}</li><li>${t.s7}</li><li>${t.s8}</li>
    </ol>
    <h4>${t.perm}</h4>
    <ul>
      <li>${t.p1}</li><li>${t.p2}</li><li>${t.p3}</li>
      <li><strong>${t.p4}</strong></li><li>${t.p5}</li>
    </ul>
    <h4>${t.not}</h4>
    <ul><li>${t.n1}</li><li>${t.n2}</li></ul>
    <h4>${t.after}</h4>
    <ul><li>${t.a1}</li><li>${t.a2}</li></ul>
    <p class="tiny">${t.tip}</p>
  `;

  /* ========== SINHALA (complete remaining) ========== */
  D.si = M({
    ...D.si,
    copy: 'Copy කරන්න',
    license_key: 'License Key',
    nav_spot: 'Spot Desk',
    nav_futures: 'Futures Desk',
    nav_chartlab: 'Chart Lab',
    nav_trade: 'Trade Now',
    nav_positions: 'Positions / TP',
    nav_livehelp: 'Live Help',
    nav_news: 'News & Tricks',
    nav_learn: 'Learning Class',
    nav_journal: 'Trade Journal',
    nav_keys: 'API Keys',
    nav_license: 'License',
    nav_owner: 'Owner Tools',
    chartlab_title: 'Chart Lab',
    livehelp_title: 'Live Help',
    news_title: 'News & Tricks',
    learn_sub: 'Candles · BB · RSI · Fib · මුදල් · psychology · platforms · Forex',
    learn_modules_h: 'Deep modules — BB · RSI · Fib · Money · Psychology',
    learn_plat_h: 'Platform පන්තිය',
    practice_title: 'Demo Practice vs Live',
    demo_strip_title: 'DEMO PRACTICE',
    live_strip_title: 'LIVE MODE',
    demo_trade_btn: 'Demo Trade පටන් ගන්න',
    demo_trade_ok: 'Demo practice',
    demo_on_title: 'DEMO mode ON',
    live_on_title: 'LIVE mode ON',
    candle_stick_pattern: 'Candle stick pattern',
    tour_skip: 'Skip',
    welcome_eyebrow: 'Crypto Profit Eye',
    welcome_title: 'Trade Pro වෙත සාදරයෙන් පිළිගනිමු',
    notif_on: 'Notifications: ON',
    notif_off: 'Notifications: OFF',
    make_shortcuts: 'Desktop / Start shortcuts',
    plan_life: 'Lifetime',
    tour_1_title: 'Chart Lab',
    tour_2_title: 'Spot Desk',
    tour_3_title: 'Futures Desk',
    tour_4_title: 'Forex Desk',
    tour_5_title: 'Trade Now',
    tour_7_title: 'Live Help',
    tour_8_title: 'News & Tricks',
    tour_9_title: 'Learning Class',
    tour_11_title: 'API Keys',
    tour_12_title: 'Help',
    scan: 'වෙළඳපොළ Scan කරන්න',
    auto_scan_on: 'Auto Scan ON',
    auto_scan_off: 'Auto Scan OFF',
    scanning: 'Scan වෙමින්...',
    spot_title: 'Spot Desk',
    spot_sub: 'Bollinger · Fibonacci · Candles · MACD · Momentum · Psychology',
    fut_title: 'Futures Desk',
    forex_title: 'Forex Desk',
    forex_sub: 'Live FX rates · BUY/SELL rating · paper ready',
    trade_title: 'Trade Now',
    pos_title: 'Positions / TP',
    pos_sub: 'විවෘත trades live monitor',
    journal_title: 'Trade Journal',
    keys_title: 'API Keys',
    help_title: 'Help',
    license_title: 'License',
    license_sub: 'Machine-locked activation',
    owner_title: 'Owner Tools',
    pairs: 'USDT Pairs',
    buy: 'BUY',
    sell: 'SELL',
    bb_lower: 'BB Lower',
    signals: 'Signals',
    bb_candidates: 'Bollinger Lower Band Buy Candidates',
    watchlist: 'Watchlist',
    perp_pairs: 'Perp pairs',
    fut_signals: 'Futures Signals',
    fut_chart: 'Futures Chart + Psychology',
    fut_bb: 'Futures Bollinger Lower Buys',
    manual_trade: 'Manual Trade',
    place_live: 'Live Trade පටන් ගන්න',
    paper: 'Demo / Paper Trade පටන් ගන්න',
    auto_trade: 'Auto Trade',
    auto_buy: 'Auto BUY (BB Lower + ශක්තිමත් score)',
    auto_tp: 'Auto Take-Profit / Close monitor',
    open_autos: 'Open Auto Trades',
    positions_h: 'Open Positions — TP/SL Live Monitor',
    api_h: 'Binance API Key',
    clear: 'Clear',
    license_inactive: 'Inactive',
    owner_h: 'Owner License Generator',
    owner_pass: 'Owner Password',
    customer_mid: 'Customer Machine ID',
    psych: 'Psychological / Mental method',
    fib: 'Fibonacci',
    scan_done: 'Scan සම්පූර්ණයි',
    scan_err: 'Scan error',
    keys_test_ok: 'API test OK',
    keys_saved_paper: 'Saved (paper / bridge only)',
    order_err: 'Order error',
    closed: 'Closed',
    candle_close: 'close'
  });

  /* ========== Shared short UI factory for Romance / Germanic / etc. ========== */
  function ui(L) {
    return {
      copy: L.copy, license_key: L.license_key, activate: L.activate, license_rule: L.license_rule,
      gate_sub: L.gate_sub, machine_hint: L.machine_hint,
      nav_spot: L.nav_spot, nav_futures: L.nav_futures, nav_chartlab: L.nav_chartlab, nav_trade: L.nav_trade,
      nav_positions: L.nav_positions, nav_livehelp: L.nav_livehelp, nav_news: L.nav_news, nav_learn: L.nav_learn,
      nav_journal: L.nav_journal, nav_keys: L.nav_keys, nav_help: L.nav_help, nav_license: L.nav_license, nav_owner: L.nav_owner,
      chartlab_title: L.chartlab_title, chartlab_sub: L.chartlab_sub,
      livehelp_title: L.livehelp_title, livehelp_sub: L.livehelp_sub,
      news_title: L.news_title, news_sub: L.news_sub, news_refresh: L.news_refresh, news_loading: L.news_loading,
      news_empty: L.news_empty, news_open: L.news_open,
      learn_title: L.learn_title, learn_sub: L.learn_sub, learn_eyebrow: L.learn_eyebrow,
      learn_candles: L.learn_candles, learn_candles_hint: L.learn_candles_hint,
      learn_charts: L.learn_charts, learn_charts_hint: L.learn_charts_hint,
      learn_modules_h: L.learn_modules_h, learn_plat_h: L.learn_plat_h,
      practice_title: L.practice_title, practice_body: L.practice_body,
      api_notice_title: L.api_notice_title, api_notice_body: L.api_notice_body,
      live_need_api_title: L.live_need_api_title, live_need_api_body: L.live_need_api_body,
      demo_strip_title: L.demo_strip_title, demo_strip_body: L.demo_strip_body,
      live_strip_title: L.live_strip_title, live_strip_body: L.live_strip_body,
      demo_goto_keys: L.demo_goto_keys, demo_trade_btn: L.demo_trade_btn, demo_trade_ok: L.demo_trade_ok,
      demo_on_title: L.demo_on_title, demo_on_body: L.demo_on_body,
      live_on_title: L.live_on_title, live_on_body: L.live_on_body,
      demo_need_key_title: L.demo_need_key_title, demo_need_key_body: L.demo_need_key_body,
      demo_api_remind_title: L.demo_api_remind_title, demo_api_remind_body: L.demo_api_remind_body,
      demo_chart_tag: L.demo_chart_tag, live_chart_tag: L.live_chart_tag,
      candle_stick_pattern: L.candle_stick_pattern, candle_no_pattern: L.candle_no_pattern, candle_no_pattern_note: L.candle_no_pattern_note,
      tour_skip: L.tour_skip, tour_next: L.tour_next, tour_finish: L.tour_finish,
      welcome_eyebrow: L.welcome_eyebrow, welcome_title: L.welcome_title, welcome_tag: L.welcome_tag,
      agree_h: L.agree_h, agree_check: L.agree_check, agree_continue: L.agree_continue,
      welcome_foot: L.welcome_foot, agree_need: L.agree_need, agree_html: L.agree_html,
      trial_blurb: L.trial_blurb, lang_first: L.lang_first,
      notif_on: L.notif_on, notif_off: L.notif_off, notif_on_hint: L.notif_on_hint,
      make_shortcuts: L.make_shortcuts, shortcuts_ok: L.shortcuts_ok, shortcuts_fail: L.shortcuts_fail,
      buy_title: L.buy_title, buy_choose_plan: L.buy_choose_plan,
      plan_m3: L.plan_m3, plan_m3_note: L.plan_m3_note, plan_life: L.plan_life, plan_life_note: L.plan_life_note,
      your_currency: L.your_currency, pay_how: L.pay_how, buy_send_proof: L.buy_send_proof, lic_pay_h: L.lic_pay_h,
      license_ended: L.license_ended, license_warn_title: L.license_warn_title,
      warn_d14: L.warn_d14, warn_d7: L.warn_d7, warn_d3: L.warn_d3, warn_d1: L.warn_d1, warn_grace: L.warn_grace,
      tour_lang_title: L.tour_lang_title, tour_lang_body: L.tour_lang_body,
      tour_1_title: L.tour_1_title, tour_1_body: L.tour_1_body, tour_2_title: L.tour_2_title, tour_2_body: L.tour_2_body,
      tour_3_title: L.tour_3_title, tour_3_body: L.tour_3_body, tour_4_title: L.tour_4_title, tour_4_body: L.tour_4_body,
      tour_5_title: L.tour_5_title, tour_5_body: L.tour_5_body, tour_6_title: L.tour_6_title, tour_6_body: L.tour_6_body,
      tour_7_title: L.tour_7_title, tour_7_body: L.tour_7_body, tour_8_title: L.tour_8_title, tour_8_body: L.tour_8_body,
      tour_9_title: L.tour_9_title, tour_9_body: L.tour_9_body, tour_10_title: L.tour_10_title, tour_10_body: L.tour_10_body,
      tour_11_title: L.tour_11_title, tour_11_body: L.tour_11_body, tour_12_title: L.tour_12_title, tour_12_body: L.tour_12_body,
      tour_13_title: L.tour_13_title, tour_13_body: L.tour_13_body,
      language: L.language, scan: L.scan, auto_scan_on: L.auto_scan_on, auto_scan_off: L.auto_scan_off, scanning: L.scanning,
      spot_title: L.spot_title, spot_sub: L.spot_sub, fut_title: L.fut_title, fut_sub: L.fut_sub,
      forex_title: L.forex_title, forex_sub: L.forex_sub, trade_title: L.trade_title, trade_sub: L.trade_sub,
      pos_title: L.pos_title, pos_sub: L.pos_sub, journal_title: L.journal_title, journal_sub: L.journal_sub,
      keys_title: L.keys_title, keys_sub: L.keys_sub, help_title: L.help_title, help_sub: L.help_sub,
      help_plat_h: L.help_plat_h, help_plat_sel: L.help_plat_sel,
      license_title: L.license_title, license_sub: L.license_sub, owner_title: L.owner_title, owner_sub: L.owner_sub,
      pairs: L.pairs, buy: L.buy, sell: L.sell, bb_lower: L.bb_lower, new_watch: L.new_watch, signals: L.signals,
      search_ph: L.search_ph, chart_why: L.chart_why, click_row: L.click_row, bb_candidates: L.bb_candidates,
      new_pairs: L.new_pairs, watchlist: L.watchlist, perp_pairs: L.perp_pairs, fut_signals: L.fut_signals,
      fut_chart: L.fut_chart, fut_bb: L.fut_bb, manual_trade: L.manual_trade, place_live: L.place_live, paper: L.paper,
      trade_warn: L.trade_warn, auto_trade: L.auto_trade, auto_buy: L.auto_buy, auto_tp: L.auto_tp,
      save_auto: L.save_auto, open_autos: L.open_autos, positions_h: L.positions_h, positions_p: L.positions_p,
      journal_h: L.journal_h, api_h: L.api_h, keys_none: L.keys_none, save_keys: L.save_keys, clear: L.clear,
      test_account: L.test_account, license_active: L.license_active, license_inactive: L.license_inactive,
      owner_h: L.owner_h, owner_p: L.owner_p, owner_pass: L.owner_pass, customer_mid: L.customer_mid, gen_key: L.gen_key,
      why: L.why, psych: L.psych, fib: L.fib, no_bb: L.no_bb, no_new: L.no_new, watch_hint: L.watch_hint,
      no_auto: L.no_auto, no_pos: L.no_pos, no_journal: L.no_journal, scan_done: L.scan_done, scan_err: L.scan_err,
      copied_mid: L.copied_mid, activate_fail: L.activate_fail, keys_need_both: L.keys_need_both, keys_saved: L.keys_saved,
      keys_test_ok: L.keys_test_ok, keys_test_fail: L.keys_test_fail, keys_live_ready: L.keys_live_ready,
      keys_saved_paper: L.keys_saved_paper, keys_incomplete: L.keys_incomplete, order_err: L.order_err,
      paper_added: L.paper_added, auto_saved: L.auto_saved, watch_added: L.watch_added, closed: L.closed, candle_close: L.candle_close,
      api_guide_title: L.api_guide_title, api_guide_html: L.api_guide_html,
      demo_expired_title: L.demo_expired_title, demo_expired_body: L.demo_expired_body, demo_days_left: L.demo_days_left,
      lang_synced_title: L.lang_synced_title, lang_synced_body: L.lang_synced_body, help_html: L.help_html
    };
  }

  // Common English product terms kept where traders know them (BUY/SELL/Spot…)
  function baseWestern(x) {
    return {
      buy: 'BUY', sell: 'SELL', pairs: 'USDT Pairs', bb_lower: 'BB Lower', fib: 'Fibonacci',
      welcome_eyebrow: 'Crypto Profit Eye', candle_close: 'close',
      ...x
    };
  }

  /* ---- SPANISH ---- */
  D.es = M(ui(baseWestern({
    gate_sub: 'Binance Spot y Futures · Mesa de señales · Licencia por PC',
    machine_hint: 'Su Machine ID (envíelo por WhatsApp para obtener la licencia)',
    copy: 'Copiar', license_key: 'Clave de licencia', activate: 'Activar software',
    license_rule: 'Una licencia = un ordenador. Nuevo PC = nueva licencia del propietario.',
    nav_spot: 'Mesa Spot', nav_futures: 'Mesa Futures', nav_chartlab: 'Chart Lab', nav_trade: 'Operar ahora',
    nav_positions: 'Posiciones / TP', nav_livehelp: 'Ayuda en vivo', nav_news: 'Noticias y trucos',
    nav_learn: 'Clase de aprendizaje', nav_journal: 'Diario', nav_keys: 'Claves API', nav_help: 'Ayuda',
    nav_license: 'Licencia', nav_owner: 'Herramientas dueño',
    chartlab_title: 'Chart Lab', chartlab_sub: 'Crypto + Forex · velas · patrones · análisis',
    livehelp_title: 'Ayuda en vivo', livehelp_sub: 'Chat con el dueño · Prueba y licencia',
    news_title: 'Noticias y trucos', news_sub: 'Titulares crypto · tips forex · trucos API',
    news_refresh: 'Actualizar noticias', news_loading: 'Cargando noticias…', news_empty: 'Sin elementos — pulse Actualizar.', news_open: 'Abrir fuente',
    learn_title: 'Clase de aprendizaje', learn_sub: 'Velas · BB · RSI · Fib · dinero · psicología · plataformas · Forex',
    learn_eyebrow: 'Imágenes de velas · gráficos · BB · RSI · Fib · dinero · psicología',
    learn_candles: 'Patrones de velas — imagen + significado + qué más enseña',
    learn_candles_hint: 'Cada tarjeta: dibujo · sesgo · lectura · enlace BB/RSI/Fib/riesgo/psicología.',
    learn_charts: 'Patrones de gráfico — imagen + significado',
    learn_charts_hint: 'Estructura mayor alrededor de las velas. Practique en Chart Lab (DEMO).',
    learn_modules_h: 'Módulos profundos — BB · RSI · Fib · Dinero · Psicología', learn_plat_h: 'Clase por plataforma',
    practice_title: 'Práctica DEMO vs LIVE', practice_body: 'Use DEMO arriba primero: gráficos, patrones, scan, Trade Now, TP/SL — sin dinero real. LIVE necesita la API correcta (Withdrawals OFF).',
    api_notice_title: 'Añada su clave API', api_notice_body: 'Los gráficos funcionan sin clave. Para LIVE, guarde la clave de SU plataforma. Withdrawals OFF.',
    live_need_api_title: 'Se requiere API para LIVE', live_need_api_body: 'Quédese en DEMO para practicar. LIVE necesita la clave guardada.',
    demo_strip_title: 'PRÁCTICA DEMO', demo_strip_body: 'Gráficos · velas · patrones · scan · paper — sin dinero real. Añada API antes de LIVE.',
    live_strip_title: 'MODO LIVE', live_strip_body: 'Órdenes reales con su API. Withdrawals OFF. Vuelva a DEMO cuando quiera.',
    demo_goto_keys: 'Añadir API', demo_trade_btn: 'Iniciar trade demo', demo_trade_ok: 'Práctica demo',
    demo_on_title: 'DEMO activado', demo_on_body: 'Practique con gráficos y paper. Sin dinero real.',
    live_on_title: 'LIVE activado', live_on_body: 'Trading real con su API guardada.',
    demo_need_key_title: 'API necesaria para LIVE', demo_need_key_body: 'Guarde la clave en API Keys, luego pase a LIVE.',
    demo_api_remind_title: 'Añada API para LIVE después', demo_api_remind_body: 'Está en DEMO. Antes de LIVE, guarde la clave correcta (Withdrawals OFF).',
    demo_chart_tag: 'DEMO · velas públicas · mismos herramientas', live_chart_tag: 'LIVE · mercado real · API para órdenes',
    candle_stick_pattern: 'Patrón de vela', candle_no_pattern: 'Sin patrón claro', candle_no_pattern_note: 'Sin patrón mayor — use BB / RSI / MACD.',
    tour_skip: 'Omitir', tour_next: 'Siguiente', tour_finish: 'Fin',
    welcome_title: 'Bienvenido a Trade Pro', welcome_tag: 'Mesa profesional Spot · Futures · Forex',
    agree_h: 'Acuerdo de usuario y licencia', agree_check: 'He leído y acepto este Acuerdo, incluida la licencia y que los resultados son mi responsabilidad.',
    agree_continue: 'Aceptar y continuar', welcome_foot: 'Debe ser mayor de 18. Esta pantalla aparece una vez.', agree_need: 'Marque la casilla para continuar.',
    agree_html: agreeBlock({
      a1h: 'Sobre CPE Trade Pro', a1p: 'CPE Trade Pro (Crypto Profit Eye) ayuda a estudiar mercados Spot, Futures y Forex. No es asesoramiento financiero ni promesa de ganancias.',
      a2h: 'Planes y precios', trial: 'Prueba gratis: 7 días en un PC (una vez).', m3: 'Licencia 3 meses: USD 15 para este Machine ID.',
      life: 'Licencia Lifetime: USD 100 — sin otra cuota de licencia en ese mismo PC.', local: 'La moneda local es orientativa; el pago sigue el plan USD e instrucciones del dueño.',
      onekey: 'Una clave = un Machine ID. Nuevo PC = nueva licencia.',
      a3h: 'Los mercados se mueven', a3p: 'Herramientas y señales son ayudas; usted decide. Mantenga Withdrawals OFF.',
      a4h: 'Responsabilidad', a4p: 'Usted responde por sus operaciones. El dueño no responde por resultados de trading ni fallos de exchange/API.',
      a5h: 'Soporte', a5p: 'WhatsApp: 0774940944 · Email: Anurasiri123@gmail.com · Anurasiri Wickramanayake',
      a6h: 'Aceptación', a6p: 'Al continuar acepta estos términos y los precios actuales.'
    }),
    trial_blurb: 'Una prueba por PC (7 días). Luego: 3 meses USD 15 o Lifetime USD 100. Elija idioma primero.',
    lang_first: '① Primero elija el idioma — tour y avisos lo usan.',
    notif_on: 'Notificaciones: ON', notif_off: 'Notificaciones: OFF', notif_on_hint: 'Alertas y sonidos activos hasta que las apague.',
    make_shortcuts: 'Accesos Desktop / Inicio', shortcuts_ok: 'Accesos creados', shortcuts_fail: 'Error al crear accesos',
    buy_title: 'Comprar clave', buy_choose_plan: 'Elija 3 meses (USD 15) o Lifetime (USD 100).',
    plan_m3: '3 meses', plan_m3_note: '~90 días · luego 3 días de gracia', plan_life: 'Lifetime', plan_life_note: 'Una vez · este PC para siempre',
    your_currency: 'Su moneda', pay_how: 'Cómo pagar', buy_send_proof: 'Envíe Machine ID + plan + comprobante por WhatsApp.',
    lic_pay_h: 'Pago de licencia', license_ended: 'Licencia / prueba terminada', license_warn_title: 'Aviso de licencia',
    warn_d14: 'Su licencia de 3 meses termina en ~{d} días. Renueve o compre Lifetime (USD 100).',
    warn_d7: 'Queda 1 semana ({d} días). Renueve o Lifetime USD 100.',
    warn_d3: 'Solo {d} días. Tras el vencimiento: 3 días de gracia — luego se cierran trades abiertos.',
    warn_d1: 'Último día. Tras vencimiento: 3 días de gracia. Lifetime = USD 100.',
    warn_grace: 'Gracia: {d} día(s). Cierre trades o active clave nueva.',
    tour_lang_title: 'Idioma y tema', tour_lang_body: 'Idioma del tour: {lang}. Cámbielo cuando quiera. Tras prueba: 3 meses USD 15 o Lifetime USD 100.',
    tour_1_title: 'Chart Lab', tour_1_body: 'Elija Spot, Futures o Forex → busque par → Analizar. Velas, patrones, RSI/MACD.',
    tour_2_title: 'Mesa Spot', tour_2_body: 'Escanee pares USDT. Clic en fila → gráfico + razones BB/Fib/MACD.',
    tour_3_title: 'Mesa Futures', tour_3_body: 'Señales USDT-M. BUY sube trail; SELL baja trail.',
    tour_4_title: 'Mesa Forex', tour_4_body: 'Pares FX con BUY/SELL/HOLD. Practique desde Trade Now.',
    tour_5_title: 'Operar ahora', tour_5_body: 'Manual + Auto. DEMO = práctica; LIVE necesita API.',
    tour_6_title: 'Posiciones / TP', tour_6_body: 'Edite TP, SL, trail. Cierre parcial 25–100%.',
    tour_7_title: 'Ayuda en vivo', tour_7_body: 'Chat con el dueño. WhatsApp envía Machine ID.',
    tour_8_title: 'Noticias y trucos', tour_8_body: 'Titulares crypto, tips forex y trucos API.',
    tour_9_title: 'Clase de aprendizaje', tour_9_body: 'Velas, módulos BB/RSI/Fib, plataformas y Forex A→Z.',
    tour_10_title: 'Diario', tour_10_body: 'Trades cerrados con PnL %.',
    tour_11_title: 'Claves API', tour_11_body: 'Elija SU plataforma. Withdrawals OFF.',
    tour_12_title: 'Ayuda', tour_12_body: 'Guía completa + pasos API por plataforma.',
    tour_13_title: 'Licencia y pago', tour_13_body: '3 meses USD 15 o Lifetime USD 100. Un PC = una clave.',
    language: 'Idioma', scan: 'Escanear mercado', auto_scan_on: 'Auto Scan ON', auto_scan_off: 'Auto Scan OFF', scanning: 'Escaneando...',
    spot_title: 'Mesa Spot', spot_sub: 'Bollinger · Fibonacci · Velas · MACD · Momentum · Psicología',
    fut_title: 'Mesa Futures', fut_sub: 'Perpetuos USDT-M · señales separadas',
    forex_title: 'Mesa Forex', forex_sub: 'Tipos FX en vivo · misma calificación BUY/SELL',
    trade_title: 'Operar ahora', trade_sub: 'Manual + Auto · DEMO · LIVE necesita API',
    pos_title: 'Posiciones / TP', pos_sub: 'Monitor de trades abiertos',
    journal_title: 'Diario de trades', journal_sub: 'Historórico PnL cerrados',
    keys_title: 'Claves API', keys_sub: 'La clave correcta de su plataforma',
    help_title: 'Ayuda', help_sub: 'Cómo usar CPE Trade Pro', help_plat_h: 'Conectar API (igual que Claves API)', help_plat_sel: 'Elegir plataforma',
    license_title: 'Licencia', license_sub: 'Activación por máquina', owner_title: 'Herramientas dueño', owner_sub: 'Generar claves de clientes',
    new_watch: 'Nuevos / Watch', signals: 'Señales', search_ph: 'Buscar par / BUY / SELL', chart_why: 'Gráfico + por qué', click_row: 'Clic en una fila',
    bb_candidates: 'Candidatos compra BB inferior', new_pairs: 'Pares nuevos', watchlist: 'Watchlist',
    perp_pairs: 'Pares perp', fut_signals: 'Señales Futures', fut_chart: 'Gráfico Futures + psicología', fut_bb: 'Compras BB Futures',
    manual_trade: 'Trade manual', place_live: 'Iniciar trade LIVE', paper: 'Iniciar Demo / Paper',
    trade_warn: 'DEMO = práctica. LIVE = API. Withdrawals OFF.',
    auto_trade: 'Auto Trade', auto_buy: 'Auto BUY (BB inferior + score fuerte)', auto_tp: 'Monitor Auto TP / cierre',
    save_auto: 'Guardar Auto', open_autos: 'Autos abiertos', positions_h: 'Posiciones abiertas — monitor TP/SL',
    positions_p: 'Precio cada 15s — alarmas TP1/TP2/SL', journal_h: 'Diario (ganancia / pérdida)',
    api_h: 'Clave API Binance', keys_none: 'Sin claves — necesarias para LIVE', save_keys: 'Guardar claves', clear: 'Borrar',
    test_account: 'Probar cuenta', license_active: 'Licencia ACTIVA — esta máquina', license_inactive: 'Inactiva',
    owner_h: 'Generador de licencia', owner_p: 'Solo dueño — Machine ID del cliente', owner_pass: 'Contraseña dueño',
    customer_mid: 'Machine ID del cliente', gen_key: 'Generar clave', why: 'Por qué esta señal', psych: 'Método psicológico',
    no_bb: 'Sin candidatos BB en este scan', no_new: 'Nuevos listados tras el 2º scan', watch_hint: '★ Añadir a watchlist',
    no_auto: 'Sin autos abiertos', no_pos: 'Sin posiciones — use Manual / Paper / Auto', no_journal: 'Diario vacío',
    scan_done: 'Scan completo', scan_err: 'Error de scan', copied_mid: 'Machine ID copiado', activate_fail: 'Activación fallida',
    keys_need_both: 'Se requieren Key y Secret', keys_saved: 'Claves guardadas', keys_test_ok: 'API OK', keys_test_fail: 'API falló',
    keys_live_ready: 'LIVE listo (key+secret válidos)', keys_saved_paper: 'Guardado (solo paper/bridge)', keys_incomplete: 'Credenciales incompletas',
    order_err: 'Error de orden', paper_added: 'Añadido a posiciones', auto_saved: 'Auto guardado', watch_added: 'Añadido a watchlist', closed: 'Cerrado',
    api_guide_title: 'Cómo obtener API Key y Secret de Binance',
    api_guide_html: apiGuide({
      steps: 'Paso a paso', s1: 'Abra <strong>www.binance.com</strong> e inicie sesión.',
      s2: 'Perfil → <strong>API Management</strong>.', s3: 'Complete la verificación de seguridad.',
      s4: 'Pulse <strong>Create API</strong>.', s5: 'Elija clave <strong>System generated</strong>.',
      s6: 'Ponga una etiqueta, p. ej. CPE Trade Pro.', s7: 'Copie <strong>API Key</strong> y <strong>Secret</strong> (Secret solo una vez).',
      s8: 'Péguelos aquí y pulse <strong>Guardar claves</strong>.',
      perm: 'Permisos', p1: 'Enable Reading — obligatorio.', p2: 'Spot Trading si opera Spot.', p3: 'Futures si opera Futures.',
      p4: 'Withdrawals = OFF', p5: 'Opcional: restricción por IP.',
      not: 'No introduzca', n1: 'No ponga contraseña de Binance aquí.', n2: 'Solo API Key + Secret.',
      after: 'Después', a1: 'Pulse Probar cuenta.', a2: 'Luego use Manual / Auto Trade.', tip: 'Si falla, revise permisos, IP y el Secret.'
    }),
    demo_expired_title: 'DEMO terminado', demo_expired_body: 'Los 3 meses DEMO acabaron. Solo LIVE — guarde su API.',
    demo_days_left: 'Días DEMO restantes: {d}',
    lang_synced_title: 'Idioma actualizado', lang_synced_body: 'Menús, Ayuda, Clase y notificaciones usan este idioma.',
    help_html: helpBlock('CPE Trade Pro — Ayuda',
      { h: 'Conectar API', p: 'Abra <strong>Claves API</strong>, elija su plataforma, guarde Key + Secret (y Passphrase si aplica). Withdrawals OFF.' },
      { h: 'DEMO vs LIVE', lis: ['<strong>DEMO</strong> = práctica sin dinero real (3 meses en este PC).', 'Luego solo <strong>LIVE</strong>.', 'LIVE necesita la API correcta.'] },
      { h: 'Software', lis: ['<strong>Chart Lab</strong> — velas y patrones · zoom +/−', '<strong>Trade Now</strong> — Manual + Auto', 'Spot / Futures / Forex · Noticias · Clase · Ayuda · Posiciones'] },
      { h: 'Licencia', lis: ['Prueba 7 días · <strong>3 meses USD {m3}</strong> o <strong>Lifetime USD {life}</strong>', 'WhatsApp 0774940944'] },
      { h: 'Aviso', p: 'Herramienta de análisis. No es asesoramiento financiero.' })
  })));

  // Expose helpers for i18nPacksMore.js
  window.__CPE_I18N_HELPERS = { M, ui, baseWestern, helpBlock, agreeBlock, apiGuide, en };
})();
