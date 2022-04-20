import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsMenuComponent } from './breadcrumbs-menu.component';

describe('BreadcrumbsMenuComponent', () => {
  let component: BreadcrumbsMenuComponent;
  let fixture: ComponentFixture<BreadcrumbsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
