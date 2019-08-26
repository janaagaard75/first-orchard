import { DieRool } from "./DieRool"

export class Random {
  public static roolDie(): DieRool {
    return this.randomNumber(6)
  }

  public static randomNumber(values: number) {
    return Math.floor(Math.random() * values)
  }
}
