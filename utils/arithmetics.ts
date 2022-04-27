import { setArrayElement } from './arrays'
import { parseDigits} from './typesConversions'

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
index extends 0 ? [1, ...setArrayElement<doubleDigit, 0, 0>] :
incrementHelper<setArrayElement<doubleDigit, index, 0>, decrementSingleDigit<index>> : 
setArrayElement<doubleDigit, index, incrementSingleDigit<doubleDigit[index]>>

// // cannot carry more than one times
// type incrementHelper<doubleDigit extends DoubleDigit, index extends number> =
//   doubleDigit[incrementSingleDigit<index>] extends undefined 
//     ? incrementSingleDigit<doubleDigit[index]> extends 10
//       ? setArrayElement<setArrayElement<doubleDigit, index, 0>, decrementSingleDigit<index>, incrementSingleDigit<doubleDigit[decrementSingleDigit<index>]>>
//       : setArrayElement<doubleDigit, index, incrementSingleDigit<doubleDigit[index]>>
//     : incrementHelper<doubleDigit, incrementSingleDigit<index>>

export type sumDigit<firstDigit extends DoubleDigit, secondDigit extends DoubleDigit> = sumDigitHelper<firstDigit, secondDigit>

type sumDigitHelper<firstDigit extends DoubleDigit, secondDigit extends DoubleDigit> = secondDigit extends 0[] ? firstDigit : sumDigitHelper<increment<firstDigit>, decrement<secondDigit>>

export type subtractDigit<firstDigit extends DoubleDigit, secondDigit extends DoubleDigit> = substractDigitHelper<firstDigit, secondDigit>

type substractDigitHelper<firstDigit extends DoubleDigit, secondDigit extends DoubleDigit> = 
secondDigit extends 0[] ? firstDigit : substractDigitHelper<decrement<firstDigit>, decrement<secondDigit>>

export type multiplyDigit<multiplicand extends DoubleDigit, multiplier extends DoubleDigit> = multiplyDigitHelper<multiplicand, multiplier>

type multiplyDigitHelper<multiplicand extends DoubleDigit, multiplier extends DoubleDigit, result extends DoubleDigit = [0]> = multiplier extends 0[] ? result : multiplyDigitHelper<multiplicand, decrement<multiplier>, sumDigit<multiplicand, result>>

export type divide<divided extends DoubleDigit, divider extends DoubleDigit> = divideHelper<divided, divider, [0]>

type divideHelper<divided extends DoubleDigit, divider extends DoubleDigit, result extends DoubleDigit> = 
isSmaller<divided, divider> extends true ? result : divideHelper<subtractDigit<divided, divider>, divider, increment<result>>

export type modulo<divided extends DoubleDigit, divider extends DoubleDigit> = moduloHelper<divided, divider, [0]>

type moduloHelper<divided extends DoubleDigit, divider extends DoubleDigit, result extends DoubleDigit> = 
isSmaller<divided, divider> extends true ? divided : moduloHelper<subtractDigit<divided, divider>, divider, increment<result>>

export type random<seed extends DoubleDigit, mod extends DoubleDigit = [2,5]> = divide<[...modulo<seed, mod>, 0, 0], mod>

type rand = random<[2,7,8,9]>
type equals<valueA, valueB> = valueA extends valueB ? true : false
type returnBigger<digitA extends DoubleDigit, digitB extends DoubleDigit>
  =
  returnBiggerHelper<digitA, digitB, digitA, digitB>

type returnBiggerHelper<
  originalDigitA extends DoubleDigit,
  originalDigitB extends DoubleDigit,
  digitA extends DoubleDigit,
  digitB extends DoubleDigit>
  =
  equals<digitA, digitB> extends true ? originalDigitA :
  digitA extends [0] ? originalDigitB : 
  digitB extends [0] ? originalDigitA :
  returnBiggerHelper<originalDigitA, originalDigitB,  decrement<digitA>, decrement<digitB>>

type isSmaller<digitA extends DoubleDigit, digitB extends DoubleDigit>
=
isSmallerHelper<digitA, digitB>

type isSmallerHelper<
  digitA extends DoubleDigit,
  digitB extends DoubleDigit>
  =
  digitA extends digitB ? false :
  digitA extends 0[] ? true : 
  digitB extends 0[] ? false :
  isSmallerHelper<decrement<digitA>, decrement<digitB>>


type returnSmaller<digitA extends DoubleDigit, digitB extends DoubleDigit>
  =
  returnSmallerHelper<digitA, digitB, digitA, digitB>

type returnSmallerHelper<
  originalDigitA extends DoubleDigit,
  originalDigitB extends DoubleDigit,
  digitA extends DoubleDigit,
  digitB extends DoubleDigit>
  =
  equals<digitA, digitB> extends true ? originalDigitA :
  digitA extends [0] ? originalDigitA : 
  digitB extends [0] ? originalDigitB  :
  returnSmallerHelper<originalDigitA, originalDigitB,  decrement<digitA>, decrement<digitB>>

type getShorterMultipleDigit<digitA extends DoubleDigit, digitB extends DoubleDigit> =
  returnSmallerHelper<digitA, digitB, parseDigits<`${digitA["length"]}`>, parseDigits<`${digitB["length"]}`>>

type getLongerMultipleDigit<digitA extends DoubleDigit, digitB extends DoubleDigit> =
  returnBiggerHelper<digitA, digitB, parseDigits<`${digitA["length"]}`>, parseDigits<`${digitB["length"]}`>>

// Doesn't seem to work properly
type getMultipleDigitLengthDifference<digitA extends DoubleDigit, digitB extends DoubleDigit> =
  subtractDigit<

    getLongerMultipleDigit<
      parseDigits<`${digitA["length"]}`>,
      parseDigits<`${digitB["length"]}`>
    >,
    getShorterMultipleDigit<
      parseDigits<`${digitA["length"]}`>,
      parseDigits<`${digitB["length"]}`>
    >
  >
type rez = getMultipleDigitLengthDifference<[1,2,3,4],  [1,2]>
  // type rez<a extends DoubleDigit, b extends DoubleDigit> =
  //   getShorterMultipleDigit<a, b> extends infer x ?
  //     x extends true | false ? [0] : x : never

      // type eksperyment = true | false
// type getShorterMultipleDigitHelper<digitA extends DoubleDigit, digitB extends DoubleDigit> =
//   equals<digitA, digitB> extends true ? true :
//   digitA extends [0] ? originalDigitA : 
//   digitB extends [0] ? originalDigitB  :
//   returnSmallerHelper<originalDigitA, originalDigitB,  decrement<digitA>, decrement<digitB>>
// type rez = decrement<[1, 0]>
// type result = returnBigger<[5],[2]>

// type result2 = returnSmaller<[2], [5]>
