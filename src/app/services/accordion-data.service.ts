import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccordionDataService {

  constructor(private http: HttpClient) { }

  getLocalData(){
    return this.http.get("/assets/data/accordion-data.json");

  }
}
