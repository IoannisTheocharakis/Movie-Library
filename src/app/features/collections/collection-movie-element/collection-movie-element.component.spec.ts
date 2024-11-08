import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionMovieElementComponent } from './collection-movie-element.component';

describe('CollectionMovieElementComponent', () => {
  let component: CollectionMovieElementComponent;
  let fixture: ComponentFixture<CollectionMovieElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionMovieElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionMovieElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
