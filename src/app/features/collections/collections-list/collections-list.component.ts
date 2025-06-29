import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CollectionsService } from '../../../core/services/collections.service';
import { CollectionsListElementComponent } from '../collections-list-element/collections-list-element.component';
import { PaginatorModule } from 'primeng/paginator';
import { IPageEvent } from '../../../core/models/primeng.model';

@Component({
  selector: 'app-collections-list',
  standalone: true,
  imports: [CollectionsListElementComponent, PaginatorModule],
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.scss',
})
export class CollectionsListComponent implements OnInit {
  private collectionsService = inject(CollectionsService);
  collections = computed(() => this.collectionsService.collections());
  currentPage = signal(0);
  rowsPerPage = signal(10);

  paginatedCollections = computed(() => {
    const startIndex = this.currentPage() * this.rowsPerPage();
    return this.collections().slice(
      startIndex,
      startIndex + this.rowsPerPage()
    );
  });

  ngOnInit(): void {
    this.collectionsService.getCollections();
  }

  onPageChange(event: IPageEvent) {
    this.currentPage.set(event.page!);
    this.rowsPerPage.set(event.rows!);
  }
}
