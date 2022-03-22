import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPortalComponent } from './footer-portal.component';

describe('FooterPortalComponent', () => {
  let component: FooterPortalComponent;
  let fixture: ComponentFixture<FooterPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
