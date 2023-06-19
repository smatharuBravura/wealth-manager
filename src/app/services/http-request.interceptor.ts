import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogService } from './log.service';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Buffer } from 'buffer';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
	constructor(public logger: LogService,
		private tokenService: TokenService,
		private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let newUrl = req.url;
		let newRequest = req;
		
		const token = this.tokenService.getToken();
		const refreshToken = this.tokenService.getRefreshToken();
		let isRequestAPI = newUrl.includes('/api/v2/statements/');

		if (isRequestAPI) {
			newRequest = req.clone({

				url: environment.apiUrl,
				setHeaders: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				reportProgress:true,
				
			})
		}

		let isAuthRequest = newUrl.includes('oauth/authorize');
		if (isAuthRequest) {
			newRequest = req.clone({
				url: environment.authUrl,
				
			})
		}

		let isTokenRequestAPI = newUrl.includes('oauth/token-request');
		if (isTokenRequestAPI) {

			// console.log('Add HTTP Header Authorization', auth);
			newRequest = req.clone({
				url: environment.tokenUrl, 
				setHeaders: {
					'Content-Type': 'application/x-www-form-urlencoded',
					// 'Authorization': auth,
					'User': environment.OAUTH_CLIENT + ':' + environment.OAUTH_SECRET
				}
			})
		}
	
		return next.handle(newRequest).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					console.log('event--->>>', event);
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				console.log(error.error.error);
				if (error.status === 401) {
					if (error.error.error === 'invalid_token') {
						this.authService.refreshToken({ refresh_token: refreshToken })
							.subscribe(() => {
								location.reload();
							});
					} 
				}
				return throwError(() => new Error(error.error.error));
			}));
	}

	private catchError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			throwError(() => new Error('Client side error: ' + error.error.message))
			
		} else {
			if (error.error) {
				try {
					let errorJSON = JSON.parse(error.error);
					console.log('Error found', errorJSON.message);
					return;
				} catch (e) {
					// It was already JSON or cant be parsed
					if (error.error.message) {
						console.log('Error found', error.error.message);
						return;
					} else if (typeof error.error === 'string') {
								console.log('Error found', error.error);
						return;
					}
				}
			}
		}
	}

	private handleRequest(req: HttpRequest<any>) {
		this.logger.debug("<---- Outgoing request sent to " + req.url + ", Body = " + req.body + ", Header = " +  req.headers);
	}

	private handleResponse(event: any) {
		if (event instanceof HttpResponse) {
			this.logger.debug("----> Incoming response from " + event.url + " (" + event.status + " " + event.statusText + ")");
		}
	}
}