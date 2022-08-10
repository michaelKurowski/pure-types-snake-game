import { incrementSingleDigit, decrementSingleDigit, Digit, randomX, randomY } from './utils/arithmetics';
import { removeLastElement, pickLastEelementOfArray } from './utils/arrays'
import { render } from './utils/rendering'
import { Board } from './utils/board'

type helloworld = startGame<
  'wa'
>
type startGame<
  commmands
> = gameLoop<Board, commmands>
type gameLoop<board, commands> = gameTick<board, [[5, 5]], commands, [2,2]>
type GAME_OVER = 'You failed miserably'
type gameTick<board, snakeCoordinates, commands extends ('a' | 'w' | 's' | 'd')[], foodChunkCoordinates> = 
  commands extends `${infer currentCommand}${infer restOfCommands}` ?
    snakeCoordinates[0] extends infer head ? 
      moveCoordinate<currentCommand, head> extends infer newHead ?
        checkIsCoordinateWithinMapBoundries<newHead> extends true ?
          checkIsCoordinateOnList<newHead, snakeCoordinates> extends false ?
            [newHead, ...snakeCoordinates] extends infer longerSnake ?
              newHead extends foodChunkCoordinates ?
                  pickLastEelementOfArray<snakeCoordinates> extends infer lastSnakePiece ?
                  gameTick<board,
                    longerSnake,
                    restOfCommands,
                    randomCoordinate<
                      lastSnakePiece[1],
                      lastSnakePiece[0]>
                    >
                  : 'An error occured, no last piece of snake found'
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

type checkIsCoordinateOnList<coordinate extends [number, number], list extends [number, number][]>
  = list extends [infer first, ...infer rest] ?
      first extends coordinate ? true 
      : checkIsCoordinateOnList<coordinate, rest>
    : false;


type randomCoordinate<headX extends Digit[number], headY extends Digit[number]> = [randomX<[headX]>, randomY<[headY]>] extends [infer X, infer Y] ? [X[decrementSingleDigit<X["length"]>],Y[decrementSingleDigit<Y["length"]>]] : never;

// type boardPadding = '                                    '
// type columnNumber = '  *    0    1    2    3    4    5    6    7    8    9'            
// type render<foodCoordinates extends number[], snakeCoordinates extends number[][]> = 
// `${boardPadding}${columnNumber}${boardPadding}${array2DToString<markSnakOnBoard<markBoard<Board, foodCoordinates[1], foodCoordinates[0], '  x  '>, snakeCoordinates>>}`


// type markSnakOnBoard<board extends Board, snakeCoordinates  extends number[][]> = markSnakOnBoardHelper<board, snakeCoordinates, 0> 
// type markSnakOnBoardHelper<board extends Board, snakeCoordinates  extends number[][], index extends number> = index extends snakeCoordinates['length'] ? board : 
// markSnakOnBoardHelper<markBoard<board, snakeCoordinates[index][1], snakeCoordinates[index][0], '  s  '>, snakeCoordinates, incrementSingleDigit<index>>

// non optimized ones, according to https://www.angularfix.com/2022/01/why-am-i-getting-instantiation-is.html
// using extended conditional types helps to deter computations
// More info, new in TS: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#tail-recursion-elimination-on-conditional-types