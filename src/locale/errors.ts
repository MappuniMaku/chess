import { IFormValidationErrorsMessages, ISignupFormValues } from '@/types';

export const SIGNUP_FORM_VALIDATION_ERRORS: IFormValidationErrorsMessages<ISignupFormValues> = {
  username: {
    isNotEmpty: 'Заполните это поле',
    isLength: 'Имя пользователя должно быть от 3 до 20 символов',
    isAlphanumeric: 'Имя пользователя должно состоять из английских букв и цифр',
    isNotUnique: 'Такой пользователь уже существует',
  },
  password: {
    isNotEmpty: 'Заполните это поле',
    isLength: 'Пароль должен быть от 8 до 20 символов',
    isAlphanumeric: 'Пароль должен состоять из английских букв и цифр',
  },
  rating: {
    isNotEmpty: 'Заполните это поле',
    isNumber: 'Рейтинг должен быть числом',
    min: 'Рейтинг должен быть не менее 600',
    max: 'Рейтинг должен быть не более 2000',
  },
};
