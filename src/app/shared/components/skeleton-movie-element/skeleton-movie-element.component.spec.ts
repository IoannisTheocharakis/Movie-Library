import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonMovieElementComponent } from './skeleton-movie-element.component';

describe('SkeletonMovieElementComponent', () => {
  let component: SkeletonMovieElementComponent;
  let fixture: ComponentFixture<SkeletonMovieElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonMovieElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonMovieElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
