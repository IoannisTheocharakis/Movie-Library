import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { MovieSearchFormComponent } from './movie-search-form/movie-search-form.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { AddMovieToCollectionComponent } from '../add-movie-to-collection/add-movie-to-collection.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HeroSectionComponent,
    MovieSearchFormComponent,
    MoviesListComponent,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: 'movie/:id', component: MovieDetailsComponent },
          {
            path: 'add-movie-to-collection/:id',
            component: AddMovieToCollectionComponent,
          },
        ],
      },
    ]),
  ],
})
export class DashboardModule {}
