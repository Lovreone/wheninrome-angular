import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkItemViewComponent } from './landmark-item-view.component';

describe('LandmarkItemViewComponent', () => {
  let component: LandmarkItemViewComponent;
  let fixture: ComponentFixture<LandmarkItemViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkItemViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
