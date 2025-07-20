import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ActorsService } from '../../../../Services/Actors/actors.service';
import * as ActorsActions from './Actors.actions';

@Injectable()
export class ActorEffect {
  private actions$ = inject(Actions);
  private actorService = inject(ActorsService);

  loadActors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActorsActions.appendActorListAction),
      exhaustMap(({ params }) =>
        this.actorService.getAllActors(params).pipe(
          map((actorsList) =>
            ActorsActions.appendActorListSuccess({ actorList: actorsList })
          ),
          catchError((error: string) =>
            of(ActorsActions.appendActorListFailure({ error: error }))
          )
        )
      )
    );
  });

  loadActorDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActorsActions.getActorsDetailsAction),
      exhaustMap(({ id }) =>
        this.actorService.getActorDetails(id).pipe(
          map((actorDetails) =>
            ActorsActions.getActorsDetailsSuccess({
              actorDetails: actorDetails,
            })
          ),
          catchError((error: string) =>
            of(ActorsActions.getActorDetailsFailure({ error2: error }))
          )
        )
      )
    );
  });
}
