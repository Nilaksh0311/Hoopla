// import { TestBed } from '@angular/core/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ProductListService } from './product-list.service';

describe('ProductListService', () => {
  let service: ProductListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TIAS 1 - product-listService should be injected', inject(
    [ProductListService],
    (service: ProductListService) => {
      expect(service instanceof ProductListService).toBe(true);
    }
  ));

  it('TIAS 2 - HttpClient must be injected in ProductListService', inject(
    [HttpClient],
    (http: HttpClient) => {
      expect(http).not.toBeNull('HttpClient should be provided');
      const service = new ProductListService(http);
      expect(service instanceof ProductListService).toBe(
        true,
        'New service should be ok'
      );
    }
  ));
});
