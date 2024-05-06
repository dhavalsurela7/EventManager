import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUserHomeComponent } from './dashboard-user-home.component';

describe('DashboardUserHomeComponent', () => {
  let component: DashboardUserHomeComponent;
  let fixture: ComponentFixture<DashboardUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardUserHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
