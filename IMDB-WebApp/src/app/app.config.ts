import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authFormReducer } from './Common/StateManagement/Authentication/AuthenticationForm/AuthForm.reducer';
import {
  authLoginReducer,
  authRegisterReducer,
} from './Common/StateManagement/Authentication/Auth/Auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './Common/StateManagement/Authentication/Auth/Auth.effects';
import { MovieEffect } from './Common/StateManagement/IMDB/Movies/Movies.effects';
import { MovieListReducer } from './Common/StateManagement/IMDB/Movies/Movies.reducer';
import { ActorReducer } from './Common/StateManagement/IMDB/Actors/Actors.reducer';
import { ActorEffect } from './Common/StateManagement/IMDB/Actors/Actors.effects';
import { CookieService } from 'ngx-cookie-service';
import { ReviewEffects } from './Common/StateManagement/IMDB/Reviews/Reviews.effects';
import { ReviewReducer } from './Common/StateManagement/IMDB/Reviews/Reviews.reducers';
import { authInterceptor } from './Services/Authentication/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      authData: authFormReducer,
      loginData: authLoginReducer,
      registerData: authRegisterReducer,
      movielistData: MovieListReducer,
      actorListData: ActorReducer,
      movieReviewData: ReviewReducer,
    }),
    provideEffects(AuthEffects, MovieEffect, ActorEffect, ReviewEffects),
    CookieService,
  ],
};
