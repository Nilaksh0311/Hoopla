import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {

  constructor() { }
  isLogged: Boolean = false;
  isSeller: Boolean = false;
  seller_email: string = null;
}
