import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IMovie,
  IMovieDetails,
  IMovieInfo,
  IParams,
} from '../../Common/Model/Movies';

@Injectable({
  providedIn: 'root',
})
export class MovieServiceService {
  private apiUrl = `http://127.0.0.1:8000/movies`;
  constructor(private http: HttpClient) {}

  getAllMovieList(queryparams: IParams): Observable<IMovie> {
    const params = new HttpParams()
      .set('page', queryparams.page)
      .set('title', queryparams.title)
      .set('platform_name', queryparams.platform_name)
      .set('ordering', queryparams.order)
      .set('size', queryparams.size);
    return this.http.get<IMovie>(`${this.apiUrl}/list/`, { params });
  }

  getMovieById(id: number): Observable<IMovieDetails> {
    // const params = new HttpParams().set('id', id);
    return this.http.get<IMovieDetails>(`${this.apiUrl}/${id}/`);
  }
}
