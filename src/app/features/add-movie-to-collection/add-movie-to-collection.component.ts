import { Component, computed, inject, OnInit } from '@angular/core';
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
import { SkeletonMovieElementComponent } from '../../shared/components/skeleton-movie-element/skeleton-movie-element.component';

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
    SkeletonMovieElementComponent,
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

  loading = computed(() => this.moviesService.loading());
  addToCollectionForm = this.fb.group({
    collectionID: new FormControl('', [Validators.required]),
  });

  collections = computed(() => this.collectionsService.collections());
  imagePath = environment.imagePath;
  displayDialog: boolean = false;
  id = this.route.snapshot.paramMap.get('id') || '';
  movie = computed(() => this.moviesService.movieDetails());

  ngOnInit() {
    if (!this.movie() || this.movie()!.id !== +this.id) {
      this.moviesService.fetchMovieDetails(this.id);
    }
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
