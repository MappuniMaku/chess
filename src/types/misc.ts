export type IHandleValuesChangeFunction<Values> = <Key extends keyof Values>(
  key: Key
) => (value: Values[Key]) => void;
