import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AccordionDataService } from '../services/accordion-data.service';
import { Chart } from 'chart.js';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  results: any;
  doughnutChart: any;

//@ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  constructor(private dataService: AccordionDataService) {
  
   }
  
  ngOnInit() {
    //this.dataService.getLocalData().subscribe(json => {
      console.log("test");
      //this.results = json;
     // });
  }
  ngAfterViewInit() {
    this.dataService.getLocalData().subscribe(json => {
      console.log('results::', json);
      this.results = json;
      });

    //this.doughnutChartMethod();
  }
  /*doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['BJP', 'Congress', 'AAP', 'CPM', 'SP'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29, 15, 10, 7],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }*/
}
