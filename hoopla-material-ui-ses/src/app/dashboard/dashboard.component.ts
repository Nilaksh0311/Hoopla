import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../dto/product';
import { ProductListService } from '../product-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit{
  constructor(private ps: ProductListService , private cRef: ChangeDetectorRef) {}

  // prodToBeSearched: string;
  // categorySelected: string;
  products: Product[] = [];
  errorMessage?: string;
  slideShow = true;

  productShow = false;
  categories = ['Electronics', 'Shoes', 'Clothing', 'Furniture'];
  content: Product[] = [];

  ngOnInit() {
    // this.slideShow = true;
    // this.productShow = false;
    this.ps.getAllProducts().subscribe(
      (success) => {
        this.products = success;
      },
      (error) => console.log('Error' + error.error.message)
    );
  }


  ngAfterViewInit(): void {
    this.cRef.detectChanges();
  }

  viewProductByCategory(category: string) {
    this.slideShow = false;
    this.productShow = true;
    this.content = this.products.filter(
      (product) => product.pCategory === category
    );
  }
}
