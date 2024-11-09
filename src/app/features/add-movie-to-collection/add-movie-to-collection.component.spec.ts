import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieToCollectionComponent } from './add-movie-to-collection.component';

describe('AddMovieToCollectionComponent', () => {
  let component: AddMovieToCollectionComponent;
  let fixture: ComponentFixture<AddMovieToCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMovieToCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMovieToCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
