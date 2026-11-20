import Foundation
import UIKit
import WebKit
import UserNotifications
import AudioToolbox

/**
 Native side of the iOS bridge.

 The web layer calls `window.CPEAndroid.*` (see ios-app/native-bridge.js). The
 synchronous parts — hashing, device id, app info — are handled in JavaScript so
 they can be called without a round trip. Everything below is the asynchronous
 half: networking, notifications, haptics, the share sheet and screen wakelocks.

 Message payloads arrive as `{ "fn": "...", ... }` and HTTP answers are pushed
 back into the page with `window.__cpeHttp(reqId, payload)`, exactly like the
 Android shell does.
 */
final class CpeBridge: NSObject, WKScriptMessageHandler {

    weak var webView: WKWebView?

    private let session: URLSession

    override init() {
        let cfg = URLSessionConfiguration.default
        cfg.timeoutIntervalForRequest = 35
        cfg.timeoutIntervalForResource = 60
        cfg.requestCachePolicy = .reloadIgnoringLocalCacheData
        self.session = URLSession(configuration: cfg)
        super.init()
    }

    /* ------------------------------------------------------------ device info */

    /// Stable per-install id used for licence binding.
    static func stableDeviceId() -> String {
        let key = "cpe.machineId"
        if let existing = UserDefaults.standard.string(forKey: key), existing.count >= 8 {
            return existing
        }
        var id = UIDevice.current.identifierForVendor?.uuidString
            .replacingOccurrences(of: "-", with: "")
            .lowercased()
        if id == nil || (id?.count ?? 0) < 8 {
            id = "cpeios" + UUID().uuidString
                .replacingOccurrences(of: "-", with: "")
                .lowercased()
        }
        UserDefaults.standard.set(id, forKey: key)
        return id!
    }

    /// Hardware identifier, e.g. "iPhone15,3".
    private static func hardwareModel() -> String {
        var info = utsname()
        uname(&info)
        let machine = withUnsafeBytes(of: &info.machine) { raw -> String in
            let bytes = raw.prefix { $0 != 0 }
            return String(decoding: bytes, as: UTF8.self)
        }
        return machine.isEmpty ? UIDevice.current.model : machine
    }

    /// Injected at document start, before any page script runs.
    static func nativeInfoScript() -> String {
        let version = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0.0"
        let info: [String: String] = [
            "platform": "ios",
            "appVersion": version,
            "deviceModel": "\(UIDevice.current.model) (\(hardwareModel()))",
            "osVersion": "\(UIDevice.current.systemName) \(UIDevice.current.systemVersion)",
            "deviceId": stableDeviceId()
        ]
        let data = (try? JSONSerialization.data(withJSONObject: info, options: [])) ?? Data("{}".utf8)
        let json = String(data: data, encoding: .utf8) ?? "{}"
        return "window.__cpeNativeInfo = \(json);"
    }

    /* -------------------------------------------------------- message router */

    func userContentController(_ userContentController: WKUserContentController,
                               didReceive message: WKScriptMessage) {
        guard message.name == "cpe",
              let body = message.body as? [String: Any],
              let fn = body["fn"] as? String else { return }

        switch fn {
        case "httpRequest":
            performHttp(body)
        case "toast":
            showToast(body["text"] as? String ?? "")
        case "vibrate":
            AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
        case "notifyUser":
            postNotification(title: body["title"] as? String ?? "CPE Trade Pro",
                             body: body["body"] as? String ?? "")
        case "openExternal":
            openExternal(body["url"] as? String ?? "")
        case "keepAwake":
            let on = (body["on"] as? NSNumber)?.boolValue ?? (body["on"] as? Bool) ?? false
            DispatchQueue.main.async { UIApplication.shared.isIdleTimerDisabled = on }
        case "saveBase64File":
            saveBase64File(name: body["name"] as? String ?? "cpe-chart.png",
                           base64: body["base64"] as? String ?? "")
        default:
            break
        }
    }

    /* ---------------------------------------------------------------- network */

    private func performHttp(_ msg: [String: Any]) {
        let reqId = msg["id"] as? String ?? ""
        let method = ((msg["method"] as? String) ?? "GET").uppercased()
        let urlString = msg["url"] as? String ?? ""
        let body = msg["body"] as? String
        let headersJson = msg["headers"] as? String

        guard let url = URL(string: urlString) else {
            reply(reqId, "__ERR__Invalid URL")
            return
        }

        var request = URLRequest(url: url)
        request.httpMethod = method
        request.timeoutInterval = 35
        request.setValue("CPE-Trade-Pro-iOS/1.0", forHTTPHeaderField: "User-Agent")
        request.setValue("*/*", forHTTPHeaderField: "Accept")

        var contentTypeSet = false
        if let hj = headersJson, hj.count > 2, let data = hj.data(using: .utf8),
           let obj = (try? JSONSerialization.jsonObject(with: data)) as? [String: Any] {
            for (key, value) in obj {
                let lower = key.lowercased()
                if lower == "content-type" { contentTypeSet = true }
                if lower == "content-length" || lower == "host" || lower == "accept-encoding" { continue }
                request.setValue("\(value)", forHTTPHeaderField: key)
            }
        }

        if let body = body {
            request.httpBody = body.data(using: .utf8)
            if !contentTypeSet { request.setValue("application/json", forHTTPHeaderField: "Content-Type") }
        }

        session.dataTask(with: request) { [weak self] data, response, error in
            guard let self = self else { return }
            if let error = error {
                self.reply(reqId, "__ERR__" + error.localizedDescription)
                return
            }
            let status = (response as? HTTPURLResponse)?.statusCode ?? 0
            let text = Self.decode(data)
            if status >= 400 {
                self.reply(reqId, "__HTTPERR__\(status)||\(text)")
            } else {
                self.reply(reqId, text)
            }
        }.resume()
    }

    private static func decode(_ data: Data?) -> String {
        guard let data = data, !data.isEmpty else { return "" }
        if let utf8 = String(data: data, encoding: .utf8) { return utf8 }
        if let latin = String(data: data, encoding: .isoLatin1) { return latin }
        return ""
    }

    /// Hands the payload back to the waiting axios-style promise in the page.
    private func reply(_ reqId: String, _ payload: String) {
        DispatchQueue.main.async { [weak self] in
            guard let web = self?.webView else { return }
            let js = "window.__cpeHttp && window.__cpeHttp(\(Self.jsQuote(reqId)),\(Self.jsQuote(payload)));"
            web.evaluateJavaScript(js, completionHandler: nil)
        }
    }

    /// Safe JS string literal (escapes control characters and U+2028/U+2029).
    private static func jsQuote(_ value: String) -> String {
        var out = "\""
        for scalar in value.unicodeScalars {
            switch scalar {
            case "\\": out += "\\\\"
            case "\"": out += "\\\""
            case "\n": out += "\\n"
            case "\r": out += "\\r"
            case "\t": out += "\\t"
            default:
                if scalar.value < 0x20 || scalar.value == 0x2028 || scalar.value == 0x2029 {
                    out += String(format: "\\u%04x", scalar.value)
                } else {
                    out.unicodeScalars.append(scalar)
                }
            }
        }
        return out + "\""
    }

    /* ------------------------------------------------------------------ shell */

    private func openExternal(_ urlString: String) {
        guard let url = URL(string: urlString) else { return }
        DispatchQueue.main.async { UIApplication.shared.open(url, options: [:], completionHandler: nil) }
    }

    private var keyWindow: UIWindow? {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        for scene in scenes {
            if let window = scene.windows.first(where: { $0.isKeyWindow }) { return window }
        }
        return scenes.first?.windows.first
    }

    private func showToast(_ text: String) {
        guard !text.isEmpty else { return }
        DispatchQueue.main.async { [weak self] in
            guard let window = self?.keyWindow else { return }

            let container = UIView()
            container.backgroundColor = UIColor(white: 0.08, alpha: 0.94)
            container.layer.cornerRadius = 14
            container.layer.masksToBounds = true
            container.alpha = 0
            container.translatesAutoresizingMaskIntoConstraints = false

            let label = UILabel()
            label.text = text
            label.textColor = .white
            label.font = .systemFont(ofSize: 14, weight: .medium)
            label.numberOfLines = 0
            label.textAlignment = .center
            label.translatesAutoresizingMaskIntoConstraints = false

            container.addSubview(label)
            window.addSubview(container)

            NSLayoutConstraint.activate([
                label.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 16),
                label.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: -16),
                label.topAnchor.constraint(equalTo: container.topAnchor, constant: 11),
                label.bottomAnchor.constraint(equalTo: container.bottomAnchor, constant: -11),
                container.centerXAnchor.constraint(equalTo: window.centerXAnchor),
                container.bottomAnchor.constraint(equalTo: window.safeAreaLayoutGuide.bottomAnchor, constant: -80),
                container.widthAnchor.constraint(lessThanOrEqualTo: window.widthAnchor, multiplier: 0.86)
            ])

            UIView.animate(withDuration: 0.22) { container.alpha = 1 }
            UIView.animate(withDuration: 0.28, delay: 2.4, options: [.curveEaseIn], animations: {
                container.alpha = 0
            }, completion: { _ in container.removeFromSuperview() })
        }
    }

    private func postNotification(title: String, body: String) {
        let center = UNUserNotificationCenter.current()
        center.getNotificationSettings { settings in
            let status = settings.authorizationStatus
            guard status == .authorized || status == .provisional else { return }
            let content = UNMutableNotificationContent()
            content.title = title.isEmpty ? "CPE Trade Pro" : title
            content.body = body
            content.sound = .default
            let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: nil)
            center.add(request, withCompletionHandler: nil)
        }
    }

    /// Chart export → share sheet (Files, Photos, WhatsApp, Mail …).
    private func saveBase64File(name: String, base64: String) {
        guard let data = Data(base64Encoded: base64, options: .ignoreUnknownCharacters) else {
            showToast("Could not save chart")
            return
        }
        let dir = FileManager.default.temporaryDirectory.appendingPathComponent("exports", isDirectory: true)
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        let safeName = name.replacingOccurrences(of: "/", with: "_")
        let fileURL = dir.appendingPathComponent(safeName)
        do {
            try data.write(to: fileURL, options: .atomic)
        } catch {
            showToast("Could not save chart")
            return
        }

        DispatchQueue.main.async { [weak self] in
            guard let root = self?.keyWindow?.rootViewController else { return }
            let activity = UIActivityViewController(activityItems: [fileURL], applicationActivities: nil)
            if let pop = activity.popoverPresentationController {
                pop.sourceView = root.view
                pop.sourceRect = CGRect(x: root.view.bounds.midX, y: root.view.bounds.midY, width: 0, height: 0)
                pop.permittedArrowDirections = []
            }
            root.present(activity, animated: true)
        }
    }
}
