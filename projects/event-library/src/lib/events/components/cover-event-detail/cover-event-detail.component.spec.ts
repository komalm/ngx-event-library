import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverEventDetailComponent } from './cover-event-detail.component';

describe('CoverEventDetailComponent', () => {
  let component: CoverEventDetailComponent;
  let fixture: ComponentFixture<CoverEventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverEventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
