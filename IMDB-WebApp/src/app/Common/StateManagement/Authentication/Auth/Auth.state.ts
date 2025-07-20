import { IAuthState, IRegisterState } from '../../../Model/Authentication';

export const initialAuthState: IAuthState = {
  user: null,
  loading: false,
  error: null,
};

export const initialRegisterState: IRegisterState = {
  user: null,
  loading: false,
  error: null,
};
