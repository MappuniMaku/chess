export const isEven = (number: number): boolean => {
  return number % 2 === 0;
};

export const isObjectEmpty = (obj?: object): boolean =>
  obj === undefined ||
  Object.keys(obj).length === 0 ||
  Object.values(obj).every((value) => value === undefined);
