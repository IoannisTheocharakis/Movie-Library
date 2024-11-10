import { Component, computed, inject } from '@angular/core';
import { MoviesService } from '../../../core/services/movies.service';
import { IMoviesResponse } from '../../../core/models/movies.model';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { MovieElementComponent } from '../../../shared/components/movie-element/movie-element.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

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
    ButtonModule,
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
})
export class MoviesListComponent {
  private moviesService = inject(MoviesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  query = computed(() => this.moviesService.moviesQuerySignal());
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

  onOpenDialog(id: number) {
    this.router.navigate(['add-movie-to-collection', id], {
      relativeTo: this.route,
    });
  }
}
