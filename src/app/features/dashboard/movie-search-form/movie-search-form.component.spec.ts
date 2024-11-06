import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchFormComponent } from './movie-search-form.component';

describe('MovieSearchFormComponent', () => {
  let component: MovieSearchFormComponent;
  let fixture: ComponentFixture<MovieSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
