import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarksViewComponent } from './landmarks-view.component';

describe('LandmarksViewComponent', () => {
  let component: LandmarksViewComponent;
  let fixture: ComponentFixture<LandmarksViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarksViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
