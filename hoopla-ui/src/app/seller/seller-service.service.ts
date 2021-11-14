import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {

  constructor(public http: HttpClient) { }
  login(loginForm){
    return this.http.post('http://localhost:2020/seller/login', loginForm);
  }

  register(registerForm){
    return this.http.post('http://localhost:2020/seller/register', registerForm);
  }
}
