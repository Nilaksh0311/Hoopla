import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';

import {User, Credentials, Data, Address, Cart, Profile} from './user';
import {UriService} from '../uri.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  hooplaWebServiceUrl: string;
  constructor(private http: HttpClient, private uriService: UriService){
    this.hooplaWebServiceUrl = this.uriService.buildHooplaWebServiceUri();
  }

  register(userDetails: Credentials): Observable<User>{
    return this.http.post(this.hooplaWebServiceUrl + 'user/register' , userDetails) as Observable<User>;
  }
}
