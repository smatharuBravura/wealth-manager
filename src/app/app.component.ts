

import { ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SnowflakeService } from './services/snowflake.service';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment'
import { Buffer } from 'buffer';
import { BehaviorSubject,  Observable } from 'rxjs';
import { TransactionDataService } from './services/transaction-data.service';
//import { TransactionDataSource } from '../services/transaction/transaction.datasource';
import { Transactions } from './interface/transactons';
//import { MatTableDataSource } from '@angular/material/table';
import { Product } from './interface/product';
import { Holding } from './interface/holding';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})



export class AppComponent {

  private myAuthData = {
    clientId: environment.OAUTH_CLIENT,
    redirectUri: environment.redirectUri,
    responseType: "code",
    display: "popup",
    scope: "refresh_token"
  };
  
  private myTokenData = { 
    grant_type: "authorization_code",
    redirectUri: environment.redirectUri,
    responseType: "code",
  };
  
  private HTTP_TOKEN_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  dataSource: any;
  transactionsService: any;
  txnSource: any;
  cdr: any;


  constructor(private snowFlakeService: SnowflakeService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    if (window.location.href.indexOf('/?code=') > -1) {
      console.log('Code found');
      if (!sessionStorage.getItem('code')) {
        console.log('No storage yet');
        let reg = /(code=)(.*)/;
        let result = reg.exec(window.location.href) || "";
        if (result?.length > 2) {
          sessionStorage.setItem('code', result[2]);
          console.log('Code is --->>>', result[2]);
          this.onRequestToken();
        }
      }
    }
  }
    

  ngOnInit(): void {
    if (!sessionStorage.getItem('code')) {
      this.onMakeAuthRequest();

    }

    // this.codeForm.code = sessionStorage.getItem('code');
  }


  onLogout(): void {
    sessionStorage.removeItem('code');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  onRequestToken(): void {
    console.log('onRequestToken ');
    this.snowFlakeService.tokenRequest().subscribe(
      //(response) => console.log(response),
      //(error) => console.log(error),
      () => console.log('Done Getting Code')
    );
  }

  onMakeAuthRequest(): void {
    sessionStorage.removeItem('code');
    const url = environment.authUrl;

    let newParm = "client_id=" + encodeURIComponent(this.myAuthData.clientId)
      + "&" + "redirect_uri=" + encodeURIComponent(this.myAuthData.redirectUri)
      + "&" + "display=" + encodeURIComponent(this.myAuthData.display)
      + "&" + "scope=" + encodeURIComponent(this.myAuthData.scope)
      + "&" + "response_type=" + encodeURIComponent(this.myAuthData.responseType);

    let request = url + "?" + newParm;
    console.log('request - ', request)
    location.assign(request); // find alternative//
  }

  onRefreshToken(): void {
    console.log('onUseCode ');
    this.snowFlakeService.tokenRefresh().subscribe(
     // (response) => console.log(response),
      // (error) => console.log(error),
      () => console.log('Done Refreshing Token')
    );
  }

  onGetProducts(tenant: string): void {
    this.snowFlakeService.getTenantProducts(tenant.valueOf()).subscribe(
      // (response) => (response: any) => {
      //   console.log(response),
      //   alert(this.userlist);
      // },
      // (error) => console.log(error),
      () => console.log('Done Getting Products')
    );
  }
  userlist(userlist: any) {
    throw new Error('Method not implemented.');
  }

  onGetHoldingByInvestor(investor: string, tenant: string): void {
    this.snowFlakeService.getClientHolding(investor.valueOf(), tenant.valueOf()).subscribe(
      (response: Holding[]) => {
        console.log('Holdings ' + response),
          alert('Holdings ' + response.values);
      }, 
      // (error) => console.log(error),
      () => console.log('Done Getting Investor Holding')
    );
  }

  onGetProductDetailByReference(tenant: string, product: string): void {
    console.log(product);

    this.snowFlakeService.GetProductByReference(tenant.valueOf(), product.valueOf()).subscribe(
      (response: Product) => {
        console.log(response),
          alert(response.productId);
      },
      // (error) => console.log(error),
      () => console.log('Done Getting Product Detail by Name')
    );
  }

  onGetProductDetail(): void {
    this.snowFlakeService.GetProductByReference('Test1', 'BE').subscribe(
      (response:any) => {console.log(response),
          alert(this.userlist);
      },

      // (error) => console.log(error),
      () => console.log('Done Getting Product')
    );
  }

  async onGetInvestorTransactions(tenant: string, investor: string) {
    this.txnSource.loadGetClientTransactions(tenant.valueOf(), investor.valueOf())
      .subscribe((data: any) => {
        this.userlist = data;
        // this.dataSource = new MatTableDataSource(this.userlist);
    });

    this.cdr.detectChanges();
  }


  getTransactionRowColumns() {
    let columns = [
         'tenantKey',
      'assetTransactionKey',
      'accountKey',
      'productKey',
      'assetKey', 
      'investorKey', 
      'transactionTypeKey',
      'effectiveDate',
      'pricedDate',
      'settlementDate',
      'settlementStatus', 
      'balanceEffect',
      'units',
      'price',
      'amount', 
      'totalChargeAmount',
      'totalDiscountAmount',
      'isPriced',
      'orderNumber'

    ];


    return columns;
  }
}

