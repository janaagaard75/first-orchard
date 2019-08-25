enum DieRool {
  Blue,
  Green,
  Red,
  Yellow,
  Basket,
  Raven
}

enum Fruit {
  BluePlum,
  GreenApple,
  RedApple,
  YellowPear
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
    this.trees[Fruit.BluePlum] = new Tree()
    this.trees[Fruit.GreenApple] = new Tree()
    this.trees[Fruit.RedApple] = new Tree()
    this.trees[Fruit.YellowPear] = new Tree()
  }

  trees: Array<Tree> = []

  get totalNumberOfFruits(): number {
    return (
      this.trees[Fruit.BluePlum].numberOfFruits +
      this.trees[Fruit.GreenApple].numberOfFruits +
      this.trees[Fruit.RedApple].numberOfFruits +
      this.trees[Fruit.YellowPear].numberOfFruits
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
  name: string
  pickTree(trees: Array<Tree>): Tree
}

class TreeWithMostFruitsStrategy implements BasketStrategy {
  name = "Pick from the tree with the most fruits"

  pickTree(trees: Array<Tree>): Tree {
    const treeWithMostFruits = trees.reduce(
      (treeWithMostFruits, treeWithPossiblyMore) =>
        treeWithPossiblyMore.numberOfFruits > treeWithMostFruits.numberOfFruits
          ? treeWithPossiblyMore
          : treeWithMostFruits,
      trees[0]
    )

    return treeWithMostFruits
  }
}

class TreeWithFewestFruitsStrategy implements BasketStrategy {
  name = "Pick from the tree with the fewest fruits"

  pickTree(trees: Array<Tree>): Tree {
    return trees.sort((a, b) => a.numberOfFruits - b.numberOfFruits)[0]
  }
}

class RandomTreeStrategy implements BasketStrategy {
  name = "Pick from a random tree"

  pickTree(trees: Array<Tree>): Tree {
    return trees[Random.randomFruit()]
  }
}

class PreferredFruitStrategy implements BasketStrategy {
  name = "Pick preferred fruits first"

  pickTree(trees: Array<Tree>): Tree {
    const firstTreeWithFruits = trees.find(tree => tree.numberOfFruits >= 1)
    if (firstTreeWithFruits === undefined) {
      throw new Error(
        "There are no more fruits left. The game should have ended by now."
      )
    }

    return firstTreeWithFruits
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
        this.basketStrategy.pickTree(this.orchard.trees).pickFruitIfPossible()
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

class Main {
  public run() {
    const numberOfGamesPerStrategy = 1000000

    const strategies = [
      new TreeWithFewestFruitsStrategy(),
      new PreferredFruitStrategy(),
      new RandomTreeStrategy(),
      new TreeWithMostFruitsStrategy()
    ]

    strategies.forEach(strategy => {
      let ourVictories = 0

      for (let i = 0; i < numberOfGamesPerStrategy; i++) {
        const game = new Game(strategy)
        game.playGame()

        if (game.state === GameState.WeWon) {
          ourVictories++
        }
      }

      const percentage = Math.round(
        (ourVictories / numberOfGamesPerStrategy) * 100
      )

      console.info(
        `We won ${percentage}% of the games with the '${strategy.name}' strategy.`
      )
    })
  }
}

new Main().run()
