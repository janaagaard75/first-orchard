module Library

open Newtonsoft.Json

let getJsonDotNetJson value =
    sprintf "I used to be %s but now I'm %s thanks to JSON.NET." value (JsonConvert.SerializeObject(value))