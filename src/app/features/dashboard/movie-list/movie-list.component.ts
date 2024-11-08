import { Component, computed, inject } from '@angular/core';
import { MoviesService } from '../../../core/services/movies.service';
import { IMoviesResponse } from '../../../core/models/movies.model';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { environment } from '../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CardModule,
    ImageModule,
    FormsModule,
    PaginatorModule,
    DialogModule,
    RouterModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  private moviesService = inject(MoviesService);

  imagePath = environment.imagePath;

  currentPage = 0;
  itemsPerPage = 20;

  moviesResponse = computed<IMoviesResponse | null>(
    () => this.moviesService.getMoviesResponse
  );

  fetchMovies() {
    this.moviesService.fetchMovies(undefined, this.currentPage + 1);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.fetchMovies();
  }

  openDialog(movieID: number) {}
}
