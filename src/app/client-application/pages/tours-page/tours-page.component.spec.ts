import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursPageComponent } from './tours-page.component';

describe('ToursPageComponent', () => {
  let component: ToursPageComponent;
  let fixture: ComponentFixture<ToursPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
