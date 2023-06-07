import { Component, OnInit } from '@angular/core';
import { TransactionDataService } from '../services/transaction-data.service';
import { Holding } from '../interface/holding';
import { SnowflakeService } from '../services/snowflake.service';

@Component({
selector: 'app-transactions',
templateUrl: './transactions.page.html',
styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  results:any;
  translist: any;
constructor(private transactionService: TransactionDataService,
  private snowflakeService: SnowflakeService) { }

ngOnInit() {
  
  this.onRefreshToken();

  this.transactionService.getLocalData().subscribe(
    (response: any) => {
      console.log('results::', response.data);
      this.translist = response;
      let someString = "" ;
      let someData =  this.translist.data;

      someString = someData.toString().split('\r');
      someString = someString.toString();
      someString = someString.replaceAll("},{", "}, \r{");
      someString = '[' + someString + ']';
 
      let jsonData = JSON.parse(someString);
      this.results = jsonData;
      console.log("Results::::::::::", jsonData);
      

    });


  //this.results = this.dataService.getLocalData().subscribe();


  /* this.dataService.getRemoteData().subscribe(data => {
  console.log("Remote Data:");
  console.log(data);
  });*/
}

onRefreshToken(): void {
  this.snowflakeService.tokenRefresh().subscribe(
    () => console.log('Done Refreshing Token')
  );
}
}