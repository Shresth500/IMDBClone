import { createReducer, on } from '@ngrx/store';
import { initialMovieList } from './Movies.state';
import * as MovieListAction from './Movies.actions';

export const MovieListReducer = createReducer(
  initialMovieList,
  on(MovieListAction.appendMovieListAction, (state, { queryParams }) => {
    return {
      ...state,
    };
  }),
  on(MovieListAction.appendMovieListSuccess, (state, { movieList }) => {
    return {
      ...state,
      movieList: movieList,
    };
  }),
  on(MovieListAction.appendMovieDetail, (state, { id }) => {
    return {
      ...state,
    };
  }),
  on(MovieListAction.appendMovieDetailSuccess, (state, { movieDetails }) => {
    return {
      ...state,
      movieDetails: movieDetails,
    };
  }),
  on(MovieListAction.appendMovieListFailure, (state, { error }) => {
    return {
      ...state,
      errorMovieList: error,
    };
  }),
  on(MovieListAction.appendMovieDetailFailure, (state, { error }) => {
    return {
      ...state,
      errorMovieDetails: error,
    };
  })
);
