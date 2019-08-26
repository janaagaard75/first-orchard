import { Game } from "./Game"
import { GameState } from "./GameState"
import { BasketStrategy } from "./strategies/BasketStrategy"
import { PreferredFruitStrategy } from "./strategies/PreferredFruitStategy"
import { RandomTreeStrategy } from "./strategies/RandomTreeStrategy"
import { TreeWithFewestFruitsStrategy } from "./strategies/TreeWithFewestFruitsStategy"
import { TreeWithMostFruitsStrategy } from "./strategies/TreeWithMostFruitsStategy"

class Main {
  constructor() {
    this.strategies = [
      new TreeWithFewestFruitsStrategy(),
      new PreferredFruitStrategy(),
      new RandomTreeStrategy(),
      new TreeWithMostFruitsStrategy()
    ]
  }

  private readonly numberOfGamesPerStrategy = 1000000
  private readonly strategies: Array<BasketStrategy>

  public run() {
    this.strategies.forEach(strategy => {
      let ourVictories = 0

      for (let i = 0; i < this.numberOfGamesPerStrategy; i++) {
        const game = new Game(strategy)
        game.playGame()

        if (game.state === GameState.WeWon) {
          ourVictories++
        }
      }

      const percentage = Math.round(
        (ourVictories / this.numberOfGamesPerStrategy) * 100
      )

      console.info(
        `We won ${percentage}% of the games with the '${strategy.name}' strategy.`
      )
    })
  }
}

new Main().run()
