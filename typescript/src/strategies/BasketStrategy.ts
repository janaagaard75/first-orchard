import { Tree } from "../Tree"

export interface BasketStrategy {
  name: string
  pickTree(trees: Array<Tree>): Tree
}
