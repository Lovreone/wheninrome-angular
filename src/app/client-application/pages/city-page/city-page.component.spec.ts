import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPageComponent } from './city-page.component';

describe('CityPageComponent', () => {
  let component: CityPageComponent;
  let fixture: ComponentFixture<CityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
