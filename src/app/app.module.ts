/*Modules*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { MomentModule } from 'ngx-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

/*Components*/
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SearchComponent } from './views/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { basketReducer } from './reducers/basket.reducer';
import { AppInitService } from './services/app-init.service';

import localeTr from '@angular/common/locales/tr';
import { Product } from './models/product';
import { AuthInterceptor } from './services/token.interceptor';
import { ProfileComponent } from './views/profile/profile.component';
import { PaymentComponent } from './views/payment/payment.component';
registerLocaleData(localeTr);

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BottomNavComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    ProductListComponent,
    ProfileComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ basket: basketReducer }),
    MomentModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-full-width',
      }
    )
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'tr-TR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
