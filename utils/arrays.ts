import { DoubleDigit, decrementSingleDigit} from './arithmetics'

export type setArrayElement<arr extends Array<any>, index extends number, value> = {
  [key in keyof arr]: key extends `${index}` ? value : arr[key]
}

export type repeat<times extends number, digit extends DoubleDigit> = times extends 1 ? digit : repeat<decrementSingleDigit<times>, [0, ...digit]>

export type removeLastElement<arr> =
  arr extends [...infer firstElements, infer last] ? firstElements : null


export type pickLastEelementOfArray<arr extends unknown[]> =
  arr extends [...infer firstElements, infer last] ? last :
    arr['length'] extends 1 ?  arr[0] : null