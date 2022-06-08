import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourViewPageComponent } from './tour-view-page.component';

describe('TourViewPageComponent', () => {
  let component: TourViewPageComponent;
  let fixture: ComponentFixture<TourViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
