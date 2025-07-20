import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import * as AuthActions from './Auth.actions';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { AuthServiceService } from '../../../../Services/Authentication/auth-service.service';

@Injectable()
export class AuthEffects {
  private action$ = inject(Actions);
  private authService = inject(AuthServiceService);

  private register$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.register),
      switchMap(({ registerData }) =>
        this.authService.register(registerData).pipe(
          map((resp) => AuthActions.registerSuccess({ user: resp })),
          catchError((error: string) =>
            of(AuthActions.registerFailure({ error: error }))
          )
        )
      )
    );
  });

  private login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthActions.login),
      switchMap(({ userData }) =>
        this.authService.login(userData).pipe(
          map((resp) => AuthActions.loginSuccess({ user: resp })),
          catchError((error: string) =>
            of(AuthActions.loginFailure({ error: error }))
          )
        )
      )
    );
  });
}
