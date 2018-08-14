
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {RegistrationResponse} from '../model/registrationResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class GeneriCrudService<T> {
  register: RegistrationResponse ;
  constructor(
    private http: HttpClient,
    private url: string,
    private endpoint: string) { }


  // get data generic
  getdata (): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${this.endpoint}`)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
  /** POST: add a new hero to the server */
  create (values: T): Observable<T> {
    return this.http.post<any>(`${this.url}/${this.endpoint}`, values, httpOptions).pipe(
      tap(heroes => this.log('added data', this.heroes)),
      catchError(this.handleError<T>('adding'))
    );
  }



  private handleError<M> (operation = 'operation', result?: M) {
    return (error: any): Observable<M> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

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
