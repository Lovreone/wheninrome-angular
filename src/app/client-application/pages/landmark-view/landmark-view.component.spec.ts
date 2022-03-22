import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkViewComponent } from './landmark-view.component';

describe('LandmarkViewComponent', () => {
  let component: LandmarkViewComponent;
  let fixture: ComponentFixture<LandmarkViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
