import { Game } from "./Game"
import { GameState } from "./GameState"
import { BasketStrategy } from "./strategies/BasketStrategy"
import { PreferredFruitStrategy } from "./strategies/PreferredFruitStategy"
import { RandomTreeStrategy } from "./strategies/RandomTreeStrategy"
import { TreeWithFewestFruitsStrategy } from "./strategies/TreeWithFewestFruitsStategy"
import { TreeWithMostFruitsStrategy } from "./strategies/TreeWithMostFruitsStategy"

function run() {
  const strategies = [
    new TreeWithFewestFruitsStrategy(),
    new PreferredFruitStrategy(),
    new RandomTreeStrategy(),
    new TreeWithMostFruitsStrategy()
  ]

  const numberOfGamesPerStrategy = 100000
  strategies
    .map(strategy => {
      return {
        strategyName: strategy.name,
        winPercentage: getWinPercentage(strategy, numberOfGamesPerStrategy)
      }
    })
    .map(nameAndPercentage =>
      getSummary(
        nameAndPercentage.strategyName,
        nameAndPercentage.winPercentage
      )
    )
    .forEach(summary => console.info(summary))
}

function getWinPercentage(
  strategy: BasketStrategy,
  numberOfGames: number
): number {
  let ourVictories = 0

  for (let i = 0; i < numberOfGames; i++) {
    const game = new Game(strategy)
    game.playGame()

    if (game.state === GameState.WeWon) {
      ourVictories++
    }
  }

  return Math.round((ourVictories / numberOfGames) * 100)
}

function getSummary(strategyName: string, winPercentage: number): string {
  return `We won ${winPercentage}% of the games with the '${strategyName}' strategy.`
}

run()
