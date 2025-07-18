import Foundation

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