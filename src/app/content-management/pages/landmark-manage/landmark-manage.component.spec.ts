import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkManageComponent } from './landmark-manage.component';

describe('LandmarkManageComponent', () => {
  let component: LandmarkManageComponent;
  let fixture: ComponentFixture<LandmarkManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
