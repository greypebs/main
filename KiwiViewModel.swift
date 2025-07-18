import Foundation
import Combine

class KiwiViewModel: ObservableObject {
    @Published var kiwi: Kiwi {
        didSet {
            save()
        }
    }

    private var timer: Timer?

    init() {
        if let data = UserDefaults.standard.data(forKey: "kiwi"),
           let decoded = try? JSONDecoder().decode(Kiwi.self, from: data) {
            kiwi = decoded
        } else {
            kiwi = Kiwi(hunger: 50.0, happiness: 50.0)
        }

        startTimer()
    }

    func save() {
        if let encoded = try? JSONEncoder().encode(kiwi) {
            UserDefaults.standard.set(encoded, forKey: "kiwi")
        }
    }

    func feed() {
        kiwi.hunger = min(kiwi.hunger + 20, 100)
    }

    func play() {
        kiwi.happiness = min(kiwi.happiness + 20, 100)
    }

    private func decreaseLevels() {
        kiwi.hunger = max(kiwi.hunger - 1, 0)
        kiwi.happiness = max(kiwi.happiness - 1, 0)
    }

    private func startTimer() {
        timer = Timer.scheduledTimer(withTimeInterval: 5.0, repeats: true) { _ in
            self.decreaseLevels()
        }
    }
}