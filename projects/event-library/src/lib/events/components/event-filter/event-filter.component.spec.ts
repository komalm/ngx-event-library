import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFilterComponent } from './event-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('EventFilterComponent', () => {
  let component: EventFilterComponent;
  let fixture: ComponentFixture<EventFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFilterComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
