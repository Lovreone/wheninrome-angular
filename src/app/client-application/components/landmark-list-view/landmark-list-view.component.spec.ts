import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkListViewComponent } from './landmark-list-view.component';

describe('LandmarkListViewComponent', () => {
  let component: LandmarkListViewComponent;
  let fixture: ComponentFixture<LandmarkListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
