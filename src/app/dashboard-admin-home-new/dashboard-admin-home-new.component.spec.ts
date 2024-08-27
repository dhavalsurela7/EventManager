import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminHomeNewComponent } from './dashboard-admin-home-new.component';

describe('DashboardAdminHomeNewComponent', () => {
  let component: DashboardAdminHomeNewComponent;
  let fixture: ComponentFixture<DashboardAdminHomeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAdminHomeNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAdminHomeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
