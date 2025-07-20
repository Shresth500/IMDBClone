import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IActorState } from '../../../Model/Actor';

const getActorList = createFeatureSelector<IActorState>('actorListData');

export const getActors = createSelector(
  getActorList,
  (state) => state.actorList?.results
);

export const getCountOfActors = createSelector(
  getActorList,
  (state) => state.actorList?.count
);

export const getActorDetails = createSelector(
  getActorList,
  (state) => state.actorDetails
);
