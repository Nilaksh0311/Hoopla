import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UriService } from './uri.service';
import { GuardService } from './guard.service';
import { RegisterService } from './login/register.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ---------------angular-material--------------------
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCarousel,
  MatCarouselComponent,
  MatCarouselModule,
} from '@ngbmodule/material-carousel';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductListService } from './product-list.service';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CartComponent } from './cart/cart.component';
import { IsLoggedService } from './is-logged.service';
import { SellerComponent } from './seller/seller.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SellerRegisterComponent } from './seller-register/seller-register.component';
import { SellerpageComponent } from './sellerpage/sellerpage.component';
import { SellerServiceService } from './seller/seller-service.service';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    ProductDetailsComponent,
    CardListComponent,
    SellerComponent,
    OrdersComponent,
    LoaderComponent,
    SellerRegisterComponent,
    CartComponent,
    SellerComponent,
    SellerpageComponent,
    UpdateProductComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgMatSearchBarModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCarouselModule,
    MatSnackBarModule,
    MatTableModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    NgxMatFileInputModule,
  ],
  providers: [
    UriService,
    RegisterService,
    GuardService,
    ProductListService,
    IsLoggedService,
    SellerServiceService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
