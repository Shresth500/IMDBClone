import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IToken } from '../../Common/Model/Authentication';
import { AuthServiceService } from './auth-service.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthServiceService);
  if (req.headers.has('skip')) {
    return next(req); // skip auth logic
  }
  const tokens: IToken | null = JSON.parse(cookieService.get('user'));
  if (tokens === null) {
    throw new Error('Unauthorized');
  }
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tokens.access}`,
    },
  });
  return next(newReq).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(newReq, next, authService, tokens);
      }
      return throwError(() => error);
    })
  );
};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthServiceService,
  tokens: IToken
) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);
    return authService.refreshToken(tokens).pipe(
      switchMap((response) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.refresh);
        return next(addToken(request, response.access));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.clearTokens();
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addToken(request, token!)))
    );
  }
}
