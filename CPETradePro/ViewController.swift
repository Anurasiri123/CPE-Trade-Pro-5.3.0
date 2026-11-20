import UIKit
import WebKit

/**
 CPE Trade Pro — iOS shell.

 Loads the exact same web bundle that ships inside the Android APK
 (CPETrade-Pro/www) into a WKWebView, and installs two user scripts before the
 page starts:

   1. window.__cpeNativeInfo — device id / model / OS reported by the shell
   2. native-bridge.js       — publishes the window.CPEAndroid API the engine
                               expects, backed by CpeBridge over postMessage

 Everything else — charts, the analysis engine, auto-trade, licensing — is the
 untouched desktop renderer running inside the web view.
 */
final class ViewController: UIViewController {

    private var webView: WKWebView!
    private var bridge: CpeBridge!

    private let background = UIColor(red: 0.039, green: 0.055, blue: 0.090, alpha: 1.0)

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = background

        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.preferences.javaScriptCanOpenWindowsAutomatically = false
        // Lets the local bundle read its own files the way file:// pages expect.
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        config.setValue(true, forKey: "allowUniversalAccessFromFileURLs")

        bridge = CpeBridge()
        config.userContentController.add(bridge, name: "cpe")

        if let boot = bootScript() {
            config.userContentController.addUserScript(
                WKUserScript(source: boot, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        }

        webView = WKWebView(frame: .zero, configuration: config)
        bridge.webView = webView
        webView.translatesAutoresizingMaskIntoConstraints = false
        webView.isOpaque = false
        webView.backgroundColor = background
        webView.scrollView.backgroundColor = background
        webView.allowsBackForwardNavigationGestures = true
        webView.navigationDelegate = self

        view.addSubview(webView)
        NSLayoutConstraint.activate([
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            webView.topAnchor.constraint(equalTo: view.topAnchor),
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])

        loadApp()
    }

    override var preferredStatusBarStyle: UIStatusBarStyle { .lightContent }

    // MARK: - bootstrap

    private func wwwDirectory() -> URL? {
        Bundle.main.url(forResource: "www", withExtension: nil)
    }

    /// Device info + native-bridge.js, concatenated into a single document-start
    /// script so the bridge exists before cpe-engine.js runs.
    private func bootScript() -> String? {
        guard let dir = wwwDirectory() else { return nil }
        let bridgeURL = dir.appendingPathComponent("native-bridge.js")
        guard let source = try? String(contentsOf: bridgeURL, encoding: .utf8) else { return nil }
        return CpeBridge.nativeInfoScript() + "\n" + source
    }

    private func loadApp() {
        guard let dir = wwwDirectory() else {
            presentFatal("App assets are missing from the bundle.\n\nExpected a 'www' folder containing index.html.")
            return
        }
        let index = dir.appendingPathComponent("index.html")
        guard FileManager.default.fileExists(atPath: index.path) else {
            presentFatal("index.html was not found inside the bundled 'www' folder.")
            return
        }
        webView.loadFileURL(index, allowingReadAccessTo: dir)
    }

    private func presentFatal(_ message: String) {
        let alert = UIAlertController(title: "CPE Trade Pro", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        DispatchQueue.main.async { self.present(alert, animated: true) }
    }
}

// MARK: - WKNavigationDelegate

extension ViewController: WKNavigationDelegate {

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        webView.evaluateJavaScript(
            "window.__cpeNativeReady && window.__cpeNativeReady();", completionHandler: nil)
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        presentFatal("The app view failed to load.\n\n\(error.localizedDescription)")
    }

    func webView(_ webView: WKWebView,
                 decidePolicyFor navigationAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = navigationAction.request.url else {
            decisionHandler(.allow)
            return
        }
        let scheme = url.scheme?.lowercased() ?? ""
        if (scheme == "http" || scheme == "https") && navigationAction.navigationType == .linkActivated {
            // Tapped links belong in Safari, not inside the app frame.
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }
}
