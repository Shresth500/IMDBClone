// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './Auth.actions';
import { initialAuthState, initialRegisterState } from './Auth.state';
import { IAuthState } from '../../../Model/Authentication';

export const authLoginReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export const authRegisterReducer = createReducer(
  initialRegisterState,
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
