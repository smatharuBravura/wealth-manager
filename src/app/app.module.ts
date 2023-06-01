import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';






import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './services/http-request.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SharedMaterialModule } from '../app/shared/shared-material.module';
import { SharedModule } from '../app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { TransactionComponent } from './services/transaction/transaction.component';
import { HoldingComponent } from './holding/holding.component';
import { ProductsComponent } from './products/products.component';
// import { MaterialModule } from 'src/material.module';




@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    TransactionComponent,
    HoldingComponent,
    ProductsComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,FormsModule,
    ReactiveFormsModule,BrowserAnimationsModule,
    SharedModule],
  providers: 
  [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}