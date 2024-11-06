import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { signal } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private intervalId: any;
  
  images = [
    'images/hero-section/movies1.jpg',
    'images/hero-section/movies2.jpg',
    'images/hero-section/movies3.jpg',
  ];
  currentIndex = 0;
  currentImage = signal(this.images[this.currentIndex]);
  animationClass = signal('zoomin');
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only run the interval in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.changeImage();
      }, 7000);
    }
  }

  ngOnDestroy() {
    // Clear interval
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  changeImage() {
    this.animationClass.set('fadeout');

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage.set(this.images[this.currentIndex]);
      this.animationClass.set('zoomin');
    }, 100); // Delay matches animation-duration in CSS
  }
}
