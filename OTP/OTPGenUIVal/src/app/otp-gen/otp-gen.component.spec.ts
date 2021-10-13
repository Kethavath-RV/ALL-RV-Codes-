import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpGenComponent } from './otp-gen.component';

describe('OtpGenComponent', () => {
  let component: OtpGenComponent;
  let fixture: ComponentFixture<OtpGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
