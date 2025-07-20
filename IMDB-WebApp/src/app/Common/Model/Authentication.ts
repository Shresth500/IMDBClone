export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface IToken {
  refresh: string;
  access: string;
}

export interface IRegisterResponse {
  response: string;
  username: string;
  email: string;
  Token: IToken;
}

export interface IAuth {
  loginData: ILogin;
  registerData: IRegister;
}

export interface IAuthState {
  user: IToken | null;
  loading: boolean;
  error: string | null;
}

export interface IRegisterState {
  user: IRegisterResponse | null;
  loading: boolean;
  error: string | null;
}
