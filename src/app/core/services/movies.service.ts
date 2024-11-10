import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IMovie, IMovieDetails, IMoviesResponse } from '../models/movies.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesResponseSignal = signal<IMoviesResponse | null>(null);
  moviesQuerySignal = signal<string>('');

  http = inject(HttpClient);

  getMoviesList(query: string = this.moviesQuerySignal(), page: number = 1) {
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

  getMovieDetails(movieID: number | string) {
    const url = `https://api.themoviedb.org/3/movie/${movieID}`;
    let params = new HttpParams().set('api_key', environment.apiKey || '');

    return this.http.get<IMovieDetails>(url, { params });
  }

  setMovieRating(sessionID: string, movieID: number | string, rating: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieID}/rating`;
    let params = new HttpParams()
      .set('api_key', environment.apiKey || '')
      .set('guest_session_id', sessionID);
    return this.http.post<IMovieDetails>(url, { value: rating }, { params });
  }

  get getMoviesResponse() {
    return this.moviesResponseSignal();
  }
}
