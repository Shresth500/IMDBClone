import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState, IRegisterState } from '../../../Model/Authentication';

const getAuth = createFeatureSelector<IAuthState>('loginData');
const getRegister = createFeatureSelector<IRegisterState>('registerData');

export const getLoginUser = createSelector(getAuth, (state) => {
  return state.user;
});

export const getRegisterUser = createSelector(getRegister, (state) => {
  return state.user;
});
