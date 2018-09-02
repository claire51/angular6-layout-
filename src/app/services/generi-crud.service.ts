
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {AppConfig} from '../common/config/app.config';
import {Profile} from '../model/profile';
import {RecoverPassword} from '../model/RecoverPassword';
import {Authrizer} from '../model/authrizer';
import {Router} from '@angular/router';
import {Transactions} from '../model/Transactions';
import {assertNumber} from "@angular/core/src/render3/assert";
import {Useredit} from '../model/Useredit';
import {Resource} from '../model/Resource';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class GeneriCrudService<T> {
  baseurl: string;
  id: number;
  constructor(
    private http: HttpClient,
    private endpoint: string,
    private routerz: Router) {
    this.baseurl = AppConfig.repositoryURL;
  }


  // get data generic
  getdata (): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseurl}/${this.endpoint}`)
      .pipe(
        tap(heroes => this.log('data heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  /** PUT: update the hero on the server */
  updateData (values: T): Observable<any> {
    return this.http.put(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap(_ => this.log(`updated value id`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }  /** PUT: update the hero on the server */
  updateuser (values: Useredit): Observable<any> {
    return this.http.put(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap(_ => this.log(`updated value id`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  /** GET data by id. Return `undefined` when id not found */
  getById(id: number): Observable<T[]> {
    const url = `${this.baseurl}/${this.endpoint}/?id=${id}`;
    return this.http.get<T[]>(url)
      .pipe(
        tap(heroes => this.log('data ')),
        catchError(this.handleError('data', []))
      );
  }

  /** POST: add a new hero to the server */
  payment (values: Resource): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap((heroSaved: T) => {
       console.log('payment requested ..');
      }),
      catchError(this.handleError<T>('adding'))
    );
  }  /** POST: add a new hero entto the server */
  create (values: Profile): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap((heroSaved: T) => {
       console.log('Account Created .. Login to continue');
      }),
      catchError(this.handleError<T>('adding'))
    );
  }
  /** POST: add a new hero to the server */
  recover (values: RecoverPassword): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap((heroSaved: T) => {
        console.log('Account Created .. Login to continue');
      }),
      catchError(this.handleError<T>('adding'))
    );
  }
  /** recoverpass to the server */
  authrize (values: Authrizer): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap((heroSaved: T) => {
        console.log('user loggedin .. ');
      }),
      catchError(this.handleError<T>('adding'))
    );
  }
  /** POST: add a new transaction to the server */
  createtransaction (values: Transactions): Observable<T> {
    return this.http.post<T>(`${this.baseurl}/${this.endpoint}`, values, httpOptions).pipe(
      tap((transact: T) => {
        console.log('transaction Created ');
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
   }    else if (error.status <= 500) {
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
