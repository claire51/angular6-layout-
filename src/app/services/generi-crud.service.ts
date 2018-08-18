
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {AppConfig} from '../common/config/app.config';
import {Profile} from '../model/profile';
import {RecoverPassword} from '../model/RecoverPassword';
import {Authrizer} from '../model/authrizer';
import {Router} from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class GeneriCrudService<T> {
  baseurl: string;
  constructor(
    private http: HttpClient,
    private endpoint: string,
    private routerz: Router) {
    this.baseurl = AppConfig.repositoryURL;
  }




  /** POST: add a new hero to the server */
  create (values: Profile): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap(heroes => this.log('added data')),
      tap((heroSaved: T) => {
       console.log('Account Created .. Login to continue');
      }),
      catchError(this.handleError<T>('adding'))
    );
  }
  /** POST: add a new hero to the server */
  recover (values: RecoverPassword): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap(heroes => this.log('added data')),
      tap((heroSaved: T) => {
        console.log('Account Created .. Login to continue');
      }),
      catchError(this.handleError<T>('adding'))
    );
  }
  /** POST: add a new hero to the server */
  authrize (values: Authrizer): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap(heroes => this.log('logged user')),
      tap((heroSaved: T) => {
        console.log('user loggedin .. ');
      }),
      catchError(this.handleError<T>('adding'))
    );
  }

  private handleError<M> (operation = 'operation', result?: M) {
    return (error: any): Observable<M> => {
 if (error instanceof HttpErrorResponse) {
        console.error(error); // log to console instead
      // TODO: send the error to remote logging infrastructure

   if (error.status === 401) {
     this.routerz.navigate(['/login']);
   }    else if (error.status < 500) {
     throw error;
   } else {
     alert('Something went wrong try again ...');
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
