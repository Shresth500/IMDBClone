import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as MovieListAction from './Movies.actions';
import { MovieServiceService } from '../../../../Services/IMDB/movie-service.service';

@Injectable()
export class MovieEffect {
  private actions$ = inject(Actions);
  private moviesService = inject(MovieServiceService);

  loadMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieListAction.appendMovieListAction),
      exhaustMap(({ queryParams }) =>
        this.moviesService.getAllMovieList(queryParams).pipe(
          map((movieList) =>
            MovieListAction.appendMovieListSuccess({ movieList })
          ),
          catchError((error: string) =>
            of(MovieListAction.appendMovieListFailure({ error: error }))
          )
        )
      )
    );
  });

  loadMovieDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieListAction.appendMovieDetail),
      exhaustMap(({ id }) =>
        this.moviesService.getMovieById(id).pipe(
          map((movieDetails) =>
            MovieListAction.appendMovieDetailSuccess({ movieDetails })
          ),
          catchError((error: string) =>
            of(MovieListAction.appendMovieDetailFailure({ error: error }))
          )
        )
      )
    );
  });
}
