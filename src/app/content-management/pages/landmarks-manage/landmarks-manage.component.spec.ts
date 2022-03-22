import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarksManageComponent } from './landmarks-manage.component';

describe('LandmarksManageComponent', () => {
  let component: LandmarksManageComponent;
  let fixture: ComponentFixture<LandmarksManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarksManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarksManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
