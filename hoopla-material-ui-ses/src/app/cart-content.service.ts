import { Injectable, EventEmitter } from '@angular/core';
import { Cart } from './cart.model';
import { Product } from './dto/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartContentService {

  constructor(private http: HttpClient) {}
  cartData: any = [];
  cartQty = 0;
  // cartConnent: Cart = {
  //   total: 0,
  //   data: [{
  //     product: this.cartData,
  //     inCart: this.cartQty
  //   }]
  // };
  // badgeCount = this.cartData.length + 1;
  badgeCount = 0;
  receivedBadgeCount = new EventEmitter<any>();

  productInserted = false;

  newCartData: any = [];
  raiseEvent(count) {
    // this.badgeCount = count;
    if (count == 'inc'){
      this.increaseBadgeCount();
    } else if (count == 'dec'){
      this.decreaseBadgeCount();
    } else if (count == 'reset'){
      this.resetBadgeCount();
    }
    this.receivedBadgeCount.emit(this.badgeCount);
  }

  getBadgeCount() {
    return this.badgeCount;
  }
  increaseBadgeCount(){
    this.badgeCount = this.badgeCount + 1;
  }
  decreaseBadgeCount(){
    if (this.badgeCount <= 1){
      this.badgeCount = 0;
    } else{
      this.badgeCount = this.badgeCount - 1;
    }
  }
  resetBadgeCount(){
    this.badgeCount = 0;
  }


  // addToCart(data){
  //   this.cartConnent = {
  //     total: data.length+1,
  //     data:[{
  //       product: data,
  //       inCart: 1
  //     }]
  //   }
  // }

  sendToCart(user, pid, qty, price, pName): Observable<any> {
    // console.log(user.userId, pid, qty, price, pName)
    this.productInserted = true;
    const body = {
      userId: user.userId,
      prodId: pid,
      prodName: pName,
      qty,
      price,
    };
    console.log(body);
    return this.http.post<any>('http://localhost:2001/cart', body);
  }

  getAllCartProducts(userid): Observable<any> {
    return this.http.get<any>('http://localhost:2001/dashboard/' + userid);
  }

  deleteProduct(userId, prodId): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:2001/delete/${userId}/${prodId}`
    );
  }

  clearCart(userId): Observable<any> {
    return this.http.delete<any>(`http://localhost:2001/deleteCart/${userId}`);
  }
}
