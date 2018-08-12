
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Resource} from '../model/Resource';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export abstract class CrudService<T extends Resource> {

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


  /** GET data by id. Return `undefined` when id not found */
  getById<Data>(id: number): Observable<T> {
    const url = `${this.url}/${this.endpoint}/?id=${id}`;
    return this.http.get<T[]>(url)

      .pipe(
        map(datas => datas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<T>(`getHero id=${id}`))
      );
  }

  /** POST: add a new hero to the server */
  create (values: T): Observable<T> {
    return this.http.post<T>(`${this.url}/${this.endpoint}`, values, httpOptions).pipe(
      tap(heroes => this.log('added data')),
      catchError(this.handleError<T>('adding'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteData (values: T | number): Observable<T> {
    const id = typeof values === 'number' ? values : values.id;
    return this.http.delete<T>(`${this.url}/${this.endpoint}`, httpOptions).pipe(
      tap(_ => this.log(`deleted value id=${id}`)),
      catchError(this.handleError<T>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateData (values: T): Observable<any> {
    return this.http.put(`${this.url}/${this.endpoint}`, values, httpOptions).pipe(
      tap(_ => this.log(`updated value id=${values.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchData(term: string): Observable<T[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<T[]>(`${this.url}/${this.endpoint}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<T[]>('searchHeroes', []))
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
