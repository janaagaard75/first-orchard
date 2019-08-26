import { Fruit } from "./Fruit"
import { Tree } from "./Tree"

export class Orchard {
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

  public pickFruitIfPossible(fruit: Fruit) {
    if (this.fruitAvailable(fruit)) {
      this.trees[fruit].pickFruit()
    }
  }

  private fruitAvailable(fruit: Fruit): boolean {
    return this.trees[fruit].numberOfFruits >= 1
  }
}
