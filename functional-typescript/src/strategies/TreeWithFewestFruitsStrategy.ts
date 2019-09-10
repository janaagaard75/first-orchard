import { Tree } from "../Tree"
import { BasketStrategy } from "./BasketStrategy"

export class TreeWithFewestFruitsStrategy implements BasketStrategy {
  name = "Pick from the tree with the fewest fruits"

  pickTree(trees: Array<Tree>): Tree {
    return trees
      .filter(tree => tree.hasFruitsLeft())
      .sort((treeA, treeB) => treeA.numberOfFruits - treeB.numberOfFruits)[0]
  }
}
