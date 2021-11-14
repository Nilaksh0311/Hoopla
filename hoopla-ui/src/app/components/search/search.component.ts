import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/dto/product';
import { ProductListService } from 'src/app/product-list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(
    private service: ProductListService,
    private router: ActivatedRoute
  ) {}

  loading = true;
  products: Product[] = [];
  allProducts: Product[];
  private searchKey?: string;

  ngOnInit(): void {
    this.service.getAllProducts().subscribe((data) => {
      this.loading = false;
      this.allProducts = data;
      this.router.params.subscribe((data) => {
        this.filterBySearchKey(data.productName);
      });
    });
  }

  private filterBySearchKey(searchKey: string) {
    this.products = this.allProducts.filter((prod) =>
      prod.pName.toLowerCase().includes(searchKey.toLowerCase())
    );
  }
}
