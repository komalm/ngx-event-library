import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollUsersComponent } from './enroll-users.component';

describe('EnrollUsersComponent', () => {
  let component: EnrollUsersComponent;
  let fixture: ComponentFixture<EnrollUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
