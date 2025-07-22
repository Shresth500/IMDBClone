export interface IReviewDetail {
  id: number;
  review_user: string;
  rating: number;
  description: string;
  active: boolean;
  created: string;
  update: string;
}

export interface IAddReview {
  rating: number;
  description: string;
  active: boolean;
}

export interface IMovieReviewState {
  movieReviewList: IReviewDetail[];
  error1: string;
  error2: string;
}
