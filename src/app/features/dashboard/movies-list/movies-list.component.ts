import { Component, computed, inject } from '@angular/core';
import { MoviesService } from '../../../core/services/movies.service';
import { IMoviesResponse } from '../../../core/models/movies.model';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { MovieElementComponent } from '../movie-element/movie-element.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CardModule,
    ImageModule,
    FormsModule,
    PaginatorModule,
    DialogModule,
    RouterModule,
    MovieElementComponent,
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  private moviesService = inject(MoviesService);

  currentPage = 0;
  itemsPerPage = 20;

  moviesResponse = computed<IMoviesResponse | null>(
    () => this.moviesService.getMoviesResponse
  );

  fetchMovies() {
    this.moviesService.getMoviesList(undefined, this.currentPage + 1);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.fetchMovies();
  }

  openDialog(movieID: number) {}
}
