import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListModifyComponent } from './user-list-modify.component';

describe('UserListModifyComponent', () => {
  let component: UserListModifyComponent;
  let fixture: ComponentFixture<UserListModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
