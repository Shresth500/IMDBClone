import { Routes } from '@angular/router';
import { AuthenticationPageComponent } from './Authentication/authentication-page/authentication-page.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HomeComponentsComponent } from './IMDB/home-components/home-components.component';
import { MovieListComponent } from './IMDB/movie-list/movie-list.component';
import { MovieDetailsComponent } from './IMDB/movie-details/movie-details.component';
import { ActorsListComponent } from './IMDB/actors-list/actors-list.component';
import { ActorDetailsComponent } from './IMDB/actor-details/actor-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponentsComponent,
    children: [
      {
        path: '',
        component: MovieListComponent,
      },
      {
        path: 'movies',
        redirectTo: '',
      },
      {
        path: 'actors',
        component: ActorsListComponent,
      },
      {
        path: 'movieDetails/:id',
        component: MovieDetailsComponent,
      },
      {
        path: 'actorDetails/:id',
        component: ActorDetailsComponent,
      },
    ],
  },
  {
    path: 'home',
    redirectTo: '',
    //pathMatch: 'full',
  },

  {
    path: 'auth',
    component: AuthenticationPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];
