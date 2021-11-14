import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoggedService } from '../is-logged.service';
import { Data } from '../login/user';
import { SellerServiceService } from './seller-service.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: SellerServiceService,
              private router: Router, public log: IsLoggedService) {

  }
  errorMessage: string;
  successMessage: string;
  loginForm: any;
  // toggle:Boolean=false;

  email = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9][a-z_0-9_.]+@[a-z]{4,9}.[a-z]{2,3}/)]);
  password = new FormControl('', [Validators.required, Validators.pattern(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)]);

  temp: any;

  register() {
    this.router.navigate(['/sellerregister']);
  }


  getErrorMessage(field: string) {
    if (field === 'email') {
      return this.email.hasError('required') ? 'Email is mandatory' :
        this.email.hasError('pattern') ? 'Not a valid email' :
          '';
    } else if (field === 'password') {
      return this.password.hasError('required') ? 'Password is mandatory' :
        this.password.hasError('pattern') ? 'Not a valid password' :
          '';
    }
  }


  ngOnInit() {

  }
  login() {
    this.loginForm = {
      email: this.email.value,
      password: this.password.value
    };
    this.service.login(this.loginForm).subscribe(
      (response) => {
        // sessionStorage.setItem('sEmail', response['sEmail']);
        this.log.isSeller = true;
        const res = response['data'];
        this.log.seller_email = res.sEmail;
        this.router.navigate(['/dashboard']);
      },
      (errorResponse) => {
        this.errorMessage = errorResponse.error.message;
        alert(this.errorMessage);
        this.router.navigate(['/sellerlogin']);
        sessionStorage.clear();
      }
    );
  }

}
