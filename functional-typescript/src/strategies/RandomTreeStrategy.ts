import { rollDie } from "../random"
import { Tree } from "../Tree"
import { BasketStrategy } from "./BasketStrategy"

export class RandomTreeStrategy implements BasketStrategy {
  name = "Pick from a random tree"

  pickTree(trees: Array<Tree>): Tree {
    const treesWithFruits = trees.filter(tree => tree.hasFruitsLeft())
    const randomTreeNumber = rollDie(treesWithFruits.length)
    return treesWithFruits[randomTreeNumber]
  }
}
