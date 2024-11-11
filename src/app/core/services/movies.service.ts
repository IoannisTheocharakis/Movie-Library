import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  IMovieDetails,
  IMovieRate,
  IMoviesResponse,
} from '../models/movies.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesResponseSignal = signal<IMoviesResponse | null>(null);
  ratingList = signal<IMovieRate[]>([]);
  moviesQuerySignal = signal<string>('');
  http = inject(HttpClient);
  loading = signal<boolean>(false);

  getMoviesList(query: string = this.moviesQuerySignal(), page: number = 1) {
    const url = `https://api.themoviedb.org/3/search/movie`;
    let params = new HttpParams()
      .set('api_key', environment.apiKey || '')
      .set('query', query ?? this.moviesQuerySignal())
      .set('page', page.toString());
    this.loading.set(true);
    return this.http.get<IMoviesResponse>(url, { params }).subscribe({
      next: (movies) => {
        if (query) {
          this.moviesQuerySignal.set(query);
        }
        this.moviesResponseSignal.set(movies);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Failed to fetch movies', error);
      },
    });
  }

  fetchMovieDetails(movieID: number | string) {
    const url = `https://api.themoviedb.org/3/movie/${movieID}`;
    let params = new HttpParams().set('api_key', environment.apiKey || '');
    return this.http.get<IMovieDetails>(url, { params })
  }

  setMovieRating(sessionID: string, movieID: number | string, rating: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieID}/rating`;
    let params = new HttpParams()
      .set('api_key', environment.apiKey || '')
      .set('guest_session_id', sessionID);
    return this.http.post<IMovieDetails>(url, { value: rating }, { params });
  }

  private setRatingListToSignal() {
    const ratingList: IMovieRate[] = JSON.parse(
      localStorage.getItem('ratingList') || '[]'
    );
    this.ratingList.set(ratingList);
    return ratingList;
  }

  private getRatingList() {
    return this.setRatingListToSignal();
  }

  setRatingToLocalStorage(movieID: number, rate: number) {
    const movieRate = { movieID, rate };
    const ratingList = this.getRatingList();
    ratingList.push(movieRate);
    localStorage.setItem('ratingList', JSON.stringify(ratingList));
    this.setRatingListToSignal();
  }

  getMovieRating(movieID: number | undefined) {
    if (movieID) {
      const ratingList: IMovieRate[] = this.getRatingList();
      const movieRate = ratingList.find((data) => data.movieID === movieID);
      return movieRate ?? null;
    }
    return null;
  }

  get getMoviesResponse() {
    return this.moviesResponseSignal();
  }
  get getMovieDetails() {
    return this.moviesResponseSignal();
  }
}
