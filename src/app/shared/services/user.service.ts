import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User } from './../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private apiUrl = `${baseApiUrl}/users`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  public getUserById(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  public updateUser(data: User): Observable<User> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.http.patch<User>(url, data, this.httpOptions);
  }

  public deleteUser(data: User): Observable<boolean> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.http.delete(url).pipe(
      map(() => true), 
      catchError(() => of(false))
    );
  }
}
