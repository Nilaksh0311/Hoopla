import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SellerServiceService } from './seller-service.service';

describe('SellerServiceService', () => {
  let service: SellerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SellerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
