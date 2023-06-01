import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Buffer } from 'buffer';
import { environment } from 'src/environments/environment';

const OAUTH_CLIENT = environment.OAUTH_CLIENT;
const OAUTH_SECRET = environment.OAUTH_SECRET;
const API_URL = environment.authUrl;

const ACCESS_CODE = 'access_code';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + Buffer.from(OAUTH_CLIENT + ':' + OAUTH_SECRET).toString('base64')
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {
    // no const
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

  private static log(message: string): any {
    console.log(message);
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  setAuthCode(code: any) {
    localStorage.setItem(ACCESS_CODE, code);
  }

  getAuthCode(): string {
    return localStorage.getItem(ACCESS_CODE)!;
  }

  secured(): Observable<any> {
    return this.http.get<any>(API_URL + 'secret')
      .pipe(catchError(AuthService.handleError));
  }
  apiurl = environment.apiUrl;

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata)
  }
  GetUserbyCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }
  Getall() {
    return this.http.get(this.apiurl);
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }
  getuserrole() {
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }
  getrole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  }
  GetAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }
  
  Getaccessbyrole(role: any, menu: any) {
    return this.http.get('http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu)
  }

}
