import { Tree } from "../Tree"
import { BasketStrategy } from "./BasketStrategy"

export class PreferredFruitStrategy implements BasketStrategy {
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
