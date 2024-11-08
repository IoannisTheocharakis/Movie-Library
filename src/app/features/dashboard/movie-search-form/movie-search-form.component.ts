import {
  Component,
  inject,
  Signal,
  signal,
  effect,
  computed,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesService } from '../../../core/services/movies.service';
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
export class MovieSearchFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private moviesService = inject(MoviesService);

  searchForm = this.fb.group({
    query: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z0-9]+$'),
    ]),
  });

  ngOnInit(): void {
    this.moviesService.getMoviesList('a', 1);
  }

  onSearch() {
    if (this.searchForm.valid) {
      const query = this.searchForm.controls.query.value!;
      this.moviesService.getMoviesList(query);
    }
  }
}
