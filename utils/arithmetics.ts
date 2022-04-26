import { setArrayElement } from './arrays'


type Digit = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
export type incrementSingleDigit<digit extends number> = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10][digit]
export type decrementSingleDigit<digit extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8][digit]

//Optimized for tail recursion
type sumSingleDigit<a extends number, b extends number> = sumSingleDigitHelper<a, b>
type sumSingleDigitHelper<a extends number, b extends number> = 
  a extends 0 ? b : sumSingleDigitHelper<decrementSingleDigit<a>, incrementSingleDigit<b>> 

type subtractSingleDigit<a extends number, b extends number> = subtractSingleDigitHelper<a, b>
type subtractSingleDigitHelper<a extends number, b extends number> = 
  a extends 0 ? b : subtractSingleDigitHelper<decrementSingleDigit<b>, decrementSingleDigit<a>> 

export type decrement<doubleDigit extends DoubleDigit> = decrementHelper<doubleDigit, decrementSingleDigit<doubleDigit["length"]>>

type decrementHelper<doubleDigit extends DoubleDigit, index extends number> = index extends -1 ? doubleDigit : 
doubleDigit[index] extends 0 ? 
decrementHelper<setArrayElement<doubleDigit, index, 9>, decrementSingleDigit<index>> :
setArrayElement<doubleDigit, index, decrementSingleDigit<doubleDigit[index]> >

// cannot carry more than one times
// type decrementHelper<doubleDigit extends DoubleDigit, index extends number> =
//   doubleDigit[incrementSingleDigit<index>] extends undefined 
//     ? decrementSingleDigit<doubleDigit[index]> extends -1
//       ? setArrayElement<setArrayElement<doubleDigit, index, 9>, decrementSingleDigit<index>, decrementSingleDigit<doubleDigit[decrementSingleDigit<index>]>>
//       : setArrayElement<doubleDigit, index, decrementSingleDigit<doubleDigit[index]>>
//     : decrementHelper<doubleDigit, incrementSingleDigit<index>>

export type DoubleDigit = Digit[number][]

export type increment<doubleDigit extends DoubleDigit> = incrementHelper<doubleDigit, decrementSingleDigit<doubleDigit["length"]>>

type incrementHelper<doubleDigit extends DoubleDigit, index extends number> = index extends -1 ? doubleDigit : 
doubleDigit[index] extends 9 ?  
incrementHelper<setArrayElement<doubleDigit, index, 0>, decrementSingleDigit<index>> : 
setArrayElement<doubleDigit, index, incrementSingleDigit<doubleDigit[index]>>

// // cannot carry more than one times
// type incrementHelper<doubleDigit extends DoubleDigit, index extends number> =
//   doubleDigit[incrementSingleDigit<index>] extends undefined 
//     ? incrementSingleDigit<doubleDigit[index]> extends 10
//       ? setArrayElement<setArrayElement<doubleDigit, index, 0>, decrementSingleDigit<index>, incrementSingleDigit<doubleDigit[decrementSingleDigit<index>]>>
//       : setArrayElement<doubleDigit, index, incrementSingleDigit<doubleDigit[index]>>
//     : incrementHelper<doubleDigit, incrementSingleDigit<index>>