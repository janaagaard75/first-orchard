module FirstOrchard.App

open System

type Fruit =
    | Blue
    | Green
    | Red
    | Yellow

type Tree =
    { FruitType : Fruit
      NumberOfFruits : byte }

let Orchard =
 { BlueTree : byte }

[<EntryPoint>]
let main argv =
    printfn "Hello World from F#!"
    0 // Return an integer exit code.
