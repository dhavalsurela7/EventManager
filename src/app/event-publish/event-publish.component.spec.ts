import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPublishComponent } from './event-publish.component';

describe('EventPublishComponent', () => {
  let component: EventPublishComponent;
  let fixture: ComponentFixture<EventPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventPublishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
