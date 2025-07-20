import { Component, Injectable, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import {
  IActorInfo,
  IActorList,
  IActorParams,
  IActorState,
} from '../../Common/Model/Actor';
import { Observable, Subject } from 'rxjs';
import * as ActorsAction from '../../Common/StateManagement/IMDB/Actors/Actors.actions';
import * as ActorsSelectors from '../../Common/StateManagement/IMDB/Actors/Actors.selector';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

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
  selector: 'app-actors-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    AsyncPipe,
  ],
  templateUrl: './actors-list.component.html',
  styleUrl: './actors-list.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})
export class ActorsListComponent implements OnInit {
  cards = [
    {
      title: 'Shiba Inu',
      subtitle: 'Dog Breed',
      image: '...',
      description: '...',
    },
    {
      title: 'Golden Retriever',
      subtitle: 'Dog Breed',
      image: '...',
      description: '...',
    },
    {
      title: 'Poodle',
      subtitle: 'Dog Breed',
      image: '...',
      description: '...',
    },
    {
      title: 'Beagle',
      subtitle: 'Dog Breed',
      image: '...',
      description: '...',
    },
    {
      title: 'Labrador',
      subtitle: 'Dog Breed',
      image: '...',
      description: '...',
    },
    { title: 'Husky', subtitle: 'Dog Breed', image: '...', description: '...' },
    // etc.
  ];

  actors$!: Observable<IActorState | null>;
  actorList$!: Observable<IActorInfo[] | undefined>;
  filterActorList$!: Observable<IActorInfo[] | undefined>;
  totalItem$!: Observable<number | undefined>;
  searchText: string = '';
  page: number = 0;
  size: number = 0;
  sortByRating: 'none' | 'asc' | 'desc' = 'none';
  age: string = '';
  constructor(
    private actorStore: Store<IActorState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateQueryParams();
    this.actorList$ = this.actorStore.select(ActorsSelectors.getActors);
    this.filterActorList$ = this.actorList$;
    this.totalItem$ = this.actorStore.select(ActorsSelectors.getCountOfActors);
  }

  updateQueryParams() {
    let orderingby: '' | 'age' | '-age' = '';
    this.route.queryParams.subscribe((params) => {
      if (params['order'] === 'asc') orderingby = 'age';
      else if (params['order'] === 'desc') orderingby = '-age';
    });
    console.log(orderingby);
    this.route.queryParams.subscribe((params) => {
      const queryparams: IActorParams = {
        page: +params['page'] || 1,
        size: +params['size'] || 5,
        orderbyAge: orderingby,
        age: params['age'] || '',
        name: params['name'] || '',
      };
      this.page = queryparams.page;
      this.size = queryparams.size;
      this.actorStore.dispatch(
        ActorsAction.appendActorListAction({ params: queryparams })
      );

      this.actorList$ = this.actorStore.select(ActorsSelectors.getActors);
      this.filterActorList$ = this.actorList$;
    });
  }

  updateQueryParamsInUrl() {
    const query: any = {
      page: this.page,
      size: this.size,
      order: this.sortByRating,
      age: this.age,
      name: this.searchText,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: query,
    });
  }

  onSearch() {
    this.updateQueryParamsInUrl();
  }
  clearSearch() {
    this.searchText = '';
    this.sortByRating = 'none';
    this.updateQueryParamsInUrl();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.updateQueryParamsInUrl();
  }

  ngOnInit(): void {}
  getShortDescription(text: string, wordLimit: number): string {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  onKnowMore(id: number) {
    this.router.navigateByUrl(`actorDetails/${id}`);
  }
}
