import { DieRool } from "./DieRool"
import { Fruit } from "./Fruit"
import { GameState } from "./GameState"
import { Orchard } from "./Orchard"
import { Random } from "./Random"
import { BasketStrategy } from "./strategies/BasketStrategy"
import { UnreachableCaseError } from "./UnreachableCaseError"

export class Game {
  constructor(private basketStrategy: BasketStrategy) {
    this.orchard = new Orchard()
    this.ravenPosition = 6
    this.turns = 0
  }

  orchard: Orchard
  ravenPosition: number
  turns: number

  get state(): GameState {
    if (this.ravenPosition === 0) {
      return GameState.RavenWon
    }

    if (this.orchard.totalNumberOfFruits === 0) {
      return GameState.WeWon
    }

    return GameState.Playing
  }

  playGame() {
    while (this.state === GameState.Playing) {
      this.performTurn()
    }
  }

  performTurn() {
    this.turns++

    if (this.turns > 10000) {
      throw new Error("Over 10000 turns performed. Something is wrong.")
    }

    const die = Random.roolDie()

    switch (die) {
      case DieRool.Blue:
      case DieRool.Green:
      case DieRool.Red:
      case DieRool.Yellow:
        const fruit = Game.getFruitFromDie(die)
        this.orchard.pickFruitIfPossible(fruit)
        break

      case DieRool.Basket:
        this.basketStrategy.pickTree(this.orchard.trees).pickFruit()
        break

      case DieRool.Raven:
        this.ravenPosition--
        break

      default:
        throw new UnreachableCaseError(die)
    }
  }

  private static getFruitFromDie(
    die: DieRool.Blue | DieRool.Green | DieRool.Red | DieRool.Yellow
  ): Fruit {
    switch (die) {
      case DieRool.Blue:
        return Fruit.BluePlum
      case DieRool.Green:
        return Fruit.GreenApple
      case DieRool.Red:
        return Fruit.RedApple
      case DieRool.Yellow:
        return Fruit.YellowPear
    }
  }
}
