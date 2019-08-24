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
}

interface BasketStrategy {
  pickFruit(trees: Array<Tree>): void
}

class TreeWithMostFruitsStrategy implements BasketStrategy {
  pickFruit(trees: Array<Tree>): void {
    const treeWithMostFruits = trees.reduce(
      (treeWithMostFruits, treeWithPossiblyMore) => {
        if (
          treeWithPossiblyMore.numberOfFruits >
          treeWithMostFruits.numberOfFruits
        ) {
          return treeWithPossiblyMore
        }

        return treeWithMostFruits
      },
      trees[0]
    )

    treeWithMostFruits.pickFruitIfPossible()
  }
}

class RandomTreeStrategy implements BasketStrategy {
  pickFruit(trees: Array<Tree>): void {
    const randomTree = trees[Random.randomFruit()]
    randomTree.pickFruitIfPossible()
  }
}

class PreferredFruitStrategy implements BasketStrategy {
  pickFruit(trees: Array<Tree>): void {
    const firstTreeWithFruits = trees.find(tree => tree.numberOfFruits >= 1)
    if (firstTreeWithFruits !== undefined) {
      firstTreeWithFruits.pickFruitIfPossible()
    }
  }
}

enum GameState {
  Playing,
  WeWon,
  RavenWon
}

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`)
  }
}

class Game {
  constructor(private basketStrategy: BasketStrategy) {
    this.orchard = new Orchard()
    this.ravenPosition = 6
    this.state = GameState.Playing
    this.turns = 0
  }

  orchard: Orchard
  ravenPosition: number
  state: GameState
  turns: number

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
      case DieRool.Basket:
        this.basketStrategy.pickFruit(this.orchard.trees)
        break

      case DieRool.Blue:
        this.orchard.pickFruitIfPossible(Fruit.Blue)
        break

      case DieRool.Green:
        this.orchard.pickFruitIfPossible(Fruit.Green)
        break

      case DieRool.Raven:
        this.ravenPosition--
        break

      case DieRool.Red:
        this.orchard.pickFruitIfPossible(Fruit.Red)
        break

      case DieRool.Yellow:
        this.orchard.pickFruitIfPossible(Fruit.Yellow)
        break

      default:
        throw new UnreachableCaseError(die)
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
    const numberOfGames = 100000
    console.info(`Playing ${numberOfGames} games.`)

    let ravenVictories = 0
    let ourVictories = 0

    for (let i = 0; i < numberOfGames; i++) {
      const game = new Game(new PreferredFruitStrategy())
      game.playGame()

      switch (game.state) {
        case GameState.RavenWon:
          ravenVictories++
          break

        case GameState.WeWon:
          ourVictories++
          break
      }
    }

    console.info(
      `The raven won ${ravenVictories} times and we won ${ourVictories} times.`
    )
  }
}

new Main().run()
