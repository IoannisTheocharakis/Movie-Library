import { Component, inject, OnInit, signal } from '@angular/core';
import { CollectionsService } from '../../../core/services/collections.service';
import { ICollection } from '../../../core/models/collections.model';
import { RouterModule } from '@angular/router';
import { CollectionsListElementComponent } from '../collections-list-element/collections-list-element.component';

@Component({
  selector: 'app-collections-list',
  standalone: true,
  imports: [RouterModule, CollectionsListElementComponent],
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.scss',
})
export class CollectionsListComponent implements OnInit {
  private collectionsService = inject(CollectionsService);
  collections = signal<ICollection[]>([]);
  ngOnInit(): void {
    const collections = this.collectionsService.getCollections();
    this.collections.set(collections);
  }
}
