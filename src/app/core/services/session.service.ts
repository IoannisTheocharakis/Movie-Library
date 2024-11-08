import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ISession } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private http = inject(HttpClient);

  sessionSignal = signal<ISession | null>(null);

  getNewSession() {
    const url = `https://api.themoviedb.org/3/authentication/guest_session/new`;
    let params = new HttpParams().set('api_key', environment.apiKey || '');
    return this.http.get<ISession>(url, { params }).subscribe({
      next: (session) => {
        this.sessionSignal.set(session);
      },
      error: (error) => console.error('Failed to fetch movies', error),
    });
  }
}
