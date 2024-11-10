import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CollectionsService } from '../../../core/services/collections.service';
import { ICollection } from '../../../core/models/collections.model';
import { CardModule } from 'primeng/card';
import { MovieElementComponent } from '../../../shared/components/movie-element/movie-element.component';
import { IPageEvent } from '../../../core/models/primeng.model';
import { PaginatorModule } from 'primeng/paginator';
import { DeleteButtonComponent } from '../../../shared/components/delete-button/delete-button.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IMovieDetails } from '../../../core/models/movies.model';

@Component({
  selector: 'app-collection-details',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    MovieElementComponent,
    RouterModule,
    PaginatorModule,
    DeleteButtonComponent,
    ConfirmDialogModule,
    ToastModule,
    OverlayPanelModule,
    ReactiveFormsModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './collection-details.component.html',
  styleUrl: './collection-details.component.scss',
})
export class CollectionDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private collectionsService = inject(CollectionsService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private fb = inject(FormBuilder);

  overlayPanel = viewChild<OverlayPanel>('transfer');
  transferMovieForm = this.fb.group({
    collectionID: new FormControl('', [Validators.required]),
  });
  collections = computed(() => this.collectionsService.collections());
  collection = signal<ICollection | null>(null);
  otherCollections = computed(() =>
    this.collections().filter((data) => data.id !== this.collection()?.id)
  );

  id = this.route.snapshot.paramMap.get('id') || '';
  currentPage = signal(0);
  rowsPerPage = signal(10);

  paginatedMovies = computed(() => {
    const startIndex = this.currentPage() * this.rowsPerPage();
    return this.collection()!.movies.slice(
      startIndex,
      startIndex + this.rowsPerPage()
    );
  });

  navigateBackToCollections() {
    this.router.navigate(['/collections']);
  }

  ngOnInit(): void {
    const collection = this.collectionsService.getCollection(this.id);
    this.collection.set(collection);
  }

  onRemoveMovieFromCollection(event: Event, id: string | number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to remove movie from collection?',
      header: 'Remove movie from collection',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      acceptLabel: 'Remove',
      rejectLabel: 'Reject',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.collectionsService.removeMovieFromCollection(
          this.collection()!.id,
          id
        );
        const collection = this.collectionsService.getCollection(this.id);
        this.collection.set(collection);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Movie removed successfully!`,
        });
      },
    });
  }

  onTransferMovieToOtherCollection(event: Event, id: string | number) {}

  onRemoveCollection() {
    this.collectionsService.removeCollection(this.collection()!.id);
    this.router.navigate(['collections']);
  }

  onPageChange(event: IPageEvent) {
    this.currentPage.set(event.page!);
    this.rowsPerPage.set(event.rows!);
  }

  onSubmitTransfer(movie: IMovieDetails) {
    this.collectionsService.transferMoveToOtherCollection(
      this.collection()!.id,
      this.transferMovieForm.value.collectionID!,
      movie
    );
    this.overlayPanel()!.hide();
    const collection = this.collectionsService.getCollection(this.id);
    this.collection.set(collection);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Movie transfered successfully!`,
    });
  }
}
