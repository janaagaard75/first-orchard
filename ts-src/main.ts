enum DieRool {
  Blue,
  Green,
  Red,
  Yellow,
  Basket,
  Raven
}

enum Fruit {
  Blue,
  Green,
  Red,
  Yellow
}

class Random {
  public static roolDie(): DieRool {
    return this.randomNumber(6)
  }

  public static randomFruit(): Fruit {
    return this.randomNumber(4)
  }

  private static randomNumber(values: number) {
    return Math.floor(Math.random() * values)
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
    const treeWithMostFruits = this.trees.reduce(
      (treeWithMostFruits, treeWithPossiblyMore) => {
        if (
          treeWithPossiblyMore.numberOfFruits >
          treeWithMostFruits.numberOfFruits
        ) {
          return treeWithPossiblyMore
        }

        return treeWithMostFruits
      },
      this.trees[0]
    )

    treeWithMostFruits.pickFruitIfPossible()
  }

  pickFruitFromRandomTree() {
    const randomTree = this.trees[Random.randomFruit()]
    randomTree.pickFruitIfPossible()
  }

  pickPreferredFruit() {
    this.getPreferredTree().pickFruitIfPossible()
  }

  private getPreferredTree(): Tree {
    if (this.trees[Fruit.Blue].numberOfFruits >= 1) {
      return this.trees[Fruit.Blue]
    }

    if (this.trees[Fruit.Green].numberOfFruits >= 1) {
      return this.trees[Fruit.Green]
    }

    if (this.trees[Fruit.Red].numberOfFruits >= 1) {
      return this.trees[Fruit.Red]
    }

    return this.trees[Fruit.Yellow]
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
        this.ravenPosition--
    }

    this.updateGameState()
  }

  private updateGameState() {
    if (this.orchard.totalNumberOfFruits === 0) {
      this.state = GameState.WeWon
      return
    }

    if (this.ravenPosition === 0) {
      this.state = GameState.RavenWon
      return
    }
  }
}

class Main {
  public run() {
    console.info("Started.")
  }
}

new Main().run()
