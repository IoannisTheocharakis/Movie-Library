import {
  Component,
  inject,
  Signal,
  signal,
  effect,
  computed,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-movie-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './movie-search-form.component.html',
  styleUrl: './movie-search-form.component.scss',
})
export class MovieSearchFormComponent {
  private fb = inject(FormBuilder);
  private moviesService = inject(MoviesService);

  searchForm = this.fb.group({
    query: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });

  isFormValid = signal(this.searchForm.valid);

  constructor() {}

  onChangeInput(event: Event) {
    console.log("hello")
    this.isFormValid.set(this.searchForm.valid);
  }

  onSearch() {
    if (this.isFormValid()) {
      const query = this.searchForm.controls.query.value!;
      this.moviesService.getMovies(query).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error fetching movies:', error);
        },
      });
    }
  }
}
