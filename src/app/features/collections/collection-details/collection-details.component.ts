import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CollectionsService } from '../../../core/services/collections.service';
import { ICollection } from '../../../core/models/collections.model';
import { CardModule } from 'primeng/card';
import { MovieElementComponent } from '../../../shared/components/movie-element/movie-element.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-collection-details',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    MovieElementComponent,
    ToastModule,
    RouterModule,
  ],
  providers: [MessageService],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss',
})
export class CollectionDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private collectionsService = inject(CollectionsService);
  private messageService = inject(MessageService);

  collection = signal<ICollection | null>(null);
  id = this.route.snapshot.paramMap.get('id') || '';
  navigateBackToCollections() {
    this.router.navigate(['/collections']);
  }

  ngOnInit(): void {
    const collection = this.collectionsService.getCollection(this.id);
    this.collection.set(collection);
  }

  onRemoveMovieFromCollection(id: string | number) {
    this.collectionsService.removeMovieFromCollection(
      this.collection()!.id,
      id
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Movie removed successfully!`,
    });
    const collection = this.collectionsService.getCollection(this.id);
    this.collection.set(collection);
  }
}
