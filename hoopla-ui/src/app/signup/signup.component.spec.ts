import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let Username: any;
  let usernameSpan: any;
  let dob: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Username field should have required error for "" value', () => {
    Username.setValue('');
    Username.markAsDirty();
    fixture.detectChanges();
    expect(Username.errors.required).toBeTruthy();
  });

  it('Username field should not display any error for valid input', () => {
    Username.setValue('John Doe');
    Username.markAsDirty();
    fixture.detectChanges();
    usernameSpan = fixture.debugElement.nativeElement.querySelector(
      '#usernameError'
    );
    expect(usernameSpan).toBeFalsy();
    expect(Username.errors).not.toBeTruthy();
    expect(Username.valid).toBeTruthy();
  });

  it('Date of Birth field should have required error for "" value', () => {
    dob.setValue('');
    dob.markAsDirty();
    fixture.detectChanges();
    expect(Username.errors.required).toBeTruthy();
  });

  it('Username field should have pattern error for john doe value', () => {
    Username.setValue('john  doe');
    Username.markAsDirty();
    fixture.detectChanges();
    expect(Username.errors.pattern).toBeTruthy();
  });

  it('username field should have pattern error for john123 doe value', () => {
    Username.setValue('john123 doe');
    Username.markAsDirty();
    fixture.detectChanges();
    expect(Username.errors.pattern).toBeTruthy();
  });
});
