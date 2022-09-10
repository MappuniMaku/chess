import {
  IFormValidationErrors,
  IFormValidationErrorsMessages,
  IValidationError,
} from "types";

export const getErrorTextFunction =
  <FormValues>(
    translationsObject: IFormValidationErrorsMessages<FormValues>,
    errors?: IFormValidationErrors<FormValues>
  ) =>
  (field: keyof FormValues): string | undefined => {
    const translations = translationsObject[field];
    const errorType: IValidationError | undefined = errors?.[field];
    if (translations === undefined || errorType === undefined) {
      return undefined;
    }
    return translations[errorType];
  };
