
import { Board } from './board'
import { incrementSingleDigit } from './arithmetics';
import { doubleDigitToString } from './typesConversions'


export type boardToString<array2D extends any[][]> = boardToStringHelper<array2D, 0>
type boardToStringHelper<array2D extends any[][], index extends number, result extends string = ''> = index extends array2D['length'] ? result : boardToStringHelper<array2D, incrementSingleDigit<index>, `${result}${index}${doubleDigitToString<array2D[index], ' '>}${boardPadding}`>

type mapColumn<column extends Board[number], y, value> =
  {[elementNumber in keyof column]: elementNumber extends `${y}` ? value : column[elementNumber]}

type markBoard<board extends ((null | string)[])[], x extends number | string, y extends number | string, value extends string> =
   {
    [rowNumber in keyof board]: rowNumber extends `${x}` ? mapColumn<board[rowNumber], y, value> : board[rowNumber]
  }

type boardPadding = '                                    '
type columnNumber = `${boardPadding}  *    0    1    2    3    4    5    6    7    8    9`   
export type render<foodCoordinates extends number[], snakeCoordinates extends number[][]> = 
`${boardPadding}${columnNumber}${boardPadding}${boardToString<markSnakOnBoard<markBoard<Board, foodCoordinates[1], foodCoordinates[0], '  x  '>, snakeCoordinates>>}`


type markSnakOnBoard<board extends Board, snakeCoordinates  extends number[][]> = markSnakOnBoardHelper<board, snakeCoordinates, 0> 
type markSnakOnBoardHelper<board extends Board, snakeCoordinates  extends number[][], index extends number> = index extends snakeCoordinates['length'] ? board : 
markSnakOnBoardHelper<markBoard<board, snakeCoordinates[index][1], snakeCoordinates[index][0], '  s  '>, snakeCoordinates, incrementSingleDigit<index>>

