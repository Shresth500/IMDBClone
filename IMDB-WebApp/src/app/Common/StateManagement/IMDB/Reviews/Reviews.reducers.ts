import { createReducer, on } from '@ngrx/store';
import { initialReviewState } from './Reviews.state';
import * as ReviewAction from './Reviews.action';

export const ReviewReducer = createReducer(
  initialReviewState,
  on(ReviewAction.reviewActions, (state, { id }) => {
    return {
      ...state,
    };
  }),
  on(ReviewAction.getreviewActionSuccess, (state, { movieReviewList }) => {
    return {
      ...state,
      movieReviewList: movieReviewList,
    };
  }),
  on(ReviewAction.getReviewActionFailure, (state, { error }) => {
    return {
      ...state,
      error1: error,
    };
  }),
  on(ReviewAction.addReviewAction, (state, { movieReview, id }) => {
    return {
      ...state,
    };
  }),
  on(ReviewAction.addReviewSuccessAction, (state, { movieReviewResponse }) => {
    return {
      ...state,
      movieReviewList: [...state.movieReviewList, movieReviewResponse],
    };
  }),
  on(ReviewAction.addReviewFailureAction, (state, { error }) => {
    return {
      ...state,
      error2: error,
    };
  })
);
