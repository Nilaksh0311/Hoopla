import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/dto/order';
import { PastDetailsService } from 'src/app/past-details.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private service: PastDetailsService) {}

  loading?: boolean;
  orders: Order[];

  ngOnInit(): void {
    this.loading = true;
    this.service.getOrderList().subscribe((data) => {
      this.orders = data;
      this.loading = false;
    });
  }
}
