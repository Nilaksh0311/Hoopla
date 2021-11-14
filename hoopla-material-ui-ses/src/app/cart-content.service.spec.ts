// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CartContentService } from './cart-content.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CartContentService', () => {
  let service: CartContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [CartContentService]
    });
    service = TestBed.inject(CartContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not show cart', () => {
    expect(service.productInserted).toMatch('false');
  });

  it('should show badge count as zero', () => {
    expect(service.badgeCount).toMatch('0');
  });

  it('should increase badge count by one', () => {
    service.raiseEvent('inc');
    expect(service.badgeCount).toMatch('1');
  });

  it('should increase badge count by three', () => {
    for (let i = 0; i < 3; i++){
      service.raiseEvent('inc');
    }
    expect(service.badgeCount).toMatch('3');
  });

  it('should decrease badge count by one', () => {
    for (let i = 0; i < 3; i++){
      service.raiseEvent('inc');
    }
    service.raiseEvent('dec');
    expect(service.badgeCount).toMatch('2');
  });

  it('should reset badge count to zero', () => {
    for (let i = 0; i < 3; i++){
      service.raiseEvent('inc');
    }
    service.raiseEvent('reset');
    expect(service.badgeCount).toMatch('0');
  });

});
