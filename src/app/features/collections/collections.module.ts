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
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

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
      },
      {
        path: 'create-collection',
        component: CreateCollectionComponent,
      },
      {
        path: 'edit/:id',
        component: EditCollectionComponent,
      },
      {
        path: ':id',
        component: CollectionDetailsComponent,
        children: [{ path: 'movie/:id', component: MovieDetailsComponent }],
      },
    ]),
  ],
  providers: [MessageService],
})
export class CollectionsModule {}
