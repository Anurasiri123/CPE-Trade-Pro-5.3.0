/**
 * Per-platform API connect guides — English + Sinhala (others fall back to EN).
 * Used by API Keys page + Help when user selects a platform.
 */
window.CPE_PLATFORM_GUIDES = {
  en: {
    BINANCE: {
      title: 'Connect Binance API',
      html: `
        <ol>
          <li>Open <strong>binance.com</strong> → login.</li>
          <li>Profile → <strong>API Management</strong>.</li>
          <li><strong>Create API</strong> → System generated → label e.g. CPE Trade Pro.</li>
          <li>Verify with email / 2FA. Binance then shows the <strong>API Key</strong> and the
          <strong>Secret Key</strong>.</li>
          <li>Copy the <strong>Secret</strong> immediately and keep it somewhere safe — it is shown
          <strong>only once</strong>. Paste it here when you save.</li>
          <li>Permissions: enable <strong>Reading</strong> and, only if you auto-trade,
          <strong>Spot/Futures trading</strong>.</li>
          <li><strong>Withdrawals = OFF</strong> (always leave this off).</li>
        </ol>
        <h4>IP access (important)</h4>
        <p>If your home/office public IP changes and Binance shows error <strong>-2015</strong>, choose
        <strong>Unrestricted</strong> for IP access (or turn off “Restrict access to trusted IPs only”),
        if that option is available for your key. This means any IP can reach the key; it does
        <strong>not</strong> mean enabling every API permission.</p>
        <p><strong>Keep Withdrawals OFF.</strong> Enable only the Read and Spot/Futures trading
        permissions this app needs. Keep your PC secure and never share the API Secret. A fixed IP
        whitelist is safer when your IP does not change.</p>
        <h4>Optional: fixed-IP whitelist</h4>
        <ol>
          <li>On the API row click <strong>Edit restrictions</strong>.</li>
          <li>Tick <strong>Restrict access to trusted IPs only</strong>.</li>
          <li>Paste <strong>your public IP</strong> into the IPv4 box → <strong>Save</strong>.</li>
        </ol>
        <h4>How to find your machine's public IP</h4>
        <ol>
          <li>Press the <strong>Get My IP</strong> button on the left — the app fetches it and copies it.</li>
          <li>Or open <strong>PowerShell</strong> and run <code>curl ifconfig.me</code>.</li>
          <li>Or open <a href="https://whatismyipaddress.com" target="_blank">whatismyipaddress.com</a> in a browser.</li>
        </ol>
        <p class="tiny">Home / office routers can change the IP. If the key stops working, re-check the
        IP and update it. Then paste the same API Key + Secret on the left → <strong>Save Keys</strong>.
        If you renew/edit the key on Binance, save the keys here again to reset the 25-day review
        reminder. The reminder does not confirm Binance’s actual expiry date. Never share the secret.</p>
        <h4>Smart IP Guard (this app)</h4>
        <p>Binance does <strong>not</strong> allow a <strong>main-account</strong> API key's IP whitelist to
        be edited by any API — it can only be changed on the Binance website. So this app watches the IP
        for you and makes the manual edit quick. A <strong>Binance</strong> badge appears above the
        DEMO/LIVE switch and on this page — <strong>for Binance only</strong>.</p>
        <ol>
          <li>Every time the app opens — and again on wake, unlock, reconnect and every 5 minutes — your
          <strong>public IP</strong> is read automatically.</li>
          <li>If it matches the last one you saved, the badge stays normal (✔ in sync).</li>
          <li>If it <strong>changed</strong>, a <strong>red dot</strong> appears on the badge and a red card
          here shows <strong>Old → New</strong> IP with 3 steps:
            <ul>
              <li><strong>Copy new IP</strong> — copies the new address.</li>
              <li><strong>Open Binance API Management</strong> — opens the exact Binance page.</li>
              <li>On Binance: key → <strong>Edit restrictions</strong> → <strong>IP access restrictions</strong>
              → replace the old IP with the new one → <strong>Save</strong>.</li>
              <li><strong>I saved it</strong> — the app remembers the new IP and the card turns green (in sync).</li>
            </ul>
          </li>
        </ol>
        <p>This also protects you from Binance's rules: a key with <strong>no</strong> IP restriction is
        <strong>deleted after 90 days</strong>, and <strong>Withdrawals cannot be enabled</strong> without an
        IP whitelist. A <strong>static IP</strong> from your ISP removes this problem completely.</p>
        <p>Portal: <a href="https://www.binance.com/en/my/settings/api-management" target="_blank">API Management</a></p>`
    },
    BYBIT: {
      title: 'Connect Bybit API',
      html: `
        <ol>
          <li>Login to <strong>bybit.com</strong>.</li>
          <li>Avatar → <strong>API</strong> → Create New Key.</li>
          <li>Choose System-generated / API Transaction.</li>
          <li>Permissions: Read + Trade (Spot/Derivatives). No withdraw.</li>
          <li>Copy API Key + Secret → paste left → Save Bybit.</li>
        </ol>
        <p>Portal: <a href="https://www.bybit.com/app/user/api-management" target="_blank">Bybit API</a></p>`
    },
    OKX: {
      title: 'Connect OKX API',
      html: `
        <ol>
          <li>Login <strong>okx.com</strong> → Profile → <strong>API</strong>.</li>
          <li>Create V5 API key. Set a <strong>Passphrase</strong> (you invent it).</li>
          <li>Permissions: Read + Trade. Withdraw OFF.</li>
          <li>Save API Key, Secret, and Passphrase in the form.</li>
        </ol>
        <p>Portal: <a href="https://www.okx.com/account/my-api" target="_blank">OKX API</a></p>`
    },
    KUCOIN: {
      title: 'Connect KuCoin API',
      html: `
        <ol>
          <li>KuCoin → Account → <strong>API Management</strong> → Create API.</li>
          <li>Set passphrase. Enable Spot/Futures trade; disable withdraw.</li>
          <li>Enter API Key, Secret, Passphrase → Save.</li>
        </ol>`
    },
    BITGET: {
      title: 'Connect Bitget API',
      html: `
        <ol>
          <li>Bitget → Account → <strong>API Management</strong>.</li>
          <li>Create key with passphrase. Trade ON, Withdraw OFF.</li>
          <li>Save Key + Secret + Passphrase.</li>
        </ol>`
    },
    GATE: {
      title: 'Connect Gate.io API',
      html: `
        <ol>
          <li>Gate.io → API Keys (v4) → Create.</li>
          <li>Enable spot/futures as needed. No withdraw.</li>
          <li>Save Key + Secret.</li>
        </ol>`
    },
    MEXC: {
      title: 'Connect MEXC API',
      html: `
        <ol>
          <li>MEXC → Account → API Management → Create.</li>
          <li>Enable trade reading/trading. Withdraw OFF.</li>
          <li>Save Key + Secret.</li>
        </ol>`
    },
    KRAKEN: {
      title: 'Connect Kraken API',
      html: `
        <ol>
          <li>Kraken → Security → <strong>API</strong> → Add key.</li>
          <li>Permissions: Query + Create & modify orders. No withdraw/funds transfer.</li>
          <li>Save Key + Private Key (Secret).</li>
        </ol>`
    },
    COINBASE: {
      title: 'Connect Coinbase Advanced API',
      html: `
        <ol>
          <li>Coinbase → Settings → <strong>API</strong> → New API Key.</li>
          <li>Enable view + trade. No transfer.</li>
          <li>Save API Key + Secret.</li>
        </ol>`
    },
    FOREX_OANDA: {
      title: 'Connect OANDA Forex API',
      html: `
        <p>OANDA uses a <strong>Personal Access Token</strong> instead of an API key/secret pair, so the
        token goes in the <strong>API Key</strong> field and the account number in
        <strong>Account ID</strong>.</p>
        <h4>Setup A → Z</h4>
        <ol>
          <li>Open <a href="https://www.oanda.com" target="_blank">oanda.com</a> and create an account —
          a <strong>practice (fxTrade Practice)</strong> account is free and safest for testing.</li>
          <li>Log in and open <em>My Account → Manage API Access</em>.</li>
          <li>Press <strong>Generate</strong> to create a <strong>Personal Access Token</strong>; copy it
          immediately (OANDA shows it only once).</li>
          <li>Copy your <strong>Account ID</strong> (the <code>101-004-xxxxxxx-001</code> number on that
          page / Account Overview).</li>
          <li>Here: paste the token as <strong>API Key</strong>, the number as <strong>Account ID</strong>
          → <strong>Save Keys</strong>.</li>
          <li>Press <strong>Test Account</strong> — success shows <code>ok: true</code> with your account
          and currency.</li>
        </ol>
        <h4>Demo vs Live</h4>
        <p>The app tries the <strong>practice</strong> host first and automatically falls back to the
        <strong>live</strong> host, so the same token works after you switch to a live account.</p>
        <h4>How orders are sized</h4>
        <p>OANDA sizes orders in <strong>units</strong>. This app speaks MT5-style lots
        (<code>0.01</code> = micro lot), and 1 lot = 100,000 units, so it converts for you
        (e.g. <code>0.01</code> lot → 1,000 units).</p>
        <p class="tiny">Orders are <strong>MARKET (fill-or-kill)</strong> only. Treat the token like a
        password — never share it, and regenerate it if it leaks.</p>`
    },
    FOREX_FXCM: {
      title: 'Connect FXCM Forex',
      html: `
        <p class="tiny"><strong>Note:</strong> FXCM's REST API varies by region and account type. In this
        app FXCM keys are <strong>stored and tested</strong>, but <strong>live FXCM orders are not routed
        yet</strong> — use <strong>MetaTrader 5 / MT4</strong> (which covers every FXCM account) for live
        forex trading.</p>
        <h4>If you still want to save FXCM keys</h4>
        <ol>
          <li>Ask FXCM / your Trading Station for <strong>REST API credentials</strong> (API Key + Secret)
          and the correct <strong>demo or live host</strong> for your region.</li>
          <li>Paste <strong>API Key</strong> + <strong>Secret</strong> here → <strong>Save Keys</strong>.</li>
          <li><strong>Test Account</strong> only confirms the fields are present — it cannot place live
          orders.</li>
        </ol>`
    },
    FOREX_MT5: {
      title: 'Connect MetaTrader 5 (any MT5 broker)',
      html: `
        <p>Any broker that offers MetaTrader 5 works through this single option — you do
        <strong>not</strong> need a separate integration for each one:</p>
        <ul>
          <li><strong>Pepperstone</strong> · <strong>IC Markets</strong> · <strong>XM</strong> ·
          <strong>Fusion Markets</strong> · Exness, FP Markets, Tickmill …</li>
        </ul>
        <h4>Why MT5 now needs one manual step (EA bridge)</h4>
        <p>Older MT5 terminals could be traded by the app directly through MetaTrader's Python API.
        MetaTrader's newer terminals (<strong>build 6230 and above</strong>) broke that channel, so the
        app answers <code>MT5 initialize failed: (-10005, 'IPC timeout')</code> even when MT5 is open,
        logged in and Algo Trading is on. To work on <strong>every</strong> build, the app now talks to
        MT5 through a small Expert Advisor (<code>CPE_Bridge</code>) installed inside your terminal —
        exactly the same way MT4 works. That means:</p>
        <ul>
          <li><strong>The app installs everything for you</strong> — Python 3, the MT5 terminal and the
          compiled EA — press <strong>Auto-install everything</strong> (or <strong>Install MetaTrader 5</strong>
          and then <strong>Install CPE bridge EA</strong>).</li>
          <li><strong>You attach the EA once</strong>: in MT5 press <kbd>Ctrl+N</kbd> to open
          <em>Navigator</em> → <em>Expert Advisors</em>, drag <strong>CPE_Bridge</strong> onto any chart
          (e.g. EURUSD), click <strong>OK</strong>, then click the <strong>Algo Trading</strong> button in
          the toolbar so it is <strong>green</strong>. A smiley face appears on the chart.</li>
          <li><strong>MT5 must be logged in AND online</strong> — the app cannot log MT5 in. Use
          <em>File → Login to Trade Account</em>. The connection indicator at the bottom-right must be
          <strong>green</strong>; a red/blank indicator means orders fail with broker code
          <strong>10031 (no connection)</strong>.</li>
        </ul>
        <h4>Setup A → Z (live orders)</h4>
        <ol>
          <li>Install MetaTrader 5 from <code>metatrader5.com</code> (or your broker's download page) and
          open it <strong>once</strong>, then log in: <em>File → Login to Trade Account</em>.</li>
          <li>In MT5: <em>Tools → Options → Expert Advisors</em> → tick <strong>Allow algorithmic trading</strong>
          and untick <strong>Disable algorithmic trading via external Python API</strong> → OK.</li>
          <li>Here press <strong>Auto-install everything</strong> (installs Python + MT5 + the EA), or
          <strong>Install MetaTrader 5</strong> then <strong>Install CPE bridge EA</strong>.</li>
          <li>In MT5: <em>Navigator → Expert Advisors</em> → drag <strong>CPE_Bridge</strong> onto a chart → OK.</li>
          <li>Click the <strong>Algo Trading</strong> button so it turns <strong>green</strong>.</li>
          <li>Make the bottom-right connection indicator <strong>green</strong> (right-click → Reconnect).</li>
          <li>Enter <strong>Login</strong>, <strong>Password</strong> and <strong>Server</strong> here →
          <strong>Save Keys</strong> → <strong>Start MT5 Bridge</strong> → <strong>Test Account</strong>.
          A successful test shows <code>ok: true</code> with your account login, server and balance.</li>
          <li>Keep MT5 open with the EA attached and Algo Trading on while this app places live orders.</li>
        </ol>
        <h4>What goes in each field</h4>
        <ol>
          <li><strong>Login</strong> — your MT5 account number (the 7–9 digit ID you log in with).</li>
          <li><strong>Password</strong> — the MT5 <em>master</em> password (orders) or an <em>investor</em> (read-only) password.</li>
          <li><strong>Server</strong> — the exact server name, e.g. <code>ICMarketsSC-Live</code>, <code>XMGlobal-MT5 5</code>, <code>Pepperstone-Live04</code>.</li>
        </ol>
        <h4>Where to find the Server name</h4>
        <ul>
          <li>Open MT5 → <em>File → Login to Trade Account</em> and read the server dropdown.</li>
          <li>Or <em>File → Open an Account</em> to list your broker's servers.</li>
          <li>Also shown in the broker's welcome email, or <em>Navigator → Accounts</em>.</li>
        </ul>
        <h4>Demo vs Live</h4>
        <ul>
          <li>Demo servers end with <code>-Demo</code>; live servers with <code>-Live</code> (a number may follow).</li>
          <li>Test on the <strong>Demo</strong> server first — switch to <strong>Live</strong> only when ready.</li>
        </ul>
        <h4>Investor (read-only) password</h4>
        <ul>
          <li>In MT5: <em>Tools → Options → Server</em> → <em>Change password</em> → enable <strong>Investor (read-only) mode</strong>.</li>
          <li>An investor password only reads data (safer for testing). Use the master password for live orders.</li>
        </ul>
        <h4>Troubleshooting</h4>
        <ul>
          <li><code>IPC timeout (-10005)</code> — normal on build 6230+; the EA bridge above fixes it.
          Make sure <strong>CPE_Bridge is attached to a chart</strong> and <strong>Algo Trading is green</strong>.</li>
          <li><code>10031: no connection</code> — MT5 is logged in but offline. Make the bottom-right
          indicator green (right-click → Reconnect / <em>File → Login</em>), and check internet / VPN / firewall.</li>
          <li>“MT5 terminal not found” — open MT5 once so Windows registers it; custom folder? point
          <code>CPE_MT5_PATH</code> at the full path of <code>terminal64.exe</code> and restart the app.</li>
          <li>“EA is not running / did not answer” — attach <strong>CPE_Bridge</strong> to a chart, turn on
          <strong>Algo Trading</strong>, and allow it in <em>Tools → Options → Expert Advisors</em>.</li>
          <li>64-bit Python is required for the 64-bit MT5 terminal — install the 64-bit MT5 build.</li>
        </ul>
        <p class="tiny">Saved values stay on this machine. Live order routing needs MT5 open with the
        CPE_Bridge EA attached; signals and paper trades work without it.</p>`
    },
    FOREX_MT4: {
      title: 'Connect MetaTrader 4 (any MT4 broker)',
      html: `
        <p>Any broker that offers MetaTrader 4 works through this single option — you do
        <strong>not</strong> need a separate integration for each one. The chart and the
        <strong>signal are the same as MT5</strong> (both come from this app's own FX data feed);
        only order execution differs, because each terminal trades your own account.</p>
        <h4>Why MT4 needs one manual step</h4>
        <p>MetaTrader 5 has a Python API, so the app can log in and trade directly. MT4 has
        <strong>no API at all</strong>, so the app installs a small Expert Advisor
        (<code>CPE_Bridge</code>) inside your MT4 and talks to it through files. That means:</p>
        <ul>
          <li><strong>The app installs everything for you</strong> — Python 3, the MT4 terminal
          and the compiled EA — press <strong>Auto-install everything</strong>.</li>
          <li><strong>You attach the EA once</strong>: in MT4 open <em>Navigator → Expert Advisors</em>,
          drag <strong>CPE_Bridge</strong> onto any chart, then click the <strong>AutoTrading</strong> button.</li>
          <li><strong>MT4 must already be logged in</strong> — the app cannot log MT4 in. Use
          <em>File → Login to Trade Account</em> (the bridge refuses to trade when the logins differ).</li>
        </ul>
        <h4>What goes in each field</h4>
        <ol>
          <li><strong>Login</strong> — your MT4 account number (the digits you log in with).</li>
          <li><strong>Password</strong> — the MT4 <em>master</em> password (an investor / read-only password cannot place trades).</li>
          <li><strong>Server</strong> — the exact server name, e.g. <code>ICMarketsSC-Live02</code>, <code>XMGlobal-MT4 5</code>.</li>
        </ol>
        <h4>Where to find the Server name</h4>
        <ul>
          <li>In MT4: <em>File → Login to Trade Account</em> → read the server dropdown.</li>
          <li>Or the broker's welcome email, or <em>Navigator → Accounts</em>.</li>
        </ul>
        <h4>If the bridge says “MT4 terminal not found” or “EA is not running”</h4>
        <ol>
          <li>Press <strong>Install MetaTrader 4</strong>, finish the wizard and log in to your broker once.</li>
          <li>Press <strong>Install CPE bridge EA</strong> — it is copied into <code>MQL4\\Experts</code> and compiled.</li>
          <li>In MT4 attach <strong>CPE_Bridge</strong> to a chart and click <strong>AutoTrading</strong>.</li>
          <li>In MT4 also allow it: <em>Tools → Options → Expert Advisors</em> → tick
          <strong>Allow automated trading</strong>.</li>
          <li>Installed in a custom folder? Point <code>CPE_MT4_PATH</code> at the folder holding
          <code>terminal.exe</code> and restart the app.</li>
        </ol>
        <p class="tiny">MT4 is broker-agnostic. Saved values stay on this machine; signals and paper
        trades work without the bridge.</p>`
    },
    FOREX_DEMO: {
      title: 'Forex Demo Rates (no API key)',
      html: `
        <ol>
          <li>No broker key needed.</li>
          <li>Uses public FX rates for signals + paper trades.</li>
          <li>Open <strong>Forex Desk</strong> → Scan → Paper trade from Manual page.</li>
          <li>When ready for live FX, connect OANDA / FXCM / MT5 instead.</li>
        </ol>`
    }
  },
  si: {
    BINANCE: {
      title: 'Binance API සම්බන්ධ කරන්න',
      html: `
        <ol>
          <li><strong>binance.com</strong> login වෙන්න.</li>
          <li>Profile → <strong>API Management</strong>.</li>
          <li><strong>Create API</strong> → System generated → නම CPE Trade Pro.</li>
          <li>Email / 2FA verify කරන්න. එවිට <strong>API Key</strong> සහ <strong>Secret Key</strong> පෙන්නයි.</li>
          <li><strong>Secret</strong> එක වහාම copy කරලා ආරක්ෂිත තැනක තියාගන්න — එය පෙන්නන්නේ
          <strong>එක වතාවක් පමණයි</strong>. Save කරද්දී ඒක මෙතනට paste කරන්න.</li>
          <li>Reading ON. Auto trade කරනවා නම් විතරක් Spot/Futures trading ON.</li>
          <li><strong>Withdrawals OFF</strong> (හැමවිටම off තියන්න).</li>
        </ol>
        <h4>IP access setting එක (වැදගත්)</h4>
        <p>ගෙදර/office public IP එක වෙනස් වෙන නිසා Binance <strong>-2015</strong> error එක දෙනවා නම්,
        key එකට ඒ option එක තිබේ නම් IP access සඳහා <strong>Unrestricted</strong> තෝරන්න
        (නැත්නම් “Restrict access to trusted IPs only” off කරන්න). මෙයින් key එකට ඕනෑම IP එකකින්
        request එන්න ඉඩ ලැබෙනවා; API permissions සියල්ල enable කරන්න කියන එක <strong>නොවේ</strong>.</p>
        <p><strong>Withdrawals OFF</strong> තබන්න. මේ app එකට අවශ්‍ය Read සහ Spot/Futures trading
        permissions පමණක් enable කරන්න. PC එක ආරක්ෂිතව තබා API Secret එක කිසිවෙකුට දෙන්න එපා.
        IP එක නොවෙනස් නම් fixed-IP whitelist එක වඩා ආරක්ෂිතයි.</p>
        <h4>විකල්පය: fixed IP whitelist</h4>
        <ol>
          <li>API row එකේ <strong>Edit restrictions</strong> click කරන්න.</li>
          <li><strong>Restrict access to trusted IPs only</strong> තෝරන්න.</li>
          <li>ඔබේ <strong>public IP</strong> එක IPv4 කොටුවට paste කරලා <strong>Save</strong> කරන්න.</li>
        </ol>
        <h4>ඔබේ යන්ත්‍රයේ IP එක හොයන විදිහ</h4>
        <ol>
          <li>වම් පැත්තේ <strong>Get My IP</strong> button එක ඔබන්න — app එක IP එක අරගෙන copy කරනවා.</li>
          <li>නැත්නම් <strong>PowerShell</strong> එකේ <code>curl ifconfig.me</code> run කරන්න.</li>
          <li>නැත්නම් browser එකෙන් <a href="https://whatismyipaddress.com" target="_blank">whatismyipaddress.com</a> බලන්න.</li>
        </ol>
        <p class="tiny">ගෙදර/office router නිසා IP එක වෙනස් වෙන්න පුළුවන්. Key එක වැඩ නැති වුනොත් IP එක
        check කරලා update කරන්න. ඊට පස්සේ ඒ API Key + Secret එකම වම් පැත්තේ දාලා
        <strong>Save Keys</strong> කරන්න. Binance එකේ key එක renew/edit කළාට පස්සේ මෙතනත් keys නැවත
        save කරන්න; එවිට දින 25 reminder එක නැවත පටන් ගන්නවා. Reminder එක Binance දෙන නියම expiry
        දිනය තහවුරු කිරීමක් නොවේ. Secret එක කවදාවත් අනිත් අයට දෙන්න එපා.</p>
        <h4>Smart IP Guard (මේ app එකේ)</h4>
        <p>Binance <strong>main account</strong> API key එකක IP whitelist එක <strong>කිසිම API එකකින්</strong>
        edit කරන්න බෑ — ඒක Binance වෙබ් අඩවියෙන් විතරයි වෙනස් කරන්න පුළුවන්. ඒ නිසා මේ app එක ඔබ වෙනුවෙන්
        IP එක බලාගෙන, අතින් edit කරන එක ඉක්මන් කරනවා. DEMO/LIVE switch එකට උඩින් සහ මේ පිටුවේ
        <strong>Binance</strong> badge එකක් පෙන්නනවා — <strong>Binance වලට විතරයි</strong>.</p>
        <ol>
          <li>App එක open වෙන හැම වතාවකම — ඊට අමතරව wake, unlock, නැවත connect වීම සහ හැම මිනිත්තු 5කට
          වරක් — ඔබේ <strong>public IP</strong> එක ස්වයංක්‍රීයව කියවනවා.</li>
          <li>කලින් save කරපු එකට සමාන නම් badge එක සාමාන්‍යයි (✔ in sync).</li>
          <li><strong>වෙනස් වුණොත්</strong> badge එකේ <strong>රතු තිතක්</strong> එනවා, සහ මෙතන රතු card එකක
          <strong>Old → New</strong> IP එකයි පියවර 3කුයි පෙන්නනවා:
            <ul>
              <li><strong>Copy new IP</strong> — අලුත් IP එක copy කරනවා.</li>
              <li><strong>Open Binance API Management</strong> — Binance අදාළ පිටුව හරියටම open කරනවා.</li>
              <li>Binance එකේ: key එක → <strong>Edit restrictions</strong> → <strong>IP access restrictions</strong>
              → පරණ IP එක අලුත් එකට මාරු කර → <strong>Save</strong>.</li>
              <li><strong>I saved it</strong> — app එක අලුත් IP එක මතක තියාගන්නවා, card එක කොළ පාට (in sync) වෙනවා.</li>
            </ul>
          </li>
        </ol>
        <p>මේක Binance නීති වලිනුත් ඔබව රකිනවා: IP restriction <strong>නැති</strong> key එකක්
        <strong>දින 90න් delete වෙනවා</strong>, සහ IP whitelist එකක් නැතුව <strong>Withdrawals enable කරන්න
        බෑ</strong>. ISP එකෙන් <strong>static IP</strong> එකක් ගත්තොත් මේ ප්‍රශ්නය සම්පූර්ණයෙන්ම නැති වෙනවා.</p>
        <p>Portal: <a href="https://www.binance.com/en/my/settings/api-management" target="_blank">API Management</a></p>`
    },
    BYBIT: {
      title: 'Bybit API සම්බන්ධ කරන්න',
      html: `
        <ol>
          <li>bybit.com → API → Create New Key.</li>
          <li>Read + Trade. Withdraw නැත.</li>
          <li>Key + Secret paste → Save Bybit.</li>
        </ol>`
    },
    OKX: {
      title: 'OKX API සම්බන්ධ කරන්න',
      html: `
        <ol>
          <li>okx.com → API → V5 key හදන්න.</li>
          <li><strong>Passphrase</strong> ඔබම තෝරන්න.</li>
          <li>Key + Secret + Passphrase Save කරන්න. Withdraw OFF.</li>
        </ol>`
    },
    KUCOIN: {
      title: 'KuCoin API',
      html: `<ol><li>API Management → Create. Passphrase දාන්න.</li><li>Trade ON, Withdraw OFF → Save.</li></ol>`
    },
    BITGET: {
      title: 'Bitget API',
      html: `<ol><li>API Management → Create + passphrase.</li><li>Trade ON, Withdraw OFF → Save.</li></ol>`
    },
    GATE: {
      title: 'Gate.io API',
      html: `<ol><li>API v4 key හදන්න.</li><li>Key + Secret Save. Withdraw OFF.</li></ol>`
    },
    MEXC: {
      title: 'MEXC API',
      html: `<ol><li>API Management → Create.</li><li>Key + Secret Save. Withdraw OFF.</li></ol>`
    },
    KRAKEN: {
      title: 'Kraken API',
      html: `<ol><li>Security → API → Add key.</li><li>Orders create ඉඩ. Withdraw නැත → Save.</li></ol>`
    },
    COINBASE: {
      title: 'Coinbase API',
      html: `<ol><li>Settings → API → New key.</li><li>View + Trade. Transfer නැත → Save.</li></ol>`
    },
    FOREX_OANDA: {
      title: 'OANDA Forex API',
      html: `
        <p>OANDA එකේ API key/secret වෙනුවට <strong>Personal Access Token</strong> එකක් තියෙනවා — ඒ නිසා
        token එක <strong>API Key</strong> field එකට, account number එක <strong>Account ID</strong> එකට දාන්න.</p>
        <h4>Setup A → Z</h4>
        <ol>
          <li><a href="https://www.oanda.com" target="_blank">oanda.com</a> එකේ account එකක් හදන්න —
          <strong>practice (fxTrade Practice)</strong> account එක නොමිලේ, test කරන්න ආරක්ෂිතම.</li>
          <li>Log in වෙලා <em>My Account → Manage API Access</em> ට යන්න.</li>
          <li><strong>Generate</strong> ඔබලා <strong>Personal Access Token</strong> එකක් හදන්න; එයා එක
          වතාවක් විතරයි පෙන්නන්නේ — ඒ වෙලාවෙම copy කරන්න.</li>
          <li>ඔබේ <strong>Account ID</strong> එක copy කරන්න (එතන / Account Overview එකේ තියෙන
          <code>101-004-xxxxxxx-001</code> වගේ අංකය).</li>
          <li>මෙතන token එක <strong>API Key</strong> එකට, අංකය <strong>Account ID</strong> එකට දාලා
          <strong>Save Keys</strong> ඔබන්න.</li>
          <li><strong>Test Account</strong> ඔබන්න — සාර්ථක නම් account සහ currency එක්ක <code>ok: true</code> එනවා.</li>
        </ol>
        <h4>Demo සහ Live</h4>
        <p>App එක මුලින්ම <strong>practice</strong> host එක try කරලා, බැරි වුනාම <strong>live</strong> host
        එකට auto fall back කරනවා — ඒ නිසා live account එකට මාරු වුනාට පස්සේ ඒ token එකම වැඩ කරනවා.</p>
        <h4>Orders size කරන විදිහ</h4>
        <p>OANDA orders <strong>units</strong> වලින් size කරනවා. මේ app එක MT5-style lots කතා කරනවා
        (<code>0.01</code> = micro lot), 1 lot = 100,000 units — ඒ නිසා app එක convert කරනවා
        (උදා: <code>0.01</code> lot → 1,000 units).</p>
        <p class="tiny">Orders <strong>MARKET (fill-or-kill)</strong> විතරයි. Token එක password එකක් වගේ
        රකින්න — කාටවත් දෙන්න එපා, leak උනොත් අලුතින් generate කරන්න.</p>`
    },
    FOREX_FXCM: {
      title: 'FXCM Forex',
      html: `
        <p class="tiny"><strong>සැලකිය යුතුයි:</strong> FXCM ගේ REST API එක region / account type අනුව
        වෙනස්. මේ app එකේ FXCM keys <strong>save කරලා test කරනවා</strong>, ඒත් <strong>FXCM live orders
        තවම route කරන්නේ නැහැ</strong> — live forex trading සඳහා <strong>MetaTrader 5 / MT4</strong>
        (ඕනෑම FXCM account එකක් cover කරනවා) use කරන්න.</p>
        <h4>කොහොම හරි FXCM keys save කරන්න ඕන නම්</h4>
        <ol>
          <li>FXCM / Trading Station එකෙන් <strong>REST API credentials</strong> (API Key + Secret) සහ
          ඔබේ region එකට අදාළ <strong>demo/live host</strong> එක ඉල්ලන්න.</li>
          <li><strong>API Key</strong> + <strong>Secret</strong> මෙතන දාලා <strong>Save Keys</strong> ඔබන්න.</li>
          <li><strong>Test Account</strong> එකෙන් fields තියෙනවද කියලා විතරයි බලන්නේ — live orders
          දාන්න බැහැ.</li>
        </ol>`
    },
    FOREX_MT5: {
      title: 'MetaTrader 5 (ඕනෑම MT5 broker)',
      html: `
        <p>MetaTrader 5 දෙන ඕනෑම broker කෙනෙක්ම මේ එකම විකල්පයෙන් වැඩ කරයි —
        එකින් එකට වෙනම code කරන්න ඕන නැහැ:</p>
        <ul>
          <li><strong>Pepperstone</strong> · <strong>IC Markets</strong> · <strong>XM</strong> ·
          <strong>Fusion Markets</strong> · Exness, FP Markets, Tickmill …</li>
        </ul>
        <h4>දැන් MT5 ට එක manual පියවරක් අවශ්‍ය ඇයි (EA bridge)</h4>
        <p>පරණ MT5 terminals වලට app එක කෙලින්ම MetaTrader Python API එකෙන් trade කරන්න පුළුවන් වුනා.
        ඒත් MetaTrader ගේ අලුත් terminals (<strong>build 6230 සහ ඊට ඉහළ</strong>) ඒ channel එක කැඩුවා —
        ඒ නිසා MT5 open වෙලා, log in වෙලා, Algo Trading on වෙලා තිබුනත් app එක
        <code>MT5 initialize failed: (-10005, 'IPC timeout')</code> කියලා එනවා. <strong>හැම</strong> build එකකම
        වැඩ කරන්න, දැන් app එක ඔබේ terminal එක ඇතුළේ install වෙන කුඩා Expert Advisor එකක්
        (<code>CPE_Bridge</code>) හරහා MT5 එකට කතා කරනවා — MT4 වැඩ කරන ක්‍රමයටම. ඒ කියන්නේ:</p>
        <ul>
          <li><strong>App එක සියල්ල install කරනවා</strong> — Python 3, MT5 terminal එක සහ compile කරපු EA එක —
          <strong>Auto-install everything</strong> ඔබන්න (නැත්නම් <strong>Install MetaTrader 5</strong> ඊට පස්සේ
          <strong>Install CPE bridge EA</strong>).</li>
          <li><strong>EA එක එක වතාවක් attach කරන්න ඕන</strong>: MT5 එකේ <kbd>Ctrl+N</kbd> ඔබලා
          <em>Navigator</em> → <em>Expert Advisors</em> open කරලා, <strong>CPE_Bridge</strong> ඕනෑම chart එකකට
          (උදා: EURUSD) drag කරලා <strong>OK</strong> ඔබන්න, ඊට පස්සේ toolbar එකේ <strong>Algo Trading</strong>
          බොත්තම ඔබලා එයා <strong>green</strong> කරන්න. Chart එකේ smiley face එකක් පෙන්නනවා.</li>
          <li><strong>MT5 log in වෙලා තියෙන්න ඕන AND online වෙන්න ඕන</strong> — app එකට MT5 login කරන්න බැහැ.
          <em>File → Login to Trade Account</em> භාවිතා කරන්න. පහළ-දකුණු corner එකේ connection indicator
          එක <strong>green</strong> වෙන්න ඕන; red/හිස් නම් orders <strong>10031 (no connection)</strong>
          කියන broker code එකෙන් fail වෙනවා.</li>
        </ul>
        <h4>Setup A → Z (live orders)</h4>
        <ol>
          <li><code>metatrader5.com</code> එකෙන් (නැත්නම් ඔබේ broker ගේ download page එකෙන්) MetaTrader 5
          install කරලා <strong>එක වතාවක් open</strong> කරලා, <em>File → Login to Trade Account</em> එකෙන් log in වෙන්න.</li>
          <li>MT5 එකේ: <em>Tools → Options → Expert Advisors</em> → <strong>Allow algorithmic trading</strong>
          tick කරන්න, <strong>Disable algorithmic trading via external Python API</strong> untick කරන්න → OK.</li>
          <li>මෙතන <strong>Auto-install everything</strong> ඔබන්න (Python + MT5 + EA install කරනවා), නැත්නම්
          <strong>Install MetaTrader 5</strong> ඊට පස්සේ <strong>Install CPE bridge EA</strong> ඔබන්න.</li>
          <li>MT5 එකේ: <em>Navigator → Expert Advisors</em> → <strong>CPE_Bridge</strong> chart එකකට drag → OK.</li>
          <li><strong>Algo Trading</strong> බොත්තම ඔබලා <strong>green</strong> කරන්න.</li>
          <li>පහළ-දකුණු connection indicator එක <strong>green</strong> කරන්න (right-click → Reconnect).</li>
          <li>මෙතන <strong>Login</strong>, <strong>Password</strong>, <strong>Server</strong> දාලා →
          <strong>Save Keys</strong> → <strong>Start MT5 Bridge</strong> → <strong>Test Account</strong> ඔබන්න.
          සාර්ථක නම් ඔබේ account login, server සහ balance එක්ක <code>ok: true</code> එනවා.</li>
          <li>App එක live orders දාන අතරතුර MT5 එක EA එකත් attach කරලා Algo Trading on කරලා open තියන්න.</li>
        </ol>
        <h4>හරියටම දාන්න ඕන දේ</h4>
        <ol>
          <li><strong>Login</strong> — ඔබේ MT5 ගිණුම් අංකය (login කරන්න දාන 7–9 අංකය).</li>
          <li><strong>Password</strong> — ඒ ගිණුමේ MT5 master password එක (නැත්නම් investor read-only password).</li>
          <li><strong>Server</strong> — හරියටම server නම, උදා: <code>ICMarketsSC-Live</code>, <code>XMGlobal-MT5 5</code>, <code>Pepperstone-Live04</code>.</li>
        </ol>
        <h4>Server නම හොයන විදිහ</h4>
        <ul>
          <li>MT5 → <em>File → Login to Trade Account</em> → server dropdown එක බලන්න.</li>
          <li>නැත්නම් <em>File → Open an Account</em> → ඔබේ broker ගේ servers.</li>
          <li>Broker එවපු welcome email එකේ හෝ <em>Navigator → Accounts</em> එකේත් තියෙනවා.</li>
        </ul>
        <h4>Demo සහ Live server</h4>
        <ul>
          <li>Demo server නම අන්තිමට <code>-Demo</code>, live එකට <code>-Live</code> (අංකයක් එක් වෙන්නත් පුළුවන්).</li>
          <li>පළමුව <strong>Demo</strong> එකේ test කරන්න — සූදානම් වුනාම <strong>Live</strong> ට මාරු වෙන්න.</li>
        </ul>
        <h4>Investor (read-only) password</h4>
        <ul>
          <li>MT5 → <em>Tools → Options → Server</em> → <em>Change password</em> → <strong>Investor (read-only)</strong> on කරන්න.</li>
          <li>Investor password එකෙන් data කියවන්න විතරයි පුළුවන් (test කරද්දී ආරක්ෂිතයි). Live orders සඳහා master password එක දෙන්න.</li>
        </ul>
        <h4>ප්‍රශ්න විසඳන විදිහ (Troubleshooting)</h4>
        <ul>
          <li><code>IPC timeout (-10005)</code> — build 6230+ වලට සාමාන්‍යයි; උඩ EA bridge එකෙන් හදනවා.
          <strong>CPE_Bridge chart එකකට attach</strong> කරලා <strong>Algo Trading green</strong> බව තහවුරු කරන්න.</li>
          <li><code>10031: no connection</code> — MT5 log in වෙලා තියෙනවා, ඒත් offline. පහළ-දකුණු
          indicator එක green කරන්න (right-click → Reconnect / <em>File → Login</em>), internet / VPN / firewall බලන්න.</li>
          <li>“MT5 terminal not found” — MT5 එක එක වතාවක් open කරන්න (Windows එකට register වෙන්න);
          වෙන folder එකකට install නම් <code>CPE_MT5_PATH</code> එක <code>terminal64.exe</code> ගේ සම්පූර්ණ
          path එකට set කරලා app එක restart කරන්න.</li>
          <li>“EA is not running / did not answer” — <strong>CPE_Bridge</strong> chart එකකට attach කරලා,
          <strong>Algo Trading</strong> on කරලා, <em>Tools → Options → Expert Advisors</em> එකෙනුත් allow කරන්න.</li>
          <li>64-bit MT5 terminal එකට 64-bit Python අවශ්‍යයි — 64-bit MT5 build එක install කරන්න.</li>
        </ul>
        <p class="tiny">Save කරන දේවල් මේ යන්ත්‍රයේම තියෙනවා. Live orders සඳහා MT5 එක CPE_Bridge EA එක
        attach කරලා open තියෙන්න ඕන; signals සහ paper trades එක නැතුවත් වැඩ කරයි.</p>`
    },
    FOREX_MT4: {
      title: 'MetaTrader 4 (ඕනෑම MT4 broker)',
      html: `
        <p>MetaTrader 4 දෙන ඕනෑම broker කෙනෙක්ම මේ එකම විකල්පයෙන් වැඩ කරයි —
        එකින් එකට වෙනම code කරන්න ඕන නැහැ. Chart එකයි <strong>signal එකයි MT5 එකට සමානයි</strong>
        (දෙකම එන්නේ මේ app එකේම FX data feed එකෙන්); වෙනස් වෙන්නේ order execution එක විතරයි —
        හැම terminal එකක්ම ඔබේ තමන්ගේ account එකේ trade කරන නිසා.</p>
        <h4>MT4 ට එක manual පියවරක් අවශ්‍ය ඇයි</h4>
        <p>MetaTrader 5 ට Python API එකක් තියෙනවා, ඒ නිසා app එකට login වෙලා කෙලින්ම trade කරන්න පුළුවන්.
        MT4 ට <strong>කිසිම API එකක් නැහැ</strong>, ඒ නිසා app එක ඔබේ MT4 එකට කුඩා Expert Advisor එකක්
        (<code>CPE_Bridge</code>) install කරලා file හරහා කතා කරනවා. ඒ කියන්නේ:</p>
        <ul>
          <li><strong>App එක සියල්ල install කරනවා</strong> — Python 3, MT4 terminal එක සහ compile කරපු EA එක —
          <strong>Auto-install everything</strong> ඔබන්න.</li>
          <li><strong>EA එක එක වතාවක් attach කරන්න ඕන</strong>: MT4 එකේ <em>Navigator → Expert Advisors</em> →
          <strong>CPE_Bridge</strong> ඕනෑම chart එකකට drag කරලා, <strong>AutoTrading</strong> බොත්තම ඔබන්න.</li>
          <li><strong>MT4 කලින්ම login වෙලා තියෙන්න ඕන</strong> — app එකට MT4 login කරන්න බැහැ.
          <em>File → Login to Trade Account</em> භාවිතා කරන්න (login වෙනස් නම් bridge එක trade කරන්නේ නැහැ).</li>
        </ul>
        <h4>හරියටම දාන්න ඕන දේ</h4>
        <ol>
          <li><strong>Login</strong> — ඔබේ MT4 ගිණුම් අංකය (login කරන්න දාන අංක).</li>
          <li><strong>Password</strong> — MT4 <em>master</em> password එක (investor / read-only password එකෙන් trade කරන්න බැහැ).</li>
          <li><strong>Server</strong> — හරියටම server නම, උදා: <code>ICMarketsSC-Live02</code>, <code>XMGlobal-MT4 5</code>.</li>
        </ol>
        <h4>Server නම හොයන විදිහ</h4>
        <ul>
          <li>MT4 එකේ: <em>File → Login to Trade Account</em> → server dropdown එක බලන්න.</li>
          <li>නැත්නම් broker එවපු welcome email එකේ හෝ <em>Navigator → Accounts</em> එකේ.</li>
        </ul>
        <h4>“MT4 terminal not found” හෝ “EA is not running” කිව්වොත්</h4>
        <ol>
          <li><strong>Install MetaTrader 4</strong> ඔබලා wizard එක ඉවර කරලා broker ගිණුමට එක වතාවක් log in වෙන්න.</li>
          <li><strong>Install CPE bridge EA</strong> ඔබන්න — එයා <code>MQL4\\Experts</code> එකට copy වෙලා compile වෙනවා.</li>
          <li>MT4 එකේ <strong>CPE_Bridge</strong> chart එකකට attach කරලා <strong>AutoTrading</strong> ඔබන්න.</li>
          <li>MT4 එකේත් allow කරන්න: <em>Tools → Options → Expert Advisors</em> → <strong>Allow automated trading</strong> tick කරන්න.</li>
          <li>වෙනත් folder එකකට install කරලා නම්, <code>CPE_MT4_PATH</code> එක <code>terminal.exe</code> තියෙන folder එකට
          set කරලා app එක restart කරන්න.</li>
        </ol>
        <p class="tiny">MT4 broker-agnostic. Save කරන දේවල් මේ යන්ත්‍රයේම තියෙනවා; signals සහ paper trades
        bridge එක නැතුවත් වැඩ කරයි.</p>`
    },
    FOREX_DEMO: {
      title: 'Forex Demo (API key නැත)',
      html: `
        <ol>
          <li>Broker key ඕනේ නැහැ.</li>
          <li>Forex Desk → Scan → Paper trade.</li>
          <li>Live FX සඳහා පසුව OANDA / FXCM / MT5 connect කරන්න.</li>
        </ol>`
    }
  }
};

window.CPE_getPlatformGuide = function (platformId, lang) {
  const L = window.CPE_PLATFORM_GUIDES[lang] || window.CPE_PLATFORM_GUIDES.en;
  return (L && L[platformId]) || window.CPE_PLATFORM_GUIDES.en[platformId] || {
    title: platformId,
    html: '<p>Select a platform to see API connect steps.</p>'
  };
};
