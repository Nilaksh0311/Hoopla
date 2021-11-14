import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoggedService } from '../is-logged.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private log: IsLoggedService,
    private signUpService: SignupService
  ) {}



  errorMessage: string;
  successMessage: string;
  signUpForm: any;
  dateOfBirth: String;
  dobSignal: Boolean = false;

  username = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-z]+[A-z0-9_]/),
  ]);
  dob = new FormControl('', [
    Validators.required,
  ]);
  number = new FormControl('', [
    Validators.required
  ]);
  emailId = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z0-9][a-z_0-9_.]+@[a-z]{4,9}.[a-z]{2,3}/),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/),
  ]);


  display(){
    const newDate = new Date();
    if (new Date(this.dob.value) > newDate){
      this.dobSignal = true;
    }
    else{
      this.dobSignal = false;
    }
  }



  ngOnInit(): void {}

  getErrorMessage(field: string) {
    if (field === 'emailId') {
      return this.emailId.hasError('required')
        ? 'You must enter a value'
        : this.emailId.hasError('pattern')
        ? 'Not a valid email'
        : '';
    } else if (field === 'password') {
      return this.password.hasError('required')
        ? 'You must enter a value'
        : this.password.hasError('pattern')
        ? 'Not a valid password'
        : '';
    } else if (field === 'dob') {
      return this.dob.hasError('required')
      ? 'Mandatory field'
      : this.dob.hasError('dobError')
      ? 'Enter a valid date'
      : '';
    } else if (field === 'number') {
      return this.number.hasError('required') ? 'Mandatory field' : '';
    } else if (field === 'username') {
      return this.username.hasError('required')
        ? 'Mandatory field'
        : this.username.hasError('pattern')
        ? 'Not a valid Username'
        : '';
    }
  }
  signup() {
    this.signUpForm = {
      name: this.username.value,
      email: this.emailId.value,
      password: this.password.value,
      dateOfBirth: this.dob.value,
      phoneNo: this.number.value,
    };

    // console.log(this.signUpForm);
    this.signUpService.register(this.signUpForm).subscribe(
      (response) => {
        sessionStorage.setItem('uEmail', this.emailId.value);
        sessionStorage.setItem('uName', this.username.value);
        this.log.isLogged = true;
        this.router.navigate(['/dashboard']);
        console.log(response)
      },
      (error) => {
        console.log(error);
        throw new Error(error)
      }
    );
  }
}
