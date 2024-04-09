import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPriceComponent } from './activity-price.component';

describe('ActivityPriceComponent', () => {
  let component: ActivityPriceComponent;
  let fixture: ComponentFixture<ActivityPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
