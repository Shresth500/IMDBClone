import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      authData: authFormReducer,
      loginData: authLoginReducer,
      registerData: authRegisterReducer,
      movielistData: MovieListReducer,
      actorListData: ActorReducer,
    }),
    provideEffects(AuthEffects, MovieEffect, ActorEffect),
  ],
};
