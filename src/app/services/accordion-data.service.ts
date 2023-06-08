import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { SnowflakeService } from './snowflake.service';
import { Holding } from '../interface/holding';

@Injectable({
  providedIn: 'root'
})
export class AccordionDataService {

  constructor( private snowflakeService: SnowflakeService ) { }

  getInvestorHolding(): Observable<Holding[] > {
    return this.snowflakeService.getClientHolding( 'Liontrust', '0209198');
    // return this.http.get("/asgetClientHoldingsets/data/accordion-data.json")
  }




}
