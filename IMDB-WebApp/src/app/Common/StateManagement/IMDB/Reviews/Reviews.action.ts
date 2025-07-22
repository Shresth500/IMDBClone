import { createAction, props } from '@ngrx/store';
import { IAddReview, IReviewDetail } from '../../../Model/Reviews';

export const reviewActions = createAction(
  '[Reviews Action] reviewActions',
  props<{ id: number }>()
);

export const getreviewActionSuccess = createAction(
  '[Reviews Action] getreviewActionSuccess',
  props<{ movieReviewList: IReviewDetail[] }>()
);

export const getReviewActionFailure = createAction(
  '[Reviews Action] getReviewActionFailure',
  props<{ error: string }>()
);

export const addReviewAction = createAction(
  '[Reviews Action] addReviewAction',
  props<{ movieReview: IAddReview; id: number }>()
);

export const addReviewSuccessAction = createAction(
  '[Reviews Action] addReviewSuccessAction',
  props<{ movieReviewResponse: IReviewDetail }>()
);

export const addReviewFailureAction = createAction(
  '[Reviews Action] addReviewFailureAction',
  props<{ error: string }>()
);
