import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFomComponent } from './user-fom.component';

describe('UserFomComponent', () => {
  let component: UserFomComponent;
  let fixture: ComponentFixture<UserFomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
