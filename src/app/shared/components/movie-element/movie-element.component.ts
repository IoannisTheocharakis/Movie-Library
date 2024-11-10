import { Component, input } from '@angular/core';
import { IMovie, IMovieDetails } from '../../../core/models/movies.model';
import { environment } from '../../../../environments/environment.development';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-element',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  templateUrl: './movie-element.component.html',
  styleUrl: './movie-element.component.scss',
})
export class MovieElementComponent {
  movie = input.required<IMovie | IMovieDetails>();

  imagePath = environment.imagePath;
}
