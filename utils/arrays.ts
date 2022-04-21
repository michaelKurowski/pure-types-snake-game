export type setArrayElement<arr extends Array<any>, index extends number, value> = {
  [key in keyof arr]: key extends `${index}` ? value : arr[key]
}