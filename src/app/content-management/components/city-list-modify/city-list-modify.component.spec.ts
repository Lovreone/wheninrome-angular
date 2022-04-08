import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityListModifyComponent } from './city-list-modify.component';

describe('CityListModifyComponent', () => {
  let component: CityListModifyComponent;
  let fixture: ComponentFixture<CityListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
