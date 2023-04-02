import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { IFormValidationErrors, IHandleValuesChangeFunction, ISignupFormValues } from '@/types';
import { api, IValidationErrorResponse } from '@/api';
import { Button, Input } from '@/components';
import { FAILED_VALIDATION_ERROR_CODE, NUMBER_REGEXP } from '@/consts';
import { SIGNUP_FORM_VALIDATION_ERRORS } from '@/locale';
import { isObjectEmpty } from '@/utils';
import { getErrorTextFunction } from '@/helpers';
import { useIsMounted } from '@/hooks';

import useStyles from './SignupForm.styles';

type ISignupFormValidationErrors = IFormValidationErrors<ISignupFormValues>;

const initialFormValues: ISignupFormValues = {
  username: '',
  password: '',
  rating: '600',
};

export const SignupForm: FC = () => {
  const classes = useStyles();
  const isMounted = useIsMounted();

  const [values, setValues] = useState<ISignupFormValues>(initialFormValues);
  const [errors, setErrors] = useState<ISignupFormValidationErrors>();
  const [isLoading, setIsLoading] = useState(false);

  const { username, password, rating } = values;

  const handleValuesChange: IHandleValuesChangeFunction<ISignupFormValues> = (key) => (value) => {
    setValues((prevState) => ({ ...prevState, [key]: value }));
    setErrors({ ...errors, [key]: undefined });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.fetchSignup({ ...values, rating: Number(values.rating) });
      window.location.href = '/login';
    } catch (e) {
      console.error(e);
      if (!isMounted()) {
        return;
      }
      const { error, validationErrors } = e as IValidationErrorResponse<ISignupFormValues>;
      if (error === FAILED_VALIDATION_ERROR_CODE && validationErrors !== undefined) {
        setErrors(validationErrors);
      }
    } finally {
      if (isMounted()) {
        setIsLoading(false);
      }
    }
  };

  const getErrorText = getErrorTextFunction(SIGNUP_FORM_VALIDATION_ERRORS, errors);

  const hasErrors = !isObjectEmpty(errors);

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={classes.element}>
        <Input
          type="text"
          value={username}
          label="Имя пользователя"
          errorText={getErrorText('username')}
          isInvalid={errors?.username !== undefined}
          isDisabled={isLoading}
          isRequired
          onChange={handleValuesChange('username')}
        />
      </div>

      <div className={classes.element}>
        <Input
          type="password"
          value={password}
          label="Пароль"
          autoComplete="new-password"
          errorText={getErrorText('password')}
          isInvalid={errors?.password !== undefined}
          isDisabled={isLoading}
          isRequired
          onChange={handleValuesChange('password')}
        />
      </div>

      <div className={classes.element}>
        <Input
          type="text"
          value={rating}
          label="Рейтинг"
          maxLength={4}
          errorText={getErrorText('rating')}
          isInvalid={errors?.rating !== undefined}
          isDisabled={isLoading}
          isRequired
          onChange={(v) => {
            if (NUMBER_REGEXP.test(v)) {
              handleValuesChange('rating')(v);
            }
          }}
        />
      </div>

      <div className={classes.element}>
        <Button type="submit" isDisabled={hasErrors || isLoading}>
          Зарегистрироваться
        </Button>
      </div>

      <div className={classes.element}>
        Уже зарегистрированы?{' '}
        <Link to="/login" className={classes.link}>
          Войти
        </Link>
      </div>
    </form>
  );
};
