import { Component, input } from '@angular/core';
import { IMovie } from '../../../core/models/movies.model';
import { CardModule } from 'primeng/card';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-movie-element',
  standalone: true,
  imports: [CardModule],
  templateUrl: './movie-element.component.html',
  styleUrl: './movie-element.component.scss',
})
export class MovieElementComponent {
  movie = input.required<IMovie>();
  imagePath = environment.imagePath;
}
