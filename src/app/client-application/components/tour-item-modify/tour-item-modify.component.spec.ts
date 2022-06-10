import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourItemModifyComponent } from './tour-item-modify.component';

describe('TourItemModifyComponent', () => {
  let component: TourItemModifyComponent;
  let fixture: ComponentFixture<TourItemModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourItemModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourItemModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
