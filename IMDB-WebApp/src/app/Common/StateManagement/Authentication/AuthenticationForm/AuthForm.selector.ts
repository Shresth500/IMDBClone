import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuth } from '../../../Model/Authentication';

export const getAuthForm = createFeatureSelector<IAuth>('authData');

export const getLoginData = createSelector(getAuthForm, (state) => {
  return state.loginData;
});

export const getRegisterData = createSelector(getAuthForm, (state) => {
  return state.registerData;
});
