import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MoviesService } from '../../core/services/movies.service';
import { IMovieDetails } from '../../core/models/movies.model';
import { environment } from '../../../environments/environment.development';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CollectionsService } from '../../core/services/collections.service';
import { ICollection } from '../../core/models/collections.model';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-movie-to-collection',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    RouterModule,
    DropdownModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
  templateUrl: './add-movie-to-collection.component.html',
  styleUrl: './add-movie-to-collection.component.scss',
})
export class AddMovieToCollectionComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private collectionsService = inject(CollectionsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  addToCollectionForm = this.fb.group({
    collectionID: new FormControl('', [Validators.required]),
  });

  collections = signal<ICollection[]>([]);
  imagePath = environment.imagePath;
  displayDialog: boolean = false;
  id = this.route.snapshot.paramMap.get('id') || '';
  movie = signal<IMovieDetails | null>(null);

  ngOnInit() {
    this.displayDialog = true;
    const collections = this.collectionsService.getCollections();
    this.collections.set(collections);
    this.moviesService.getMovieDetails(this.id).subscribe({
      next: (movieDetails) => {
        this.movie.set(movieDetails);
      },
      error: (error) => console.error('Failed to fetch movie details', error),
    });
  }

  onSubmit() {
    this.collectionsService.setMovieToCollection(
      this.addToCollectionForm.value.collectionID!,
      this.movie()!
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Movie added to collection!`,
    });
  }

  onCloseDialog() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  navigateToCreateCollection() {
    this.router.navigate(['collections/create-collection']);
  }
}
