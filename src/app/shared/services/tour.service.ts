import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseApiUrl } from '../../../utils/config';
import { Tour } from '../models/tour.model';

@Injectable({
    providedIn: 'root'
})
export class TourService {

    private apiUrl = `${baseApiUrl}/tours`;
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    constructor(private http: HttpClient) { }

    /** Admin gets list of all Tours in CMS */
    public getAllTours(): Observable<Tour[]> {
        return this.http.get<Tour[]>(this.apiUrl);
    }

    /** User gets list of all of it's Tours */
    public getToursByUser(userId: string): Observable<Tour[]> {
        const url = `${this.apiUrl}/by-user/${userId}`;
        return this.http.get<Tour[]>(url);
    }

    public getTourById(id: string): Observable<Tour> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Tour>(url);
    }

    public createTour(data: Tour): Observable<Tour> {
        return this.http.post<Tour>(this.apiUrl, data, this.httpOptions);
    }

    public updateTour(data: Tour): Observable<Tour> {
        const url = `${this.apiUrl}/${data.id}`;
        return this.http.patch<Tour>(url, data, this.httpOptions);
    }

    public deleteTour(data: Tour): Observable<boolean> {
        const url = `${this.apiUrl}/${data.id}`;
        return this.http.delete(url).pipe(
          map(() => true), 
          catchError(() => of(false))
        );
    }
}
