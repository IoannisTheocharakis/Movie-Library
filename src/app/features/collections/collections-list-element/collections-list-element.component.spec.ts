import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsListElementComponent } from './collections-list-element.component';

describe('CollectionsListElementComponent', () => {
  let component: CollectionsListElementComponent;
  let fixture: ComponentFixture<CollectionsListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsListElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
