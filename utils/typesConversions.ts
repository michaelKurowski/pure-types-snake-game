import { decrement, decrementSingleDigit, DoubleDigit, incrementSingleDigit, sumDigit } from "./arithmetics";

type parseSingleDigit<x> =
x extends '0' ? 0 :
x extends '1' ? 1 :
x extends '2' ? 2 :
x extends '3' ? 3 :
x extends '4' ? 4 :
x extends '5' ? 5 :
x extends '6' ? 6 :
x extends '7' ? 7 :
x extends '8' ? 8 :
x extends '9' ? 9 : never;

type leftTrimNumStirng<s extends string> =
  s extends `${'000000000'}${infer w}` ? w : 
  s extends `${'00000000'}${infer w}` ? w : 
  s extends `${'0000000'}${infer w}` ? w : 
  s extends `${'000000'}${infer w}` ? w : 
  s extends `${'00000'}${infer w}` ? w : 
  s extends `${'0000'}${infer w}` ? w : 
  s extends `${'000'}${infer w}` ? w : 
  s extends `${'00'}${infer w}` ? w : 
  s extends `${'0'}${infer w}` ? w : s;

type parseDigitsHelper<x, acc extends number[]> =
  x extends `${infer elem}${infer rest}` ? parseDigitsHelper<rest, [...acc, parseSingleDigit<elem>]> : acc;
export type parseDigits<x> = parseDigitsHelper<x, []>


export type doubleDigitToString<digit extends any[], separator extends string =''> = leftTrimNumStirng<doubleDigitToStringHelper<digit, 0, separator>>

type doubleDigitToStringHelper<digit extends any[], index extends number, separator extends string, result extends string = ''> = 
index extends digit["length"] ? result : doubleDigitToStringHelper<digit, incrementSingleDigit<index>, separator, `${result}${digit[index]}${separator}`>  

export type stringToNumber<s extends string> = stringToNumberHelper<s>
type stringToNumberHelper<s extends string, A extends any[] = []> = s extends keyof [0, ...A] ? A["length"] : stringToNumberHelper<s, [0, ...A]>

export type doubleDigitToNumber<digit extends DoubleDigit> = stringToNumber<arrayToString<digit>>

export type stringToArray<s extends string> = stringToArrayHelper<s>;
type stringToArrayHelper<s extends string, acc extends string[] = []> = s extends `${infer char}${infer rest}` ? stringToArrayHelper<rest, [...acc, char]> : acc;

export type array2DToString<array2D extends any[][]> = array2DToStringHelper<array2D, 0>
type array2DToStringHelper<array2D extends any[][], index extends number, result extends string = ''> = index extends array2D['length'] ? result : array2DToStringHelper<array2D, incrementSingleDigit<index>, `${result}${index}${doubleDigitToString<array2D[index], ' '>}`>