import { setArrayElement } from './arrays'


type Digit = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
export type incrementSingleDigit<digit extends number> = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][digit]
export type decrementSingleDigit<digit extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7][digit]

//Optimized for tail recursion
type sumSingleDigit<a extends number, b extends number> = sumSingleDigitHelper<a, b>
type sumSingleDigitHelper<a extends number, b extends number> = 
  a extends 0 ? b : sumSingleDigitHelper<decrementSingleDigit<a>, incrementSingleDigit<b>> 

export type DoubleDigit = Digit[number][]

export type increment<doubleDigit extends DoubleDigit> = incrementHelper<doubleDigit, 0>

type incrementHelper<doubleDigit extends DoubleDigit, index extends number> =
  doubleDigit[incrementSingleDigit<index>] extends undefined 
    ? incrementSingleDigit<doubleDigit[index]> extends 10
      ? setArrayElement<setArrayElement<doubleDigit, index, 0>, decrementSingleDigit<index>, incrementSingleDigit<doubleDigit[decrementSingleDigit<index>]>>
      : setArrayElement<doubleDigit, index, incrementSingleDigit<doubleDigit[index]>>
    : incrementHelper<doubleDigit, incrementSingleDigit<index>>

