import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityItemModifyComponent } from './city-item-modify.component';

describe('CityItemModifyComponent', () => {
  let component: CityItemModifyComponent;
  let fixture: ComponentFixture<CityItemModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityItemModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityItemModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
