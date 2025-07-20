import { createAction, props } from '@ngrx/store';
import { IMovie, IMovieDetails, IParams } from '../../../Model/Movies';

export const appendMovieListAction = createAction(
  '[MovieList Action] appendMovieListAction',
  props<{ queryParams: IParams }>()
);

export const appendMovieListSuccess = createAction(
  '[MovieList Action] appendMovieListSuccess',
  props<{ movieList: IMovie }>()
);

export const appendMovieDetail = createAction(
  '[MovieList Action] appendMovieDetails',
  props<{ id: number }>()
);

export const appendMovieDetailSuccess = createAction(
  '[MovieList Action] appendMovieDetailSuccess',
  props<{ movieDetails: IMovieDetails }>()
);

export const appendMovieListFailure = createAction(
  '[MovieList Action] appendMovieListFailure',
  props<{ error: string }>()
);

export const appendMovieDetailFailure = createAction(
  '[MovieList Action] appendMovieDetailFailure',
  props<{ error: string }>()
);
