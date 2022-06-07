import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursManagePageComponent } from './tours-manage-page.component';

describe('ToursManagePageComponent', () => {
  let component: ToursManagePageComponent;
  let fixture: ComponentFixture<ToursManagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursManagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
