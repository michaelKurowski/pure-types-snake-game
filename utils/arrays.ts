import { DoubleDigit, incrementSingleDigit, decrementSingleDigit} from './arithmetics'

export type setArrayElement<arr extends Array<any>, index extends number, value> = {
  [key in keyof arr]: key extends `${index}` ? value : arr[key]
}


type GetArrayLengthWrapper<arr extends DoubleDigit> = GetArrayLength<arr, 0>
type GetArrayLength<arr extends DoubleDigit, index extends number> =
  arr[index] extends undefined ? index : GetArrayLength<arr,  incrementSingleDigit<index>>

export type repeat<times extends number, digit extends DoubleDigit> = times extends 1 ? digit : repeat<decrementSingleDigit<times>, [0, ...digit]>
