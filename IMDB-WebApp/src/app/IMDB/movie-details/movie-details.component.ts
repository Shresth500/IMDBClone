import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMovieDetails, IMovieState } from '../../Common/Model/Movies';
import * as MovieListAction from '../../Common/StateManagement/IMDB/Movies/Movies.actions';
import * as MovieListSelector from '../../Common/StateManagement/IMDB/Movies/Movies.selector';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {
  IAddReview,
  IMovieReviewState,
  IReviewDetail,
} from '../../Common/Model/Reviews';
import * as ReviewAction from '../../Common/StateManagement/IMDB/Reviews/Reviews.action';
import * as ReviewSelector from '../../Common/StateManagement/IMDB/Reviews/Reviews.selector';

@Component({
  selector: 'app-movie-details',
  imports: [AsyncPipe, CommonModule, DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  reviews = [
    {
      id: 1,
      review_user: 'User 1',
      rating: 4,
      created: '06/25/2025',
      description: 'Good Web Series',
    },
    {
      id: 2,
      review_user: 'User 2',
      rating: 5,
      created: '06/25/2025',
      description: 'Good Web Series',
    },
    {
      id: 3,
      review_user: 'User 3',
      rating: 4,
      created: '06/25/2025',
      description: 'Good Web Series',
    },
  ];

  movieReviewList$!: Observable<IReviewDetail[] | null>;

  reviewForm!: FormGroup;
  movieId!: number;
  movieDetails$!: Observable<IMovieDetails | null>;
  starPercentage: string = '0%';

  constructor(
    private movieStore: Store<IMovieState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private reviewStore: Store<IMovieReviewState>
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.movieId = id;
    this.reviewForm = this.fb.group({
      rating: [5, Validators.required],
      description: ['', Validators.required],
    });
    this.movieStore.dispatch(MovieListAction.appendMovieDetail({ id }));

    this.movieDetails$ = this.movieStore.select(
      MovieListSelector.getMovieDetails
    );

    this.movieDetails$.subscribe((movie) => {
      if (movie?.movie?.avg_rating != null) {
        const rating = Math.max(0, Math.min(movie.movie.avg_rating, 5));
        this.starPercentage = `${(rating / 5) * 100}%`;
      }
    });
    this.reviewStore.dispatch(ReviewAction.reviewActions({ id: id }));
    this.movieReviewList$ = this.reviewStore.select(
      ReviewSelector.getMovieReview
    );
  }

  isAuthenticated() {
    return this.cookieService.check('refresh');
  }

  submitReview() {
    const review: IAddReview = { ...this.reviewForm.value };
    this.reviewStore.dispatch(
      ReviewAction.addReviewAction({ movieReview: review, id: this.movieId })
    );
    this.reviewForm.reset();
  }
}
