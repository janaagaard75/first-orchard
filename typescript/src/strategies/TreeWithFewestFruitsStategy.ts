import { Tree } from "../Tree"
import { BasketStrategy } from "./BasketStrategy"

export class TreeWithFewestFruitsStrategy implements BasketStrategy {
  name = "Pick from the tree with the fewest fruits"

  pickTree(trees: Array<Tree>): Tree {
    return trees.sort((a, b) => a.numberOfFruits - b.numberOfFruits)[0]
  }
}
