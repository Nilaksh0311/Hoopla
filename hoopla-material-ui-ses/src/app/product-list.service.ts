import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { Cart } from './cart.model';
import { Product} from './dto/product';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }
 // productUrl:string="https://jsonplaceholder.typicode.com/photos?albumId=1";


 getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>('http://localhost:2000/products/getAllProducts');
    // t.subscribe(data => console.log(data));
    // //console.log("Hello Hello"+JSON.stringify(t.subscribe()));
    // return t;
  }
  getSingleProduct(id): Observable<Product>{
    return this.http.get<Product>('http://localhost:2000/products/product/' + id);
  }

  // sendToCart(user, pid, qty, price, pName){
  //   console.log(user.userId, pid, qty, price, pName)
  // }

  getUserID(): Observable<any>{
    return this.http.get<any>('http://localhost:1111/user/getUserID');
  }

  deleteProduct(productId){
    return this.http.delete('http://localhost:2000/products/delete/' + productId);
  }

  updateProduct(data){
    return this.http.post('http://localhost:2000/products/update', data);
  }

  addProduct(formData): Observable<any>{
    return this.http.post<any>('http://localhost:2000/products/add', formData);
  }

}
