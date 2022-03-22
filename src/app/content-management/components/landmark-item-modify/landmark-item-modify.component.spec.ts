import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkItemModifyComponent } from './landmark-item-modify.component';

describe('LandmarkItemModifyComponent', () => {
  let component: LandmarkItemModifyComponent;
  let fixture: ComponentFixture<LandmarkItemModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkItemModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkItemModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
