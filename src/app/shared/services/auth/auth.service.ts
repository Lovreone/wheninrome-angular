import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User } from './../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  register(userData: User): Observable<User> {
    return this.http
      .post<User>(
        `${baseApiUrl}/users`, 
        userData, 
        {headers: this.headers}
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  login(userLoginData: User): Observable<User> {
    return this.http
      .post<any>(
        `${baseApiUrl}/auth/login`,
        userLoginData)
      .pipe(
        map(res => {
          if (res && res.access_token) {
            localStorage.setItem('access_token', res.access_token);
            // TODO: Determine which user data we need in here (if any):
            localStorage.setItem('user', JSON.stringify(res.user)); 
          }
          return res.user;
        }),
        catchError(this.handleError)
      );
  }

  getUserProfile(): Observable<any> {
    return this.http
      .get(
        `${baseApiUrl}/profile`,
        {headers: this.headers}
      )
      .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user'); // TODO: Follow whatever path is determined in login
    if (!this.getToken()) {
      this.router.navigate(['login']);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error has occured!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `ERR ${error.status}: ${error.error.message}`;
    
      // FIXME: Implement a solution for this (Move to interceptor):
      if (error.status === 401) {
        console.error('Token needs to be refreshed'); 
        localStorage.removeItem('access_token'); 
      }
        
    }
    return throwError(errorMessage);
  }

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
