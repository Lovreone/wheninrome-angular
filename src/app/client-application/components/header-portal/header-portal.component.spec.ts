import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPortalComponent } from './header-portal.component';

describe('HeaderPortalComponent', () => {
  let component: HeaderPortalComponent;
  let fixture: ComponentFixture<HeaderPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
