// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import {
  ILogin,
  IRegister,
  IRegisterResponse,
  IToken,
} from '../../../Model/Authentication';

export const login = createAction(
  '[Auth] Login',
  props<{ userData: ILogin }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IToken }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ registerData: IRegister }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: IRegisterResponse }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);
