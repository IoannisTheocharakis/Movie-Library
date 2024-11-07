import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IMoviesResponse } from '../../../core/models/movies.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesResponseSignal = signal<IMoviesResponse | null>(null);
  private moviesQuerySignal = signal<string>('');

  http = inject(HttpClient);

  fetchMovies(query: string = this.moviesQuerySignal(), page: number = 1) {
    const url = `https://api.themoviedb.org/3/search/movie`;
    let params = new HttpParams()
      .set('api_key', environment.apiKey || '')
      .set('query', query ?? this.moviesQuerySignal())
      .set('page', page.toString());

    return this.http.get<IMoviesResponse>(url, { params }).subscribe({
      next: (movies) => {
        if (query) {
          this.moviesQuerySignal.set(query);
        }
        this.moviesResponseSignal.set(movies);
      },
      error: (error) => console.error('Failed to fetch movies', error),
    });
  }

  get getMoviesResponse() {
    return this.moviesResponseSignal();
  }
}
