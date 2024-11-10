import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-movie-element',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './skeleton-movie-element.component.html',
  styleUrl: './skeleton-movie-element.component.scss',
})
export class SkeletonMovieElementComponent {}
