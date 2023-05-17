import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {

  constructor(private http: HttpClient) { }

  getLocalData(){
    return this.http.get("/assets/data/transaction-data.json");

  }

  /*getRemoteData(){
return this.http.get(
  "https://www.data.com"
);

  }*/
}
