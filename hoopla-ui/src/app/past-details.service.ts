import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './dto/order';

@Injectable({
  providedIn: 'root',
})
export class PastDetailsService {
  constructor(private http: HttpClient) {}

  private orderBasePath = 'http://localhost:1000/orders';
  private email = sessionStorage.getItem('uEmail');

  getOrderList() {
    return this.http.get<Order[]>(
      `${this.orderBasePath}/getAllOrders/${this.email}`
    );
  }

  purchaseOrders(cartItems: Order[]) {
    const requestBody = { orderArray: cartItems, userEmail: this.email };
    return this.http.post<void>(
      `${this.orderBasePath}/purchaseOrders`,
      requestBody
    );
  }
}
