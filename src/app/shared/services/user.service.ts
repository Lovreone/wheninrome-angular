import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User } from './../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl = `${baseApiUrl}/users`;

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(
        this.apiUrl
      );
  }

  public getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(
        `${this.apiUrl}/${id}`
      );
  }

  /** Admin updates user info in CMS */
  public updateUser(data: User): Observable<User> {
    return this.http
      .patch<User>(
        `${this.apiUrl}/profile/${data.id}`, 
        data, 
        {headers: this.headers}
      )
      .pipe(catchError(this.handleError));
  }

  /** User updates his profile info */
  public updateMyProfile(data: User): Observable<User> {
    return this.http
      .patch<User>(
        `${this.apiUrl}/${data.id}`, 
        data, 
        {headers: this.headers}
      )
      .pipe(catchError(this.handleError));
  }

  public deleteUser(data: User): Observable<boolean> {
    return this.http
      .delete(`${this.apiUrl}/${data.id}`)
      .pipe(
        map(() => true), 
        catchError(() => of(false)
      )
    );
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    let errorMessage = ['An unknown error has occured!'];
    if ((!errorResponse.error || !errorResponse.error.error) && !errorResponse.error.message) {  
      return throwError(errorMessage);
    } else {
      errorMessage = errorResponse.error.message;  
    }
    return throwError(errorMessage);
  }
}
