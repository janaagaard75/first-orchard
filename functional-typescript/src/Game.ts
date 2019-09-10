import { FirstOrchardDieRoll } from "./FirstOrchardDieRoll"
import { Fruit } from "./Fruit"
import { GameState } from "./GameState"
import { Orchard } from "./Orchard"
import { rollFirstOrchardDie } from "./random"
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

    const die = rollFirstOrchardDie()

    switch (die) {
      case FirstOrchardDieRoll.Blue:
      case FirstOrchardDieRoll.Green:
      case FirstOrchardDieRoll.Red:
      case FirstOrchardDieRoll.Yellow:
        const fruit = Game.getFruitFromDie(die)
        this.orchard.pickFruitIfPossible(fruit)
        break

      case FirstOrchardDieRoll.Basket:
        this.basketStrategy.pickTree(this.orchard.trees).pickFruit()
        break

      case FirstOrchardDieRoll.Raven:
        this.ravenPosition--
        break

      default:
        throw new UnreachableCaseError(die)
    }
  }

  private static getFruitFromDie(
    die:
      | FirstOrchardDieRoll.Blue
      | FirstOrchardDieRoll.Green
      | FirstOrchardDieRoll.Red
      | FirstOrchardDieRoll.Yellow
  ): Fruit {
    switch (die) {
      case FirstOrchardDieRoll.Blue:
        return Fruit.BluePlum
      case FirstOrchardDieRoll.Green:
        return Fruit.GreenApple
      case FirstOrchardDieRoll.Red:
        return Fruit.RedApple
      case FirstOrchardDieRoll.Yellow:
        return Fruit.YellowPear
    }
  }
}
