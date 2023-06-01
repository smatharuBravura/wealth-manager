import { Component, OnInit } from '@angular/core';
import { TransactionDataService } from '../services/transaction-data.service';

@Component({
selector: 'app-transactions',
templateUrl: './transactions.page.html',
styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
results: any;
constructor(private dataService: TransactionDataService) { }

ngOnInit() {
  
    this.dataService.getLocalData().subscribe(json => {
    console.log('results::', json);
  this.results = json;
    });

  //this.results = this.dataService.getLocalData().subscribe();
  console.log("Results::::::::::" , this.results);

  /* this.dataService.getRemoteData().subscribe(data => {
  console.log("Remote Data:");
  console.log(data);
  });*/
}
}
