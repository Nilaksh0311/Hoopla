import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { IsLoggedService } from '../is-logged.service';
import { ProductListService } from '../product-list.service';

import { SellerpageComponent } from './sellerpage.component';

describe('SellerpageComponent', () => {
  let component: SellerpageComponent;
  let fixture: ComponentFixture<SellerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, MatSnackBarModule ],
      declarations: [ SellerpageComponent ],
      providers: [ IsLoggedService, ProductListService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
