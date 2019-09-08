import { Game } from "./Game"
import { GameState } from "./GameState"
import { BasketStrategy } from "./strategies/BasketStrategy"
import { PreferredFruitStrategy } from "./strategies/PreferredFruitStategy"
import { RandomTreeStrategy } from "./strategies/RandomTreeStrategy"
import { TreeWithFewestFruitsStrategy } from "./strategies/TreeWithFewestFruitsStategy"
import { TreeWithMostFruitsStrategy } from "./strategies/TreeWithMostFruitsStategy"

function getWinPercentage(
  strategy: BasketStrategy,
  numberOfGames: number
): number {
  const games = [...Array(numberOfGames)]

  const gameStates = games.map(_ => {
    const game = new Game(strategy)
    game.playGame()
    return game.state
  })

  const gamesWon = gameStates.reduce((sum, gameState) => {
    if (gameState === GameState.WeWon) {
      return sum + 1
    }
    return sum
  }, 0)

  const winPercentage = Math.round((gamesWon / numberOfGames) * 100)
  return winPercentage
}

function getSummary(strategyName: string, winPercentage: number): string {
  return `We won ${winPercentage}% of the games with the '${strategyName}' strategy.`
}

function run() {
  const strategies = [
    new TreeWithFewestFruitsStrategy(),
    new PreferredFruitStrategy(),
    new RandomTreeStrategy(),
    new TreeWithMostFruitsStrategy()
  ]

  const numberOfGamesPerStrategy = 10000
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

run()
