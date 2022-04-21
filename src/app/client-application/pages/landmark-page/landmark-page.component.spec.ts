import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkPageComponent } from './landmark-page.component';

describe('LandmarkPageComponent', () => {
  let component: LandmarkPageComponent;
  let fixture: ComponentFixture<LandmarkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
