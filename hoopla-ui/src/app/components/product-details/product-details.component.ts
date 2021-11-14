import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartContentService } from 'src/app/cart-content.service';
import { Product } from 'src/app/dto/product';
import { IsLoggedService } from 'src/app/is-logged.service';
import { ProductListService } from 'src/app/product-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  // badgeCount = this.service.cartData.length;

  constructor(
    private route: ActivatedRoute,
    private service: ProductListService,
    private log: IsLoggedService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartContentService
  ) {}
  details: Product;
  cartData: any = [];
  user: any;
  errorMessage = null;
  successMessage = null;

  discountedPrice: number;

  ngOnInit(): void {
    this.errorMessage = null;
    this.successMessage = null;
    this.route.params.subscribe((data) => {
      this.service.getAllProducts().subscribe(
        (products) => {
          this.details = products.filter(
            (product) => product._id === data.productId
          )[0];
        },
        (error) => (this.errorMessage = error.error.message)
      );
    });
  }
  priceCalculate(price: number, discount: number) {
    return price - price * discount;
  }
  discountCalculate(discount: number) {
    return 100 * discount;
  }

  addToCart(prod) {
    console.log('Hello');
    this.service.getUserID().subscribe(
      (u) => {
        this.user = u;
        this.service.getSingleProduct(prod._id).subscribe(
          (data) => {
            data.quantity = 1;
            this.discountedPrice =
              data.price - data.price * data.pSeller.pDiscount;
            this.cartService
              .sendToCart(
                this.user,
                data._id,
                data.quantity,
                this.discountedPrice,
                data.pName
              )
              .subscribe(
                (success) => (this.successMessage = success.message),
                (error) => (this.errorMessage = error.error.message)
              );
            this.cartData.push(data);
          },
          (error) => (this.errorMessage = 'Unable to add to cart')
        );
      },
      (error) => (this.errorMessage = error.error.message)
    );
    // }
    // console.log(this.cartData)
    this.addToLocalStorage(this.cartData, 1);
    // this.cartService.increaseBadgeCount();
    this.snackBar.open('Added to cart', 'Done', {
      duration: 1000,
    });
    this.cartService.raiseEvent('inc');
  }

  addToLocalStorage(data, qty) {
    this.cartService.cartData = data;

    console.log(this.cartService.cartData);
  }
}
