import { Game } from "./Game"
import { GameState } from "./GameState"
import { PreferredFruitStrategy } from "./strategies/PreferredFruitStategy"
import { RandomTreeStrategy } from "./strategies/RandomTreeStrategy"
import { TreeWithFewestFruitsStrategy } from "./strategies/TreeWithFewestFruitsStategy"
import { TreeWithMostFruitsStrategy } from "./strategies/TreeWithMostFruitsStategy"

class Main {
  public run() {
    const numberOfGamesPerStrategy = 1000000

    const strategies = [
      new TreeWithFewestFruitsStrategy(),
      new PreferredFruitStrategy(),
      new RandomTreeStrategy(),
      new TreeWithMostFruitsStrategy()
    ]

    strategies.forEach(strategy => {
      let ourVictories = 0

      for (let i = 0; i < numberOfGamesPerStrategy; i++) {
        const game = new Game(strategy)
        game.playGame()

        if (game.state === GameState.WeWon) {
          ourVictories++
        }
      }

      const percentage = Math.round(
        (ourVictories / numberOfGamesPerStrategy) * 100
      )

      console.info(
        `We won ${percentage}% of the games with the '${strategy.name}' strategy.`
      )
    })
  }
}

new Main().run()
