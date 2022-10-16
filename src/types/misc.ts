import { VALIDATION_ERRORS } from 'enums';

export type IHandleValuesChangeFunction<Values> = <Key extends keyof Values>(
  key: Key,
) => (value: Values[Key]) => void;

export type IValidationError = typeof VALIDATION_ERRORS[number];

export type IValidationErrorsMessages = Partial<Record<IValidationError, string>>;

export type IFormValidationErrors<FormValues> = Partial<Record<keyof FormValues, IValidationError>>;

export type IFormValidationErrorsMessages<FormValues> = Partial<
  Record<keyof FormValues, IValidationErrorsMessages>
>;
