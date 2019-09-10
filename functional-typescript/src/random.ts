import { DieRoll } from "./DieRoll"

export function randomInteger(values: number): number {
  return Math.floor(Math.random() * values)
}

export function rollDie(): DieRoll {
  return randomInteger(6)
}
