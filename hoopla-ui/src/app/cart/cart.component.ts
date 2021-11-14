import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CartContentService } from 'src/app/cart-content.service';
import { ProductListService } from 'src/app/product-list.service';
import { PastDetailsService } from '../past-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  inputQty = [];
  inputPrice: number;
  totalPrice = 0;
  totalTax = 0;
  totalQty = 0;
  userId: any;
  cartData = [];
  cartProductDetails = [];
  successMessage = null;
  errorMessage = null;
  noOfProductsInCart = 0;
  totalAmount=0;
  
  // cartContent = this.cartService.productInserted;

  columnsToDisplay: string[] = [
    'product name',
    'quantity',
    'discounted price',
    'remove from cart',
  ];
  constructor(
    private prodService: ProductListService,
    public cartService: CartContentService,
    private pastDetails: PastDetailsService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  tempPrice: any = 1;
  // data: any;
  ngOnInit(): void {
    this.cartData = [];
    this.prodService.getUserID().subscribe(
      (user) => {
        this.userId = user.userId;
        // console.log(user)
        this.cartService.getAllCartProducts(this.userId).subscribe(
            ( data ) => {
                sessionStorage.setItem('noOfItemsInCart', data.length.toString());
                if (data.length > 0){
                  this.cartData = data;
                  this.noOfProductsInCart = data.length;
                  const productIdArr: string[] = [];
                  this.cartData.forEach( item => productIdArr.push(item.prodId));
                  this.getCartProductsDetails(productIdArr);
                }
            },
            (error) => (this.errorMessage = error.error.message)
          );
        },
        (error) => (this.errorMessage = error.error.message)
      );
  }

  getCartProductsDetails(productIdArr){
    // this.prodService.getSingleProduct
    let i = 0;
    productIdArr.forEach( product => {
      // console.log(product)
      i++;
      this.prodService.getSingleProduct(product).subscribe(
       ( data ) => {
         this.cartProductDetails.push(data);
         if (i === productIdArr.length){
            this.calculateTotalAmount();
          }
        },
       ( error ) => { this.errorMessage = error.error.message; }
      );
    });
  }

  calculateTotalAmount(){
    this.totalPrice = 0;
    this.totalTax = 0;
    this.totalQty=0;
    this.totalAmount=0;
    this.cartData.forEach( item => {
      
      this.cartProductDetails.forEach( product => {
        if (product._id === item.prodId ){
          let cartObj = product._id;
          // console.log('Cart Obj is:');
          // console.log(cartObj);
          this.totalPrice= this.totalPrice+(item.qty*(product.price*(1-product.pSeller.pDiscount)));
          this.totalQty=this.totalQty+item.qty;
          this.totalTax=this.totalPrice*0.17;
          this.totalAmount=this.totalPrice+this.totalTax
          item.discountedPrice=item.qty*(product.price*(1-product.pSeller.pDiscount))
        }
      } );
    });
  }

  deleteProduct(userId, prodId) {
    // this.cartService.deleteProduct(userId,prodId)
    if (this.cartData.length === 1){
      this.cartService.raiseEvent('reset');
    }
    if (confirm('Are you sure you want to delete this item!')) {
      // console.log('clicked', userId, prodId);
      this.cartData.forEach( i => {
        if (i.prodId == prodId){
          for (let j = 0; j < i.qty; j++){
            this.cartService.raiseEvent('dec');
          }
        }
      });
      this.cartService.deleteProduct(userId, prodId).subscribe(
        success => {
          this.successMessage = success.message;
          this.snackBar.open(this.successMessage, 'Deleted', {
            duration: 1000
          });
        },
        error => this.errorMessage = error.error.message
      );
      this.cartData = this.cartData.filter( i => i.prodId != prodId);
      this.calculateTotalAmount();
    }
  }

  checkout() {
    this.cartService.raiseEvent('reset');
    this.pastDetails.purchaseOrders(this.cartData).subscribe(() => {
      this.cartService.clearCart(this.userId).subscribe(() => {
        this.cartData = [];
        this.cartService.productInserted = false;
        this.cartService.badgeCount = 0;
      });
    });
  }

  decreaseQuantity(qty,index){
    this.cartData[index].qty-=1;
    if(this.cartData[index].qty==0){
      this.deleteProduct(this.cartData[index].userId,this.cartData[index].prodId)
    }
    this.calculateTotalAmount();
  }

  increaseQuantity(qty,index){
    this.cartData[index].qty+=1;
    this.calculateTotalAmount();
  }
}
