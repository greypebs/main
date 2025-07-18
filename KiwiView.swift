import SwiftUI

struct KiwiView: View {
    @ObservedObject var viewModel: KiwiViewModel
    @State private var actionAnimation = false
    @State private var currentFact = Kiwi.randomFact()

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