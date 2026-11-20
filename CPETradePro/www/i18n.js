/** CPE Trade Pro — multi-language packs for worldwide sales */
window.CPE_I18N = {
  langs: [
    { code: 'en', label: 'English' },
    { code: 'si', label: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'zh', label: '中文' },
    { code: 'ar', label: 'العربية', rtl: true },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'id', label: 'Indonesia' },
    { code: 'th', label: 'ไทย' }
  ],

  dict: {}
};

const D = window.CPE_I18N.dict;

D.en = {
  gate_sub: 'Binance Spot & Futures · Full Signal Desk · Machine License',
  machine_hint: 'Your Machine ID (send this on WhatsApp to get a license)',
  copy: 'Copy',
  license_key: 'License Key',
  activate: 'Activate Software',
  license_rule: 'One license = one computer. New PC = buy a new license from the owner.',
  nav_spot: 'Spot Desk',
  nav_futures: 'Futures Desk',
  nav_chartlab: 'Chart Lab',
  nav_trade: 'Trade Now',
  nav_positions: 'Positions / TP',
  nav_livehelp: 'Live Help',
  nav_news: 'News & Tricks',
  nav_learn: 'Learning Class',
  nav_journal: 'Trade Journal',
  nav_signallab: 'Signal History',
  caution_toggle: 'Caution signals',
  caution_h: 'Caution signals',
  caution_warn: 'Lighter setups, about score 5. Not for auto. Trade the Strong signals.',
  caution_none: 'No caution signals in this scan.',
  grade_strong: 'STRONG',
  strong_none: 'No Strong signal in this scan. Caution signals are in the warning box when that switch is on.',
  signallab_title: 'Signal History',
  signallab_sub: 'Every software signal tracked as a $10 trade, with the chart from start and end',
  jr_real_h: 'Real trades — auto and manual',
  jr_real_p: 'These numbers are only trades you actually placed (auto or manual). Average profit, average loss, and the net balance.',
  jr_avg_profit: 'Average profit',
  jr_avg_loss: 'Average loss',
  jr_avg_profit_usd: 'Average profit USD',
  jr_balance: 'Net balance',
  sl_h: 'Every signal, traded as $10',
  sl_p: 'Each BUY or SELL the software gives is tracked as if $10 was placed. Click a row to see the chart from the start and from the end.',
  sl_balance: 'Closed balance',
  sl_equity: 'Balance + open',
  sl_open_h: 'Still open',
  sl_closed_h: 'Closed history',
  sl_chart_h: 'Live market chart',
  sl_click: 'Click a signal. The chart follows the live market. Start and end stay saved.',
  sl_chart_live: 'Live market',
  sl_chart_start: 'Chart at start',
  sl_chart_end: 'Chart at end',
  sl_none: 'None yet — scan the market. Each new BUY or SELL is added here.',
  sl_no_chart: 'No chart was saved for this signal.',
  nav_keys: 'API Keys',
  nav_help: 'Help',
  nav_license: 'License',
  nav_owner: 'Owner Tools',
  chartlab_title: 'Chart Lab',
  chartlab_sub: 'Crypto + Forex · candles · patterns · full analysis',
  livehelp_title: 'Live Help',
  livehelp_sub: 'Chat with owner desk · Trial & License',
  news_title: 'News & Tricks',
  news_sub: 'Live crypto headlines · forex tips · platform API tricks',
  news_refresh: 'Refresh news',
  news_loading: 'Loading news…',
  news_empty: 'No items right now — try Refresh.',
  news_open: 'Open source',
  news_updated: 'Updated',
  learn_title: 'Learning Class',
  learn_sub: 'Candles · BB · RSI · Fib · money · psychology · platforms · Forex',
  learn_eyebrow: 'Candle pics · Chart pics · BB · RSI · Fib · Money · Psych · Platforms',
  learn_candles: 'Candle patterns — picture + meaning + what else it teaches',
  learn_candles_hint: 'Each card: drawing · bias · how to read it · BB / RSI / Fib / risk / psychology link.',
  learn_charts: 'Chart patterns — picture + meaning + what else',
  learn_charts_hint: 'Bigger structure around candles. Practice on Chart Lab (DEMO).',
  learn_modules_h: 'Deep modules — BB · RSI · Fib · Money · Psych · Signals · Forex',
  learn_plat_h: 'Platform class',
  practice_title: 'Demo Practice vs Live',
  practice_body: 'Use top bar DEMO first: full candle charts, stick patterns, scan, TP/SL/trail, positions & journal — same desk as live, no real money. LIVE needs the correct platform API key (Withdrawals OFF). Notifications remind you to add the key while you practice.',
  api_notice_title: 'Add your platform API key',
  api_notice_body: 'Charts work without a key. For live trading, open API Keys and save the key for YOUR platform (Binance, Bybit, OANDA…). Any random key will not work — use that platform’s own key. Withdrawals OFF.',
  live_need_api_title: 'API key required for live trade',
  live_need_api_body: 'Stay in DEMO to practice. Live orders need the matching platform API key saved under API Keys.',
  demo_strip_title: 'DEMO PRACTICE',
  demo_strip_body: 'Full charts · candlesticks · stick patterns · scan · paper trades — same as live desk. No real money. Add platform API key before LIVE.',
  live_strip_title: 'LIVE MODE',
  live_strip_body: 'Real orders use your saved platform API key. Withdrawals must stay OFF. Switch to DEMO anytime to practice safely.',
  demo_goto_keys: 'Add API key',
  demo_trade_btn: 'Start Demo Trade',
  demo_trade_ok: 'Demo practice',
  demo_on_title: 'DEMO mode ON',
  demo_on_body: 'Practice with full charts & paper trades. No real money. Add API key before LIVE.',
  live_on_title: 'LIVE mode ON',
  live_on_body: 'Real trading enabled with your saved API key.',
  demo_need_key_title: 'API key needed for LIVE',
  demo_need_key_body: 'Save your platform API key first (API Keys page), then switch to LIVE. Keep practicing in DEMO until then.',
  demo_api_remind_title: 'Add API key for LIVE later',
  demo_api_remind_body: 'You are in DEMO practice. Charts & trades work now. Before real LIVE trading, open API Keys and save the correct platform key (Withdrawals OFF).',
  demo_chart_tag: 'DEMO · public candlesticks · stick patterns · same tools as live',
  live_chart_tag: 'LIVE · real market desk · API key required for orders',
  candle_stick_pattern: 'Candle stick pattern',
  candle_no_pattern: 'No clear stick pattern',
  candle_no_pattern_note: 'No major pattern on the last bars — still use BB / RSI / MACD.',
  tour_skip: 'Skip',
  tour_next: 'Next',
  tour_finish: 'Finish',
  welcome_eyebrow: 'Crypto Profit Eye',
  welcome_title: 'Welcome to Trade Pro',
  welcome_tag: 'Professional signal desk for Spot · Futures · Forex',
  agree_h: 'User Agreement & License Terms',
  agree_check: 'I have read and agree to this Agreement, including license terms and the note that market results are my own responsibility.',
  agree_continue: 'Agree & Continue',
  welcome_foot: 'You must be 18+. This screen appears once (unless the agreement is updated).',
  agree_need: 'Please tick the agreement box to continue.',
  agree_html: `
    <h4>1. About CPE Trade Pro</h4>
    <p>CPE Trade Pro (by <strong>Crypto Profit Eye</strong>) helps you study markets and manage Spot, Futures and Forex workflows with charts, signals and tools. It is software for your own decisions — not personal financial advice and not a promise of profit.</p>
    <h4>2. License plans &amp; pricing</h4>
    <ul>
      <li><strong>Free trial:</strong> 7 days on one computer (one time).</li>
      <li><strong>3-Month license:</strong> currently <strong>USD 15</strong> for this Machine ID. The listed price may be updated over time for new purchases.</li>
      <li><strong>Lifetime license:</strong> currently <strong>USD 100</strong> for this Machine ID. After you buy and activate a Lifetime key for that PC, <strong>no further license fee is charged to you for that same computer</strong> for continued use of the Lifetime plan.</li>
      <li>Local currency conversion may be shown for convenience; final payment amount follows the USD plan you choose and the owner’s payment instructions.</li>
      <li>One key = one Machine ID. A new PC needs a new license.</li>
    </ul>
    <h4>3. Markets move — results vary</h4>
    <p>Markets can go up or down. Tools, signals and automation are helpers only; outcomes depend on your choices, timing, risk size and exchange conditions. Use amounts you are comfortable with and keep exchange API <strong>Withdrawals OFF</strong>.</p>
    <h4>4. Responsibility</h4>
    <p>You are responsible for your trading decisions and for checking orders on your exchange. To the extent allowed by law, the owner/developer is not responsible for trading results, exchange/API issues, or misuse of the software.</p>
    <h4>5. Support</h4>
    <p>WhatsApp / Mobile: <strong>0774940944</strong> · Email: <strong>Anurasiri123@gmail.com</strong> · Anurasiri Wickramanayake</p>
    <h4>6. Acceptance</h4>
    <p>By selecting Agree &amp; Continue you accept these terms, including current license pricing and that Lifetime (once paid for this PC) does not require another license fee for that same machine.</p>
  `,
  trial_blurb: 'One trial per computer (7 days). After trial: buy 3-Month USD 15 or Lifetime USD 100. Open trades auto-close when trial ends. Select Language first.',
  lang_first: '① First select your language — tour, hints & warnings use it.',
  notif_on: 'Notifications: ON',
  notif_off: 'Notifications: OFF',
  notif_on_hint: 'Alerts, toasts and sounds are on until you turn them OFF.',
  make_shortcuts: 'Desktop / Start shortcuts',
  shortcuts_ok: 'Shortcuts created',
  shortcuts_fail: 'Shortcuts failed',
  buy_title: 'Buy license key',
  buy_choose_plan: 'Choose 3-Month (USD 15) or Lifetime (USD 100). Local currency below.',
  plan_m3: '3-Month',
  plan_m3_note: '~90 days · then 3 grace days to close trades / renew',
  plan_life: 'Lifetime',
  plan_life_note: 'One-time · this computer forever',
  your_currency: 'Your currency',
  pay_how: 'Pay how you like',
  buy_send_proof: 'Send Machine ID + which plan + payment proof on WhatsApp to get your key.',
  lic_pay_h: 'License payment',
  license_ended: 'License / trial ended',
  license_warn_title: 'License warning',
  guard_warn_title: 'Wrong activation code',
  guard_warn_body: 'That activation code is not valid. {left} more wrong attempt(s) will block all signals.',
  guard_locked_title: 'All signals blocked',
  guard_locked_body: 'Too many invalid activation codes were entered. Signals stay blocked until a genuine owner key is activated. WhatsApp 0774940944.',
  guard_tamper_title: 'Software modified',
  guard_tamper_body: 'The software files were changed. Signals are blocked. Reinstall the original setup or contact the owner (WhatsApp 0774940944).',
  warn_d14: 'Your 3-month license ends in about {d} days. Renew or buy Lifetime (USD 100) for long-term use.',
  warn_d7: '1 week left on 3-month license ({d} days). Renew soon or upgrade to Lifetime USD 100.',
  warn_d3: 'Only {d} days left on 3-month license. After expiry you get 3 grace days — then all open trades auto-close.',
  warn_d1: 'Last day of 3-month license. Close trades or buy a new key. After expiry: 3 grace days, then auto-close all trades. Lifetime = USD 100.',
  warn_grace: 'Grace period: {d} day(s) left. Close open trades or activate a new 3-month / Lifetime key — or trades auto-close when grace ends.',
  tour_lang_title: 'Language & theme',
  tour_lang_body: 'Tour language is: {lang}. Change Language anytime (gate/sidebar). Theme: Dark/Light. After 7-day trial: 3-Month USD 15 or Lifetime USD 100.',
  tour_1_title: 'Chart Lab',
  tour_1_body: 'Pick Crypto Spot, Futures, or Forex → search pair → Analyze. Candles, stick patterns, RSI/MACD — then send levels to Trade Now or ask Live Help.',
  tour_2_title: 'Spot Desk',
  tour_2_body: 'Scan USDT pairs. Click a row → candle chart + BB/Fib/MACD reasons. Use ★ watchlist. Interval includes 15m / 30m / 1H / 4H / 1D.',
  tour_3_title: 'Futures Desk',
  tour_3_body: 'USDT-M perpetual signals. Same scan/chart flow. BUY trails TP+SL up; SELL trails TP+SL down. Cross or Isolated when you trade.',
  tour_4_title: 'Forex Desk',
  tour_4_body: 'FX pairs with the same rating system (BUY/SELL/HOLD + score). Click a row for chart + psychology. Practice from Trade Now with Forex platform.',
  tour_5_title: 'Trade Now',
  tour_5_body: 'Glowing Trade Now opens Manual + Auto. Top bar DEMO = practice; LIVE needs platform API key. Trail TP+SL stays ON.',
  tour_6_title: 'Positions / TP',
  tour_6_body: 'Edit TP, SL, trail anytime. Partial close 25–100%. Cancel auto → manual. Trial end closes opens for safety.',
  tour_7_title: 'Live Help',
  tour_7_body: 'Chat with owner (trial + license). Quick chips or type. WhatsApp sends Machine ID + messages for live reply.',
  tour_8_title: 'News & Tricks',
  tour_8_body: 'Crypto headlines, forex session tips, and API tricks for every crypto/forex platform. Refresh anytime.',
  tour_9_title: 'Learning Class',
  tour_9_body: 'Colorful candle cards, per-platform A→Z class (Binance, Bybit, Forex…), and full Forex Trading A→Z. Same language as the app.',
  tour_10_title: 'Trade Journal',
  tour_10_body: 'Closed trades with entry, exit, PnL %, reason. Review what worked.',
  tour_11_title: 'API Keys',
  tour_11_body: 'Choose YOUR platform → enter only that platform’s fields. Charts work without keys; live trade needs the correct key. Withdrawals OFF.',
  tour_12_title: 'Help',
  tour_12_body: 'Full how-to + per-platform API connect steps in your language.',
  tour_13_title: 'License & pay',
  tour_13_body: '3-Month USD 15 or Lifetime USD 100. Pay Bank / Binance / PayPal, WhatsApp Machine ID + proof. One PC = one key.',
  language: 'Language',
  scan: 'Scan Market',
  auto_scan_on: 'Auto Scan ON (every 15m)',
  auto_scan_off: 'Auto Scan OFF (15m)',
  scanning: 'Scanning...',
  spot_title: 'Spot Desk',
  spot_sub: 'Bollinger · Fibonacci · Candles · MACD · Momentum · Psychology',
  fut_title: 'Futures Desk',
  fut_sub: 'USDT-M Perpetual · separate signal board',
  forex_title: 'Forex Desk',
  forex_sub: 'Live FX rates · same BUY/SELL rating · paper ready',
  trade_title: 'Trade Now',
  trade_sub: 'Manual + Auto · DEMO practice · LIVE needs platform API',
  pos_title: 'Positions / TP',
  pos_sub: 'Open trades live monitor',
  journal_title: 'Trade Journal',
  journal_sub: 'Closed trades PnL history',
  keys_title: 'API Keys',
  keys_sub: 'Correct key for the platform you trade (not any random key)',
  help_title: 'Help',
  help_sub: 'How to use CPE Trade Pro',
  help_plat_h: 'Platform API connect (same as API Keys page)',
  help_plat_sel: 'Select platform',
  license_title: 'License',
  license_sub: 'Machine-locked activation',
  owner_title: 'Owner Tools',
  owner_sub: 'Generate customer license keys',
  pairs: 'USDT Pairs',
  buy: 'BUY',
  sell: 'SELL',
  bb_lower: 'BB Lower',
  new_watch: 'New / Watch',
  signals: 'Signals',
  search_ph: 'Search pair / BUY / SELL',
  chart_why: 'Chart + Why',
  save_screenshot: '⤓ Save image',
  shot_saved: 'Screenshot saved',
  shot_failed: 'Screenshot failed',
  click_row: 'Click a row',
  bb_candidates: 'Bollinger Lower Band Buy Candidates',
  new_pairs: 'New Pairs',
  upcoming_pairs: 'Upcoming Listings',
  upcoming_hint: 'Coins Binance has announced but NOT listed yet — soonest first, so the next to open is on top. Highlighted at 3 days / 1 day / 3 hours / 30 minutes before the open; a notification pops up the moment one goes live.',
  no_upcoming: 'No new-listing announcements right now',
  listing_soon: 'SOON',
  announced: 'announced',
  just_listed: 'NEW LISTING',
  day: 'day',
  days: 'days',
  min: 'min',
  ago: 'ago',
  watchlist: 'Watchlist',
  perp_pairs: 'Perp pairs',
  fut_signals: 'Futures Signals',
  fut_chart: 'Futures Chart + Psychology',
  fut_bb: 'Futures Bollinger Lower Buys',
  manual_trade: 'Manual Trade',
  place_live: 'Start Live Trade',
  paper: 'Start Demo / Paper Trade',
  trade_warn: 'DEMO = practice (no key). LIVE = platform API key. Withdrawals OFF.',
  auto_trade: 'Auto Trade',
  auto_buy: 'Auto BUY (BB Lower + strong score)',
  auto_tp: 'Auto Take-Profit / Close monitor',
  save_auto: 'Save Auto Config',
  open_autos: 'Open Auto Trades',
  positions_h: 'Open Positions — TP/SL Live Monitor',
  positions_p: 'Price checked every 15s — TP1/TP2/SL alarms + optional auto close',
  journal_h: 'Trade Journal (Profit / Loss history)',
  sig_board: 'Results of trades taken on this software’s signals',
  sig_empty: 'No closed signal trades yet. Click a BUY or SELL row, trade it, and when that trade closes the real profit or loss shows here — separate from other trades.',
  sig_line_profit: 'Profit — the signal worked',
  sig_line_loss: 'No profit — the signal did not work this time',
  sig_line_flat: 'About flat — almost no profit or loss',
  sig_count: 'Signal trades',
  sig_profit_n: 'Made profit',
  sig_loss_n: 'No profit',
  sig_flat_n: 'Flat',
  sig_rate: 'Win rate',
  sig_avg: 'Average result',
  sig_honest: 'The win rate here is counted from those closed signal trades. It changes with the market. It is not a fixed 99.99%.',
  api_h: 'Binance API Key',
  keys_none: 'No keys saved — required for live trading',
  save_keys: 'Save Keys',
  clear: 'Clear',
  test_account: 'Test Account',
  license_active: 'License ACTIVE — locked to this machine',
  license_inactive: 'Inactive',
  lic_activate_h: 'Activate / renew license',
  lic_key_note: 'Paste a new key from the owner to renew or upgrade. Lifetime is one-time — once active this box locks.',
  lic_key_locked: 'Lifetime active — no key needed. This box is locked.',
  lic_key_ok: 'License activated.',
  lic_key_fail: 'That key did not work.',
  owner_h: 'Owner License Generator',
  owner_p: 'Owner only — paste customer Machine ID to create a key',
  owner_pass: 'Owner Password',
  customer_mid: 'Customer Machine ID',
  gen_key: 'Generate License Key',
  why: 'Why this signal',
  psych: 'Psychological / Mental method',
  fib: 'Fibonacci',
  no_bb: 'No lower-band candidates in this scan',
  no_new: 'New listings appear after the 2nd scan',
  watch_hint: '★ Add pairs to watchlist',
  watch_removed: 'removed from favorites',
  no_auto: 'No open auto trades',
  no_pos: 'No open positions — add via Manual / Paper / Auto',
  no_journal: 'Journal is empty',
  scan_done: 'Scan complete',
  scan_err: 'Scan error',
  copied_mid: 'Machine ID copied',
  activate_fail: 'Activation failed',
  keys_need_both: 'API Key and Secret are both required',
  keys_saved: 'Keys saved',
  keys_test_ok: 'API test OK',
  keys_test_fail: 'API test failed',
  keys_live_ready: 'LIVE ready (key+secret valid for this platform)',
  keys_saved_paper: 'Saved (paper / bridge only)',
  keys_incomplete: 'Incomplete credentials',
  order_err: 'Order error',
  paper_added: 'Added to positions',
  auto_saved: 'Auto config saved',
  watch_added: 'Added to watchlist',
  closed: 'Closed',
  candle_close: 'close',
  api_guide_title: 'How to get Binance API Key & Secret',
  api_guide_html: `
    <h4>Step-by-step (Binance website / app)</h4>
    <ol>
      <li>Open <strong>www.binance.com</strong> and log in to your account.</li>
      <li>Click your profile icon (top right) → choose <strong>API Management</strong>
        (or go to: Profile → Account → API Management).</li>
      <li>Complete security verification (email / SMS / authenticator) if asked.</li>
      <li>Press <strong>Create API</strong>.</li>
      <li>Choose <strong>System generated</strong> API key (recommended).</li>
      <li>Give the key a label, e.g. <em>CPE Trade Pro</em>, then confirm.</li>
      <li>Copy the <strong>API Key</strong> and the <strong>Secret Key</strong> immediately
        (Secret is shown only once — save it safely).</li>
      <li>Paste them into the fields above in this software and click <strong>Save Keys</strong>.</li>
    </ol>
    <h4>Permissions (important)</h4>
    <ul>
      <li>Enable <strong>Enable Reading</strong> (required).</li>
      <li>For live Spot orders: enable <strong>Enable Spot &amp; Margin Trading</strong>.</li>
      <li>For Futures: enable <strong>Enable Futures</strong> (if available on your account).</li>
      <li><strong>Do NOT enable Withdrawals</strong> — keep Withdrawals OFF for safety.</li>
    </ul>
    <p>If your public IP changes and Binance returns <strong>-2015</strong>, choose
    <strong>Unrestricted</strong> for IP access (or turn off trusted-IP restriction), if available.
    This changes IP access only; it does not mean enabling all API permissions. Keep Withdrawals
    OFF. A fixed-IP whitelist is safer when your IP is static.</p>
    <h4>What NOT to enter</h4>
    <ul>
      <li>Do <strong>not</strong> enter your Binance email/username or login password here.</li>
      <li>This app only needs API Key + Secret for trading/reading.</li>
    </ul>
    <h4>After saving</h4>
    <ul>
      <li>Click <strong>Test Account</strong> to verify the keys work.</li>
      <li>Then use Manual / Auto Trade pages to place orders.</li>
    </ul>
    <p class="tiny">After renewing/editing a Binance key, save it again in this app to restart its
    25-day review reminder. The reminder does not know or confirm Binance's actual expiry date.</p>
  `,
  demo_expired_title: 'DEMO practice ended',
  demo_expired_body: 'DEMO is over on this PC. Without a paid key, DEMO follows the 7-day trial. Paid keys get 3 months DEMO, then LIVE + Live Help remain.',
  demo_days_left: 'Demo days left: {d}',
  demo_paid_start_title: 'Paid DEMO started',
  demo_paid_start_body: 'Activation OK. DEMO practice for 3 months. Live Help stays available after DEMO ends.',
  livehelp_locked_title: 'Live Help locked',
  livehelp_locked_body: 'Live Help needs an active trial or a purchased activation key. After you buy, Live Help stays available even when the 3-month DEMO ends.',
  ref_title: 'Referral',
  ref_rules: 'Share your code with a new person on a different network. Same Wi‑Fi/lab = not counted. First 10 = +1 day; then +0.5. Hard cap 365 days — after that referrals do not extend activation. Lifetime users get a claim slip; only the owner issues the real key. Forged keys auto-deactivate and report to admin.',
  ref_code_label: 'Referral code (optional)',
  ref_human_confirm: 'I am a real person (not a farm / bot / same-lab PC)',
  ref_apply_label: 'Apply a friend’s code (this PC · once)',
  ref_apply_btn: 'Apply referral',
  ref_proof_out: 'Proof for your referrer (send this)',
  ref_redeem_label: 'Redeem proof (you are the referrer)',
  ref_redeem_btn: 'Redeem referral proof',
  ref_keys_h: 'My claim slips (Lifetime — owner issues real keys)',
  ref_keys_empty: 'No claim slips yet (Lifetime referrers only).',
  ref_proof_ready_title: 'Referral proof ready',
  ref_proof_ready_body: 'Open License → Referral and send the proof to your referrer.',
  demo_ref_tip: 'Referral: License → share code · max +365 days · owner keys only.',
  warn_ref_tip: ' Tip: Referral (License) can add days (max 365). Only owner-issued keys activate.',
  lang_synced_title: 'Language updated',
  lang_synced_body: 'Menus, Help, Learning Class and notifications now follow this language.',
  help_html: `
    <h3>CPE Trade Pro — Help (updated)</h3>
    <article><h4>1) Connect platform API keys</h4>
    <p>Open <strong>API Keys</strong>, select your platform (Binance, Bybit, OKX, KuCoin, Bitget, Gate, MEXC, Kraken, Coinbase, OANDA, FXCM, MT5, Forex Demo). Enter <strong>that platform’s</strong> API Key + Secret (OKX/KuCoin/Bitget also need Passphrase). Click <strong>Save Keys</strong> — the app auto-tests the key. Use <strong>Test Account</strong> anytime. Keep <strong>Withdrawals OFF</strong>.</p>
    </article>
    <article><h4>2) DEMO vs LIVE</h4>
    <ul>
      <li>Top bar <strong>DEMO</strong> = full practice: charts, stick patterns, scan, Trade Now, TP/SL/trail, positions — no real money.</li>
      <li>DEMO practice window is <strong>3 months</strong> on this PC. After that DEMO deactivates and only <strong>LIVE</strong> remains.</li>
      <li><strong>LIVE</strong> needs the correct platform API key. Wrong/random keys will not work.</li>
    </ul></article>
    <article><h4>3) How the software works</h4>
    <ul>
      <li><strong>Chart Lab</strong> (top of menu) — Spot / Futures / Forex candles, patterns, RSI/MACD. Use <strong>+ / − / Reset</strong> or mouse wheel to zoom.</li>
      <li><strong>Spot / Futures / Forex Desk</strong> — signal boards + scan</li>
      <li><strong>Trade Now</strong> (glowing) — Manual + Auto trade, DEMO or LIVE</li>
      <li><strong>Positions</strong> — edit TP/SL/trail, partial close 25–100%</li>
      <li><strong>Live Help</strong> — in-app chat + WhatsApp to owner</li>
      <li><strong>News &amp; Tricks</strong> — crypto news, forex tips, API tricks</li>
      <li><strong>Learning Class</strong> — colorful candles, platform A–Z, Forex A–Z</li>
      <li>Spot min $11 · Futures min $1 + leverage</li>
    </ul></article>
    <article><h4>4) License &amp; prices</h4>
    <ul>
      <li><strong>Free trial:</strong> 7 days per computer (one time)</li>
      <li><strong>3-Month USD {m3}</strong> or <strong>Lifetime USD {life}</strong> — local currency · Bank / Binance / PayPal</li>
      <li>Prices can be updated by the owner; Buy / License screens follow the latest prices</li>
      <li>3-Month end → 3 grace days → open trades auto-close</li>
      <li>One key = one PC · WhatsApp 0774940944 · Anurasiri123@gmail.com</li>
    </ul></article>
    <article><h4>5) Referral system (step by step)</h4>
    <ol>
      <li>Open <strong>License → Referral</strong>. Copy <strong>your code</strong> (starts with CPE-R-…).</li>
      <li>Give that code to a <strong>new person on a different Wi‑Fi / network</strong> (same lab / same router = not counted).</li>
      <li>They tick <strong>I am a real person</strong>, paste your code, then <strong>Start Trial</strong> or activate a paid key.</li>
      <li>They copy the <strong>proof</strong> (CPE-P.…) and send it to you (WhatsApp / chat).</li>
      <li>You paste the proof under <strong>Redeem</strong> → you get time:
        <ul>
          <li>First <strong>10</strong> valid referrals = <strong>+1 day</strong> each</li>
          <li>After 10 = <strong>+0.5 day</strong> each</li>
          <li><strong>Hard max +365 days</strong> total — after that referrals do not extend activation</li>
        </ul>
      </li>
      <li><strong>Trial / 3‑Month</strong> users: days add to your trial or 3‑month end date.</li>
      <li><strong>Lifetime</strong> users: you get a <strong>claim slip</strong> (not a live key). Send slip + buyer’s Machine ID to the owner → owner issues a real timed key.</li>
      <li>Only <strong>owner-issued keys</strong> activate the software. Fake / hacked keys are blocked, auto-deactivated, and reported to admin.</li>
    </ol></article>
    <article><h4>6) Stop Loss, trailing &amp; anti stop-hunt (profit protection)</h4>
    <ul>
      <li>Old default trail <strong>0.05%</strong> was too tight — normal wicks “hunted” the SL and closed too early.</li>
      <li>New default <strong>Trail % = 1.2</strong> (keep at least <strong>0.4</strong>). Recommended range: <strong>1.0 – 2.0%</strong> on Trade Now / Auto / Positions.</li>
      <li>Trailing <strong>starts only after ~0.6% profit</strong> — SL does not chase noise at entry.</li>
      <li>SL close needs <strong>2 confirm ticks</strong> + a small buffer (not one spike wick).</li>
      <li>Suggested signal SL stays at least ~<strong>1.2%</strong> from entry to reduce hunt tags.</li>
      <li>Use <strong>TP1 partial</strong> + trail to lock profit; edit SL anytime in <strong>Positions</strong>.</li>
    </ul></article>
    <article><h4>7) Start the software</h4>
    <ul>
      <li>Double-click <strong>START-CPE-Trade-Pro.bat</strong> (or use Desktop shortcut if you have one).</li>
      <li>First time may run <code>npm install</code>, then the app opens with <code>npm start</code>.</li>
    </ul></article>
    <article><h4>8) Click and double-click</h4>
    <ul>
      <li><strong>One click</strong> on a signal row selects it and fills the side chart.</li>
      <li><strong>Double-click</strong> the same row to open the big chart popup.</li>
      <li>Click the <strong>Chart + Why</strong> heading to open that chart as a popup.</li>
      <li>A Bollinger candidate chip also opens the chart popup.</li>
    </ul></article>
    <article><h4>9) Colors</h4>
    <ul>
      <li><strong>BUY</strong> rows are blue. <strong>SELL</strong> rows are red. <strong>HOLD</strong> stays white.</li>
      <li>The star (favorite) turns that row <strong>yellow</strong>. Click the star again and a HOLD row goes back to white.</li>
    </ul></article>
    <article><h4>10) How the score is made</h4>
    <p>The score is only from price and volume. The psychology lines are a separate checklist you read before you trade. They do <strong>not</strong> add or subtract score points.</p>
    <p><strong>How to use the psychology lines:</strong> open the chart (double-click a row, or click Chart + Why). Under the chart, read the lines for that BUY, SELL, or HOLD. Before you press Start, check each one: are you chasing (FOMO)? Is the size only 1–2% of the account? Is there a stop? Is this a revenge trade after a loss? Did you write the plan and check your mood? A BUY also says to wait at support and take part of the profit at TP1. A SELL says not to panic and to protect profit with the trail. If any answer is no, do not enter.</p>
    <ul>
      <li>Near the lower Bollinger band: <strong>+3</strong>. Near the upper band: <strong>−3</strong>.</li>
      <li>EMA golden cross: <strong>+3</strong>. Death cross: <strong>−3</strong>.</li>
      <li>RSI under 30: <strong>+2</strong>. RSI over 70: <strong>−2</strong>.</li>
      <li>Fibonacci support: <strong>+1</strong>. Fibonacci resistance: <strong>−1</strong>.</li>
      <li>A BUY candle pattern: <strong>+2</strong>. A SELL candle pattern: <strong>−2</strong>.</li>
      <li>Price above SMA50: <strong>+1</strong>. Below SMA50: <strong>−1</strong>.</li>
      <li>MACD turns up: <strong>+2</strong>. MACD turns down: <strong>−2</strong>.</li>
      <li>Short rise or drop, a longer trend, and a volume spike can each add or subtract <strong>1</strong>.</li>
    </ul>
    <p>Score <strong>3 or more</strong> = BUY. Score <strong>−3 or less</strong> = SELL. Between those = HOLD. Spot, Futures, and Forex use the same rules.</p>
    </article>
    <article><h4>11) Caution and Strong — read this carefully</h4>
    <p><strong>Caution</strong> is the lighter signal. It is a BUY or SELL when the score reaches 3 (or −3 for a sell), but the extra Strong checks are not all met. Caution is not a promise. It is an earlier, weaker idea. The row is still blue for BUY and red for SELL. The word CAUTION is on the row.</p>
    <p><strong>Strong</strong> is stricter. The score alone is not enough. A score of 10 can still be Caution. All of these must be true together:</p>
    <ul>
      <li>BUY: score is <strong>6 or more</strong>. SELL: score is <strong>−6 or less</strong>.</li>
      <li>At least <strong>3 separate checks</strong> agree on that side (band, EMA, RSI, Fibonacci, candle, SMA50, MACD, momentum).</li>
      <li>That side has <strong>at least 2 more checks</strong> than the other side. Example: 3 buy checks and 2 sell checks is not Strong.</li>
      <li>The first target is at least <strong>1.1 times</strong> as far as the stop. If the stop is too close, Strong is lowered to Caution.</li>
    </ul>
    <p>Trade Strong when you want the stricter setup. Treat Caution as a watch, not as the same thing as Strong.</p>
    <p><strong>Higher Strong</strong> means the base signal is Strong and the last completed higher-timeframe trend agrees with its direction. Example: a 15m signal is checked against 1h. If that extra candle data is unavailable or disagrees, the signal stays Strong. This is confirmation, not a guarantee.</p>
    </article>
    <article><h4>12) Signal History</h4>
    <ul>
      <li>Every BUY and SELL is tracked as if <strong>$10</strong> was placed. This is a paper record, not your real wallet.</li>
      <li>Use the buttons <strong>Spot Signal</strong>, <strong>Future Signal</strong>, and <strong>Forex Signal</strong>. Only that market is shown. Spot is selected first.</li>
      <li>The chart on the right follows the live market candles for that pair. <strong>Chart at start</strong> and <strong>Chart at end</strong> still open the saved pictures.</li>
      <li>Each market shows <strong>Triggered</strong> and <strong>Strong large profit</strong> first, then Open, Take profit / trail lock, and Stop loss.</li>
      <li>When price moves in favor, SL and TP move the same way. BUY trails up. SELL trails down. The row shows how far TP and SL widened. Gold TRIGGER marks on the history charts show where that happened.</li>
      <li>A triggered row has a gold background. A Strong signal that locked about 2% or more has a cyan background.</li>
      <li>Click a closed pair, or click <strong>Chart at start</strong> / <strong>Chart at end</strong>, to open a popup with both charts.</li>
    </ul></article>
    <article><h4>13) Manual trade and Auto trade</h4>
    <ul>
      <li><strong>Trade Now → Manual:</strong> pick the platform and Spot, Futures, or Forex. The current BUY/SELL signals for that market appear. Click a pair to fill symbol, side, entry, TP, and SL. Then press Start.</li>
      <li><strong>Auto:</strong> two ticks — <strong>Trade Strong signals</strong> and <strong>Trade Caution signals</strong>. Tick one, or both. Then click <strong>Save Auto Config</strong>. A “saved” message appears.</li>
      <li>Auto still buys only. Strong trades trail wider so a winner can run. Caution trades lock profit sooner.</li>
      <li><strong>Use money management:</strong> optional tick. On = size from the stop so one trade risks about 1% of a $1000 practice account (plus closed results). The exchange minimum is not forced if that would risk more. New autos pause after about −2% that day. The same tick is on Manual. Learning Class → Money Management has the full note and a worked example. Signal History keeps the equal $10 test and also shows the 1% plan size.</li>
      <li><strong>Band ride:</strong> a BUY from the lower or middle band is held toward the upper band. A SELL from the upper or middle band is held toward the lower band. Futures and Forex can do both. The stop trails only after the trade is in profit, and it stays far enough that a wick does not hunt it. If price confirms a break past the far band, the target steps once further. Not every signal is trailed. Signal History profit is shown after the platform fee (Spot 0.20%, Futures 0.08%, Forex 0.03%).</li>
      <li>A new Strong signal plays a different sound and shows a <strong>gold</strong> popup, plus the normal Windows notification.</li>
    </ul></article>
    <article><h4>14) Disclaimer</h4>
    <p>Analysis / tooling software. Not financial advice. Trading involves risk. A Strong label is not a guaranteed win.</p></article>
    <article><h4>15) Market volatility, and the optional Martingale ladder</h4>
    <p><strong>Market volatility</strong> tells you how much price is moving, not which way. Every signal now carries a reading — <strong>LOW / NORMAL / HIGH / EXTREME</strong> — plus a plain-language reason line inside the signal's “why”. It compares the pair's recent candle range and Bollinger band width to that pair's own normal.</p>
    <ul>
      <li>When the tape is <strong>EXTREME</strong>, a fresh STRONG signal is downgraded to <strong>CAUTION</strong> and the reason says so. In a whipsaw market the same setup fails far more often.</li>
      <li>In HIGH or EXTREME: smaller size, wider stop, fewer trades. Wait for a completed candle instead of a mid-candle spike.</li>
    </ul>
    <p><strong>Martingale (optional, off by default).</strong> Tick it on Manual to manage that one trade, or on an Auto session to manage its auto trades. It works on both DEMO and LIVE. An extra order is added only when <em>both</em> are true: (1) price has moved against the trade by at least <strong>step × rung %</strong>, and (2) a fresh same-side signal still stands for that pair. It never adds just because price dropped.</p>
    <ul>
      <li><strong>Step %</strong> — the adverse move needed before each add.</li>
      <li><strong>Multiplier</strong> — each add's size versus the base (1 = flat, 2 = double).</li>
      <li><strong>Max adds</strong> — hard limit on extra orders (0–6).</li>
      <li><strong>Ladder risk cap %</strong> — the whole ladder's risk as a % of equity. Once the next add would pass your cap, CPE refuses it. The exchange minimum size and the daily −2% stop are still respected.</li>
    </ul>
    <p>Averaging down does not remove risk — it turns many small losses into one large loss. Learn it on DEMO first, keep the numbers small, and read Learning Class → Volatility &amp; Martingale. All four numbers are yours to set.</p></article>
    <article><h4>16) Chart Lab indicator bar — what is new</h4>
    <ul>
      <li>Chart Lab now has an <strong>Indicators</strong> row under the chart. Every button is an on/off tick and the chart redraws at once.</li>
      <li>Buttons: <strong>RSI (14)</strong>, <strong>Stoch</strong> (14,3,3), <strong>MACD</strong> (12/26/9), <strong>ADX</strong> / DMI (14), <strong>Volume</strong>, <strong>EMA 9/21</strong>, <strong>SMA 50</strong>, <strong>BB</strong> (20,2), <strong>Ichimoku</strong> (9,26,52), <strong>VWAP</strong> and <strong>Elliott</strong> (wave count).</li>
      <li><strong>Stochastic</strong> above ~80 is the overbought zone, below ~20 the oversold zone; a %K / %D cross is the study.</li>
      <li><strong>ADX</strong> shows trend <em>strength</em>, not direction — above ~25 a trend is running, below ~20 the market is choppy. +DI above −DI = buyers, −DI above +DI = sellers.</li>
      <li><strong>Ichimoku</strong> draws the Tenkan / Kijun lines and the Senkou cloud; price above a rising cloud is bullish, below a falling cloud bearish.</li>
      <li><strong>VWAP</strong> is the volume-weighted average price — the institutional benchmark line.</li>
      <li>These new tools also feed the score engine on the same side they point, so they can push a setup toward BUY / SELL or leave it mixed (HOLD). They are confirmations, not triggers.</li>
      <li>Because there are more checks now, <strong>CAUTION</strong> needs score ≥ 4 <em>and</em> at least 3 agreeing checks, so the app does not over-signal.</li>
    </ul></article>
    <article><h4>17) Elliott Wave count</h4>
    <ul>
      <li>Tick <strong>Elliott</strong> in the indicator bar. The engine finds the last swing pivots and tests them against the Elliott rules.</li>
      <li>When the shape fits it labels <strong>0-1-2-3-4-5</strong> (the still-running wave in yellow) and draws a <strong>W5 target</strong> line — a Fibonacci extension of wave 1 measured off wave 4.</li>
      <li>Rules checked: wave 2 does not pass the start of wave 1, wave 4 does not overlap wave 1, wave 3 is not the shortest. If a rule fails, nothing is drawn — there is no forced count.</li>
      <li>A live wave reads as continuation; a complete 5-wave impulse warns that a correction may follow.</li>
      <li>Use it as confluence with BB / Fib / RSI / candles — never as a standalone entry.</li>
    </ul></article>
    <article><h4>18) 3-Month Forecast (the Forecast 3M tick)</h4>
    <ul>
      <li>Next to <strong>Future space</strong> there is a <strong>Forecast 3M</strong> tick. When it is on, Chart Lab projects how the chart is likely to form over the next ~3 months.</li>
      <li>It draws a dashed <strong>centre path</strong> from the analysed entry toward the best known target (Elliott target → TP2 → TP1) inside a widening <strong>cone</strong>, with month markers <strong>M+1 / M+2 / M+3</strong>.</li>
      <li>The cone width grows with the square root of time and the pair’s own volatility — a quiet FX pair gets a narrow cone, a wild coin a very wide one. The width is the uncertainty.</li>
      <li>It needs <strong>Future space</strong> on (the blank area on the right). A HOLD signal has no direction, so nothing is drawn.</li>
      <li>Green = an up idea, red = a down idea. The forecast is a big-picture map; your trade levels (entry, TP1/TP2, SL) are still what you use.</li>
      <li>Re-analyse often — every new candle updates the target, the volatility and the whole cone. It is a snapshot, not a promise; news and listings are not in the model.</li>
    </ul></article>
  `
};

D.si = {
  ...D.en,
  gate_sub: 'Binance Spot & Futures · සම්පූර්ණ Signal Desk · Machine License',
  machine_hint: 'ඔබේ Machine ID (license ගන්න WhatsApp එකට එවන්න)',
  copy: 'Copy',
  license_key: 'License Key',
  activate: 'Software Activate කරන්න',
  license_rule: 'එක license = එක computer. වෙන PC = අයිතිකරුගෙන් නව license ගන්න.',
  nav_spot: 'Spot Desk',
  nav_futures: 'Futures Desk',
  nav_chartlab: 'Chart Lab',
  nav_trade: 'Trade Now',
  nav_positions: 'Positions / TP',
  nav_livehelp: 'Live Help',
  nav_news: 'News & Tricks',
  nav_learn: 'Learning Class',
  nav_journal: 'Trade Journal',
  nav_signallab: 'Signal History',
  caution_toggle: 'අවවාද signals',
  caution_h: 'අවවාද signals',
  caution_warn: 'සැහැල්ලු setups, ලකුණු 5ක් පමණ. Auto එකට නෙවෙයි. Trade කරන්න Strong signals.',
  caution_none: 'මේ scan එකේ අවවාද signals නැහැ.',
  grade_strong: 'STRONG',
  strong_none: 'මේ scan එකේ Strong signal එකක් නැහැ. Switch එක on නම් අවවාද box එකේ ඉතිරිය පෙනෙනවා.',
  signallab_title: 'Signal History',
  signallab_sub: 'Software signal එකක් එකක් $10 trade එකක් විදිහට, පටන් ගත් chart එක සහ ඉවර chart එක',
  jr_real_h: 'ඇත්ත trades — auto සහ manual',
  jr_real_p: 'මේ ඉලක්කම් ඔබ ඇත්තටම දැමූ auto හෝ manual trade වලට විතරයි. සාමාන්‍ය ලාභය, සාමාන්‍ය පාඩුව, සහ net balance.',
  jr_avg_profit: 'සාමාන්‍ය ලාභය',
  jr_avg_loss: 'සාමාන්‍ය පාඩුව',
  jr_avg_profit_usd: 'සාමාන්‍ය ලාභය USD',
  jr_balance: 'Net balance',
  sl_h: 'සෑම signal එකක්ම $10 trade එකක්',
  sl_p: 'Software එක දෙන සෑම BUY/SELL එකක්ම $10 දාලා trade කළා වගේ ගණන් කරනවා. පේළියක් click කළාම පටන් ගත් chart එක සහ ඉවර chart එක පෙනෙනවා.',
  sl_balance: 'වැසුණු balance',
  sl_equity: 'Balance + open',
  sl_open_h: 'තව විවෘත',
  sl_closed_h: 'වැසුණු history',
  sl_chart_h: 'Live market chart',
  sl_click: 'Signal එක click කරන්න. Chart එක live market එකෙන් යනවා. පටන් ගැනීම සහ ඉවර වීම save වෙලා තියෙනවා.',
  sl_chart_live: 'Live market',
  sl_chart_start: 'පටන් ගත් chart',
  sl_chart_end: 'ඉවර chart',
  sl_none: 'තව නැහැ — market scan කරන්න. අලුත් BUY/SELL එක මෙතන එනවා.',
  sl_no_chart: 'මේ signal එකට chart එකක් save වී නැහැ.',
  nav_keys: 'API Keys',
  nav_help: 'Help (සිංහල)',
  nav_license: 'License',
  nav_owner: 'Owner Tools',
  chartlab_title: 'Chart Lab',
  chartlab_sub: 'Crypto + Forex · candles · patterns · analysis',
  livehelp_title: 'Live Help',
  livehelp_sub: 'Owner සමඟ chat · Trial සහ License',
  news_title: 'News & Tricks',
  news_sub: 'Crypto news · forex tips · platform API tricks',
  news_refresh: 'News refresh',
  news_loading: 'News load වෙමින්…',
  news_empty: 'දැන් items නැහැ — Refresh කරන්න.',
  news_open: 'Source බලන්න',
  news_updated: 'Update වුණා',
  learn_title: 'Learning Class (ඉගෙනුම් පන්තිය)',
  learn_sub: 'Candles · BB · RSI · Fib · money · psychology · platforms · Forex',
  learn_eyebrow: 'Candle රූප · Chart රූප · BB · RSI · Fib · Money · Psych · Platforms',
  learn_candles: 'Candle patterns — රූපය + තේරුම + තව මොනවද කියවෙනවා',
  learn_candles_hint: 'සෑම card එකකම: රූපය · bias · කියවන හැටි · BB / RSI / Fib / risk / psychology.',
  learn_charts: 'Chart patterns — රූපය + තේරුම + තවත්',
  learn_charts_hint: 'Candles වටේ විශාල structure. Chart Lab DEMO එකෙන් practice.',
  learn_modules_h: 'Deep modules — BB · RSI · Fib · Money · Psych · Signals · Forex',
  learn_plat_h: 'Platform class',
  practice_title: 'Demo Practice vs Live',
  practice_body: 'ඉහළ DEMO තෝරන්න: candle charts, stick patterns, scan, TP/SL/trail, positions — live වගේම, මුදල් නැතුව. LIVE ට නිවැරදි platform API key ඕන. Demo කරනකොට API key දාන්න කියලා notifications එනවා.',
  api_notice_title: 'Platform API key එක දාන්න',
  api_notice_body: 'Charts keys නැතුවත් වැඩ කරයි. Live trading සඳහා API Keys ට ගිහින් ඔබේ platform එකේ key දාන්න. අහඹු key එකකින් වැඩ නොවේ. Withdrawals OFF.',
  live_need_api_title: 'Live trade ට API key ඕන',
  live_need_api_body: 'DEMO එකෙන් practice කරන්න. Live orders වලට ඒ platform API key API Keys පිටුවේ save කරන්න.',
  demo_strip_title: 'DEMO PRACTICE',
  demo_strip_body: 'Charts · candlesticks · stick patterns · scan · paper trades — live desk වගේම. මුදල් නැහැ. LIVE කලින් platform API key දාන්න.',
  live_strip_title: 'LIVE MODE',
  live_strip_body: 'සැබෑ orders = saved API key. Withdrawals OFF. Practice සඳහා DEMO ට ආපහු යන්න පුළුවන්.',
  demo_goto_keys: 'API key දාන්න',
  demo_trade_btn: 'Start Demo Trade',
  demo_trade_ok: 'Demo practice',
  demo_on_title: 'DEMO mode ON',
  demo_on_body: 'Full charts + paper trades. මුදල් නැහැ. LIVE කලින් API key දාන්න.',
  live_on_title: 'LIVE mode ON',
  live_on_body: 'Saved API key එකෙන් real trading.',
  demo_need_key_title: 'LIVE ට API key ඕන',
  demo_need_key_body: 'මුලින් API Keys පිටුවේ platform key save කරන්න. ඊට කලින් DEMO එකෙන් practice කරන්න.',
  demo_api_remind_title: 'LIVE සඳහා API key දාන්න',
  demo_api_remind_body: 'දැන් DEMO practice. Charts/trades වැඩ කරයි. සැබෑ LIVE කලින් API Keys ට ගිහින් නිවැරදි platform key දාන්න (Withdrawals OFF).',
  demo_chart_tag: 'DEMO · public candlesticks · stick patterns · live වගේම tools',
  live_chart_tag: 'LIVE · real desk · orders ට API key ඕන',
  candle_stick_pattern: 'Candle stick pattern',
  candle_no_pattern: 'පැහැදිලි stick pattern නැහැ',
  candle_no_pattern_note: 'අවසාන bars වල major pattern නැහැ — BB / RSI / MACD බලන්න.',
  tour_skip: 'Skip',
  tour_next: 'ඊළඟ',
  tour_finish: 'ඉවරයි',
  welcome_eyebrow: 'Crypto Profit Eye',
  welcome_title: 'Welcome to Trade Pro',
  welcome_tag: 'Spot · Futures · Forex සඳහා professional signal desk',
  agree_h: 'පරිශීලක ගිවිසුම සහ License කොන්දේසි',
  agree_check: 'මම මෙම Agreement කියවා එකඟ වෙමි — license කොන්දේසි සහ market ප්‍රතිඵල මගේ වගකීම බව ඇතුළුව.',
  agree_continue: 'එකඟයි — ඉදිරියට',
  welcome_foot: 'අවුරුදු 18+ විය යුතුයි. මෙම screen එක එක පාරක් (agreement update වුණොත් නැවත).',
  agree_need: 'ඉදිරියට යන්නට agreement box එක tick කරන්න.',
  agree_html: `
    <h4>1. CPE Trade Pro ගැන</h4>
    <p>CPE Trade Pro (<strong>Crypto Profit Eye</strong>) Spot, Futures, Forex charts/signals/tools සමඟ ඔබේ trading වැඩ පහසු කරයි. මෙය ඔබේ තීරණ සඳහා software එකකි — පෞද්ගලික මූල්‍ය උපදෙස් හෝ ලාභ සහතිකයක් නොවේ.</p>
    <h4>2. License සහ මිල</h4>
    <ul>
      <li><strong>නොමිලේ trial:</strong> එක computer එකකට දින 7ක් (එක වතාවක්).</li>
      <li><strong>මාස 3 license:</strong> දැන් <strong>USD 15</strong> (එක Machine ID). අලුත් ගැනුම් සඳහා මිල කාලයත් සමඟ වෙනස් විය හැක.</li>
      <li><strong>Lifetime:</strong> දැන් <strong>USD 100</strong> (එක Machine ID). ඔබ Lifetime key එක buy කර activate කළ පසු <strong>ඒම computer එකට ආයෙත් license ගාස්තුවක් අය නොකරයි</strong>.</li>
      <li>රටේ මුදල් convert පෙන්විය හැක; අවසාන ගෙවීම ownerගේ උපදෙස් + ඔබ තෝරන USD plan අනුවයි.</li>
      <li>එක key = එක Machine ID. අලුත් PC = අලුත් license.</li>
    </ul>
    <h4>3. Market ගැන සරල සටහන</h4>
    <p>Market ඉහළට/පහළට යා හැක. Tools සහ signals උදව් පමණි; ප්‍රතිඵල ඔබේ තීරණ, timing සහ risk අනුව වෙනස් වේ. Exchange API <strong>Withdrawals OFF</strong> තබන්න.</p>
    <h4>4. වගකීම</h4>
    <p>Trading තීරණ සහ exchange orders තහවුරු කිරීම ඔබේ වගකීමයි. නීතියෙන් ඉඩ දෙන තාක් owner/developer trading ප්‍රතිඵල හෝ API/exchange ගැටලු සඳහා වගකිව යුතු නොවේ.</p>
    <h4>5. සම්බන්ධතා</h4>
    <p>WhatsApp: <strong>0774940944</strong> · Email: <strong>Anurasiri123@gmail.com</strong> · Anurasiri Wickramanayake</p>
    <h4>6. එකඟතාව</h4>
    <p>Agree &amp; Continue ඔබීමෙන් මෙම කොන්දේසි පිළිගනී — වත්මන් මිල සහ Lifetime (මේ PC එකට ගෙවූ පසු) ආයෙත් license ගාස්තුවක් නැති බව ඇතුළුව.</p>
  `,
  trial_blurb: 'Computer එකකට trial දින 7ක්. ඊට පසු: මාස 3 = USD 15 හෝ Lifetime = USD 100. Trial ඉවර වුණාම open trades close. මුලින් Language තෝරන්න.',
  lang_first: '① මුලින්ම භාෂාව තෝරන්න — tour, hints, warnings ඒ භාෂාවෙන්.',
  notif_on: 'Notifications: ON',
  notif_off: 'Notifications: OFF',
  notif_on_hint: 'Alerts / toast / sound ON — ආයෙත් OFF කරනකම්.',
  make_shortcuts: 'Desktop / Start shortcuts',
  shortcuts_ok: 'Shortcuts හදන ලදී',
  shortcuts_fail: 'Shortcuts අසාර්ථකයි',
  buy_title: 'License key මිලදී ගන්න',
  buy_choose_plan: '3-Month (USD 15) හෝ Lifetime (USD 100) තෝරන්න. පහළින් රටේ මුදල්.',
  plan_m3: 'මාස 3',
  plan_m3_note: 'දින ~90 · ඊට පසු grace දින 3ක් trades close / renew',
  plan_life: 'Lifetime',
  plan_life_note: 'එක වරක් · මේ computer එකට සදහටම',
  your_currency: 'ඔබේ මුදල්',
  pay_how: 'ගෙවීමේ ක්‍රම',
  buy_send_proof: 'Machine ID + plan + payment proof WhatsApp එකට එවන්න.',
  lic_pay_h: 'License ගෙවීම',
  license_ended: 'License / trial ඉවරයි',
  license_warn_title: 'License අනතුරු ඇඟවීම',
  guard_warn_title: 'Activation කේතය වැරදියි',
  guard_warn_body: 'එම activation කේතය වැරදියි. තව {left} වතාවක් වැරදුනොත් සියලුම සංඥා block වේ.',
  guard_locked_title: 'සියලුම සංඥා block කර ඇත',
  guard_locked_body: 'වැරදි activation කේත ගොඩක් ඇතුළත් කර ඇත. නිවැරදි owner key එකක් activate කරන තෙක් සංඥා නිකුත් නොවේ. WhatsApp 0774940944.',
  guard_tamper_title: 'Software වෙනස් කර ඇත',
  guard_tamper_body: 'Software file වෙනස් කර ඇත. සංඥා block කර ඇත. මුල් setup එක නැවත install කරන්න, නැත්නම් owner අමතන්න (WhatsApp 0774940944).',
  warn_d14: 'මාස 3 license ඉවර වෙන්න දින {d}ක්. Renew කරන්න හෝ Lifetime USD 100 ගන්න.',
  warn_d7: 'සතියක් ඉතිරියි ({d} days). ඉක්මනින් renew / Lifetime USD 100.',
  warn_d3: 'දින {d}ක් ඉතිරියි. ඉවර වුණාම grace දින 3ක් — ඊට පසු open trades auto close.',
  warn_d1: 'අන්තිම දවස. Trades close කරන්න හෝ අලුත් key ගන්න. Grace දින 3ට පසු auto close. Lifetime = USD 100.',
  warn_grace: 'Grace: දින {d}ක්. Trades close කරන්න හෝ අලුත් key activate කරන්න — නැත්නම් auto close.',
  tour_lang_title: 'භාෂාව සහ Theme',
  tour_lang_body: 'Tour භාෂාව: {lang}. Language gate/sidebar එකෙන්. Trial 7ට පසු: මාස 3 = USD 15 හෝ Lifetime = USD 100.',
  tour_1_title: 'Chart Lab',
  tour_1_body: 'Spot / Futures / Forex තෝරලා pair analyze. Candles, stick patterns, RSI — Trade Now ට යවන්න හෝ Live Help අහන්න.',
  tour_2_title: 'Spot Desk',
  tour_2_body: 'USDT pairs scan කරන්න. Row එකක් click → candle chart + හේතු. Interval: 15m / 30m / 1H / 4H / 1D.',
  tour_3_title: 'Futures Desk',
  tour_3_body: 'Perp signals. BUY = TP+SL උඩට; SELL = යටට. Trade කරද්දී Cross හෝ Isolated තෝරන්න.',
  tour_4_title: 'Forex Desk',
  tour_4_body: 'FX pairs — crypto වගේම BUY/SELL/HOLD score. Chart + psychology. Trade Now එකෙන් Forex practice.',
  tour_5_title: 'Trade Now',
  tour_5_body: 'දිලිසෙන Trade Now = Manual + Auto. DEMO = practice; LIVE = platform API key ඕන.',
  tour_6_title: 'Positions',
  tour_6_body: 'TP/SL/trail edit, partial close, auto cancel. Trial ඉවර වුණාම open trades close වෙනවා.',
  tour_7_title: 'Live Help',
  tour_7_body: 'Owner chat (trial + license). WhatsApp එකට Machine ID යවලා live help ගන්න.',
  tour_8_title: 'News & Tricks',
  tour_8_body: 'Crypto headlines, forex tips, සහ සෑම platform එකකටම API tricks.',
  tour_9_title: 'Learning Class',
  tour_9_body: 'Candle cards, platform A→Z (Binance…), Forex Trading A→Z — app භාෂාවෙන්.',
  tour_10_title: 'Journal',
  tour_10_body: 'Close වුණු trades PnL history.',
  tour_11_title: 'API Keys',
  tour_11_body: 'ඔබේ platform තෝරලා ඒකේ fields. Charts keys නැතුවත් OK; live ට නිවැරදි key. Withdrawals OFF.',
  tour_12_title: 'Help',
  tour_12_body: 'භාවිත මග + platform API guides ඔබේ භාෂාවෙන්.',
  tour_13_title: 'License',
  tour_13_body: 'මාස 3 USD 15 හෝ Lifetime USD 100 — Bank / Binance / PayPal. Machine ID + proof WhatsApp.',
  language: 'භාෂාව',
  scan: 'Scan Market',
  auto_scan_on: 'Auto Scan ON',
  auto_scan_off: 'Auto Scan OFF',
  scanning: 'Scanning...',
  spot_title: 'Spot Desk',
  spot_sub: 'Bollinger · Fibonacci · Candles · MACD · Momentum · Psychology',
  fut_title: 'Futures Desk',
  fut_sub: 'USDT-M Perpetual · වෙනම signal board',
  trade_title: 'Trade Now',
  trade_sub: 'Manual + Auto · DEMO practice · LIVE = platform API',
  pos_title: 'Positions / TP',
  pos_sub: 'Open trades live monitor',
  journal_title: 'Trade Journal',
  journal_sub: 'වැසුණු trades PnL history',
  keys_title: 'API Keys',
  keys_sub: 'ඔබ trade කරන platform එකේ නිවැරදි key (අහඹු key නොවේ)',
  help_title: 'Help',
  help_sub: 'CPE Trade Pro භාවිතය',
  help_plat_h: 'Platform API connect (API Keys පිටුව වගේම)',
  help_plat_sel: 'Platform තෝරන්න',
  license_title: 'License',
  license_sub: 'Machine-locked activation',
  owner_title: 'Owner Tools',
  owner_sub: 'ගනුදෙනුකරු license හදන්න',
  pairs: 'USDT Pairs',
  bb_lower: 'BB Lower',
  new_watch: 'අලුත් / Watch',
  signals: 'Signals',
  search_ph: 'Pair / BUY / SELL සොයන්න',
  chart_why: 'Chart + හේතු',
  save_screenshot: '⤓ රූපය save කරන්න',
  shot_saved: 'රූපය save වුණා',
  shot_failed: 'රූපය save කරන්න බැරි වුණා',
  click_row: 'පේළියක් click කරන්න',
  bb_candidates: 'Bollinger Lower Band Buy Candidates',
  new_pairs: 'අලුත් Pairs',
  upcoming_pairs: 'ඉදිරියට එන Listings',
  upcoming_hint: 'Binance එකෙන් ප්‍රකාශ කරලා තවම list නොවුණු coins — list වෙන වෙලාව අනුව (ඉක්මනින්ම list වෙන එක උඩින්ම). List වෙන්න දවස් 3 / දවස් 1 / පැය 3 / මිනිත්තු 30 කලින් highlight වෙනවා; එකක් live වෙන මොහොතේ notification එකක් එනවා.',
  no_upcoming: 'දැනට අලුත් listing ප්‍රකාශයක් නැහැ',
  listing_soon: 'ඉක්මනින්',
  announced: 'ප්‍රකාශය',
  just_listed: 'අලුත් LISTING',
  day: 'දින',
  days: 'දින',
  min: 'මිනිත්තු',
  ago: 'කට පෙර',
  watchlist: 'Watchlist',
  fut_signals: 'Futures Signals',
  fut_chart: 'Futures Chart + Psychology',
  fut_bb: 'Futures Bollinger Lower Buys',
  manual_trade: 'Manual Trade',
  place_live: 'Start Live Trade',
  paper: 'Start Demo / Paper Trade',
  trade_warn: 'DEMO = practice (key නැතුව). LIVE = platform API key. Withdrawals OFF.',
  auto_trade: 'Auto Trade',
  auto_buy: 'Auto BUY (BB Lower + strong score)',
  auto_tp: 'Auto Take-Profit / Close monitor',
  save_auto: 'Auto Config Save',
  open_autos: 'Open Auto Trades',
  positions_h: 'Open Positions — TP/SL Live Monitor',
  positions_p: 'තත්පර 15කට price check — TP/SL alarm + auto close',
  journal_h: 'Trade Journal (Profit / Loss)',
  sig_board: 'මේ software එකේ signal එකට කළ trade වල ඇත්ත ප්‍රතිඵලය',
  sig_empty: 'තවම signal trade එකක් වැසී නැහැ. BUY හෝ SELL පේළියක් click කරලා trade කරන්න. එය වැසෙනකොට ඇත්ත ලාභය හෝ පාඩුව මෙතන වෙනම පෙනේ.',
  sig_line_profit: 'ලාභය — signal එක හරි වැඩ කළා',
  sig_line_loss: 'ලාභයක් නැහැ — මේ වතාවේ signal එක වැඩ කළේ නැහැ',
  sig_line_flat: 'බොහෝ දුරට සම — ලාභයක් හෝ පාඩුවක් නැති තරම්',
  sig_count: 'Signal trades',
  sig_profit_n: 'ලාභය ආවා',
  sig_loss_n: 'ලාභයක් නැහැ',
  sig_flat_n: 'සම',
  sig_rate: 'දිනූ අනුපාතය',
  sig_avg: 'සාමාන්‍ය ප්‍රතිඵලය',
  sig_honest: 'මෙතන පෙනෙන දිනූ අනුපාතය signal එකට කළ වැසුණු trade වලින් ගණන් කළ ඇත්ත ප්‍රතිඵලයයි. Market එකත් එක්ක ඒක වෙනස් වෙනවා. 99.99% කියලා ස්ථිර අංකයක් නෙවෙයි.',
  api_h: 'Binance API Key',
  keys_none: 'Keys නැත — live trading වලට ඕනේ',
  save_keys: 'Keys Save',
  clear: 'Clear',
  test_account: 'Account Test',
  license_active: 'License ACTIVE — මෙම machine එකට බැඳී ඇත',
  license_inactive: 'Inactive',
  lic_activate_h: 'License එක activate / renew කරන්න',
  lic_key_note: 'අලුත් key එකක් owner ගෙන් ගෙන paste කරලා activate කරන්න. Lifetime එක එක වතාවක් පමණි — activate වුණාම මේ box එක lock වෙනවා.',
  lic_key_locked: 'Lifetime active — key එකක් අවශ්‍ය නෑ. මේ box එක lock වෙලා.',
  lic_key_ok: 'License activate වුණා.',
  lic_key_fail: 'ඒ key එක වැඩ කළේ නෑ.',
  owner_h: 'Owner License Generator',
  owner_p: 'අයිතිකරුට පමණි — Machine ID වලින් key',
  owner_pass: 'Owner Password',
  customer_mid: 'Customer Machine ID',
  gen_key: 'License Key හදන්න',
  why: 'හේතු (Why)',
  psych: 'Psychological / Mental method',
  no_bb: 'Lower band candidates නැත',
  no_new: 'දෙවන scan එකෙන් පසු අලුත් listings',
  watch_hint: '★ Pair watchlist එකට දාන්න',
  no_auto: 'Open auto trades නැත',
  no_pos: 'Open positions නැත',
  no_journal: 'Journal හිස්යි',
  scan_done: 'Scan complete',
  scan_err: 'Scan error',
  copied_mid: 'Machine ID copy වුණා',
  activate_fail: 'Activate අසාර්ථකයි',
  keys_need_both: 'API Key සහ Secret දෙකම ඕනේ',
  keys_saved: 'Keys save වුණා',
  keys_test_ok: 'API test OK',
  keys_test_fail: 'API test අසාර්ථකයි',
  keys_live_ready: 'LIVE ready (මේ platform එකට key+secret OK)',
  keys_saved_paper: 'Saved (paper / bridge only)',
  keys_incomplete: 'Credentials අඩුයි',
  order_err: 'Order error',
  paper_added: 'Positions වලට එකතු වුණා',
  auto_saved: 'Auto config save වුණා',
  watch_added: 'Watchlist එකට එකතු වුණා',
  closed: 'Closed',
  candle_close: 'close',
  api_guide_title: 'Binance API Key සහ Secret ගන්නා විදිහ',
  api_guide_html: `
    <h4>පියවරෙන් පියවර (Binance වෙබ් / ඇප්)</h4>
    <ol>
      <li><strong>www.binance.com</strong> විවෘත කර ඔබේ account එකට login වෙන්න.</li>
      <li>ඉහළ දකුණේ profile icon එක → <strong>API Management</strong> තෝරන්න
        (හෝ Profile → Account → API Management).</li>
      <li>අවශ්‍ය නම් email / SMS / authenticator verification සම්පූර්ණ කරන්න.</li>
      <li><strong>Create API</strong> බොත්තම ඔබන්න.</li>
      <li><strong>System generated</strong> API key තෝරන්න (නිර්දේශිත).</li>
      <li>නමක් දෙන්න, උදා: <em>CPE Trade Pro</em> — ඊට පසු confirm කරන්න.</li>
      <li><strong>API Key</strong> සහ <strong>Secret Key</strong> වහාම copy කරන්න
        (Secret එක පෙන්වන්නේ එක වතාවක් පමණි — ආරක්ෂිතව තබාගන්න).</li>
      <li>ඉහත boxes වල paste කර <strong>Keys Save</strong> ඔබන්න.</li>
    </ol>
    <h4>Permissions (ඉතා වැදගත්)</h4>
    <ul>
      <li><strong>Enable Reading</strong> සක්‍රිය කරන්න (අනිවාර්ය).</li>
      <li>Spot orders සඳහා: <strong>Enable Spot &amp; Margin Trading</strong> සක්‍රිය කරන්න.</li>
      <li>Futures සඳහා: <strong>Enable Futures</strong> සක්‍රිය කරන්න.</li>
      <li><strong>Enable Withdrawals = OFF</strong> තබන්න — මුදල් ආපසු ගැනීමේ අවසරය දෙන්න එපා.</li>
    </ul>
    <p>ඔබේ public IP එක මාරු වී Binance <strong>-2015</strong> දෙනවා නම්, option එක තිබේ නම් IP
    access සඳහා <strong>Unrestricted</strong> තෝරන්න (නැත්නම් trusted-IP restriction off කරන්න).
    මෙය IP access එක පමණක් වෙනස් කරනවා; සියලු API permissions enable කිරීමක් නොවේ. Withdrawals OFF
    තබන්න. ස්ථිර IP එකක් තිබේ නම් fixed-IP whitelist වඩා ආරක්ෂිතයි.</p>
    <h4>මෙහි දාන්න එපා</h4>
    <ul>
      <li>Binance email / username හෝ login <strong>password</strong> මෙහි දාන්න එපා.</li>
      <li>මේ software එකට ඕනේ API Key + Secret පමණයි.</li>
    </ul>
    <h4>Save කළාට පසු</h4>
    <ul>
      <li><strong>Account Test</strong> ඔබලා keys හරිද බලන්න.</li>
      <li>ඊට පසු Manual / Auto Trade පිටුවලින් order දාන්න.</li>
    </ul>
    <p class="tiny">Binance key එක renew/edit කළාට පසු මේ app එකේත් නැවත save කරන්න; එවිට දින 25
    review reminder එක නැවත පටන් ගනී. Reminder එක Binance හි සැබෑ expiry දිනය දන්නේ හෝ තහවුරු කරන්නේ නැහැ.</p>
  `,
  demo_expired_title: 'DEMO practice ඉවරයි',
  demo_expired_body: 'DEMO ඉවරයි. Key නැත්නම් trial/DEMO දින 7. Paid key නම් DEMO මාස 3 — ඊට පසු LIVE + Live Help තියෙනවා.',
  demo_days_left: 'Demo ඉතිරි දින: {d}',
  demo_paid_start_title: 'Paid DEMO පටන් ගත්තා',
  demo_paid_start_body: 'Activation OK. DEMO මාස 3ක්. DEMO ඉවර උනත් Live Help තියෙනවා.',
  livehelp_locked_title: 'Live Help lock',
  livehelp_locked_body: 'Live Help = active trial හෝ activation key. Buy කළාම DEMO මාස 3කට පසුත් Live Help තියෙනවා.',
  ref_title: 'Referral',
  ref_rules: 'අලුත් කෙනෙකුට (වෙන network එකකින්) code දෙන්න. එකම Wi‑Fi/lab = ගණන් නැහැ. පළමු 10 = +1 දින; ඊට පසු +0.5. උපරිම දින 365 — ඊට පසු referral වලින් activation දිග නොවේ. Lifetime = claim slip; real key එක Owner විතරක් හදනවා. Hack/forge keys auto off + admin report.',
  ref_code_label: 'Referral code (optional)',
  ref_human_confirm: 'මම real person කෙනෙක් (farm / bot / same-lab නෙවෙයි)',
  ref_apply_label: 'යාළුවාගේ code apply කරන්න (මේ PC · එක වතාවක්)',
  ref_apply_btn: 'Referral apply',
  ref_proof_out: 'Referrer ට යවන්න ඕන proof',
  ref_redeem_label: 'Proof redeem (ඔබ referrer නම්)',
  ref_redeem_btn: 'Referral proof redeem',
  ref_keys_h: 'මගේ claim slips (Lifetime — Owner real key හදනවා)',
  ref_keys_empty: 'Claim slips නැත (Lifetime referrersට විතරයි).',
  ref_proof_ready_title: 'Referral proof ready',
  ref_proof_ready_body: 'License → Referral වලින් proof එක referrer ට යවන්න.',
  demo_ref_tip: 'Referral: License → code share · max +365d · owner keys විතරක්.',
  warn_ref_tip: ' Tip: Referral (License) වලින් දින ලබාගන්න (max 365). Activate වෙන්නේ owner key විතරයි.',
  lang_synced_title: 'භාෂාව update වුණා',
  lang_synced_body: 'Menus, Help, Learning Class සහ notifications දැන් මේ භාෂාවෙන්.',
  help_html: `
    <h3>CPE Trade Pro — Help (update)</h3>
    <article><h4>1) Platform API Keys</h4>
    <p><strong>API Keys</strong> වලින් platform තෝරලා ඒකේ Key + Secret දාන්න (OKX/KuCoin/Bitget = Passphraseත්). Save කළාම auto Test. <strong>Withdrawals OFF</strong>.</p>
    </article>
    <article><h4>2) DEMO vs LIVE</h4>
    <ul>
      <li><strong>DEMO</strong> = practice (charts, patterns, Trade Now, TP/SL) — මුදල් නැතුව</li>
      <li>DEMO කාලය මේ PC එකට <strong>මාස 3ක්</strong> — ඊට පසු DEMO off, <strong>LIVE</strong> විතරක්</li>
      <li>LIVE = නිවැරදි platform API key ඕන</li>
    </ul></article>
    <article><h4>3) Software</h4>
    <ul>
      <li><strong>Chart Lab</strong> — candles + patterns · <strong>+ / − / Reset</strong> හෝ mouse wheel zoom</li>
      <li><strong>Trade Now</strong> — Manual + Auto</li>
      <li>Spot / Futures / Forex · News · Learning Class · Live Help · Positions</li>
    </ul></article>
    <article><h4>4) License</h4>
    <ul>
      <li>Trial දින 7 · <strong>මාස 3 = USD {m3}</strong> හෝ <strong>Lifetime = USD {life}</strong></li>
      <li>මිල owner වෙනස් කළොත් Buy/License තැන් සියල්ල update වෙනවා</li>
      <li>WhatsApp 0774940944</li>
    </ul></article>
    <article><h4>5) Referral system (පියවරෙන් පියවර)</h4>
    <ol>
      <li><strong>License → Referral</strong> විවෘත කරලා ඔබේ <strong>code</strong> එක Copy කරන්න (CPE-R-…).</li>
      <li>ඒ code එක <strong>අලුත් කෙනෙකුට</strong> දෙන්න — <strong>වෙන Wi‑Fi / network</strong> එකකින් (එකම lab/router = ගණන් ගන්නේ නැහැ).</li>
      <li>ඒ කෙනා <strong>real person</strong> tick කරලා code දාලා <strong>Trial start</strong> හෝ paid key activate කරනවා.</li>
      <li>ඒකෙන් හැදෙන <strong>proof</strong> (CPE-P.…) ඔබට යවනවා.</li>
      <li>ඔබ <strong>Redeem</strong> කරනවා → කාලය ලැබෙනවා:
        <ul>
          <li>පළමු <strong>10</strong> = එකකට <strong>+1 දින</strong></li>
          <li>10න් පසු = <strong>+0.5 දින</strong></li>
          <li><strong>උපරිම +365 දින</strong> — ඊට පසු referral වලින් activation දිග නොවේ</li>
        </ul>
      </li>
      <li><strong>Trial / මාස 3</strong> = ඔබේ කාලයට දින එකතු වෙනවා.</li>
      <li><strong>Lifetime</strong> = <strong>claim slip</strong> එකක් ලැබෙනවා (live key නෙවෙයි). Slip + buyer Machine ID Owner ට යවලා real timed key ගන්න.</li>
      <li>Software activate වෙන්නේ <strong>Owner හදන key</strong> වලින් විතරයි. Hack/forge keys block වෙලා admin ට report වෙනවා.</li>
    </ol></article>
    <article><h4>6) Stop Loss / Trailing — stop-hunt අඩු කරලා profit රැකගන්න</h4>
    <ul>
      <li>පරණ trail <strong>0.05%</strong> ඉතා තදයි — wick එකකින් SL “hunt” වෙලා ඉක්මනින් close වුණා.</li>
      <li>අලුත් default <strong>Trail % = 1.2</strong> (අවම <strong>0.4</strong>). හොඳ පරාසය: <strong>1.0 – 2.0%</strong> (Trade Now / Auto / Positions).</li>
      <li>Profit ~<strong>0.6%+</strong> වෙනකම් trailing start වෙන්නේ නැහැ — entry ළඟ noise එකට SL චලනය වෙන්නේ නැහැ.</li>
      <li>SL close වෙන්න <strong>ticks 2ක්</strong> confirm + buffer ඕන (එක spike එකකින් නෙවෙයි).</li>
      <li>Signal SL අවම ~<strong>1.2%</strong> gap — hunt tags අඩුයි.</li>
      <li><strong>TP1 partial</strong> + trail එකෙන් profit lock කරන්න; <strong>Positions</strong> වලින් SL edit කරන්න.</li>
    </ul></article>
    <article><h4>7) Software start</h4>
    <ul>
      <li><strong>START-CPE-Trade-Pro.bat</strong> click කරන්න (හෝ Desktop shortcut).</li>
      <li>පළමු වතාවට npm install වෙන්න පුළුවන්; ඊට පසු <code>npm start</code> වලින් app එක open වෙනවා.</li>
    </ul></article>
    <article><h4>8) Click සහ double-click</h4>
    <ul>
      <li>Signal පේළියක් <strong>එක වරක්</strong> click කළාම ඒක තෝරෙනවා. පැත්තේ chart එක පිරෙනවා.</li>
      <li><strong>දෙවරක්</strong> click කළාම ලොකු chart popup එක එනවා.</li>
      <li><strong>Chart + Why</strong> හිස එක click කළාම ඒ chart එක popup වෙනවා.</li>
      <li>Bollinger candidate එකක් click කළාමත් chart popup එක එනවා.</li>
    </ul></article>
    <article><h4>9) පාට</h4>
    <ul>
      <li><strong>BUY</strong> නිල්. <strong>SELL</strong> රතු. <strong>HOLD</strong> සුදු.</li>
      <li>තරුව (favorite) දැම්මාම පේළිය <strong>කහ</strong>. තරුව අයින් කළාම HOLD නම් ආපහු සුදු.</li>
    </ul></article>
    <article><h4>10) Score එක හැදෙන විදිහ</h4>
    <p>Score එක හැදෙන්නේ මිල සහ volume වලින් විතරයි. Psychology වාක්‍ය වෙනම checklist එකක්. ඒවා score එකට ලකුණු එකතු කරන්නේ <strong>නැහැ</strong>.</p>
    <p><strong>Psychology බලන විදිහ:</strong> පේළියක් double-click කරන්න, නැත්නම් Chart + Why click කරන්න. Chart එක යට BUY / SELL / HOLD එකට ගැලපෙන වාක්‍ය තියෙනවා. Start දාන්න කලින් ඒවා එක එක බලන්න. FOMO වලින් දුවනවාද? Size එක account එකෙන් 1–2% විතරද? Stop එකක් තියෙනවාද? පාඩුවකට පස්සේ ආපහු දිනන්න උත්සාහයක්ද? සැලැස්ම ලියලා මනස බැලුවද? BUY නම් support එකේ ඉන්න, TP1 එකේ කොටසක් ගන්න. SELL නම් panic නොකරන්න, trail එකෙන් ලාභය රකින්න. එකක් හරි නැත්නම් trade එකට නොයන්න.</p>
    <ul>
      <li>Bollinger පහළ band එක ළඟ: <strong>+3</strong>. උඩ band එක ළඟ: <strong>−3</strong>.</li>
      <li>EMA golden cross: <strong>+3</strong>. Death cross: <strong>−3</strong>.</li>
      <li>RSI 30ට අඩු: <strong>+2</strong>. RSI 70ට වැඩි: <strong>−2</strong>.</li>
      <li>Fibonacci support: <strong>+1</strong>. Resistance: <strong>−1</strong>.</li>
      <li>BUY candle: <strong>+2</strong>. SELL candle: <strong>−2</strong>.</li>
      <li>මිල SMA50 ට උඩ: <strong>+1</strong>. යට: <strong>−1</strong>.</li>
      <li>MACD උඩට: <strong>+2</strong>. යටට: <strong>−2</strong>.</li>
      <li>කෙටි නැගීම/බැසීම, දිගු trend, volume spike එක එකට <strong>1</strong>ක් එකතු හෝ අඩු වෙන්න පුළුවන්.</li>
    </ul>
    <p>Score <strong>3</strong> හෝ වැඩි = BUY. <strong>−3</strong> හෝ අඩු = SELL. අතර = HOLD. Spot, Futures, Forex තුනටම එකම නීතිය.</p>
    </article>
    <article><h4>11) Caution සහ Strong — හරියට කියවන්න</h4>
    <p><strong>Caution</strong> සැහැල්ලු signal එකයි. Score එක 3 (SELL නම් −3) වෙද්දී BUY හෝ SELL වෙනවා, නමුත් Strong චෙක් ඔක්කොම සමත් වෙලා නැහැ. Caution එක පොරොන්දුවක් නෙවෙයි. කලින්, දුර්වල අදහසක්. පේළිය BUY නම් නිල්, SELL නම් රතු. CAUTION කියන වචනය පේළියේ තියෙනවා.</p>
    <p><strong>Strong</strong> ඊට වඩා දැඩියි. Score එක විතරක් ඇතුළත් නැහැ. Score 10 තිබුණත් Caution වෙන්න පුළුවන්. මේ ඔක්කොම එකවර ඕනේ:</p>
    <ul>
      <li>BUY නම් score <strong>6</strong> හෝ වැඩි. SELL නම් score <strong>−6</strong> හෝ අඩු.</li>
      <li>ඒ පැත්තේ වෙනම චෙක් <strong>3</strong>ක් ඕනේ (band, EMA, RSI, Fibonacci, candle, SMA50, MACD, momentum).</li>
      <li>ඒ පැත්තේ චෙක්, අනිත් පැත්තට වඩා අඩුම තරමේ <strong>2</strong>කින් වැඩි වෙන්න ඕනේ. BUY චෙක් 3යි SELL චෙක් 2යි නම් Strong නෙවෙයි.</li>
      <li>පළමු ඉලක්කය, stop එකට වඩා අඩුම තරමේ <strong>1.1</strong> ගුණයක් දුර තියෙන්න ඕනේ. Stop එක ළඟ නම් Strong එක Caution බවට වෙනවා.</li>
    </ul>
    <p>දැඩි setup එක ඕන නම් Strong trade කරන්න. Caution එක Strong එක වගේ නෙවෙයි. බලාගෙන ඉන්න එකක් විදිහට ගන්න.</p>
    <p><strong>Higher Strong</strong> කියන්නේ මුල් signal එක Strong වෙලා, අවසන් වසා ඇති ඉහළ timeframe trend එකත් ඒ පැත්තට එකඟ වීමයි. උදාහරණයක්: 15m signal එක 1h trend එකෙන් පරීක්ෂා කරනවා. ඒ data නැත්නම් හෝ විරුද්ධ නම් signal එක Strong විදිහටම තියෙනවා. මෙය තහවුරු කිරීමක් පමණයි; ලාභ සහතිකයක් නොවේ.</p>
    </article>
    <article><h4>12) Signal History</h4>
    <ul>
      <li>සෑම BUY/SELL එකක්ම <strong>ඩොලර් 10</strong>ක් දාලා වගේ ගණන් කරනවා. මේක කඩදාසි වාර්තාවක්. ඇත්ත wallet එක නෙවෙයි.</li>
      <li>උඩ <strong>Spot Signal</strong>, <strong>Future Signal</strong>, <strong>Forex Signal</strong> බොත්තම්. Click කළ market එක විතරක් පෙනෙනවා. මුලින් Spot.</li>
      <li>දකුණේ chart එක ඒ pair එකේ live market candles වලින් යනවා. <strong>පටන් ගත් chart</strong> සහ <strong>ඉවර chart</strong> save කළ පින්තූර.</li>
      <li>උඩින් <strong>Triggered</strong> සහ <strong>Strong large profit</strong>. ඊළඟට Open, Take profit / trail lock, Stop loss.</li>
      <li>මිල ලාභයට ගියාම SL එකයි TP එකයි එක්ක යනවා. BUY නම් උඩට. SELL නම් යටට. Row එකේ TP සහ SL කොච්චර වැඩි වුණාද පෙනෙනවා. History chart එකේ රන් TRIGGER ලකුණ ඒ තැන පෙන්වනවා.</li>
      <li>Trigger වුණු row එක රන් පසුබිමකින්. Strong signal එකකින් 2% වගේ හෝ ඊට වැඩි ලාභයක් ආවොත් cyan පසුබිමකින්.</li>
      <li>වැසුණු pair එකක් click කරන්න, නැත්නම් <strong>Chart at start</strong> / <strong>Chart at end</strong> click කරන්න. Popup එකේ chart දෙකම එනවා.</li>
    </ul></article>
    <article><h4>13) Manual trade සහ Auto trade</h4>
    <ul>
      <li><strong>Trade Now → Manual:</strong> platform එක සහ Spot / Futures / Forex තෝරන්න. ඒ market එකේ දැන් තියෙන BUY/SELL ලැයිස්තුව එනවා. Pair එක click කළාම symbol, side, entry, TP, SL පිරෙනවා. ඊට පස්සේ Start.</li>
      <li><strong>Auto:</strong> tick දෙකක් — <strong>Trade Strong signals</strong> සහ <strong>Trade Caution signals</strong>. එකක් හෝ දෙකම. ඊට පස්සේ <strong>Save Auto Config</strong>. “Saved” පණිවිඩය එනවා.</li>
      <li>Auto එක BUY විතරයි. Strong trade එක ලාභය දුරට යන්න ඉඩ දෙනවා. Caution trade එක ලාභය ඉක්මනට අගුළු දානවා.</li>
      <li><strong>Use money management:</strong> අවශ්‍ය නම් tick කරන්න. On නම් size එක stop එකෙන්. එක trade එකක් $1000 practice account එකකින් (වැසුණු results සමඟ) 1%ක් විතර risk කරනවා. අවම ප්‍රමාණයෙන් ඊට වඩා risk වෙනවා නම් ඒ trade එක මඟ හරිනවා. දවසේ −2%කට පස්සේ අලුත් auto නවත්වනවා. Manual එකේත් ඒ tick එක තියෙනවා. සම්පූර්ණ සටහන Learning Class → Money Management. Signal History එකේ $10 පරීක්ෂණය සහ 1% plan size දෙකම පෙනෙනවා.</li>
      <li><strong>Band ride:</strong> BUY එක පහළ හෝ මැද band එකේ සිට උඩ band එක දක්වා අල්ලාගෙන යනවා. SELL එක උඩ හෝ මැද සිට පහළ band එක දක්වා. Futures සහ Forex දෙපැත්තටම. Stop එක ලාභය ආවම විතරක් යනවා, wick එකකින් hunt නොවන පරතරයක් තියෙනවා. දුර band එක පසු කරන බව confirm උනොත් ඉලක්කය එක පියවරක් තව යනවා. හැම signal එකම trail වෙන්නේ නැහැ. Signal History ලාභය commission අඩු කරලා පෙනෙනවා (Spot 0.20%, Futures 0.08%, Forex 0.03%).</li>
      <li>අලුත් Strong signal එකකට වෙන ශබ්දයක් යනවා. Popup එක <strong>රන්</strong> පාටින් එනවා. Windows notification එකත් එනවා.</li>
    </ul></article>
    <article><h4>14) අවවාදය</h4>
    <p>Analysis tool එකක්. Financial advice නොවේ. Trading එකේ අවදානම තියෙනවා. Strong කියලා ලියලා තිබුණාට ජයක් පොරොන්දු වෙන්නේ නැහැ.</p></article>
    <article><h4>15) Market volatility සහ Martingale (optional)</h4>
    <p><strong>Market volatility</strong> කියන්නේ මිල කොච්චර වෙනස් වෙනවද කියන එක — කොයි පැත්තටද නෙවෙයි. දැන් සෑම signal එකකම reading එකක් තියෙනවා — <strong>LOW / NORMAL / HIGH / EXTREME</strong> — සහ signal එකේ “why” එක ඇතුළේ සරල භාෂාවෙන් reason line එකක්. ඒක pair එකේ මෑත candle range එකයි Bollinger band පළලයි ඒ pair එකේම normal එකට compare කරලා ගන්නවා.</p>
    <ul>
      <li>Tape එක <strong>EXTREME</strong> වුණාම, අලුත් STRONG signal එකක් <strong>CAUTION</strong> ට downgrade වෙනවා, හේතුවත් පෙන්වනවා. Whipsaw market එකක එකම setup එක ගොඩක් වැඩිපුර fail වෙනවා.</li>
      <li>HIGH හෝ EXTREME වලදී: size අඩු කරන්න, stop ඈතට තියන්න, trades අඩු කරන්න. Mid-candle spike එකක් නෙවෙයි, complete වුණු candle එකක් එනකම් ඉන්න.</li>
    </ul>
    <p><strong>Martingale (optional, default off).</strong> ඒ trade එකම manage කරන්න Manual එකේ tick කරන්න, නැත්නම් Auto session එකක ඒකේ auto trades manage කරන්න tick කරන්න. DEMO සහ LIVE දෙකටම වැඩ කරනවා. Extra order එකක් add කරන්නේ මේ <em>දෙකම</em> සත්‍ය වුණොත් විතරයි: (1) මිල trade එකට විරුද්ධව අඩුම තරමින් <strong>step × rung %</strong> ක් ගිහින්, සහ (2) ඒ pair එකට තවම අලුත් එකම පැත්තේ signal එකක් තියෙනවා නම්. මිල බැස්ස නිසා විතරක් කවදාවත් add කරන්නේ නෑ.</p>
    <ul>
      <li><strong>Step %</strong> — හැම add එකකට කලින් ඕන adverse move එක.</li>
      <li><strong>Multiplier</strong> — හැම add එකක size එක base එකට සාපේක්ෂව (1 = flat, 2 = double).</li>
      <li><strong>Max adds</strong> — extra orders වලට hard limit එක (0–6).</li>
      <li><strong>Ladder risk cap %</strong> — මුළු ladder එකේම risk එක equity එකෙන් % ක් ලෙස. ඊළඟ add එක ඔබේ cap එක පහු කරන්න යනවා නම් CPE ඒක refuse කරනවා. Exchange minimum size සහ daily −2% stop තවමත් respect කරනවා.</li>
    </ul>
    <p>Averaging down එකෙන් risk ඉවර වෙන්නේ නෑ — කුඩා losses ගොඩක් එක ලොකු loss එකක් බවට හරවනවා. මුලින්ම DEMO එකේ ඉගෙන ගන්න, numbers කුඩාව තියාගන්න, Learning Class → Volatility &amp; Martingale කියවන්න. Numbers හතරම ඔබට set කරන්න පුළුවන්.</p></article>
    <article><h4>16) Chart Lab indicator bar — අලුත් දේ</h4>
    <ul>
      <li>Chart Lab එකේ දැන් chart එක යට <strong>Indicators</strong> පේළියක් තියෙනවා. හැම button එකක්ම on/off tick එකක් — click කළාම chart එක එසැණින් redraw වෙනවා.</li>
      <li>Buttons: <strong>RSI (14)</strong>, <strong>Stoch</strong> (14,3,3), <strong>MACD</strong> (12/26/9), <strong>ADX</strong> / DMI (14), <strong>Volume</strong>, <strong>EMA 9/21</strong>, <strong>SMA 50</strong>, <strong>BB</strong> (20,2), <strong>Ichimoku</strong> (9,26,52), <strong>VWAP</strong> සහ <strong>Elliott</strong> (wave count).</li>
      <li><strong>Stochastic</strong> <strong>~80ට උඩ</strong> = overbought zone, <strong>~20ට යට</strong> = oversold zone; %K / %D cross එක තමයි study එක.</li>
      <li><strong>ADX</strong> පෙන්වන්නේ trend එකේ <em>ශක්තිය</em>, දිශාව නෙවෙයි — ~25ට උඩ trend එකක් යනවා, ~20ට යට market එක කැළඹිලියි. +DI, −DI ට වඩා උඩ = buyers; −DI උඩ = sellers.</li>
      <li><strong>Ichimoku</strong> Tenkan / Kijun lines සහ Senkou cloud එක අඳිනවා; ඉහළ යන cloud එකකට උඩ මිල bullish, පහළ යන cloud එකකට යට bearish.</li>
      <li><strong>VWAP</strong> කියන්නේ volume-weight කළ සාමාන්‍ය මිල — institutional benchmark line එක.</li>
      <li>මේ අලුත් tools score engine එකටත් ඒවා යන පැත්තට feed වෙනවා, ඒ නිසා setup එකක් BUY / SELL දක්වා තල්ලු වෙන්නත්, මිශ්‍රව HOLD වෙන්නත් පුළුවන්. ඒවා confirmations, triggers නෙවෙයි.</li>
      <li>Checks වැඩි නිසා <strong>CAUTION</strong> එකට score ≥ 4 <em>සහ</em> අවම එකඟ checks 3ක් ඕන — ඒ නිසා app එක over-signal වෙන්නේ නෑ.</li>
    </ul></article>
    <article><h4>17) Elliott Wave count</h4>
    <ul>
      <li>Indicator bar එකේ <strong>Elliott</strong> tick කරන්න. Engine එක අවසන් swing pivots හොයාගෙන ඒවා Elliott නීති වලට test කරනවා.</li>
      <li>Shape එක ගැළපුනොත් <strong>0-1-2-3-4-5</strong> label කරනවා (තවම යන wave එක කහ පාටින්) සහ <strong>W5 target</strong> line එකක් අඳිනවා — wave 1 හි Fibonacci extension එකක්, wave 4 එකෙන් මනිනවා.</li>
      <li>බලන නීති: wave 2, wave 1 ආරම්භය පහු නොකරයි; wave 4, wave 1 overlap නොකරයි; wave 3 කෙටිම නොවේ. නීතියක් fail වුණොත් කිසිවක් අඳින්නේ නෑ — බලෙන් count එකක් නෑ.</li>
      <li>Live wave එකක් continuation ලෙස කියවෙනවා; complete 5-wave impulse එකක් correction එකක් එන්න පුළුවන් බව අනතුරු අඟවනවා.</li>
      <li>BB / Fib / RSI / candles එක්ක confluence එකක් විදිහට පාවිච්චි කරන්න — standalone entry එකක් විදිහට කවදාවත් නෙවෙයි.</li>
    </ul></article>
    <article><h4>18) මාස 3ක Forecast (Forecast 3M tick එක)</h4>
    <ul>
      <li><strong>Future space</strong> එක ළඟ <strong>Forecast 3M</strong> tick එකක් තියෙනවා. ඒක on කළාම, Chart Lab එක ඉදිරි මාස ~3ක් තුළ chart එක හැදෙන්න පුළුවන් විදිහ project කරනවා.</li>
      <li>Analyze කළ entry එකේ සිට හොඳම target එක දක්වා (Elliott target → TP2 → TP1) dashed <strong>centre path</strong> එකක්, පළල් වන <strong>cone</strong> එකක් ඇතුළේ, <strong>M+1 / M+2 / M+3</strong> මාස සලකුණු සමඟ අඳිනවා.</li>
      <li>Cone එකේ පළල කාලයේ වර්ගමූලය සහ pair එකේම volatility එකෙන් වැඩිවෙනවා — නිශ්ශබ්ද FX pair එකකට පටු cone එකක්, කැළඹිලි සහිත coin එකකට ගොඩක් පළල් එකක්. ඒ පළල තමයි අවිනිශ්චිතතාවය.</li>
      <li>ඒකට <strong>Future space</strong> on වෙන්න ඕන (දකුණේ තියෙන හිස් තැන). HOLD signal එකකට දිශාවක් නෑ, ඒ නිසා කිසිවක් අඳින්නේ නෑ.</li>
      <li>කොළ = ඉහළ අදහසක්, රතු = පහළ අදහසක්. Forecast එක ලොකු පින්තූරේ map එකක්; ඔබේ trade levels (entry, TP1/TP2, SL) තමයි තවමත් පාවිච්චි කරන්නේ.</li>
      <li>නිතර නිතර re-analyse කරන්න — අලුත් candle එකක් එක්ක target එක, volatility එක සහ මුළු cone එකම update වෙනවා. ඒක snapshot එකක්, පොරොන්දුවක් නෙවෙයි; news සහ listings model එකේ නෑ.</li>
    </ul></article>
  `
};

D.ta = {
  ...D.en,
  gate_sub: 'Binance Spot & Futures · முழு Signal Desk · Machine License',
  machine_hint: 'உங்கள் Machine ID (லைசென்ஸுக்கு WhatsApp-ல் அனுப்பவும்)',
  activate: 'மென்பொருளை செயல்படுத்து',
  license_rule: 'ஒரு லைசென்ஸ் = ஒரு கணினி. புதிய PC = புதிய லைசென்ஸ்.',
  language: 'மொழி',
  scan: 'சந்தை ஸ்கேன்',
  chart_why: 'Chart + காரணம்',
  click_row: 'ஒரு வரியை கிளிக் செய்யவும்',
  help_title: 'உதவி',
  keys_sub: 'Binance API விசையை உள்ளிடவும்',
  trade_warn: 'உண்மையான பண ஆபத்து. Withdrawals OFF வைக்கவும்.',
  api_guide_title: 'Binance API Key பெறும் முறை',
  api_guide_html: `
    <h4>படிப்படியாக</h4>
    <ol>
      <li><strong>www.binance.com</strong> திறந்து login செய்யவும்.</li>
      <li>Profile → <strong>API Management</strong> செல்லவும்.</li>
      <li><strong>Create API</strong> → System generated தேர்வு செய்யவும்.</li>
      <li>பெயர் கொடுங்கள் (எ.கா. CPE Trade Pro) → உறுதிப்படுத்தவும்.</li>
      <li><strong>API Key</strong> மற்றும் <strong>Secret Key</strong> உடனே copy செய்யவும் (Secret ஒரு முறை மட்டுமே காணும்).</li>
      <li>மேலே உள்ள பெட்டிகளில் paste செய்து Save Keys அழுத்தவும்.</li>
    </ol>
    <h4>அனுமதிகள்</h4>
    <ul>
      <li>Enable Reading — அவசியம்</li>
      <li>Spot Trading / Futures — தேவைப்பட்டால் ON</li>
      <li><strong>Withdrawals = OFF</strong> (பாதுகாப்பு)</li>
      <li>விரும்பினால் IP restriction செய்யவும்</li>
    </ul>
    <h4>உள்ளிட வேண்டாம்</h4>
    <ul><li>Binance password / username இங்கே போட வேண்டாம் — API Key + Secret மட்டும்.</li></ul>
    <p class="tiny">பிறகு Test Account அழுத்தி சரிபார்க்கவும்.</p>
  `,
  help_html: `<h3>CPE Trade Pro — உதவி</h3><article><h4>API Key</h4><p>Binance → API Management → Create API. Withdrawals OFF.</p></article><article><h4>பயன்பாடு</h4><p>Spot/Futures ஸ்கேன், Bollinger, Manual/Auto trade, Positions, Journal.</p></article><article><h4>லைசென்ஸ்</h4><p>ஒரு PCக்கு ஒரு key. WhatsApp 0774940944</p></article>`
};

D.hi = {
  ...D.en,
  gate_sub: 'Binance Spot और Futures · सिग्नल डेस्क · मशीन लाइसेंस',
  machine_hint: 'आपकी Machine ID (लाइसेंस के लिए WhatsApp पर भेजें)',
  activate: 'सॉफ़्टवेयर सक्रिय करें',
  license_rule: 'एक लाइसेंस = एक कंप्यूटर। नया PC = नया लाइसेंस।',
  language: 'भाषा',
  scan: 'मार्केट स्कैन',
  chart_why: 'चार्ट + कारण',
  click_row: 'पंक्ति पर क्लिक करें',
  help_title: 'मदद',
  keys_sub: 'Binance API कुंजी दर्ज करें',
  trade_warn: 'असली पैसे का जोखिम। Withdrawals OFF रखें।',
  api_guide_title: 'Binance API Key कैसे बनाएं',
  api_guide_html: `
    <h4>स्टेप-बाय-स्टेप</h4>
    <ol>
      <li><strong>www.binance.com</strong> खोलकर लॉगिन करें।</li>
      <li>Profile → <strong>API Management</strong> पर जाएँ।</li>
      <li><strong>Create API</strong> → System generated चुनें।</li>
      <li>नाम दें (जैसे CPE Trade Pro) और कन्फर्म करें।</li>
      <li><strong>API Key</strong> और <strong>Secret Key</strong> तुरंत कॉपी करें (Secret एक बार दिखता है)।</li>
      <li>ऊपर के बॉक्स में पेस्ट कर Save Keys दबाएँ।</li>
    </ol>
    <h4>अनुमतियाँ</h4>
    <ul>
      <li>Enable Reading — ज़रूरी</li>
      <li>Spot / Futures Trading — ज़रूरत हो तो ON</li>
      <li><strong>Withdrawals = OFF</strong> रखें</li>
      <li>चाहें तो IP restriction लगाएँ</li>
    </ul>
    <h4>यहाँ न डालें</h4>
    <ul><li>Binance पासवर्ड/यूज़रनेम नहीं — केवल API Key + Secret।</li></ul>
    <p class="tiny">बाद में Test Account से जाँच करें।</p>
  `,
  help_html: `<h3>CPE Trade Pro — मदद</h3><article><h4>API Key</h4><p>Binance → API Management → Create API। Withdrawals OFF।</p></article><article><h4>उपयोग</h4><p>Spot/Futures स्कैन, Bollinger, Manual/Auto, Positions, Journal।</p></article><article><h4>लाइसेंस</h4><p>एक PC = एक key। WhatsApp 0774940944</p></article>`
};

D.zh = {
  ...D.en,
  gate_sub: '币安现货与合约 · 完整信号台 · 机器授权',
  machine_hint: '您的机器 ID（WhatsApp 发送以获取授权）',
  activate: '激活软件',
  license_rule: '一个授权 = 一台电脑。新电脑需新授权。',
  language: '语言',
  scan: '扫描市场',
  auto_scan_on: '开启自动扫描',
  auto_scan_off: '关闭自动扫描',
  chart_why: '图表 + 原因',
  click_row: '点击一行',
  help_title: '帮助',
  keys_sub: '输入币安 API 密钥（不是密码）',
  trade_warn: '真实资金风险。请关闭提现权限。',
  nav_help: '帮助',
  api_guide_title: '如何获取币安 API Key',
  api_guide_html: `
    <h4>步骤</h4>
    <ol>
      <li>打开 <strong>www.binance.com</strong> 并登录。</li>
      <li>个人中心 → <strong>API 管理</strong>。</li>
      <li>点击 <strong>创建 API</strong> → 选择系统生成。</li>
      <li>命名（如 CPE Trade Pro）并确认。</li>
      <li>立即复制 <strong>API Key</strong> 和 <strong>Secret Key</strong>（密钥只显示一次）。</li>
      <li>粘贴到上方输入框并点击保存。</li>
    </ol>
    <h4>权限</h4>
    <ul>
      <li>开启读取权限</li>
      <li>现货/合约交易按需开启</li>
      <li><strong>不要开启提现</strong></li>
      <li>可选：IP 白名单</li>
    </ul>
    <h4>请勿填写</h4>
    <ul><li>不要填写币安登录密码，只需 API Key + Secret。</li></ul>
    <p class="tiny">保存后点击 Test Account 测试。</p>
  `,
  help_html: `<h3>CPE Trade Pro — 帮助</h3><article><h4>API 密钥</h4><p>币安 → API 管理 → 创建。关闭提现。</p></article><article><h4>功能</h4><p>现货/合约扫描、布林带、手动/自动交易、持仓与日志。</p></article><article><h4>授权</h4><p>一台电脑一把密钥。WhatsApp 0774940944</p></article>`
};

D.ar = {
  ...D.en,
  gate_sub: 'بينانس سبوت والعقود · منصة إشارات · ترخيص الجهاز',
  machine_hint: 'معرّف الجهاز (أرسله عبر واتساب للحصول على الترخيص)',
  activate: 'تفعيل البرنامج',
  license_rule: 'ترخيص واحد = جهاز واحد. جهاز جديد = ترخيص جديد.',
  language: 'اللغة',
  scan: 'مسح السوق',
  chart_why: 'الرسم + السبب',
  click_row: 'انقر على صف',
  help_title: 'مساعدة',
  keys_sub: 'أدخل مفتاح Binance API',
  trade_warn: 'مخاطرة بأموال حقيقية. أوقف صلاحية السحب.',
  api_guide_title: 'كيفية الحصول على مفتاح Binance API',
  api_guide_html: `
    <h4>الخطوات</h4>
    <ol>
      <li>افتح <strong>www.binance.com</strong> وسجّل الدخول.</li>
      <li>الملف الشخصي → <strong>إدارة API</strong>.</li>
      <li>اضغط <strong>إنشاء API</strong> → مفتاح مولَّد من النظام.</li>
      <li>سمِّ المفتاح (مثل CPE Trade Pro) ثم أكّد.</li>
      <li>انسخ <strong>API Key</strong> و<strong>Secret</strong> فورًا (السر يظهر مرة واحدة).</li>
      <li>الصقهما أعلاه واضغط حفظ.</li>
    </ol>
    <h4>الصلاحيات</h4>
    <ul>
      <li>تفعيل القراءة — إلزامي</li>
      <li>تداول سبوت / عقود حسب الحاجة</li>
      <li><strong>السحب =OFF</strong></li>
      <li>اختياري: تقييد IP</li>
    </ul>
    <h4>لا تُدخل</h4>
    <ul><li>لا تُدخل كلمة مرور بينانس — فقط API Key + Secret.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — مساعدة</h3><article><h4>مفتاح API</h4><p>Binance → إدارة API → إنشاء. أوقف السحب.</p></article><article><h4>الاستخدام</h4><p>سبوت/عقود، بولينجر، يدوي/تلقائي، مراكز وسجل.</p></article><article><h4>الترخيص</h4><p>جهاز واحد = مفتاح واحد. واتساب 0774940944</p></article>`
};

D.es = {
  ...D.en,
  gate_sub: 'Binance Spot y Futures · Mesa de señales · Licencia por máquina',
  machine_hint: 'Tu Machine ID (envíalo por WhatsApp para la licencia)',
  activate: 'Activar software',
  license_rule: 'Una licencia = un PC. Nuevo PC = nueva licencia.',
  language: 'Idioma',
  scan: 'Escanear mercado',
  chart_why: 'Gráfico + motivos',
  click_row: 'Haz clic en una fila',
  help_title: 'Ayuda',
  keys_sub: 'Introduce la API key de Binance',
  trade_warn: 'Riesgo con dinero real. Mantén Withdrawals en OFF.',
  api_guide_title: 'Cómo obtener la API Key de Binance',
  api_guide_html: `
    <h4>Paso a paso</h4>
    <ol>
      <li>Abre <strong>www.binance.com</strong> e inicia sesión.</li>
      <li>Perfil → <strong>API Management</strong>.</li>
      <li>Pulsa <strong>Create API</strong> → System generated.</li>
      <li>Pon un nombre (ej. CPE Trade Pro) y confirma.</li>
      <li>Copia al instante <strong>API Key</strong> y <strong>Secret Key</strong> (el Secret solo se muestra una vez).</li>
      <li>Pégalos arriba y pulsa Save Keys.</li>
    </ol>
    <h4>Permisos</h4>
    <ul>
      <li>Enable Reading — obligatorio</li>
      <li>Spot / Futures Trading según necesites</li>
      <li><strong>Withdrawals = OFF</strong></li>
      <li>Opcional: restricción por IP</li>
    </ul>
    <h4>No introduzcas</h4>
    <ul><li>No pongas tu contraseña de Binance — solo API Key + Secret.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — Ayuda</h3><article><h4>API Key</h4><p>Binance → API Management → Create API. Withdrawals OFF.</p></article><article><h4>Uso</h4><p>Spot/Futures, Bollinger, Manual/Auto, posiciones y diario.</p></article><article><h4>Licencia</h4><p>Un PC = una clave. WhatsApp 0774940944</p></article>`
};

D.pt = {
  ...D.en,
  gate_sub: 'Binance Spot e Futures · Mesa de sinais · Licença por máquina',
  machine_hint: 'Seu Machine ID (envie no WhatsApp para a licença)',
  activate: 'Ativar software',
  license_rule: 'Uma licença = um PC. Novo PC = nova licença.',
  language: 'Idioma',
  scan: 'Escanear mercado',
  chart_why: 'Gráfico + motivos',
  click_row: 'Clique em uma linha',
  help_title: 'Ajuda',
  api_guide_title: 'Como obter a API Key da Binance',
  api_guide_html: `
    <h4>Passo a passo</h4>
    <ol>
      <li>Abra <strong>www.binance.com</strong> e faça login.</li>
      <li>Perfil → <strong>API Management</strong>.</li>
      <li><strong>Create API</strong> → System generated.</li>
      <li>Dê um nome (ex. CPE Trade Pro) e confirme.</li>
      <li>Copie <strong>API Key</strong> e <strong>Secret Key</strong> imediatamente.</li>
      <li>Cole acima e clique Save Keys.</li>
    </ol>
    <h4>Permissões</h4>
    <ul>
      <li>Enable Reading — obrigatório</li>
      <li>Spot / Futures conforme necessário</li>
      <li><strong>Withdrawals = OFF</strong></li>
    </ul>
    <h4>Não digite</h4>
    <ul><li>Não coloque a senha da Binance — só API Key + Secret.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — Ajuda</h3><article><h4>API Key</h4><p>Binance → API Management → Create API. Withdrawals OFF.</p></article><article><h4>Uso</h4><p>Spot/Futures, Bollinger, Manual/Auto, posições e diário.</p></article><article><h4>Licença</h4><p>Um PC = uma chave. WhatsApp 0774940944</p></article>`
};

D.ru = {
  ...D.en,
  gate_sub: 'Binance Spot и Futures · Сигнальный стол · Лицензия на ПК',
  machine_hint: 'Ваш Machine ID (отправьте в WhatsApp для лицензии)',
  activate: 'Активировать',
  license_rule: 'Одна лицензия = один ПК. Новый ПК = новая лицензия.',
  language: 'Язык',
  scan: 'Сканировать рынок',
  chart_why: 'График + причины',
  click_row: 'Нажмите на строку',
  help_title: 'Справка',
  api_guide_title: 'Как получить Binance API Key',
  api_guide_html: `
    <h4>По шагам</h4>
    <ol>
      <li>Откройте <strong>www.binance.com</strong> и войдите.</li>
      <li>Профиль → <strong>API Management</strong>.</li>
      <li><strong>Create API</strong> → System generated.</li>
      <li>Укажите имя (например CPE Trade Pro) и подтвердите.</li>
      <li>Сразу скопируйте <strong>API Key</strong> и <strong>Secret Key</strong>.</li>
      <li>Вставьте выше и нажмите Save Keys.</li>
    </ol>
    <h4>Права</h4>
    <ul>
      <li>Enable Reading — обязательно</li>
      <li>Spot / Futures — по необходимости</li>
      <li><strong>Withdrawals = OFF</strong></li>
    </ul>
    <h4>Не вводите</h4>
    <ul><li>Не пароль Binance — только API Key + Secret.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — Справка</h3><article><h4>API Key</h4><p>Binance → API Management → Create API. Withdrawals OFF.</p></article><article><h4>Использование</h4><p>Spot/Futures, Bollinger, ручная/авто торговля, позиции и журнал.</p></article><article><h4>Лицензия</h4><p>Один ПК = один ключ. WhatsApp 0774940944</p></article>`
};

D.ja = {
  ...D.en,
  gate_sub: 'Binance 現物＆先物 · シグナルデスク · 端末ライセンス',
  machine_hint: 'マシンID（ライセンス取得のためWhatsAppへ送信）',
  activate: 'ソフトウェアを有効化',
  license_rule: '1ライセンス = 1台。別PCには新しいライセンスが必要です。',
  language: '言語',
  scan: '市場をスキャン',
  chart_why: 'チャート + 理由',
  click_row: '行をクリック',
  help_title: 'ヘルプ',
  api_guide_title: 'Binance APIキーの取得方法',
  api_guide_html: `
    <h4>手順</h4>
    <ol>
      <li><strong>www.binance.com</strong> を開きログイン。</li>
      <li>プロフィール → <strong>API管理</strong>。</li>
      <li><strong>APIを作成</strong> → システム生成を選択。</li>
      <li>名前（例: CPE Trade Pro）を付けて確認。</li>
      <li><strong>API Key</strong> と <strong>Secret Key</strong> をすぐにコピー（Secretは一度だけ表示）。</li>
      <li>上の欄に貼り付けて Save Keys。</li>
    </ol>
    <h4>権限</h4>
    <ul>
      <li>読み取り — 必須</li>
      <li>現物/先物取引 — 必要に応じて</li>
      <li><strong>出金 = OFF</strong></li>
    </ul>
    <h4>入力しないでください</h4>
    <ul><li>Binanceのパスワードは不要。API Key + Secretのみ。</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — ヘルプ</h3><article><h4>APIキー</h4><p>Binance → API管理 → 作成。出金はOFF。</p></article><article><h4>使い方</h4><p>現物/先物スキャン、ボリンジャー、手動/自動、建玉と履歴。</p></article><article><h4>ライセンス</h4><p>1台1キー。WhatsApp 0774940944</p></article>`
};

D.ko = {
  ...D.en,
  gate_sub: '바이낸스 현물 & 선물 · 시그널 데스크 · PC 라이선스',
  machine_hint: '머신 ID (라이선스용 WhatsApp 전송)',
  activate: '소프트웨어 활성화',
  license_rule: '라이선스 1개 = PC 1대. 새 PC = 새 라이선스.',
  language: '언어',
  scan: '시장 스캔',
  chart_why: '차트 + 이유',
  click_row: '행을 클릭하세요',
  help_title: '도움말',
  api_guide_title: '바이낸스 API 키 발급 방법',
  api_guide_html: `
    <h4>단계</h4>
    <ol>
      <li><strong>www.binance.com</strong> 접속 후 로그인.</li>
      <li>프로필 → <strong>API 관리</strong>.</li>
      <li><strong>API 만들기</strong> → 시스템 생성 선택.</li>
      <li>이름 입력 (예: CPE Trade Pro) 후 확인.</li>
      <li><strong>API Key</strong>와 <strong>Secret Key</strong>를 바로 복사 (Secret은 한 번만 표시).</li>
      <li>위에 붙여넣고 Save Keys.</li>
    </ol>
    <h4>권한</h4>
    <ul>
      <li>읽기 — 필수</li>
      <li>현물/선물 거래 — 필요 시</li>
      <li><strong>출금 = OFF</strong></li>
    </ul>
    <h4>입력하지 마세요</h4>
    <ul><li>바이낸스 비밀번호 말고 API Key + Secret만.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — 도움말</h3><article><h4>API 키</h4><p>Binance → API 관리 → 생성. 출금 OFF.</p></article><article><h4>사용</h4><p>현물/선물 스캔, 볼린저, 수동/자동, 포지션·저널.</p></article><article><h4>라이선스</h4><p>PC 1대 = 키 1개. WhatsApp 0774940944</p></article>`
};

D.fr = {
  ...D.en,
  gate_sub: 'Binance Spot & Futures · Bureau de signaux · Licence machine',
  machine_hint: 'Votre Machine ID (envoyez-le sur WhatsApp pour la licence)',
  activate: 'Activer le logiciel',
  license_rule: 'Une licence = un PC. Nouveau PC = nouvelle licence.',
  language: 'Langue',
  scan: 'Scanner le marché',
  chart_why: 'Graphique + raisons',
  click_row: 'Cliquez sur une ligne',
  help_title: 'Aide',
  api_guide_title: 'Comment obtenir une clé API Binance',
  api_guide_html: `
    <h4>Étapes</h4>
    <ol>
      <li>Ouvrez <strong>www.binance.com</strong> et connectez-vous.</li>
      <li>Profil → <strong>API Management</strong>.</li>
      <li><strong>Create API</strong> → System generated.</li>
      <li>Donnez un nom (ex. CPE Trade Pro) puis confirmez.</li>
      <li>Copiez aussitôt <strong>API Key</strong> et <strong>Secret Key</strong>.</li>
      <li>Collez-les ci-dessus et cliquez Save Keys.</li>
    </ol>
    <h4>Permissions</h4>
    <ul>
      <li>Enable Reading — obligatoire</li>
      <li>Spot / Futures selon besoin</li>
      <li><strong>Withdrawals = OFF</strong></li>
    </ul>
    <h4>Ne pas saisir</h4>
    <ul><li>Pas le mot de passe Binance — seulement API Key + Secret.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — Aide</h3><article><h4>Clé API</h4><p>Binance → API Management → Create API. Withdrawals OFF.</p></article><article><h4>Utilisation</h4><p>Spot/Futures, Bollinger, Manuel/Auto, positions et journal.</p></article><article><h4>Licence</h4><p>Un PC = une clé. WhatsApp 0774940944</p></article>`
};

D.de = {
  ...D.en,
  gate_sub: 'Binance Spot & Futures · Signal-Desk · Geräte-Lizenz',
  machine_hint: 'Ihre Machine ID (per WhatsApp senden für die Lizenz)',
  activate: 'Software aktivieren',
  license_rule: 'Eine Lizenz = ein PC. Neuer PC = neue Lizenz.',
  language: 'Sprache',
  scan: 'Markt scannen',
  chart_why: 'Chart + Gründe',
  click_row: 'Zeile anklicken',
  help_title: 'Hilfe',
  api_guide_title: 'Binance API-Schlüssel erstellen',
  api_guide_html: `
    <h4>Schritte</h4>
    <ol>
      <li><strong>www.binance.com</strong> öffnen und einloggen.</li>
      <li>Profil → <strong>API Management</strong>.</li>
      <li><strong>Create API</strong> → System generated.</li>
      <li>Namen vergeben (z. B. CPE Trade Pro) und bestätigen.</li>
      <li><strong>API Key</strong> und <strong>Secret Key</strong> sofort kopieren.</li>
      <li>Oben einfügen und Save Keys klicken.</li>
    </ol>
    <h4>Berechtigungen</h4>
    <ul>
      <li>Enable Reading — Pflicht</li>
      <li>Spot / Futures nach Bedarf</li>
      <li><strong>Withdrawals = OFF</strong></li>
    </ul>
    <h4>Nicht eingeben</h4>
    <ul><li>Kein Binance-Passwort — nur API Key + Secret.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — Hilfe</h3><article><h4>API-Schlüssel</h4><p>Binance → API Management → Create API. Withdrawals OFF.</p></article><article><h4>Nutzung</h4><p>Spot/Futures, Bollinger, Manual/Auto, Positionen und Journal.</p></article><article><h4>Lizenz</h4><p>Ein PC = ein Key. WhatsApp 0774940944</p></article>`
};

D.id = {
  ...D.en,
  gate_sub: 'Binance Spot & Futures · Meja sinyal · Lisensi mesin',
  machine_hint: 'Machine ID Anda (kirim via WhatsApp untuk lisensi)',
  activate: 'Aktifkan software',
  license_rule: 'Satu lisensi = satu PC. PC baru = lisensi baru.',
  language: 'Bahasa',
  scan: 'Pindai pasar',
  chart_why: 'Chart + alasan',
  click_row: 'Klik satu baris',
  help_title: 'Bantuan',
  api_guide_title: 'Cara membuat API Key Binance',
  api_guide_html: `
    <h4>Langkah demi langkah</h4>
    <ol>
      <li>Buka <strong>www.binance.com</strong> dan login.</li>
      <li>Profil → <strong>API Management</strong>.</li>
      <li><strong>Create API</strong> → System generated.</li>
      <li>Beri nama (mis. CPE Trade Pro) lalu konfirmasi.</li>
      <li>Salin segera <strong>API Key</strong> dan <strong>Secret Key</strong>.</li>
      <li>Tempel di atas lalu Save Keys.</li>
    </ol>
    <h4>Izin</h4>
    <ul>
      <li>Enable Reading — wajib</li>
      <li>Spot / Futures sesuai kebutuhan</li>
      <li><strong>Withdrawals = OFF</strong></li>
    </ul>
    <h4>Jangan isi</h4>
    <ul><li>Jangan password Binance — hanya API Key + Secret.</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — Bantuan</h3><article><h4>API Key</h4><p>Binance → API Management → Create API. Withdrawals OFF.</p></article><article><h4>Cara pakai</h4><p>Spot/Futures, Bollinger, Manual/Auto, posisi dan jurnal.</p></article><article><h4>Lisensi</h4><p>Satu PC = satu kunci. WhatsApp 0774940944</p></article>`
};

D.th = {
  ...D.en,
  gate_sub: 'Binance Spot & Futures · โต๊ะสัญญาณ · ไลเซนส์ตามเครื่อง',
  machine_hint: 'Machine ID ของคุณ (ส่งทาง WhatsApp เพื่อรับไลเซนส์)',
  activate: 'เปิดใช้งานซอฟต์แวร์',
  license_rule: 'หนึ่งไลเซนส์ = หนึ่งเครื่อง คอมใหม่ = ไลเซนส์ใหม่',
  language: 'ภาษา',
  scan: 'สแกนตลาด',
  chart_why: 'ชาร์ต + เหตุผล',
  click_row: 'คลิกแถว',
  help_title: 'ช่วยเหลือ',
  api_guide_title: 'วิธีสร้าง Binance API Key',
  api_guide_html: `
    <h4>ทีละขั้นตอน</h4>
    <ol>
      <li>เปิด <strong>www.binance.com</strong> แล้วล็อกอิน</li>
      <li>โปรไฟล์ → <strong>API Management</strong></li>
      <li><strong>Create API</strong> → System generated</li>
      <li>ตั้งชื่อ (เช่น CPE Trade Pro) แล้วยืนยัน</li>
      <li>คัดลอก <strong>API Key</strong> และ <strong>Secret Key</strong> ทันที</li>
      <li>วางด้านบนแล้วกด Save Keys</li>
    </ol>
    <h4>สิทธิ์</h4>
    <ul>
      <li>Enable Reading — จำเป็น</li>
      <li>Spot / Futures ตามต้องการ</li>
      <li><strong>Withdrawals = OFF</strong></li>
    </ul>
    <h4>ห้ามใส่</h4>
    <ul><li>อย่าใส่รหัสผ่าน Binance — ใช้แค่ API Key + Secret</li></ul>
  `,
  help_html: `<h3>CPE Trade Pro — คู่มือ</h3><article><h4>API Key</h4><p>Binance → API Management → Create API ปิด Withdrawals</p></article><article><h4>วิธีใช้</h4><p>Spot/Futures, Bollinger, Manual/Auto, โพซิชันและจอร์นัล</p></article><article><h4>ไลเซนส์</h4><p>1 เครื่อง = 1 คีย์ WhatsApp 0774940944</p></article>`
};

window.CPE_I18N.t = function t(key) {
  const lang = window.CPE_I18N.current || 'en';
  const pack = D[lang] || D.en;
  return pack[key] != null ? pack[key] : (D.en[key] != null ? D.en[key] : key);
};

window.CPE_I18N.setLang = function setLang(code) {
  const meta = window.CPE_I18N.langs.find((l) => l.code === code) || window.CPE_I18N.langs[0];
  window.CPE_I18N.current = meta.code;
  localStorage.setItem('cpe_lang', meta.code);
  document.documentElement.lang = meta.code;
  document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = window.CPE_I18N.t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.hasAttribute('data-i18n-placeholder')) el.placeholder = val;
      else el.value = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = window.CPE_I18N.t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = window.CPE_I18N.t(el.getAttribute('data-i18n-html'));
  });
  // sync selects
  document.querySelectorAll('.lang-select').forEach((sel) => {
    sel.value = meta.code;
  });
  // sync language to main process so OS/toasts/notifications match
  try {
    if (window.cpe?.settingsSet) window.cpe.settingsSet({ uiLang: meta.code });
  } catch { /* ignore */ }
  if (typeof window.onCpeLangChange === 'function') window.onCpeLangChange(meta.code);
};

window.CPE_I18N.init = function init() {
  const saved = localStorage.getItem('cpe_lang') || 'en';
  document.querySelectorAll('.lang-select').forEach((sel) => {
    sel.innerHTML = window.CPE_I18N.langs
      .map((l) => `<option value="${l.code}">${l.label}</option>`)
      .join('');
    sel.value = saved;
    sel.onchange = () => window.CPE_I18N.setLang(sel.value);
  });
  window.CPE_I18N.setLang(saved);
};
