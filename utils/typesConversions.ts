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

type parseDigitsHelper<x, acc extends number[]> =
  x extends `${infer elem}${infer rest}` ? parseDigitsHelper<rest, [...acc, parseSingleDigit<elem>]> : acc;

export type parseDigits<x> = parseDigitsHelper<x, []>