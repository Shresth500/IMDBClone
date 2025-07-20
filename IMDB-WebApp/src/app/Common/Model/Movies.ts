export interface IMovie {
  count: number;
  next: string | null;
  previous: string | null;
  results: IMovieInfo[];
}

export interface IMovieInfo {
  id: number;
  platform: string;
  image: string;
  title: string;
  storyLine: string;
  active: boolean;
  created: string;
  avg_rating: number;
  number_of_rating: number;
}

export interface IMovieDetails {
  movie: IMovieInfo;
  starcast: IStarCast[];
}

export interface IStarCast {
  id: number;
  actors: string;
  actors_image: string | null;
  watchlist: number;
}

export interface IMovieState {
  movieList: IMovie | null;
  movieDetails: IMovieDetails | null;
  errorMovieList: string;
  errorMovieDetails: string;
}

export interface IParams {
  order: '-avg_rating' | '' | 'avg_rating';
  page: number | 1;
  title: string;
  platform_name: string;
  searchBy: boolean;
  size: number | 5;
}
