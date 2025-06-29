import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { signal } from '@angular/core';
import { HERO_SECTION_IMAGES } from '../../../core/public-variables';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private intervalId: any;

  images = HERO_SECTION_IMAGES;
  currentIndex = 0;
  currentImage = signal(this.images[this.currentIndex]);
  animationClass = signal('zoomin');

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.changeImage();
    }, 7000);
  }

  ngOnDestroy() {
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
    }, 100); // Delay animation
  }
}
