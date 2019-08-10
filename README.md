# First Orchard

## Command  Line

From <https://docs.microsoft.com/en-us/dotnet/fsharp/get-started/get-started-command-line>.

Create a new solution:

    dotnet new sln -o FSNetCore

Create two projects, a library and an app:

    dotnet new classlib -lang F# -o src/Library
    dotnet new console -lang F# -o src/App

And add the projects to the solution

    dotnet sln add src/Library/Library.fsproj
    dotnet sln add src/App/App.fsproj

Add a NuGet package:

    dotnet add src/Library/Library.fsproj package Newtonsoft.Json

Build and run the code

    dotnet build
    (cd src/App; dotnet run)

<https://docs.microsoft.com/en-us/dotnet/fsharp/tour>
