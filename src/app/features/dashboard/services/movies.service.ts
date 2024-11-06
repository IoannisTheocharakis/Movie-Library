import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMoviesResponse } from '../../../core/models/movies.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  http = inject(HttpClient);

  getMovies(query: string, page: number = 1) {
    const url = `https://api.themoviedb.org/3/search/movie`;
    console.log(query, page);
    let params = new HttpParams()
      .set('api_key', environment.apiKey || '')
      .set('query', query)
      .set('page', page.toString());

    return this.http.get<IMoviesResponse>(url, { params });
  }
}
