import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PastDetailsService } from './past-details.service';

describe('PastDetailsService', () => {
  let service: PastDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PastDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
