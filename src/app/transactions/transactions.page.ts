import { Component, OnInit } from '@angular/core';
import { TransactionDataService } from '../services/transaction-data.service';
import { Holding } from '../interface/holding';

@Component({
selector: 'app-transactions',
templateUrl: './transactions.page.html',
styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
results:any;
jData: any;
constructor(private transactionService: TransactionDataService) { }

ngOnInit() {
  
  this.transactionService.getLocalData().subscribe(
    (response: any) => {
      this.results = response.data;
      console.log("Results::::::::::", this.results);

for(var i = 1; i < this.results.length; i++) {
  console.log("Inside For Loop", this.results[i]);
  this.jData[i].map((item:any[]) => {
  this.jData.push({
    "assetTransactionRefKey?": item[0],
    "tenantKey": item[1],
    "assetTransactionKey": item[2],
    "accountKey": item[3],
    "productKey": item[4],
    "assetKey": item[5],
    "investorKey": item[6],
    "transactionTypeKey": item[7],
    "receivedDate": item[8],
    "creationDate": item[9],
    "effectiveDate": item[10],
    "pricedDate": item[11],
    "settlementDate": item[12],
    "settlementStatus": item[13],
    "balanceEffect": item[14],
    "units": item[15],
    "price": item[16],
    "amount": item[17],
    "totalChargeAmount": item[18],
    "totalDiscountAmount": item[19],
    "isPriced": item[20],
    "orderNumber": item[21],
});
  });
}
console.log("ResultsJSON::::::::::", this.jData);

//this.results = this.dataService.getLocalData().subscribe();
/* this.dataService.getRemoteData().subscribe(data => {
console.log("Remote Data:");
console.log(data);
});*/
});
}
}