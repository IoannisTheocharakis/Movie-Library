import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IMovie } from '../../core/models/movies.model';
import { MoviesService } from '../../core/services/movies.service';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);

  id = this.route.snapshot.paramMap.get('id') || '';

  displayDialog: boolean = false;
  movie = signal<IMovie | null>(null);

  private moviesService = inject(MoviesService);

  ngOnInit() {
    this.displayDialog = true;
    this.moviesService.getMovieDetails(this.id).subscribe({
      next: (movieDetails) => {
        this.movie.set(movieDetails);
      },
      error: (error) => console.error('Failed to fetch movie details', error),
    });
  }

  onCloseDialog() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
