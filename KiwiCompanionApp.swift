import SwiftUI

@main
struct KiwiCompanionApp: App {
    @StateObject private var viewModel = KiwiViewModel()

    var body: some Scene {
        WindowGroup {
            KiwiView(viewModel: viewModel)
        }
    }
}