import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RatingModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private sessionService = inject(SessionService);
  value!: number;
  title = 'movie-library';

  ngOnInit(): void {
    if (!this.sessionService.sessionSignal()) {
      this.sessionService.getNewSession();
    }
  }
}
