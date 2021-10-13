import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpValComponent } from './otp-val.component';

describe('OtpValComponent', () => {
  let component: OtpValComponent;
  let fixture: ComponentFixture<OtpValComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpValComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
