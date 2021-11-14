import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoggedService } from '../is-logged.service';
import { SellerServiceService } from '../seller/seller-service.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  registerForm: FormGroup;

  constructor(public builder: FormBuilder, public service: SellerServiceService, public router: Router, public log: IsLoggedService) { }

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9][a-z_0-9_.]+@[a-z]{4,9}.[a-z]{2,3}/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-z][A-z ]*[A-z]$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[1-9]{1}[0-9]{9}$/)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9,18}$/)]],
      tan: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/)]],
      gstNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/)]],
    });
  }
  register(){
    this.service.register(this.registerForm.value).subscribe(
      (data) => {this.successMessage = 'Successfully Registered!!';
                 this.log.isSeller = true;
                 this.log.seller_email = data['sEmail'];
                 this.router.navigate(['/dashboard']); },
      (err) => this.errorMessage = err.error.message
    );
  }
}
