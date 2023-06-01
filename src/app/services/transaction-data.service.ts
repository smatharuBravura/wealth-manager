import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Transactions } from '../interface/transactons';
import { Buffer} from 'buffer';
import { SnowflakeService } from './snowflake.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {

  constructor(private http: HttpClient, private snowFlakeService: SnowflakeService) { 

  }

  getLocalData(){
    return this.snowFlakeService.getClientHolding('0209198', 'Liontrust');

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
        this.myData.statement = "Call SP_GETTRANSACTIONSBYTENANTCLIENT( '" + tenant.valueOf() + "', '" + investor.valueOf() + "');";
        return this.http.post<Transactions[]>(this.apiUrl, this.myData, this.HTTP_OPTIONS).
            pipe(map((data: Transactions[]) => {
                console.log(data);
                return data;
            }),
            )
    }
}
