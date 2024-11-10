import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CollectionsService } from '../../../core/services/collections.service';

@Component({
  selector: 'app-edit-collection',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss',
})
export class EditCollectionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private collectionsService = inject(CollectionsService);

  id = this.route.snapshot.paramMap.get('id') || '';

  saveCollectionForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const collection = this.collectionsService.getCollection(this.id);
    if (collection) {
      this.saveCollectionForm.patchValue({
        title: collection.title,
        description: collection.description,
      });
    } else {
      this.router.navigate(['./collections']);
    }
  }

  navigateBackToCollections() {
    this.router.navigate(['/collections']);
  }

  onSubmit() {
    this.collectionsService.updateCollection(
      this.id,
      this.saveCollectionForm.value.title!,
      this.saveCollectionForm.value.description!
    );
    this.router.navigate(['./collections']);
  }
}
