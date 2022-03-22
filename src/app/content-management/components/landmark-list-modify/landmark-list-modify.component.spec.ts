import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkListModifyComponent } from './landmark-list-modify.component';

describe('LandmarkListModifyComponent', () => {
  let component: LandmarkListModifyComponent;
  let fixture: ComponentFixture<LandmarkListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
