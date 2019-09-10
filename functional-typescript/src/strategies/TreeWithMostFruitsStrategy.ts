import { Tree } from "../Tree"
import { BasketStrategy } from "./BasketStrategy"

export class TreeWithMostFruitsStrategy implements BasketStrategy {
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
