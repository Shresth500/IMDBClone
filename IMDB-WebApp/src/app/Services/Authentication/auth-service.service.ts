import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILogin,
  IRegister,
  IRegisterResponse,
  IToken,
} from '../../Common/Model/Authentication';
import { map, Observable, using } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private url = `http://127.0.0.1:8000/account`;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  register(registerData: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(
      `${this.url}/registration/`,
      registerData,
      { headers: { skip: 'true' } }
    );
  }

  login(loginData: ILogin): Observable<IToken> {
    return this.http
      .post<IToken>(`${this.url}/login/`, loginData, {
        headers: { skip: 'true' },
      })
      .pipe(
        map((user) => {
          if (user && user['refresh']) {
            this.cookieService.set('user', JSON.stringify(user));
            this.cookieService.set('refresh', JSON.stringify(user['refresh']));
            // console.log(this.cookieService.get('refresh'));
            // console.log(`refresh Token got - ${user['refresh']}`);
            // console.log(`access Token got - ${user['refresh']}`);
          }
          return user;
        })
      );
  }

  refreshToken(Tokens: IToken): Observable<IToken> {
    return this.http
      .post<IToken>(`${this.url}/api/token/refresh/`, Tokens)
      .pipe(
        map((tokens) => {
          this.cookieService.set('user', JSON.stringify(tokens));
          this.cookieService.set('refresh', JSON.stringify(tokens['refresh']));
          return tokens;
        })
      );
  }

  logout() {
    return this.http.post(
      `${this.url}/logout/`,
      {},
      { headers: { skip: 'true' } }
    );
  }
  clearTokens() {
    this.cookieService.deleteAll();
  }
}
