import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemModifyComponent } from './user-item-modify.component';

describe('UserItemModifyComponent', () => {
  let component: UserItemModifyComponent;
  let fixture: ComponentFixture<UserItemModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserItemModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
