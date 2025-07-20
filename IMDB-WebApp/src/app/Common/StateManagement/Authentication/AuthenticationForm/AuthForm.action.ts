import { createAction, props } from '@ngrx/store';
import { ILogin, IRegister } from '../../../Model/Authentication';

export const appendLoginCredentials = createAction(
  '[AuthForm] appendLoginCredentials',
  props<{ loginData: ILogin }>()
);

export const appendRegisterCredentials = createAction(
  '[AuthForm] appendRegisterCredentials',
  props<{ registerData: IRegister }>()
);
