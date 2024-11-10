import { Component, inject, input } from '@angular/core';
import { ICollection } from '../../../core/models/collections.model';
import { CardModule } from 'primeng/card';
import { environment } from '../../../../environments/environment.development';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CollectionsService } from '../../../core/services/collections.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-collections-list-element',
  standalone: true,
  imports: [
    RouterModule,
    CardModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './collections-list-element.component.html',
  styleUrl: './collections-list-element.component.scss',
})
export class CollectionsListElementComponent {
  private collectionsService = inject(CollectionsService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  collection = input.required<ICollection>();
  imagePath = environment.imagePath;

  onRemoveCollection(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        'Are you sure you want to delete this collection? Deleting it will permanently remove all saved movies within this collection. This action cannot be undone.',
      header: 'Delete Collection',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      acceptLabel: 'Delete',
      rejectLabel: 'Reject',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.collectionsService.removeCollection(this.collection().id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Collection deleted successfully!`,
        });
      },
    });
  }
}
