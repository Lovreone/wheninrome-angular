import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityManageComponent } from './city-manage.component';

describe('CityManageComponent', () => {
  let component: CityManageComponent;
  let fixture: ComponentFixture<CityManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
