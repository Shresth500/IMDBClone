export interface IActorParams {
  page: number;
  size: number;
  age: number;
  orderbyAge: '' | 'age' | '-age';
  name: string;
}

export interface IActorList {
  count: number;
  next: string | null;
  previous: string | null;
  results: IActorInfo[];
}

export interface IActorInfo {
  id: number;
  name: string;
  age: number;
  image: string | null;
  DateOfBirth: string;
  description: string;
}

export interface IActorDetails {
  actor: IActorInfo;
  movies: IActorsMovie[];
}

export interface IActorsMovie {
  id: number;
  watchlist: string;
  watchlist_image: string | null;
  actors: number;
}

export interface IActorState {
  actorList: IActorList | null;
  actorDetails: IActorDetails | null;
  error1: string;
  error2: string;
}
