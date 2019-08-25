import { DieRool } from "./DieRool"
import { Fruit } from "./Fruit"

export class Random {
  public static roolDie(): DieRool {
    return this.randomNumber(6)
  }

  public static randomFruit(): Fruit {
    return this.randomNumber(4)
  }

  private static randomNumber(values: number) {
    return Math.floor(Math.random() * values)
  }
}
