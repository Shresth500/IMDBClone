import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import {
  IMovie,
  IMovieInfo,
  IMovieState,
  IParams,
} from '../../Common/Model/Movies';
import * as MovieListAction from '../../Common/StateManagement/IMDB/Movies/Movies.actions';
import * as MovieListSelector from '../../Common/StateManagement/IMDB/Movies/Movies.selector';
import { Observable, Subject } from 'rxjs';
import { MovieItemsComponent } from '../movie-items/movie-items.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }
}

@Component({
  selector: 'app-movie-list',
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    MovieItemsComponent,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    AsyncPipe,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class MovieListComponent implements OnInit {
  totalItem$: Observable<number | undefined>;
  page: number = 1;
  size: number = 5;
  movieListData$!: Observable<IMovie | null>;
  allMovies$!: Observable<IMovieInfo[] | undefined>;
  filteredMovies$!: Observable<IMovieInfo[] | undefined>;
  searchText = '';
  searchBy: 'title' | 'platform' = 'title';
  sortByRating: 'none' | 'asc' | 'desc' = 'none';

  constructor(
    private movieStore: Store<IMovieState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.totalItem$ = this.movieStore.select(MovieListSelector.getTotalCount);
    this.updatequeryParams();
    this.allMovies$ = this.movieStore.select(MovieListSelector.getAllMovieList);
  }

  updatequeryParams() {
    let orderingby: '' | 'avg_rating' | '-avg_rating' = '';
    this.route.queryParams.subscribe((params) => {
      if (params['order'] === 'asc') orderingby = 'avg_rating';
      else if (params['order'] === 'desc') orderingby = '-avg_rating';
    });
    this.route.queryParams.subscribe((params) => {
      const queryparams: IParams = {
        page: +params['page'] || 1,
        size: +params['size'] || 5,
        order: orderingby,
        title: params['title'] || '',
        platform_name: params['platform_name'] || '',
        searchBy: params['searchBy'] === 'false' ? false : true,
      };
      this.page = queryparams.page;
      this.size = queryparams.size;

      this.searchText = queryparams.searchBy
        ? queryparams.title
        : queryparams.platform_name;
      this.searchBy = queryparams.searchBy ? 'title' : 'platform';
      this.sortByRating =
        queryparams.order === 'avg_rating'
          ? 'asc'
          : queryparams.order === '-avg_rating'
          ? 'desc'
          : 'none';
      this.movieStore.dispatch(
        MovieListAction.appendMovieListAction({ queryParams: queryparams })
      );

      this.movieListData$ = this.movieStore.select(
        MovieListSelector.getMovieList
      );
      this.filteredMovies$ = this.movieStore.select(
        MovieListSelector.getAllMovieList
      );
    });
  }

  updateQueryParamsInUrl() {
    const query: any = {
      page: this.page,
      size: this.size,
      order: this.sortByRating,
      searchBy: this.searchBy,
    };

    if (this.searchBy === 'title') {
      query.title = this.searchText;
    } else {
      query.platform_name = this.searchText;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query,
    });
  }

  ngOnInit(): void {}
  onSearch() {
    this.updateQueryParamsInUrl();
  }
  clearSearch() {
    this.searchText = '';
    this.searchBy = 'title';
    this.sortByRating = 'none';
    this.updateQueryParamsInUrl();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.updateQueryParamsInUrl();
  }
}
