import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceEventDetailComponent } from './advance-event-detail.component';

describe('AdvanceEventDetailComponent', () => {
  let component: AdvanceEventDetailComponent;
  let fixture: ComponentFixture<AdvanceEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
