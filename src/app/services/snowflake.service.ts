import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Product } from '../interface/product';
import { Holding } from '../interface/holding';
import {  catchError,  map,  Observable,   tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment'
import { Buffer } from 'buffer';
import { Injectable, Optional } from '@angular/core';
import { LogService } from './log.service';
import { TokenService } from './token.service';
import { Configuration } from './configuration';
import { CustomHttpParameterCodec } from './encoder';
import { AuthService } from './auth.service';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(environment.OAUTH_CLIENT + ':' + environment.OAUTH_SECRET).toString('base64')
  })
};

const HTTP_TOKEN_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(environment.OAUTH_CLIENT + ':' + environment.OAUTH_SECRET).toString('base64')
  })
};

@Injectable({
  providedIn: 'root'
})

export class SnowflakeService {
  private apiUrl = environment.apiUrl;
  private tokenUrl = environment.tokenUrl;
  private authUrl = environment.authUrl;

  public encoder: HttpParameterCodec;
  public configuration = new Configuration();

  private myData = {
    statement: "",
    timeout: environment.snfTimeout,
    database: environment.snfDatabase,
    schema: environment.snfSchema,
    warehouse: environment.snfWarehouse
  };

  private myAuthData = {
    clientId: environment.OAUTH_CLIENT,
    redirectUri: environment.redirectUri,
    responseType: "code"
  };

  constructor(private httpClient: HttpClient, public logger: LogService,
    private tokenService: TokenService, private authService: AuthService,
    @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
    }

    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  getTenantProducts(tenant: string): Observable<Product[]> {
    this.myData.statement = "Call GetProducts('" + tenant.valueOf() + "');";
    return this.httpClient.post<Product[]>(this.apiUrl, this.myData, HTTP_OPTIONS).pipe(map(data => {
      return data;
    }));
  }

  GetProductByReference(tenant: string, reference: string): Observable<Product> {
    this.myData.statement = "Call GetProductByReference( '" + tenant.valueOf() + "', '" + reference.valueOf() + "');";
      return this.httpClient.post<Product>(this.apiUrl, this.myData, HTTP_OPTIONS).pipe(map(data => {
        return data;
    }));
  }

  getClientHolding(investor: string, tenant: string): Observable<Holding[]> {
    this.myData.statement = "Call GetClientHolding( '" + investor.valueOf() + "', '" + tenant.valueOf() + "');";
    return this.httpClient.post<Holding[]>(this.apiUrl, this.myData, HTTP_OPTIONS).pipe(map(data => {
      return data;
    }));
  }

  makeTokenRequest(): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();

    let newParm = "client_id=" + encodeURIComponent(this.myAuthData.clientId)
      + "&" + "redirect_uri=" + encodeURIComponent(this.myAuthData.redirectUri)
      + "&" + "response_type=" + encodeURIComponent(this.myAuthData.responseType);

    return this.httpClient.get<any>(this.authUrl + newParm)
      .pipe(
        tap(res => {
          this.authService.setAuthCode(res.authorization_code);
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(SnowflakeService.handleError)
      );
  }

  tokenRequest(): Observable<any> {
    let tokenCode = sessionStorage.getItem('code') || "";
    let userDtl = environment.OAUTH_CLIENT + ":" + environment.OAUTH_SECRET;
    let newParm = "user=" + userDtl
      + "&" + "grant_type=" + encodeURIComponent("authorization_code") 
      + "&" + "code=" + encodeURIComponent(tokenCode) 
      + "&" + "redirect_uri=" + encodeURIComponent(environment.redirectUri,);

    let path = "/oauth/token-request";
    return this.httpClient.post<any>(path, newParm, HTTP_TOKEN_OPTIONS).pipe(
      tap(res => {
        this.tokenService.saveToken(res.access_token);
        this.tokenService.saveRefreshToken(res.refresh_token);
        console.log(this.tokenService.getToken());
      }),
      catchError(SnowflakeService.handleError)
    );
  }

  tokenRefresh(): Observable<any> {
    let tokenCode = sessionStorage.getItem('code') || "";
    let userDtl = environment.OAUTH_CLIENT + ":" + environment.OAUTH_SECRET;
    let newParm = "user=" + userDtl
      + "&" + "grant_type=" + encodeURIComponent('refresh_token') 
      + "&" + "redirect_uri=" + encodeURIComponent(this.myAuthData.redirectUri) 
      + "&" + "refresh_token=" + encodeURIComponent(this.tokenService.getRefreshToken())
      + "&" + "code=" + encodeURIComponent(tokenCode);

    let path = "/oauth/token-request";
    return this.httpClient.post<any>(path, newParm, HTTP_TOKEN_OPTIONS).pipe(
      tap(res => {
        this.tokenService.saveRefreshToken(res.access_token);
      }),
      catchError(SnowflakeService.handleError)
    );
  }

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
