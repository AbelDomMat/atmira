import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Imagen } from './imagen';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class NasaApiService {
  private demoKey: String = 'zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb';
  private urlBase: String = 'https://api.nasa.gov/planetary/apod?api_key=' + this.demoKey + '&date=';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getImagen(date: string): Observable<Imagen> {
    return this.http
      .get<Imagen>(this.urlBase + date)
      .pipe(retry(1), catchError(this.handleError));
  }

  // ERRORS
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
