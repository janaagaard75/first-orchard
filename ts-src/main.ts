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
    return DieRool.Blue;
  }

  public static randomFruit(): Fruit {
    return Fruit.Red;
  }
}

class Tree {
  constructor() {
    this.fruits = 4;
  }

  fruits: number;

  pickFruit() {
    if (this.fruits >= 1) {
      this.fruits = this.fruits - 1;
    }
  }
}

class UnreachableCaseError extends Error {
  constructor(val: never) {
    super(`Unreachable case: ${val}`);
  }
}

class Orchard {
  constructor() {
    this.trees[Fruit.Blue] = new Tree();
    this.trees[Fruit.Green] = new Tree();
    this.trees[Fruit.Red] = new Tree();
    this.trees[Fruit.Yellow] = new Tree();
  }

  trees: Array<Tree> = [];

  pickFruit(fruit: Fruit) {
    this.trees[fruit].pickFruit();
  }

  fruitAvailable(fruit: Fruit): boolean {
    return this.trees[fruit].fruits >= 1;
  }

  pickFromTreeWithMost() {}

  pickRandomFruit() {}

  pickPreferredFruit(first: Fruit, second: Fruit, third: Fruit) {}
}

enum BasketStrategy {
  TreeWithMost,
  Random,
  PreferredOrder
}

class Game {
  constructor(private strategy: BasketStrategy) {
    this.orchard = new Orchard();
  }

  orchard: Orchard;
}

class Main {
  public run() {
    console.info("Started.");
  }
}

new Main().run();
