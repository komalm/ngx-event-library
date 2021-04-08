import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLibraryComponent } from './event-library.component';

describe('EventModuleComponent', () => {
  let component: EventLibraryComponent;
  let fixture: ComponentFixture<EventLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
