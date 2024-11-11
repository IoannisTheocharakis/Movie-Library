import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { IMovieDetails } from '../../core/models/movies.model';
import { MoviesService } from '../../core/services/movies.service';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SessionService } from '../../core/services/session.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [DialogModule, RatingModule, FormsModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private sessionService = inject(SessionService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = this.route.snapshot.paramMap.get('id') || '';
  imagePath = environment.imagePath;
  displayDialog: boolean = false;
  movie = signal<IMovieDetails | null>(null);
  ratingValue = 0;

  ngOnInit() {
    this.moviesService
      .fetchMovieDetails(this.id)
      .pipe(
        catchError((error) => {
          this.movie.set(null);
          this.moviesService.loading.set(false);
          console.error('Failed to fetch movie details', error);
          this.router.navigate(['']);
          throw EMPTY;
        })
      )
      .subscribe((movieDetails) => {
        this.movie.set(movieDetails);
        this.moviesService.loading.set(false);
        const movieRating = this.moviesService.getMovieRating(this.movie()!.id);
        this.ratingValue = movieRating ? movieRating.rate : 0;
      });

    this.displayDialog = true;
  }

  onRateMovie() {
    this.moviesService
      .setMovieRating(
        this.sessionService.sessionSignal()!.guest_session_id,
        this.id,
        this.ratingValue
      )
      .subscribe({
        next: () => {
          this.moviesService.setRatingToLocalStorage(
            this.movie()!.id,
            this.ratingValue
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You rated the movie successfully!',
          });
        },
        error: (error) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong.',
          }),
      });
  }

  onCloseDialog() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
