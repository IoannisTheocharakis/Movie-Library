import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { MovieSearchFormComponent } from './movie-search-form/movie-search-form.component';
import { MovieListComponent } from './movie-list/movie-list.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HeroSectionComponent,
    MovieSearchFormComponent,
    MovieListComponent,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
})
export class DashboardModule {}
