import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourManagePageComponent } from './tour-manage-page.component';

describe('TourManagePageComponent', () => {
  let component: TourManagePageComponent;
  let fixture: ComponentFixture<TourManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourManagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
