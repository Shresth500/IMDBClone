import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILogin,
  IRegister,
  IRegisterResponse,
  IToken,
} from '../../Common/Model/Authentication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url = `http://127.0.0.1:8000/account`;
  constructor(private http: HttpClient, private router: Router) {}

  register(registerData: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(
      `${this.url}/registration/`,
      registerData
    );
  }

  login(loginData: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${this.url}/login`, loginData);
  }
}
