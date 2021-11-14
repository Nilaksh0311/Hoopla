import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductListService } from 'src/app/product-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IsLoggedService } from '../is-logged.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  successMessage = '';
  errorMessage = '';
  selectedCategory = '';
  categories: string[] = [];
  productForm: FormGroup;
  sellerEmail = this.log.seller_email;

  constructor(
      private fb: FormBuilder,
      private prodService: ProductListService,
      private snackBar: MatSnackBar,
      private router: Router,
      private log: IsLoggedService) { }

  ngOnInit(): void {
    this.categories = ['Electronics', 'Shoes', 'Furniture', 'Clothing'];
    this.productForm = this.fb.group({
      sellerId: [{value: this.log.seller_email, disabled: true}, [Validators.required, Validators.pattern(/^[a-z0-9][a-z_0-9_.]+@[a-z]{4,9}.[a-z]{2,3}/)]],
      productName: ['', [Validators.required]],
      productDesc: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, this.validNumber]],
      discount: ['', [Validators.required, this.validNumber]],
      quantity: ['', [Validators.required, this.validNumber]],
      imageUrl: ['']
    });
  }

  validNumber(data: FormControl){
    if ( data.value < 0 ){
      return { validNumberError: { message: 'Please enter positive number'}};
    } else{
      return null;
    }
  }

  addProduct(){
    this.successMessage = this.errorMessage = null;
    this.productForm.value.discount = this.productForm.value.discount / 100;
    this.productForm.value.imageUrl = this.productForm.value.imageUrl.name;
    this.productForm.value.sellerId = this.log.seller_email;
    this.prodService.addProduct(this.productForm.value).subscribe(
      responce => {
        this.successMessage = responce.message;
        this.snackBar.open(this.successMessage, 'Inserted', {
          duration: 1000});
      },
      error => this.errorMessage = error.error.message
    );
    this.router.navigate(['sellerpage']);
  }




}
