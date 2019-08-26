export class Tree {
  constructor() {
    this.numberOfFruits = 4
  }

  numberOfFruits: number

  hasFruitsLeft(): boolean {
    return this.numberOfFruits >= 1
  }

  pickFruit() {
    if (!this.hasFruitsLeft) {
      throw new Error("There are no more fruits left to pick on this tree.")
    }

    this.numberOfFruits = this.numberOfFruits - 1
  }
}
