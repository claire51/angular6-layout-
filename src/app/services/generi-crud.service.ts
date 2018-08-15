
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Profile} from '../model/profile';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class GeneriCrudService<T> {
  constructor(
    private http: HttpClient,
    private url: string,
    private endpoint: string) { }



  /** POST: add a new hero to the server */
  create (values: Profile): Observable<T> {
    return this.http.post<T>(`${this.url}/${this.endpoint}`, values, httpOptions).pipe(
      tap(heroes => this.log('added data')),
      catchError(this.handleError<T>('adding'))
    );
  }



  private handleError<M> (operation = 'operation', result?: M) {
    return (error: any): Observable<M> => {
 if (error instanceof HttpErrorResponse) {
        console.error(error); // log to console instead
      // TODO: send the error to remote logging infrastructure

   if (error.status <= 500) {
     alert('Account already exist');
     throw error;
   }
 }
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);


      // Let the app keep running by returning an empty result.
      return of(result as M);
    };
  }

  private log(message: string) {
    console.log(
      message
    );
  }


}
