import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesViewComponent } from './cities-view.component';

describe('CitiesViewComponent', () => {
  let component: CitiesViewComponent;
  let fixture: ComponentFixture<CitiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
