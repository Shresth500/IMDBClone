import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMovieReviewState } from '../../../Model/Reviews';

const getReview = createFeatureSelector<IMovieReviewState>('movieReviewData');

export const getMovieReview = createSelector(
  getReview,
  (state) => state.movieReviewList
);

export const getErrorWhileRetrievingReviews = createSelector(
  getReview,
  (state) => state.error1
);

export const getErrorWhileAddingReview = createSelector(
  getReview,
  (state) => state.error2
);
