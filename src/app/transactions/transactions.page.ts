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
constructor(private transactionService: TransactionDataService) { }

ngOnInit() {
  
  this.transactionService.getLocalData().subscribe(
    (response: any) => {
      console.log('results::', response.data);
      this.results = response.data;
      console.log("Results::::::::::", this.results);
    });

  //this.results = this.dataService.getLocalData().subscribe();


  /* this.dataService.getRemoteData().subscribe(data => {
  console.log("Remote Data:");
  console.log(data);
  });*/
}
}
