# Write a snake game in index.d.ts
Ok so first I guess we need some kind of an empty map to draw on.


```typescript

type Board = [
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null],
]
```

What do I need, I guess a function to draw things on map. It’s a 2D type, I guess it’ll require a bit of a fight with TS. We’ll do it the good old way by doing double loop. So how can we iterate over a list in TS typesystem?

First we need to create a set of array's keys, this is how we do it
```typescript
type list = ["I", "like", "cats"]
keyof list // A set of elements "I" "like" "cats" 

```
To iterate over them we can use mapped types synthax. This sort of works like .map
```typescript 
{ [/* element */ in /* set to iterate over */]: /* thing to return */ }

```
Let's try it out on an example
```typescript
type myList = [null, null, null, null, null]

type mapList<list> = { [index in keyof list]: true }

type result = mapList<myList>
/*
  type ress = [true, true, true, true, true]
*/

```


```typescript
type myList = [null, null, null, null, null]

type markList<list, offset, valueToSet> =
  { [index in keyof list]:  }
```





Title ideas:
How to play snake game in your InteliSense
How to write snake game using TS types alone
Snake game made of TypeScript types

// TODO: write alternative operations
## Entry
To write a simple game using types alone you have to invent everything from scratch, the most basic math concepts.
## The game from player's perspective



## Game logic overview
In game development there is such a concept as a game loop which is the main point of the game
from which most of the logic is being called.

Game loop updates the state of the game every iteration.
// TODO explain step by step building the loop
```javascript
const board // a 2D array representing the game board
let snakeCoordinates = [[5, 5]]
const commands = '' // Comes from player input
let foodChunkCoordinates = [2, 2]

for (let currentCommand in commands) {
  snakeHead = snakeCoordinates[0]
  newHead = moveCoordinate(currentCommand, head)

  if (!isCoordinateWithinBoardBoundries(newHead))
    return 'End of game, you\'ve left the board'

  if (isCoordinateOnList(newHead, snakeCoordinates))
    return 'End of game, you\'ve eaten yourself'

  longerSnake = [newHead, ...snakeCoordinates]
  const didSnakeEatFood = areArraysIdentical(newHead, foodChunkCoordinates)

  if (!didSnakeEatFood) {
    snakeCoordinates = removeLastElement(longerSnake)
    continue
  }

  lastSnakePiece = pickLastEelementOfArray(snakeCoordinates)
  snakeCoordinates = longerSnake
  commands = restOfCommands
  foodChunkCoordinates = randomCoordinates(lastSnakePiece[1], lastSnakePiece[0])
}

render(board, foodChunkCoordinates, snakeCoordinates)
```

For the sake of readability we won't dive into implementations of utility functions
like `randomCoordinates`, `pickLastEelementOfArray`, `areArraysIdentical` etc.

## Writing logic in types
Type system in TypeScript weren't exactly designed to write long and complicated logic in them.

Some of the biggest quirks are:
  - you can't have loops // TODO: explain why I don't consider mapped types
    - because of that most of our logic will be made using recursions // TODO: example
  - some of the most basic math operations are absent // TODO: examples
  - you mostly operate on sets (as in mathematical sets) // TODO: examples
  - lacks a lot of basic utilities that would normally be available in the standard language // TODO: examples
  - the only form of a conditional is the ternary operator
  - the only comparison operator is whether your value belongs to a set // TODO: doublecheck
  - we can encapsulate logic using generic types
## A language without arithmetics
### What is a number
In TypeScipt typesystem numbers do exist but TS doesn't provide you any operations for even the most basic
arithmetics. You want to increment a number? Good luck. Maybe sum them? Sorry, nope. It makes programming
in it very challenging because just to move our snake in any direction we have to increment/decrement 
x or y coordinate of the snake.

```javascript
// moving coordinate
function moveLeft(coordinate) {
  return [
    coordinate[0] - 1,
    coordinate[1]
  ]
}
```
Situation is even worse with food generation. Here you have to generate random coordinates
where the food will appear. Type system doesn't really need random number generation, because
why would need one? You have to write own and writing random number generation requires much more
than just incrementing decrementing.
One of the most basic formula for generating a pseudorandom number requires at the very least modulo operator.

How do you cope? You have to implement everything that you need, including the most basic operations.

### Types don't know numbers order
Turns out that TypeScript doesn't know that 4 is after 3, there's not a single operator that would tell you
what number goes after anoter. No incrementation, no greater than/smaller than operators.
```typescript
type myNumber = 4
type nextNumber = 4++ // nope, no such thing as ++
type nextNumber = 4 + 1 // neither a single +
type isFourGreaterThanFive = 4 < 5 // tough luck, no number comparison operator
```

Thankfuly we can check whether two numbers are the same though
```typescript
type myNumber = 4
type doesMyNumberEqualFour = myNumber extends 4 ? true : false
```

// TODO: note that extends is not really equals
### Building incrementation
```typescript
// Let's declare what does it mean to be a digit
type Digit = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

type incrementedDigits = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type myNumber = Digit[0] // 0
type myIncrementedNumber = Digit[myNumber] // 1, 0th element of incrementedDigits array is 1
```
// TODO: check whether using extending array is fine
This looks very crude but we decided to go with this because the alternative might be dangerous.
Alright but this is very static, we don't have an increment function that would neatly increment
our digit of choice.
```typescript
type increment<digit> = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][digit]

type myNumber = 5
type incrementedNumber = increment<myNumber> // 6
```
Similarly for decrementing:
```typescript
type increment<digit> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8][digit]

type myNumber = 5
type incrementedNumber = increment<myNumber> // 4
```

// TODO: mention the universal incrementation using arrays extension
### Adding and subtracting
### Multi-digit numbers
### Multiplication and division
### Generating random numbers
## Auxiliary types
## The game loop