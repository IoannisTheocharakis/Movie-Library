import { Component,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RatingModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  value!: number;
  title = 'movie-library';

}
