import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IActorDetails,
  IActorList,
  IActorParams,
} from '../../Common/Model/Actor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private apiUrl = `http://127.0.0.1:8000/movies/actors/`;
  constructor(private http: HttpClient) {}

  getAllActors(params: IActorParams): Observable<IActorList> {
    const queryparams = new HttpParams()
      .set('age', params.age)
      .set('ordering', params.orderbyAge)
      .set('page', params.page)
      .set('size', params.size)
      .set('name', params.name);
    return this.http.get<IActorList>(`${this.apiUrl}`, {
      params: queryparams,
      headers: { skip: 'true' },
    });
  }

  getActorDetails(id: number): Observable<IActorDetails> {
    return this.http.get<IActorDetails>(`${this.apiUrl}` + id, {
      headers: { skip: 'true' },
    });
  }
}
