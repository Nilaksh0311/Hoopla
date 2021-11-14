import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { User } from './login/user';
import { RegisterService } from './login/register.service';
import { IsLoggedService } from './is-logged.service';
import { CartContentService } from './cart-content.service';
import { ProductListService } from 'src/app/product-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hoopla';
  loggedUser: User;
  hide = true;
  show = false;
  display = false;
  // isLogged=this.log.isLogged;
  searchKey = '';
  badgeCount: number;
  userId: any;
  errorMessage = null;

  constructor(
    private router: Router,
    public registerService: RegisterService,
    public log: IsLoggedService,
    private productListService: ProductListService,
    private cartService: CartContentService ) {
      this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    this.cartService.receivedBadgeCount.subscribe( (p) => {
      this.badgeCount = p;
      // console.log(p)
    });
    // this.badgeCount = this.cartService.getBadgeCount()
  }

  logOut() {
    sessionStorage.clear();
    this.hide = true;
    this.show = false;
    this.loggedUser = null;
    this.log.isLogged = false;
    this.log.isSeller = false;
    this.router.navigate(['/']);
  }

  ngDoCheck(): void {
    this.loggedUser = new User();
    this.loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
    this.loggedUser.uCart = JSON.parse(sessionStorage.getItem('uCart'));
    this.loggedUser.uProfile.uName = sessionStorage.getItem('uName');
  }

  hideContent() {
    sessionStorage.clear();
    this.hide = false;
    this.show = true;
  }

  showContent() {
    this.hide = true;
    this.show = false;
    // this.isLogged = true;
  }

  searchProducts(searchKey: string) {
    this.router.navigate(['/', 'search', searchKey]);
  }

  authenticateBySession() {
    const loggedEmail = sessionStorage.getItem('uEmail');
    if (loggedEmail) {
      this.registerService.getUserDetail(loggedEmail).subscribe(
        (res) => {
          this.loggedUser = res;
        },
        (err) => {
          this.loggedUser = null;
        }
      );
    } else {
      this.loggedUser = null;
    }
  }

  sellerComp() {
    this.router.navigate(['/sellerlogin']);
  }

  sellerPage() {
    this.router.navigate(['/sellerpage']);
  }
}
