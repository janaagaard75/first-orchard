export class Tree {
  constructor() {
    this.numberOfFruits = 4
  }

  numberOfFruits: number

  pickFruit() {
    if (this.numberOfFruits === 0) {
      throw new Error("There are no more fruits left to pick on this tree.")
    }

    this.numberOfFruits = this.numberOfFruits - 1
  }
}
