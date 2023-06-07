import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AccordionDataService } from '../services/accordion-data.service';
import { Chart } from 'chart.js';
import { OnInit } from '@angular/core';
import { json } from 'body-parser';
import { Holding } from '../interface/holding';
import { SnowflakeService } from '../services/snowflake.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  results: any;
  doughnutChart: any;
  tempResults: any;
  clientHolding: any;
//@ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  constructor(private investorHoldingService: AccordionDataService,
    private snowflakeService: SnowflakeService) {
  
   }
  
  ngOnInit() {
    this.onRefreshToken();

    this.investorHoldingService.getInvestorHolding().subscribe(
      (response: Holding[]) => {
        let someString = "" ;
        this.clientHolding = response;
        let someData =  this.clientHolding.data;

        someString = someData.toString().split('\r');
        someString = someString.toString();
        someString = someString.replaceAll("},{", "}, \r{");
        someString = '[' + someString + ']';
   
        let jsonData = JSON.parse(someString);
        console.log('Result are ' , someString);
        this.results = jsonData;

    });
      
  }

   ngAfterViewInit() {
  
  }
  onRefreshToken(): void {
    this.snowflakeService.tokenRefresh().subscribe(
      () => console.log('Done Refreshing Token')
    );
  }

}
