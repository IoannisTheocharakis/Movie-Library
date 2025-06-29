import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CollectionsService } from '../../../core/services/collections.service';

@Component({
  selector: 'app-create-collection',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.scss',
})
export class CreateCollectionComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private collectionsService = inject(CollectionsService);
  
  createCollectionForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  navigateBackToCollections() {
    this.router.navigate(['/collections']);
  }

  onSubmit() {
    this.collectionsService.setCollection(
      this.createCollectionForm.value.title!,
      this.createCollectionForm.value.description!
    );

    this.router.navigate(['./collections']);
  }
}
