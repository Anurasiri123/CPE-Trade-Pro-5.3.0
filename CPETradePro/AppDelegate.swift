import UIKit
import UserNotifications

/**
 CPE Trade Pro — iOS app delegate.

 Single-window app (no storyboard): the whole desktop renderer runs inside the
 WKWebView owned by ViewController.
 */
@main
final class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        UNUserNotificationCenter.current().delegate = self
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }

        let win = UIWindow(frame: UIScreen.main.bounds)
        win.backgroundColor = UIColor(red: 0.039, green: 0.055, blue: 0.090, alpha: 1.0)
        win.rootViewController = ViewController()
        win.makeKeyAndVisible()
        window = win

        return true
    }

    // Keep showing banners while the app is in the foreground too, so trade
    // alerts are not swallowed silently.
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                                willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        if #available(iOS 14.0, *) {
            completionHandler([.banner, .list, .sound])
        } else {
            completionHandler([.alert, .sound])
        }
    }
}
