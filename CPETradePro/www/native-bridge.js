/**
 * CPE Trade Pro — iOS native bridge.
 *
 * The Android build talks to Java through `window.CPEAndroid`, whose methods are
 * synchronous (Android's @JavascriptInterface allows that). WKWebView has no
 * synchronous JS -> native call, so on iOS this file publishes an equivalent
 * `window.CPEAndroid` object built from three pieces:
 *
 *   1. a small info blob the shell injects before the page loads
 *      (window.__cpeNativeInfo — device id, model, OS, version)
 *   2. a pure-JavaScript SHA-256 / SHA-512 / HMAC implementation (so hashing
 *      stays synchronous, and byte-identical to the desktop / Android builds)
 *   3. postMessage() for everything that is already asynchronous (HTTP, toast,
 *      vibration, notifications, share sheet)
 *
 * It is a no-op on Android (CPEAndroid already exists) and in a plain browser,
 * so the same web bundle can be shipped to both stores.
 *
 * Must load BEFORE cpe-engine.js.
 */
(function (global) {
  'use strict';

  if (global.CPEAndroid) return;                       // Android shell / desktop
  var wv = global.webkit;
  var handlers = wv && wv.messageHandlers && wv.messageHandlers.cpe;
  if (!handlers) return;                               // not inside the iOS shell

  var info = global.__cpeNativeInfo || {};

  function post(payload) {
    try { handlers.postMessage(payload); } catch (e) { /* shell gone */ }
  }

  /* ================================================================ bytes */

  function utf8Bytes(str) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(String(str));
    var s = unescape(encodeURIComponent(String(str)));
    var out = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }

  function base64ToBytes(b64) {
    var s = String(b64).replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    var bin = atob(s);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function bytesToBase64(bytes) {
    var bin = '';
    var chunk = 0x8000;
    for (var i = 0; i < bytes.length; i += chunk) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(bin);
  }

  function bytesToBase64Url(bytes) {
    return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function bytesToHex(bytes) {
    var s = '';
    for (var i = 0; i < bytes.length; i++) s += (bytes[i] < 16 ? '0' : '') + bytes[i].toString(16);
    return s;
  }

  function concat(a, b) {
    var out = new Uint8Array(a.length + b.length);
    out.set(a, 0);
    out.set(b, a.length);
    return out;
  }

  /* ============================================== constant tables (derived) */

  // SHA-2 constants are the fractional parts of the square / cube roots of the
  // first primes. Deriving them here (once) keeps this file free of ~300 magic
  // numbers that would be easy to mistype. Verified against node:crypto.
  var M32 = 0xffffffffn;
  var M64 = 0xffffffffffffffffn;

  function iroot(n, k) {
    if (n < 2n) return n;
    var bits = n.toString(2).length;
    var x = 1n << BigInt(Math.ceil(bits / k) + 1);
    for (;;) {
      var y = (BigInt(k - 1) * x + n / (x ** BigInt(k - 1))) / BigInt(k);
      if (y >= x) break;
      x = y;
    }
    while (x > 0n && x ** BigInt(k) > n) x -= 1n;
    return x;
  }

  function isPrime(n) {
    if (n < 2) return false;
    for (var d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  }

  function primes(count) {
    var out = [];
    for (var n = 2; out.length < count; n++) if (isPrime(n)) out.push(n);
    return out;
  }

  function fracRoot(prime, scaleBits, degree) {
    var mul = 1n << BigInt(scaleBits * degree);
    return iroot(BigInt(prime) * mul, degree) & ((1n << BigInt(scaleBits)) - 1n);
  }

  var _k256, _k512, _h256, _h512;

  function k256() {
    if (_k256) return _k256;
    var p = primes(64);
    _k256 = p.map(function (x) { return fracRoot(x, 32, 3); });
    return _k256;
  }

  function h256() {
    if (_h256) return _h256;
    var p = primes(8);
    _h256 = p.map(function (x) { return fracRoot(x, 32, 2); });
    return _h256;
  }

  function k512() {
    if (_k512) return _k512;
    var p = primes(80);
    _k512 = p.map(function (x) { return fracRoot(x, 64, 3); });
    return _k512;
  }

  function h512() {
    if (_h512) return _h512;
    var p = primes(8);
    _h512 = p.map(function (x) { return fracRoot(x, 64, 2); });
    return _h512;
  }

  /* ============================================================== sha-256 */

  function rotr32(x, n) { return ((x >> n) | (x << (32n - n))) & M32; }

  function sha256(bytes) {
    var K = k256(); var H = h256().slice();
    var len = bytes.length;
    var pad = ((56 - ((len + 1) % 64)) + 64) % 64;
    var total = len + 1 + pad + 8;
    var m = new Uint8Array(total);
    m.set(bytes, 0);
    m[len] = 0x80;
    var bits = BigInt(len) * 8n;
    for (var i = 0; i < 8; i++) m[total - 1 - i] = Number((bits >> BigInt(i * 8)) & 0xffn);

    var w = new Array(64);
    var a, b, c, d, e, f, g, h, s0, s1, S0, S1, ch, maj, t1, t2, off, j;
    for (off = 0; off < total; off += 64) {
      for (i = 0; i < 16; i++) {
        w[i] = (BigInt(m[off + i * 4]) << 24n) | (BigInt(m[off + i * 4 + 1]) << 16n)
             | (BigInt(m[off + i * 4 + 2]) << 8n) | BigInt(m[off + i * 4 + 3]);
      }
      for (i = 16; i < 64; i++) {
        s0 = rotr32(w[i - 15], 7n) ^ rotr32(w[i - 15], 18n) ^ (w[i - 15] >> 3n);
        s1 = rotr32(w[i - 2], 17n) ^ rotr32(w[i - 2], 19n) ^ (w[i - 2] >> 10n);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) & M32;
      }
      a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];
      for (i = 0; i < 64; i++) {
        S1 = rotr32(e, 6n) ^ rotr32(e, 11n) ^ rotr32(e, 25n);
        ch = (e & f) ^ ((~e & M32) & g);
        t1 = (h + S1 + ch + K[i] + w[i]) & M32;
        S0 = rotr32(a, 2n) ^ rotr32(a, 13n) ^ rotr32(a, 22n);
        maj = (a & b) ^ (a & c) ^ (b & c);
        t2 = (S0 + maj) & M32;
        h = g; g = f; f = e; e = (d + t1) & M32; d = c; c = b; b = a; a = (t1 + t2) & M32;
      }
      H[0] = (H[0] + a) & M32; H[1] = (H[1] + b) & M32;
      H[2] = (H[2] + c) & M32; H[3] = (H[3] + d) & M32;
      H[4] = (H[4] + e) & M32; H[5] = (H[5] + f) & M32;
      H[6] = (H[6] + g) & M32; H[7] = (H[7] + h) & M32;
    }

    var out = new Uint8Array(32);
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 4; j++) out[i * 4 + j] = Number((H[i] >> BigInt((3 - j) * 8)) & 0xffn);
    }
    return out;
  }

  /* ============================================================== sha-512 */

  function rotr64(x, n) { return ((x >> n) | (x << (64n - n))) & M64; }

  function sha512(bytes) {
    var K = k512(); var H = h512().slice();
    var len = bytes.length;
    var pad = ((112 - ((len + 1) % 128)) + 128) % 128;
    var total = len + 1 + pad + 16;
    var m = new Uint8Array(total);
    m.set(bytes, 0);
    m[len] = 0x80;
    var bits = BigInt(len) * 8n;
    for (var i = 0; i < 16; i++) m[total - 1 - i] = Number((bits >> BigInt(i * 8)) & 0xffn);

    var w = new Array(80);
    var a, b, c, d, e, f, g, h, s0, s1, S0, S1, ch, maj, t1, t2, off, j;
    for (off = 0; off < total; off += 128) {
      for (i = 0; i < 16; i++) {
        var v = 0n;
        for (j = 0; j < 8; j++) v = (v << 8n) | BigInt(m[off + i * 8 + j]);
        w[i] = v;
      }
      for (i = 16; i < 80; i++) {
        s0 = rotr64(w[i - 15], 1n) ^ rotr64(w[i - 15], 8n) ^ (w[i - 15] >> 7n);
        s1 = rotr64(w[i - 2], 19n) ^ rotr64(w[i - 2], 61n) ^ (w[i - 2] >> 6n);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) & M64;
      }
      a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];
      for (i = 0; i < 80; i++) {
        S1 = rotr64(e, 14n) ^ rotr64(e, 18n) ^ rotr64(e, 41n);
        ch = (e & f) ^ ((~e & M64) & g);
        t1 = (h + S1 + ch + K[i] + w[i]) & M64;
        S0 = rotr64(a, 28n) ^ rotr64(a, 34n) ^ rotr64(a, 39n);
        maj = (a & b) ^ (a & c) ^ (b & c);
        t2 = (S0 + maj) & M64;
        h = g; g = f; f = e; e = (d + t1) & M64; d = c; c = b; b = a; a = (t1 + t2) & M64;
      }
      H[0] = (H[0] + a) & M64; H[1] = (H[1] + b) & M64;
      H[2] = (H[2] + c) & M64; H[3] = (H[3] + d) & M64;
      H[4] = (H[4] + e) & M64; H[5] = (H[5] + f) & M64;
      H[6] = (H[6] + g) & M64; H[7] = (H[7] + h) & M64;
    }

    var out = new Uint8Array(64);
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) out[i * 8 + j] = Number((H[i] >> BigInt((7 - j) * 8)) & 0xffn);
    }
    return out;
  }

  /* ================================================================= hmac */

  function algoName(algo) {
    var a = String(algo || 'sha256').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (a.indexOf('512') >= 0) return 512;
    if (a.indexOf('256') >= 0) return 256;
    return 0;
  }

  function hmacBytes(algo, key, msg) {
    var bits = algoName(algo);
    if (!bits) return null;
    var blockSize = bits === 512 ? 128 : 64;
    var hashFn = bits === 512 ? sha512 : sha256;
    if (key.length > blockSize) key = hashFn(key);
    var k = new Uint8Array(blockSize);
    k.set(key, 0);
    var inner = new Uint8Array(blockSize);
    var outer = new Uint8Array(blockSize);
    for (var i = 0; i < blockSize; i++) {
      inner[i] = k[i] ^ 0x36;
      outer[i] = k[i] ^ 0x5c;
    }
    return hashFn(concat(outer, hashFn(concat(inner, msg))));
  }

  function encodeOut(bytes, enc) {
    if (!bytes) return '';
    if (enc === 'base64') return bytesToBase64(bytes);
    if (enc === 'base64url') return bytesToBase64Url(bytes);
    return bytesToHex(bytes);
  }

  /* ================================================== window.CPEAndroid API */

  global.CPEAndroid = {
    platform: function () { return 'ios'; },

    appVersion: function () { return info.appVersion || '1.0.0'; },

    deviceModel: function () { return info.deviceModel || 'iPhone'; },

    osVersion: function () { return info.osVersion || 'iOS'; },

    deviceId: function () { return info.deviceId || 'ios-device'; },

    /** Same contract as the Android bridge: enc is 'base64' | 'base64url' | hex. */
    hmac: function (algo, keyBase64, msgBase64, enc) {
      try {
        return encodeOut(
          hmacBytes(algo, base64ToBytes(keyBase64), base64ToBytes(msgBase64)),
          enc
        );
      } catch (e) {
        return '';
      }
    },

    digest: function (algo, msgBase64, enc) {
      try {
        var bits = algoName(algo);
        if (!bits) return '';
        return encodeOut((bits === 512 ? sha512 : sha256)(base64ToBytes(msgBase64)), enc);
      } catch (e) {
        return '';
      }
    },

    /* async — the shell answers through window.__cpeHttp(reqId, payload) */
    httpRequest: function (reqId, method, url, body, headersJson) {
      post({
        fn: 'httpRequest',
        id: reqId,
        method: method == null ? 'GET' : String(method),
        url: String(url),
        body: body == null ? null : String(body),
        headers: headersJson == null ? null : String(headersJson)
      });
    },

    openExternal: function (url) { post({ fn: 'openExternal', url: String(url) }); },

    toast: function (text) { post({ fn: 'toast', text: String(text == null ? '' : text) }); },

    vibrate: function (ms) { post({ fn: 'vibrate', ms: Number(ms) || 30 }); },

    notifyUser: function (title, body) {
      post({
        fn: 'notifyUser',
        title: String(title == null ? 'CPE Trade Pro' : title),
        body: String(body == null ? '' : body)
      });
    },

    keepAwake: function (on) { post({ fn: 'keepAwake', on: !!on }); },

    saveBase64File: function (name, base64) {
      post({ fn: 'saveBase64File', name: String(name == null ? 'cpe-chart.png' : name), base64: String(base64) });
    },

    prefsGet: function (key) {
      try { return localStorage.getItem('cpepref:' + key); } catch (e) { return null; }
    },

    prefsSet: function (key, value) {
      try { localStorage.setItem('cpepref:' + key, String(value)); } catch (e) { /* quota */ }
    }
  };

  global.__cpeCrypto = { sha256: sha256, sha512: sha512, hmac: hmacBytes, utf8Bytes: utf8Bytes };
})(typeof window !== 'undefined' ? window : this);
