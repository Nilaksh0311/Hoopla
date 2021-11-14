import { Component, Input } from '@angular/core';
import { Product } from 'src/app/dto/product';

@Component({
  selector: 'card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent {
  constructor() {}

  @Input() products: Product[] = [];
}
