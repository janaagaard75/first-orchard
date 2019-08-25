export class Tree {
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
