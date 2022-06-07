import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourListModifyComponent } from './tour-list-modify.component';

describe('TourListModifyComponent', () => {
  let component: TourListModifyComponent;
  let fixture: ComponentFixture<TourListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
