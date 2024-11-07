import { Component, computed, inject } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { IMoviesResponse } from '../../../core/models/movies.model';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { environment } from '../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CardModule, ImageModule, FormsModule, PaginatorModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  private moviesService = inject(MoviesService);

  imagePath = environment.imagePath;

  moviesResponse = computed<IMoviesResponse | null>(
    () => this.moviesService.getMoviesResponse
  );
}
