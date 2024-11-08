import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsComponent } from './collections.component';
import { Router, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [
    CommonModule,
    ButtonModule,

    RouterModule.forChild([
      {
        path: '',
        component: CollectionsComponent,
        children: [{ path: 'movie/:id', component: MovieDetailsComponent }],
      },
      {
        path: 'create-collection',
        component: CreateCollectionComponent,
      },
    ]),
  ],
})
export class CollectionsModule {}
