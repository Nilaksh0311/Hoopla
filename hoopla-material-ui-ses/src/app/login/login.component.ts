import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { IsLoggedService } from '../is-logged.service';
import { RegisterService } from './register.service';
// import {Accordion} from 'primeng/accordion'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    public log: IsLoggedService
  ) {}
  errorMessage: string;
  successMessage: string;
  loginForm: any;
  loading?: boolean;

  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-z0-9][a-z_0-9_.]+@[a-z]{3,9}.[a-z]{2,3}/),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/),
  ]);

  register() {
    this.router.navigate(['/register']);
  }

  getErrorMessage(field: string) {
    if (field === 'email') {
      return this.email.hasError('required')
        ? 'You must enter a value'
        : this.email.hasError('pattern')
        ? 'Not a valid email'
        : '';
    } else if (field === 'password') {
      return this.password.hasError('required')
        ? 'You must enter a value'
        : this.password.hasError('pattern')
        ? 'Not a valid password'
        : '';
    }
  }

  ngOnInit() {}

  login() {
    this.loading = true;
    this.loginForm = {
      email: this.email.value,
      password: this.password.value,
    };
    this.registerService.login(this.loginForm).subscribe(
      (response) => {
        this.loading = false;
        sessionStorage.setItem('uEmail', response.data[0].uCredentials.uEmail);
        sessionStorage.setItem('uName', response.data[0]['uProfile'].uName);
        this.log.isLogged = true;
        this.router.navigate(['/dashboard']);
      },
      (errorResponse) => {
        this.loading = false;
        this.errorMessage = errorResponse.error.message;
        // alert(this.errorMessage);
        this.router.navigate(['/login']);
        sessionStorage.clear();
      }
    );
  }
}
