import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IActorDetails, IActorState } from '../../Common/Model/Actor';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as ActorsAction from '../../Common/StateManagement/IMDB/Actors/Actors.actions';
import * as ActorsSelector from '../../Common/StateManagement/IMDB/Actors/Actors.selector';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-actor-details',
  imports: [CommonModule, DatePipe, AsyncPipe],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.scss',
})
export class ActorDetailsComponent implements OnInit {
  actorDetails$!: Observable<IActorDetails | null>;

  constructor(
    private actorStore: Store<IActorState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.actorStore.dispatch(ActorsAction.getActorsDetailsAction({ id: id }));
    this.actorDetails$ = this.actorStore.select(ActorsSelector.getActorDetails);
  }
  ngOnInit(): void {}
}
