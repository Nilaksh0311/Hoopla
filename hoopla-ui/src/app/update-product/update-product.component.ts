import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  successMessage: string = null;
  errorMessage: string = null;
  updateForm: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: ProductListService, private router: Router,
              private snackBar: MatSnackBar) { }
  product: any;
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.product = JSON.parse(params.product);
    });

    this.updateForm = this.fb.group({
      pname: {value: this.product.pName, disabled: true},
      price: parseInt(this.product.price),
      quantity: parseInt(this.product.pSeller.pQuantity),
      discount: this.product.pSeller.pDiscount * 100
    });

  }

  update(){
    this.updateForm.value.productId = this.product._id;
    this.service.updateProduct(this.updateForm.value).subscribe(
      (data) => {this.snackBar.open(data['message'], 'close', { duration : 1500 });
                 this.router.navigate(['/sellerpage']); },
      (err) => this.errorMessage = err.error.message
    );
  }

}
