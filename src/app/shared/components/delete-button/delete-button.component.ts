import { Component, inject, input, output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [ConfirmDialogModule, ToastModule, ButtonModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
})
export class DeleteButtonComponent {
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  confirmDialogTitle = input<string>('');
  confirmDialog = input<string>('');
  iconStyle = input<boolean>(false);
  removeFunction = output();

  onDeleteElement(event: Event) {
    event.stopPropagation();
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
        this.removeFunction.emit(undefined);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Collection deleted successfully!`,
        });
      },
    });
  }
}
