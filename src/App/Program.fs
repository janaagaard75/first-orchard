﻿module FirstOrchard.App

open System

type Website =
    { Title : string
      Url : string }

[<EntryPoint>]
let main argv =
    printfn "Hello World from F#!"
    0 // Return an integer exit code.