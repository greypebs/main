import SwiftUI

// Model
struct Kiwi: Codable, Equatable {
    var hunger: Double
    var happiness: Double

    static let facts: [String] = [
        "Kiwi birds are flightless birds from New Zealand.",
        "Unlike most birds, kiwis have heavy bones filled with marrow.",
        "Kiwi have nostrils at the end of their long beak.",
        "Their powerful legs make up a third of their body weight.",
        "Kiwi have loose feathers that are more like fur.",
        "The lifespan of a kiwi can be up to 60 years.",
        "Kiwi lay the second largest egg relative to their body size of any bird.",
        "Kiwi are nocturnal and have a strong sense of smell.",
        "Kiwi live in burrows and dens on the forest floor.",
        "Kiwi are the only bird in the world with nostrils at the end of their beak."
    ]

    static func randomFact() -> String {
        return facts.randomElement() ?? "Kiwi are adorable!"
    }
}

// ViewModel
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

// View
struct KiwiView: View {
    @ObservedObject var viewModel: KiwiViewModel
    @State private var actionAnimation: Bool = false
    @State private var currentFact: String = Kiwi.randomFact()

    var body: some View {
        VStack(spacing: 20) {
            Text("Your Cute Kiwi Bird Companion 🐦")
                .font(.title)
                .bold()

            Image(systemName: "bird.fill")
                .resizable()
                .frame(width: 100, height: 100)
                .foregroundColor(.brown)
                .scaleEffect(actionAnimation ? 1.2 : 1.0)
                .rotationEffect(.degrees(actionAnimation ? 10 : 0))
                .animation(.spring(response: 0.3, dampingFraction: 0.6), value: actionAnimation)

            VStack(alignment: .leading) {
                Text("Hunger: \(Int(viewModel.kiwi.hunger))%")
                ProgressView(value: viewModel.kiwi.hunger / 100)
                    .progressViewStyle(LinearProgressViewStyle(tint: .orange))

                Text("Happiness: \(Int(viewModel.kiwi.happiness))%")
                ProgressView(value: viewModel.kiwi.happiness / 100)
                    .progressViewStyle(LinearProgressViewStyle(tint: .green))
            }
            .padding()

            HStack {
                Button("Feed 🍎") {
                    viewModel.feed()
                    triggerAnimation()
                }
                .buttonStyle(.borderedProminent)
                .tint(.orange)

                Button("Play 🎾") {
                    viewModel.play()
                    triggerAnimation()
                }
                .buttonStyle(.borderedProminent)
                .tint(.green)
            }

            Text("Fun Fact: \(currentFact)")
                .font(.subheadline)
                .multilineTextAlignment(.center)
                .padding()

            Button("New Fact") {
                currentFact = Kiwi.randomFact()
            }
            .buttonStyle(.bordered)
            .tint(.blue)
        }
        .padding()
    }

    private func triggerAnimation() {
        actionAnimation = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            actionAnimation = false
        }
    }
}

// App Entry Point
@main
struct KiwiCompanionApp: App {
    @StateObject private var viewModel = KiwiViewModel()

    var body: some Scene {
        WindowGroup {
            KiwiView(viewModel: viewModel)
        }
    }
}