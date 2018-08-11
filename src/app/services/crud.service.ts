
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

  getHeroes (): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${this.endpoint}`)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }
// .map(resp=>resp.json() as T[]);

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
