import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesManageComponent } from './cities-manage.component';

describe('CitiesManageComponent', () => {
  let component: CitiesManageComponent;
  let fixture: ComponentFixture<CitiesManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
