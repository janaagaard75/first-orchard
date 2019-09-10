import { DieRoll } from "./DieRoll"

export class Random {
  public static rollDie(): DieRoll {
    return this.randomNumber(6)
  }

  public static randomNumber(values: number) {
    return Math.floor(Math.random() * values)
  }
}
