import { increment, incrementSingleDigit, decrementSingleDigit, Digit, DoubleDigit, randomX, randomY } from './utils/arithmetics';

// type Pointer = 4
// type Register = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, null >

import { random } from "./utils/arithmetics"
import { array2DToString, doubleDigitToNumber, doubleDigitToString } from "./utils/typesConversions"
import { removeLastElement } from './utils/arrays'

/// START of UTILS FUNCTIONS COPIED FROM THE INTERNT
// type OptionalPropertyNames<T> =
//   { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

// Common properties from L and R with undefined in R[K] replaced by type in L[K]
// type SpreadProperties<L, R, K extends keyof L & keyof R> =
//   { [P in K]: L[P] | Exclude<R[P], undefined> };

// type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never // see note at bottom*

// Type of { ...L, ...R }
// type Spread<Left, Right> = Id<
//   // Properties in L that don't exist in R
//   & Pick<Left, Exclude<keyof Left, keyof Right>>
//   // Properties in R with types that exclude undefined
//   & Pick<Right, Exclude<keyof Right, OptionalPropertyNames<Right>>>
//   // Properties in R, with types that include undefined, that don't exist in L
//   & Pick<Right, Exclude<OptionalPropertyNames<Right>, keyof Left>>
//   // Properties in R, with types that include undefined, that exist in L
//   & SpreadProperties<Left, Right, OptionalPropertyNames<Right> & keyof Left>
//   >;


//// END OF UTILS FUNCTIONS COPIED FROM THE INTERNET
// type setRecord<original extends Record<number, number | null>, key extends number, value> = () =>
//   (Spread<original, Record<key, value>>)
// type result = ReturnType<setRecord<Register, 2, 4>>
// type result2 = ReturnType<setRecord<result, 3, 5>>









// Infering is kind of extracting type from a formula
// type testtyp<Type> = Type extends (...args: infer arg) => any ? arg : never


// type hey = testtyp<(a: number, b: number) => string>
// type NewRegister = Record<SelectedRegister, 2>


type Board = [
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
  ['     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     ', '     '],
]

type BoardAbstract = [
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
  [null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number, null | number],
]

type smallboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]




// type myList = [null, null, null, null, null]

// type mapList<list> = { [index in keyof list]: true }

// type ress = mapList<myList>

// https://github.com/microsoft/TypeScript/pull/39094 variadic tuple types
// https://github.com/microsoft/TypeScript/pull/40002 recursive conditional types
// Tail recursion:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types 

// First, naive implementation, didn't work because the inner loop was generating record instead of an array
// type markBoard<board extends ((null | number)[])[], x extends number, y extends number, value extends number> =
//    {
//     [rowNumber in keyof board]: rowNumber extends `${x}` ? {
//       [columnNumber in keyof board[rowNumber]]: columnNumber extends `${y}` ? value :  board[rowNumber][columnNumber]
//     } : board[rowNumber]
//   }


type mapColumn<column extends Board[number], y, value> =
  {[elementNumber in keyof column]: elementNumber extends `${y}` ? value : column[elementNumber]}


// type result = mapColumn<[null, null, null, null, null, null, null, null, null, null], 2, 3>

type markBoard<board extends ((null | string)[])[], x extends number | string, y extends number | string, value extends string> =
   {
    [rowNumber in keyof board]: rowNumber extends `${x}` ? mapColumn<board[rowNumber], y, value> : board[rowNumber]
  }


type happyResult = markBoard<Board, 0, 0, 's'>

type x =  doubleDigitToString<random<[1]>>
type y = doubleDigitToString<random<[2]>>
//type boardfeed = arrayToString<markBoard<Board, x, y, 's'>[6]>

// type takeFirstLetter<stringOfChars> = stringOfChars extends `${infer firstChar}${infer rest}` ? [firstChar, rest] : never
type tesssssttt<str> = str extends `${infer firstChar}${infer rest}` ? [firstChar, rest] : never


type moveSnake<command, snakeCoordinates> = never // TODO
// type removeLast<arr> = arr extends [...infer firstOnes, infer last] ? last : false
// type rezo = removeLast<[1,2,3]>
// snake coords is array of arrays
// [[firstChunkCoords], [secondChunkCoords], [thirdChunkCoords]]...

type helloworld = startGame<
  'wwwaaaassssdd'
>
type helloworld2 = render<[2,2], [[5, 5]]>
type startGame<
  commmands
> = gameLoop<Board, commmands>
type gameLoop<board, commands> = gameTick<board, [[5, 5]], commands, [2,2]>
// type gameTick<board, snakeCoordinates, commands> = 
//   commands extends `${infer currentCommand}${infer nextCommands}` ?
//     gameTick<
//       board,
//       moveSnake<currentCommand, snakeCoordinates>,
//       nextCommands
//     > :
//     never
type GAME_OVER = 'You failed miserably'
type gameTick<board, snakeCoordinates, commands extends ('a' | 'w' | 's' | 'd')[], foodChunkCoordinates> = 
  commands extends `${infer currentCommand}${infer restOfCommands}` ?
    snakeCoordinates[0] extends infer head ? 
      moveCoordinate<currentCommand, head> extends infer newHead ?
        checkIsCoordinateWithinMapBoundries<newHead> extends true ?
          checkIsCoordinateOnList<newHead, snakeCoordinates> extends false ?
            [newHead, ...snakeCoordinates] extends infer longerSnake ?
              newHead extends foodChunkCoordinates ?
                gameTick<board,
                  longerSnake,
                  restOfCommands,
                  randomCoordinate<
                    newHead[0],
                    newHead[1]>
                  >
                : 
                removeLastElement<longerSnake> extends infer movedSnakeCoordinates ? // if we don't eat we remove last element
                  movedSnakeCoordinates extends number[][] ?
                    gameTick<board,
                    movedSnakeCoordinates,
                    restOfCommands,
                    foodChunkCoordinates
                  : GAME_OVER
                : GAME_OVER
            : never
          : GAME_OVER
        : GAME_OVER
      : never
    : never
  : render<foodChunkCoordinates, snakeCoordinates>
                
    // : render<board, snakeCoordinates, foodChunkCoordinates>

/*
  TODO: snake przestaje jesc smaczki w pewnym

*/

    /*
  Game tick psuedocode
  arguments: board, snakeCoordinates, commands, foodChunkCoordinates
  head = snakeCoordinates[0]
  command = `${firstCommand}${restOfCommands}`
  if (!restOfCommands) renderBoard<board, snakeCoordinates, foodChunkCoordinates>
  newSnakeHead = moveCoordinate<command, head>
  if checkIsCoordinateWithinMapBoundries<newSnakeHead>
    return null // game over
  if checkIsCoordinateOnList<newSnakeHead, snakeCoordinates> 
    return null // game over
  if checkIsCoordinateOnList<newSnakeHead, foodChunkCoordinates> 
    snakeCoordinates = [newSnakeHead ,...snakeCoordinates]
    foodChunkCoordinates = randomCoordinate<newSnakeHead[0], newSnakeHead[1]>
  else 
    snakeCoordinates = [...beginningOfSnake , lastElement]
    snakeCoordinates = [newSnakeHead ,...snakeCoordinates]
  fi
  gameTick<board, snakeCoordinates, restOfCommands, foodChunkCoordinates>

  TODO: randomCoordinate<excludedList>, render<board, snakeCoordinates, foodChunkCoordinates>
*/

type returnEvenNumber<numberA, numberB>
  = numberA extends 0 | 2 | 4 | 6 | 8 ? numberA :
    numberB extends 0 | 2 | 4 | 6 | 8 ? numberB :
    numberA



type moveCoordinate<command extends 'a' | 'w' | 's' | 'd', coordinate extends [number, number]> = 
  command extends 'a' ? [decrementSingleDigit<coordinate[0]>, coordinate[1]] :
  command extends 'w' ? [coordinate[0], decrementSingleDigit<coordinate[1]>] :
  command extends 's' ? [coordinate[0], incrementSingleDigit<coordinate[1]>] :
  command extends 'd' ? [incrementSingleDigit<coordinate[0]>, coordinate[1]] :
  null

type checkIsCoordinateWithinMapBoundries<coordinate extends [number, number]>
  = coordinate[0] extends (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) ? 
      coordinate[1] extends (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) ? true 
      : false
    : false
// type checkIsCoordinateOnList<coordinate extends [number, number], list extends [number, number][]>
//   = checkIsCoordinateOnListHelper<coordinate, list>
// type checkIsCoordinateOnListHelper<coordinate extends [number, number], list extends [number, number][]>
//   = coordinate['length'] extends 0 ? false : [0, ...]
type checkIsCoordinateOnList<coordinate extends [number, number], list extends [number, number][]>
  = list extends [infer first, ...infer rest] ?
      first extends coordinate ? true 
      : checkIsCoordinateOnList<coordinate, rest>
    : false;


type randomCoordinate<headX extends Digit[number], headY extends Digit[number]> = [randomX<[headX]>, randomY<[headY]>] extends [infer X, infer Y] ? [X[decrementSingleDigit<X["length"]>],Y[decrementSingleDigit<Y["length"]>]] : never;

type boardPadding = '                                    '
type columnNumber = '  *    0    1    2    3    4    5    6    7    8    9'            
type render<foodCoordinates extends number[], snakeCoordinates extends number[][]> = 
`${boardPadding}${columnNumber}${boardPadding}${array2DToString<markSnakOnBoard<markBoard<Board, foodCoordinates[1], foodCoordinates[0], '  x  '>, snakeCoordinates>>}`


type markSnakOnBoard<board extends Board, snakeCoordinates  extends number[][]> = markSnakOnBoardHelper<board, snakeCoordinates, 0> 
type markSnakOnBoardHelper<board extends Board, snakeCoordinates  extends number[][], index extends number> = index extends snakeCoordinates['length'] ? board : 
markSnakOnBoardHelper<markBoard<board, snakeCoordinates[index][1], snakeCoordinates[index][0], '  s  '>, snakeCoordinates, incrementSingleDigit<index>>

// non optimized ones, according to https://www.angularfix.com/2022/01/why-am-i-getting-instantiation-is.html
// using extended conditional types helps to deter computations
// More info, new in TS: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types


// not optimzied
// type sum<a extends number, b extends number> = a extends 0 ? b : sum<incrementDigit<b>, decrementDigit<a>>




// type mojwynik = RecurSum<5,5>




// type przyklad = IncrementDoubleDigit<[1, 0, 1, 9]>



// Kokos robi multigit do parse
// Marcin robi sleep function
// type parseSingleDigit<x> =
// x extends '0' ? 0 :
// x extends '1' ? 1 :
// x extends '2' ? 2 :
// x extends '3' ? 3 :
// x extends '4' ? 4 :
// x extends '5' ? 5 :
// x extends '6' ? 6 :
// x extends '7' ? 7 :
// x extends '8' ? 8 :
// x extends '9' ? 9 : never;

// type parseDigitsHelper<x, acc extends number[]> =
//   x extends `${infer elem}${infer rest}` ? parseDigitsHelper<rest, [...acc, parseSingleDigit<elem>]> : acc;

// type parseDigits<x> = parseDigitsHelper<x, []>
/*
  TODO:
  - subtracting multidigits
    - summing multi digit numnbers
      - subtracting single digits
      - decrementing multidigits
  - sleep function
  - game loop
*/


// 'wsads' - navugating wsad passed as a string



// type Flatten<arr extends Array<any>> = 
//   arr[0] extends undefined ?  [...Flatten<[arr[0]]>] : arr

// type GetChars<S> =
//     S extends `${infer Char}${infer Rest}` ? Char | GetChars<Rest> : never;
// Not optimized for tail recursion
//  ^
//  ||
//   V
// Optimized for tail recursion
// type GetChars<S> = GetCharsHelper<S, never>;
// type GetCharsHelper<S, Acc> =
//     S extends `${infer Char}${infer Rest}` ? GetCharsHelper<Rest, Char | Acc> : Acc;



  // With checking for string keys and trying to treat them differently
  /*

type markBoard<board extends BoardAbstract, x extends number, y extends number, value extends number> =
  () => {
    [rowNumber in keyof board]: rowNumber extends x ? {
      [columnNumber in keyof board[x]]: columnNumber extends `${y}` ? value : columnNumber extends `${y}` ? columnNumber : board[rowNumber][columnNumber] 
    } : rowNumber extends `${x}` ? undefined : board[rowNumber]
  }
  *
/*
   I could make it so that every element will be a conditional type and depending on whether a specific 
*/
// Extends loops over unions if union is provided
// type Mapper<T> = T extends string | number ? 1 : 2
// type mapped1 = Mapper<string >
// type mapped2 = Mapper<number >
// type mapped3 = Mapper<string | symbol>
// type mapped4 = Mapper<string | symbol | number>

// type resolution = '2' extends `${2}` ? true : false

// type resultboard = markBoard<smallboard, 1, 1, 1>
// // type child = resultboard[2]

// type boardkeys = 2 extends keyof Board ? true : false