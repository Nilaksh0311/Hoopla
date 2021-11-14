import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SellerComponent } from './seller/seller.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { SellerpageComponent } from './sellerpage/sellerpage.component';
// import { CartComponent } from './cart/cart.component';
import { CartComponent } from './cart/cart.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
// import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: SignupComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search/:productName', component: SearchComponent },
  { path: 'product-details/:productId', component: ProductDetailsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'sellerlogin', component: SellerComponent },
  { path: 'sellerregister', component: SellerRegisterComponent },
  { path: 'sellerpage', component: SellerpageComponent },
  { path: 'updateproduct/:product', component: UpdateProductComponent },
  { path: 'addProduct', component: AddProductComponent},
  {path: 'cartReload', redirectTo:'cart', pathMatch: 'full'}
  // {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
