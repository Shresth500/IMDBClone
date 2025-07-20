import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMovieState } from '../../../Model/Movies';

const getMovies = createFeatureSelector<IMovieState>('movielistData');
export const getMovieList = createSelector(
  getMovies,
  (state) => state.movieList
);

export const getAllMovieList = createSelector(
  getMovies,
  (state) => state.movieList?.results
);

export const getTotalCount = createSelector(
  getMovies,
  (state) => state.movieList?.count
);

export const getMovieDetails = createSelector(
  getMovies,
  (state) => state.movieDetails
);
