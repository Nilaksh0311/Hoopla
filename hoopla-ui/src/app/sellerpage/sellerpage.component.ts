import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IsLoggedService } from '../is-logged.service';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'app-sellerpage',
  templateUrl: './sellerpage.component.html',
  styleUrls: ['./sellerpage.component.css']
})
export class SellerpageComponent implements OnInit {

  products = [];
  errorMessage: string = null;
  successMessage: string = null;
  s_id = 'Ethnic@Seller';
  displayedColumns = ['Product Name', 'Price', 'Discount', 'Quantity', 'Delete', 'Edit'];
  constructor(public log: IsLoggedService, public service: ProductListService, private snackBar: MatSnackBar,
              private router: Router) {
      this.service.getAllProducts().subscribe(
        (data) => this.products = data.filter((obj) => obj.pSeller.s_Id == this.log.seller_email),
        (err) => this.errorMessage = err.error.message
      );
    }
 
  ngOnInit(): void {

    this.service.getAllProducts().subscribe(
      (data) => this.products = data.filter((obj) => obj.pSeller.s_Id == this.log.seller_email),
      (err) => this.errorMessage = err.error.message
    );
  }




  delete(elm: any) {
    console.log(elm);
    this.service.deleteProduct(elm._id).subscribe(
      (data) => this.snackBar.open(data['message'], 'close', { duration : 1000 })
    );
    this.products = this.products.filter(i => i !== elm);
  }

  update(ele: any){
    this.router.navigate(['updateproduct', JSON.stringify(ele)]);

  }

}
