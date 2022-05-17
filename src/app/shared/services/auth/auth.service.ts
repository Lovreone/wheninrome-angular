import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User } from './../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new BehaviorSubject<User | null>(null); 

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  register(userData: User): Observable<User> {
    return this.http
      .post<User>(
        `${baseApiUrl}/auth/register`, 
        userData, 
        {headers: this.headers}
      )
      .pipe(catchError(this.handleError));
  }

  login(userLoginData: User): Observable<User> {
    return this.http
      .post<any>(
        `${baseApiUrl}/auth/login`,
        userLoginData)
      .pipe(
        tap((res) => {
          this.handleAuth(
            res.access_token, 
            res.tokenIssuedAt, 
            res.tokenExpiresAt, 
            res.user
          );
        }),
        map((res) => {
          if (res && res.access_token) {
            localStorage.setItem('access_token', res.access_token);
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

  autoLogin(): void {
    const userDataSnapshot = localStorage.getItem('userData');
    if (!userDataSnapshot) {
      return;
    }
    const userData: {
      id: string,
      email: string,
      _token: string,
      _tokenExpiryDate: string,
    } = JSON.parse(userDataSnapshot);

    // TODO: Decide which data is necessary, apply to User model (we cant have all optional attributes)
    const loadedUser: User = new User(
      userData.id,
      undefined,
      userData.email,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      userData._token,
      new Date(userData._tokenExpiryDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(['login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private handleAuth(token: string, issuedAt: number, expiresAt: number, userData: User): void {
    const tokenExpiryMs = (expiresAt - issuedAt) * 1000; 
    const tokenExpiryDate = new Date(new Date().getTime() + tokenExpiryMs);
    // TODO: Decide which data is necessary, apply to User model (we cant have all optional attributes)
    const user = new User(
      userData.id,
      undefined,
      userData.email,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      token,
      tokenExpiryDate
    );
    this.user.next(user); // Setting/Emmitting this user as our currently logged in user
    localStorage.setItem('userData', JSON.stringify(user));
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
