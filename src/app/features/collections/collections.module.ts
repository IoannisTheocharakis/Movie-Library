import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsComponent } from './collections.component';
import { RouterModule } from '@angular/router';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { ButtonModule } from 'primeng/button';
import { CollectionsListComponent } from './collections-list/collections-list.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CollectionsListComponent,
    ToastModule,
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
      {
        path: ':id',
        component: CollectionDetailsComponent,
      },
    ]),
  ],
  providers: [MessageService],
})
export class CollectionsModule {}
