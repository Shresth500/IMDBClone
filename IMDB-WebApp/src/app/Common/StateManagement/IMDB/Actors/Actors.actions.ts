import { createAction, createActionGroup, props } from '@ngrx/store';
import { IActorDetails, IActorList, IActorParams } from '../../../Model/Actor';

export const appendActorListAction = createAction(
  '[Actors Actions] appendActorListAction',
  props<{ params: IActorParams }>()
);

export const appendActorListSuccess = createAction(
  '[Actors Actions] appendActorListSuccess',
  props<{ actorList: IActorList }>()
);

export const appendActorListFailure = createAction(
  '[Actors Actions] appendActorListFailure',
  props<{ error: string }>()
);

export const getActorsDetailsAction = createAction(
  '[Actors Actions] getActorsDetailsAction',
  props<{ id: number }>()
);

export const getActorsDetailsSuccess = createAction(
  '[Actors Actions] getActorsDetailsSuccess',
  props<{ actorDetails: IActorDetails }>()
);

export const getActorDetailsFailure = createAction(
  '[Actors Actions] getActorDetailsFailure',
  props<{ error2: string }>()
);
