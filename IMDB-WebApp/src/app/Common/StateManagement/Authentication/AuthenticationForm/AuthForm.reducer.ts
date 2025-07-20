import { createReducer, on } from '@ngrx/store';
import { AuthInitialData } from './AuthForm.state';
import * as AuthFormAction from './AuthForm.action';

export const authFormReducer = createReducer(
  AuthInitialData,
  on(AuthFormAction.appendLoginCredentials, (state, { loginData }) => {
    return {
      ...state,
      loginData: loginData,
    };
  }),
  on(AuthFormAction.appendRegisterCredentials, (state, { registerData }) => {
    return {
      ...state,
      registerData: registerData,
    };
  })
);
