enum Fruit {
  Blue,
  Green,
  Red,
  Yellow
}

enum DieRool {
  Blue,
  Green,
  Red,
  Yellow,
  Basket,
  Raven
}

class Random {
  public static roolDie(): DieRool {
    return DieRool.Blue
  }

  public static randomFruit(): Fruit {
    return Fruit.Red
  }
}

class Tree {
  constructor() {
    this.numberOfFruits = 4
  }

  numberOfFruits: number

  pickFruitIfPossible() {
    if (this.numberOfFruits >= 1) {
      this.numberOfFruits = this.numberOfFruits - 1
    }
  }
}

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`)
  }
}

class Orchard {
  constructor() {
    this.trees[Fruit.Blue] = new Tree()
    this.trees[Fruit.Green] = new Tree()
    this.trees[Fruit.Red] = new Tree()
    this.trees[Fruit.Yellow] = new Tree()
  }

  trees: Array<Tree> = []

  get totalNumberOfFruits(): number {
    return (
      this.trees[Fruit.Blue].numberOfFruits +
      this.trees[Fruit.Green].numberOfFruits +
      this.trees[Fruit.Red].numberOfFruits +
      this.trees[Fruit.Yellow].numberOfFruits
    )
  }

  pickFruitIfPossible(fruit: Fruit) {
    this.trees[fruit].pickFruitIfPossible()
  }

  fruitAvailable(fruit: Fruit): boolean {
    return this.trees[fruit].numberOfFruits >= 1
  }

  pickFromTreeWithMostFruits() {
    const max = Math.max(this.trees[Fruit.Blue].numberOfFruits)
    const tree = this.trees.find(tree => tree.numberOfFruits === max)
    if (tree === undefined) {
      throw new Error(`Cound not find a tree with ${max} fruit(s).`)
    }
    tree.pickFruitIfPossible()
  }

  pickFruitFromRandomTree() {
    throw new Error("Not implemented.")
  }

  pickPreferredFruit() {
    if (this.trees[Fruit.Blue].numberOfFruits >= 1) {
      this.trees[Fruit.Blue].pickFruitIfPossible()
      return
    }

    if (this.trees[Fruit.Green].numberOfFruits >= 1) {
      this.trees[Fruit.Green].pickFruitIfPossible()
      return
    }

    if (this.trees[Fruit.Red].numberOfFruits >= 1) {
      this.trees[Fruit.Red].pickFruitIfPossible()
      return
    }

    if (this.trees[Fruit.Yellow].numberOfFruits >= 1) {
      this.trees[Fruit.Yellow].pickFruitIfPossible()
      return
    }

    throw new Error("No fruits left on the trees.")
  }
}

enum BasketStrategy {
  TreeWithMost,
  Random,
  PreferredOrder
}

enum GameState {
  Playing,
  WeWon,
  RavenWon
}

class Game {
  constructor(private strategy: BasketStrategy) {
    this.orchard = new Orchard()
    this.ravenPosition = 5
    this.state = GameState.Playing
  }

  orchard: Orchard
  ravenPosition: number
  state: GameState

  playGame() {
    while (this.state === GameState.Playing) {
      this.performTurn()
    }

    switch (this.state) {
      case GameState.WeWon:
        throw new Error("Not implemented.")
      case GameState.RavenWon:
        throw new Error("Not implemented.")
    }
  }

  performTurn() {
    const die = Random.roolDie()

    switch (die) {
      case DieRool.Basket:
        switch (this.strategy) {
          case BasketStrategy.PreferredOrder:
            this.orchard.pickPreferredFruit()
            break
          case BasketStrategy.Random:
            this.orchard.pickFruitFromRandomTree()
            break
          case BasketStrategy.TreeWithMost:
            this.orchard.pickFromTreeWithMostFruits()
            break
        }
        break
      case DieRool.Blue:
        this.orchard.pickFruitIfPossible(Fruit.Blue)
        break
      case DieRool.Green:
        this.orchard.pickFruitIfPossible(Fruit.Green)
        break
      case DieRool.Raven:
        this.ravenPosition
    }

    this.updateGameState()
  }

  private updateGameState() {
    throw new Error("Not implemented.")
  }
}

class Main {
  public run() {
    console.info("Started.")
  }
}

new Main().run()
