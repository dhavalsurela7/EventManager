import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityAddComponent } from './activity-add.component';

describe('ActivityAddComponent', () => {
  let component: ActivityAddComponent;
  let fixture: ComponentFixture<ActivityAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
