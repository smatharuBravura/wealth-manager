import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Transactions } from '../interface/transactons';
import { Buffer} from 'buffer';


@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {

  constructor(private http: HttpClient) { 
  }

  getLocalData(): Observable<Transactions[]>{
    return this.getClientTransactions('Liontrust', '0209198',);
  }

  /*getRemoteData(){
return this.http.get(
  "https://www.data.com"
);

  }*/

    private apiUrl = environment.apiUrl;
    private HTTP_OPTIONS = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(environment.OAUTH_CLIENT + ':' + environment.OAUTH_SECRET).toString('base64')
        })
    };

    private myData = {
        statement: "",
        timeout: environment.snfTimeout,
        database: environment.snfDatabase,
        schema: environment.snfSchema,
        warehouse: environment.snfWarehouse
    };

    getClientTransactions(tenant: string, investor: string): Observable<Transactions[]> {

        let ProdType = '';
        let ProdName = '';
        let AccountRef = '';
        let AssetName = '';
        let TxnType = '';
        let BalanceEffect = 1;
        let fromDate = ('2005-06-03');
        let toDate = ('2022-12-31');       

        this.myData.statement = "Call SP_INVESTORTRANSACTIONS_VIEW( '" 
        + tenant.valueOf() + "', '"  + investor.valueOf() + "', '"
        + ProdType  + "', '"         + ProdName  + "', '"
        + AccountRef  + "', '"       + AssetName  + "', '"
        + BalanceEffect + "', '"     + TxnType + "', '"
        + fromDate + "', '"     + toDate + "');";
   

        return this.http.post<Transactions[]>(this.apiUrl, this.myData, this.HTTP_OPTIONS).
            pipe(map((data: Transactions[]) => {
                return data;
            }),
            )
    }
}
