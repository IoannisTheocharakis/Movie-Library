import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MoviesService } from '../../core/services/movies.service';
import { environment } from '../../../environments/environment.development';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CollectionsService } from '../../core/services/collections.service';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MovieElementComponent } from '../../shared/components/movie-element/movie-element.component';
import { IMovieDetails } from '../../core/models/movies.model';
import { catchError, EMPTY } from 'rxjs';

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
    MovieElementComponent,
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

  collections = computed(() => this.collectionsService.collections());
  imagePath = environment.imagePath;
  displayDialog: boolean = false;
  id = this.route.snapshot.paramMap.get('id') || '';
  movie = signal<IMovieDetails | null>(null);

  ngOnInit() {
    this.moviesService
      .fetchMovieDetails(this.id)
      .pipe(
        catchError((error) => {
          this.movie.set(null);
          console.error('Failed to fetch movie details', error);
          this.router.navigate(['']);
          throw EMPTY;
        })
      )
      .subscribe((movieDetails) => {
        this.movie.set(movieDetails);
      });
    this.displayDialog = true;
    this.collectionsService.getCollections();
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
