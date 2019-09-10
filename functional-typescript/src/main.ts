import { Game } from "./Game"
import { GameState } from "./GameState"
import { BasketStrategy } from "./strategies/BasketStrategy"
import { PreferredFruitStrategy } from "./strategies/PreferredFruitStrategy"
import { RandomTreeStrategy } from "./strategies/RandomTreeStrategy"
import { TreeWithFewestFruitsStrategy } from "./strategies/TreeWithFewestFruitsStrategy"
import { TreeWithMostFruitsStrategy } from "./strategies/TreeWithMostFruitsStrategy"

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

  const winRatio = gameStates.reduce((average, gameState, index) => {
    return gameState === GameState.WeWon
      ? (average * index + 1) / (index + 1)
      : (average * index) / (index + 1)
  }, 0)

  return Math.round(winRatio * 100)
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
