##Javascript Tic-Tac-Toe in three verses

###Verse 1: Object Oriented JS
####Major Concepts
* An object maintains it's own state and behavior.

####Objects
**CONTROLLER & VIEW**
* Game: handles I/O and game loop, is unaware of game logic but has encapsulated knowledge of a game to be able to get and display moves.
  * Methods: reset, start, isOver, inputPlayers, inputMove, displayBoard,
  * State: players, gameBoard, winner

* **MODELS**
* Board: contains game logic and state
  * Methods: checkWinner, makeMove
  * State: boardValues ['X'|'O'|'']
* Square: contains square logic
  * State: value ['X'|'O'|'']
* Players: contains player information, is unaware of game logic
  * Methods:
  * State: marker ('X'|'O')
#### Reference
* [ES6 Object Oriented Programming](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
* [OO Tic Tac Toe](.)

###Verse 2: React JS
* Declarative views - know what but not how.
* Components manage their own state and know how to render themselves (like objects).
* One way data binding, state is immutable
* Components take in data and render UI without side-effects (like functional)

####Components
* Square
* Board
* Game

#### Reference
* [Parallels between React and OO](https://blog.rapid7.com/2016/09/08/react-for-back-end-devs-parallels-between-react-and-object-oriented-programming/)
* [React Tic Tac Toe (tutorial and code)](.)

###Verse 3: Functional JS
* Avoid mutating state
  * Functions don't change state they return new state
  * No shared mutable state
  * Data and mutations still exist - just moved to the edge of the program
* First class functions
* High order functions
* Tail optimized recursion
* Supports concurrency - allows for parallel programming - optimization


####Functions
* move - does not modify the state of the board but returns a new board with the updated state in it (or the old board if the move is not legal).
* checkwin - passed board, returns winner.
* play - need to replace while loop with recursion to not store state of gameOver.
