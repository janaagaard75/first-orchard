import { DieRoll } from "./DieRoll"
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
      case DieRoll.Blue:
      case DieRoll.Green:
      case DieRoll.Red:
      case DieRoll.Yellow:
        const fruit = Game.getFruitFromDie(die)
        this.orchard.pickFruitIfPossible(fruit)
        break

      case DieRoll.Basket:
        this.basketStrategy.pickTree(this.orchard.trees).pickFruit()
        break

      case DieRoll.Raven:
        this.ravenPosition--
        break

      default:
        throw new UnreachableCaseError(die)
    }
  }

  private static getFruitFromDie(
    die: DieRoll.Blue | DieRoll.Green | DieRoll.Red | DieRoll.Yellow
  ): Fruit {
    switch (die) {
      case DieRoll.Blue:
        return Fruit.BluePlum
      case DieRoll.Green:
        return Fruit.GreenApple
      case DieRoll.Red:
        return Fruit.RedApple
      case DieRoll.Yellow:
        return Fruit.YellowPear
    }
  }
}
