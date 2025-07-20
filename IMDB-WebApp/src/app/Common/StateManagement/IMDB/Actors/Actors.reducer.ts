import { createReducer, on } from '@ngrx/store';
import { initialActorState } from './Actors.state';
import * as ActorsActions from './Actors.actions';

export const ActorReducer = createReducer(
  initialActorState,
  on(ActorsActions.appendActorListAction, (state, { params }) => {
    return {
      ...state,
    };
  }),
  on(ActorsActions.appendActorListSuccess, (state, { actorList }) => {
    return {
      ...state,
      actorList: actorList,
    };
  }),
  on(ActorsActions.appendActorListFailure, (state, { error }) => {
    return {
      ...state,
      error1: error,
    };
  }),
  on(ActorsActions.getActorsDetailsAction, (state, { id }) => {
    return {
      ...state,
    };
  }),
  on(ActorsActions.getActorsDetailsSuccess, (state, { actorDetails }) => {
    return {
      ...state,
      actorDetails: actorDetails,
    };
  }),
  on(ActorsActions.getActorDetailsFailure, (state, { error2 }) => {
    return {
      ...state,
      error2: error2,
    };
  })
);
