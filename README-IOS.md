# CPE Trade Pro — iPhone (iOS) app ekata

Meka **Xcode project** ekak. Apple gee niyamaya anuwa, iPhone app ekak **build
karanna puluwan macOS + Xcode** ekak thiyena computer ekak thamai onee.
Windows eken hariyta iOS binary ekak hadanna ba. Ee nisa meke thiyenne
**sampurna project eka** — Mac ekakata/MacinCloud ekakata gaththaama open
karala run karanna puluwan.

---

## Mokada meke thiyenne

```
ioc\
  CPETradePro.xcodeproj          <- Xcode project eka (meka open karanawa)
  CPETradePro\
    AppDelegate.swift            <- app entry point
    ViewController.swift         <- WKWebView host
    CpeBridge.swift              <- networking / toast / vibrate / share / notify
    Info.plist                   <- app settings (bundle id, permissions)
    Assets.xcassets\             <- app icon + launch colour
    www\                         <- sampurna app eka (HTML/JS/CSS + chart engine)
  README-IOS.md                  <- me file eka
```

Desktop app ekema analysis engine, charts, auto-trade, licence system hamaama
`www` folder eke thiyenawa. Kotuwen wenaskamak nathuwa iPhone eketh wada karanawa.

---

## Mokada onee

1. **Mac ekak** (M1/M2/Intel) — Xcode 15 hoy Xcode 16 ekak ekka
2. **Apple ID ekak** (nikanma free ekak athi) — phone ekaka run karanna
3. **iPhone ekak** + USB/Lightning cable ekak
4. Mac ekak nethnam -> **MacinCloud / MacStadium** wage cloud Mac ekak (pahala balanna)

---

## Krama 1 — Mac ekak thiyenawa nam (phone ekaka run karanawa)

1. me `ioc` folder eka Mac ekakata copy karanna.
2. `CPETradePro.xcodeproj` eka **double-click** karanna (Xcode open wenawa).
3. Xcode eke, upare thiyena scheme eka **CPETradePro** kiyala thiyenawada balanna.
   Naethnam eka thoranna.
4. **Signing** hadanna:
   - left panel eke **CPETradePro** project eka thoranna -> **Signing & Capabilities** tab eka
   - **Team** eken oyage Apple ID eka thoranna (naethnam "Add an Account..." -> Apple ID ekak add karanna)
   - eeta passe Xcode eka thamanta bundle id eka wenas karanna kiyala kiwwoth, eka
     `com.cryptoprofiteye.tradepro.ios` -> `com.oyage.nama.cpetradepro` kiyala wenas karanna
5. iPhone eka cable eken Mac ekakata connect karanna. Phone eke "Trust This Computer"
   eka ovabanna.
6. Xcode eke upare device list eken oyage iPhone eka thoranna, eeta passe
   **Run** (▶) button eka ovabanna.
7. Phone eke Settings -> General -> VPN & Device Management -> oyage Apple ID eka ->
   **Trust** karanna. (Modata oya app eka 7 dinakata wada thiyenna onee nam, developer
   account ekak onee — nattan 7 dinakin ayeth run karanawa.)

## Krama 2 — Simulator eke pamanak balanna

Xcode eke, device list eken iPhone 15 / iPhone 16 wage **Simulator** ekak thorala
Run (▶) karanna. Simulator ekakata signing onee nathiwa thamai wada karanawa.
(eheth simulator eke true notification / share sheet poddak wenas wenawa.)

---

## Mac ekak nethnam — Cloud Mac ekak use karana krama (step by step)

iPhone app ekak build karanna **Apple gee macOS + Xcode** onee. "Cloud Mac"
kiyanne, kiriyata (hourly / monthly) ganna puluwan **remote Mac ekak** — oyage
Windows PC eken **Microsoft Remote Desktop** eken e Mac ekata connect wela,
Xcode eken app eka build karanawa. MacinCloud thamai mekatat vadhagath service
eka.

### 1. Account eka hadanna (MacinCloud)

1. https://www.macincloud.com ekata yanna
2. **Pay-As-You-Go** (hourly) hoy **Managed Server** plan ekak thoranna —
   pay-as-you-go ekak thamai lassei, modata try karanna
3. **Wadhagath:** plan eka **Xcode ekka** enawada balanna. "Managed Server +
   Xcode" wage option ekak thoranna, hoy support ekata email karala confirm
   karanna. Sama plan ekakata Xcode denna ne.
4. **Apple ID** ekak onee (free ekak athi). Naethnam
   https://appleid.apple.com eken ekak hadanna. (Meka Xcode eke signing ekata
   use karanawa.)

### 2. Cloud Mac ekata connect wenna

1. Windows eke **Microsoft Remote Desktop** app eka Microsoft Store eken
   install karanna
2. MacinCloud portal eke thiyena **Server Address (IP), Username, Password**
   copy karanna
3. RDP eke **Add PC** -> address / username / password dala **Connect**
4. Den oyage screen eke macOS desktop ekak. **Applications** eken **Xcode**
   thiyenawada balanna. Nathnam support ekata kiyanna.

### 3. Project eka upload karanna

1. Windows eke `Desktop\ioc` folder eka right-click -> **Send to ->
   Compressed (zipped) folder** -> ehemai `ioc.zip`
2. E `ioc.zip` eka Windows eken **Google Drive / Dropbox / WeTransfer** ekakata
   upload karanna
3. Remote Mac eke **Safari** eken e link eka open karala download karanna, eeta
   passe Desktop ekata unzip karanna
   (MacinCloud portal eke file-transfer / upload option ekakuth thiyenawa nam
   eka use karannath puluwan)

### 4. Xcode eke open karanna + signing

1. Finder -> `ioc` -> **CPETradePro.xcodeproj** double-click
2. Left panel eke **CPETradePro** (blue icon eka) -> **Signing & Capabilities**
   tab eka
3. **Team** dropdown eken **"Add an Account..."** -> Apple ID eka add karanna ->
   eeta passe Team eken eka thoranna (free Apple ID nam **"Personal Team"**
   kiyala penenawa)
4. **Bundle Identifier** eka `com.cryptoprofiteye.tradepro.ios`. Red error ekak
   awoth, eka unique ekakata wenas karanna, e.g. `com.oyagenama.cpetradepro`

### 5. Modata Simulator eke test karanna (phone eka nathuwa)

1. Upare device list eken **iPhone 15** / **iPhone 16** wage **Simulator** ekak
   thoranna
2. **Run (▶)** karanna
3. App eka open wela desktop app ekema penenna onee. White screen ekak nam ->
   `CPETradePro\www\index.html` thiyenawada balanna (script eken auto generate
   wela thiyenawa)

### 6. Real iPhone ekata danna (physical phone)

Meka thamai wadhagath kathawa: **cloud Mac eka remote nisa, oyage iPhone eka USB
eken ethanata connect karanna ba.** Ee nisa `.ipa` ekak hadala, Windows PC
ekakakin **Sideloadly** ekakata phone ekata danna onee.

**A) `.ipa` eka hadanna (Xcode eken)**

1. Xcode upare device eka **"Any iOS Device (arm64)"** thoranna (real device ekak
   meheta need ne)
2. Menu: **Product -> Archive**
3. Organizer window eka open wenawa -> **Distribute App** -> **Development**
   (hoy **Debugging**) -> **Next** -> **Automatically manage signing** ->
   **Export**
4. E `.ipa` eka Remote Mac eken Google Drive ekakata upload karala, Windows eken
   download karanna
5. "**No devices registered**" kiyala export eka block wunoth (free Apple ID
   walata wela thiyenawa): Organizer eke archive eka right-click ->
   **Show in Finder** -> e `.app` eka aran `Payload` kiyala folder ekakata
   dala, e folder eka zip karala `.ipa` kiyala rename karanna. (Auth re-sign
   karanne Sideloadly thamai, ehema eka wada karanawa.)

**B) Windows World eken phone ekata install karanna (Sideloadly)**

1. https://sideloadly.io eken **Sideloadly** eka install karanna
2. **iTunes** eka Apple gee website eken (https://www.apple.com/itunes/) install
   karanna — Microsoft Store eke version eka wada karanne ne
3. iPhone eka USB cable eken oyage Windows PC ekakata connect karanna, phone
   eke **"Trust This Computer"** eka ovabanna
4. Sideloadly open karanna -> upare iPhone eka thoranna -> `.ipa` eka
   **drag & drop** karanna -> Apple ID eka dala **Start**
5. Phone eke **Settings -> General -> VPN & Device Management** -> oyage Apple
   ID eka -> **Trust**
6. Free Apple ID nam app eka **7 dinakata** wada karanawa. Eeta passe ayeth
   Sideloadly eken danna onee. (7 dina kalaya athule app 3k pamanai.)

**C) Cloud Mac ekakata phone eka USB eken connect karanna puluwanda?**

Sama cloud Mac ekakata USB passthrough denna ne, eka reliable ne. Ee nisa **A +
B** krama eka thamai kiyana hodama margaya. (MacinCloud support ekata ahala
balanna — plan ekakata USB denna thiyenawa nam eka use karannath puluwan.)

### 7. Free Apple ID vs paid Apple Developer

| | Free Apple ID | Apple Developer ($99/year) |
|---|---|---|
| Kalaya | app eka **7 din** pamanai | 1 awrudu |
| App count | 7 dina kalaya athule 3k | device 100 |
| TestFlight / App Store | ne | ow |

Personal use ekakata nam **free Apple ID ekak athi**. Wenasak nethnam, app eka
hama 7 dinakema ayeth sideload karanna onee.

### 8. Mac ekak nethnam wena kramak

- **Friend / relative ge Mac ekak** — me `ioc` folder eka unta denna. Unta krama
  **4 - 6** karala denna puluwan (e Mac eke Xcode thiyenawa nam).
- **MacStadium / Scaleway Apple Silicon** — MacinCloud ekath ekama wage cloud Mac
  services.
- **AWS EC2 Mac** — meka dedicated host ekak, 24 hour minimum — personal app
  ekakata meka vayawasthabda ne.
- **Codemagic / Xcode Cloud / GitHub Actions (macOS runner)** — CI eken `.ipa`
  build karanna puluwan, namuth code signing ekakata **paid** Apple Developer
  account ekak onee. Free Apple ID ekakata wadinna ne.
- **Add to Home Screen (web app)** — developer account ekak nathuwa; pahala
  "phone ekak nethuwa" krama eka balanna. (Native features poddak wenas wenawa.)

---

## Phone ekak nethuwa — "Add to Home Screen" (web app ekak lesa)

Apple phone ekakata app store eken install nokara, web app ekak lesa damma puluwan:

1. Desktop app ekakata hoy `www` folder ekakata thiyena files eka **web server
   ekakata** (Netlify / Vercel / oyage hosting) upload karanna.
2. Safari eken e URL eka open karanna.
3. **Share** button eka -> **Add to Home Screen**.
4. Eeta passe home screen eken icon ekak athin open wenawa.

(Meka native shell ekak nathi nisa, notification/share sheet krama poddak wenas
wenna puluwan. Eth charts krama hamaama wada karanawa.)

---

## Prashna thibboth

- **"No signing certificate" error** -> Signing tab eke Team eka hariyata thorala
  thiyenawada balanna. Free Apple ID ekak thamath wada karanawa.
- **"Untrusted Developer"** -> Phone eke Settings -> General -> VPN & Device
  Management eken developer eka trust karanna.
- **App eka white screen** -> `CPETradePro\www\index.html` thiyenawada balanna.
  (Meka `tools/build-ios-project.js` eken auto generate wela thiyenawa.)
- **Signature/HMAC wada karanne nadda** -> `ios-app\native-bridge.js` eke pure-JS
  SHA-256/SHA-512 implementation eka desktop ekath ekama output denawa
  (node:crypto ekka 100% match — test karala thiyenawa).
- **Cloud Mac ekata RDP eken connect wenne ne** -> MacinCloud portal eken
  username / password / server address hariyata copy karanna. Microsoft Remote
  Desktop eke **Add PC** ekak hadala eka danna.
- **".ipa" export karanna ba / "No devices registered"** -> Signing tab eke Team
  eka set karala thiyenawada balanna. Nathnam krama **6-A-5** (Payload folder ->
  zip -> .ipa) eka use karanna — re-sign karanne Sideloadly thamai.
- **Cloud Mac eka slow / lag** -> slow internet nisa wenna puluwan. Loku files
  upload/download karanna WeTransfer hoy Google Drive use karanna (RDP clipboard
  eken loku file danna epa).
