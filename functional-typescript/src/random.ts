import { FirstOrchardDieRoll } from "./FirstOrchardDieRoll"

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides)
}

export function rollFirstOrchardDie(): FirstOrchardDieRoll {
  return rollDie(6)
}
