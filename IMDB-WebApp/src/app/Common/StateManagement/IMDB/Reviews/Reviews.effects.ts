import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { MovieServiceService } from '../../../../Services/IMDB/movie-service.service';
import * as ReviewAction from './Reviews.action';

@Injectable()
export class ReviewEffects {
  private actions$ = inject(Actions);
  private moviesService = inject(MovieServiceService);

  loadReviews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewAction.reviewActions),
      exhaustMap(({ id }) =>
        this.moviesService.getMovieReviews(id).pipe(
          map((movieReviewList) =>
            ReviewAction.getreviewActionSuccess({ movieReviewList })
          ),
          catchError((error: string) =>
            of(ReviewAction.getReviewActionFailure({ error: error }))
          )
        )
      )
    );
  });

  addReview$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewAction.addReviewAction),
      mergeMap(({ movieReview, id }) =>
        this.moviesService.addMovieReview(movieReview, id).pipe(
          map((movieReviewResponse) =>
            ReviewAction.addReviewSuccessAction({ movieReviewResponse })
          ),
          catchError((error) => of(ReviewAction.addReviewFailureAction(error)))
        )
      )
    );
  });
}
