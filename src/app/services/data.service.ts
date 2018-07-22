import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Configuration} from '../app.constants';
import {User} from '../model/User';
import {Router} from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class DataService {

  private actionUrl: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  message: string;

  constructor(private http: HttpClient, private _configuration: Configuration, private router: Router) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'values/';
  }
  isAuthenticated() {
    return this.loggedIn.asObservable();
  }
  // login
  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      // this.userAccount =  this.allAccounts.filter(item => item.user === user.userName && item.pass === user.password )[0];
      // console.log(this.userAccount);
      // if (this.userAccount) {
        this.loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      // }
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  public getAll<T>(): Observable<T> {
    return this.http.get<T>(this.actionUrl);
  }

  public getSingle<T>(id: number): Observable<T> {
    return this.http.get<T>(this.actionUrl + id);
  }

  public add<T>(itemName: string): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.actionUrl, toAdd);
  }

  public update<T>(id: number, itemToUpdate: any): Observable<T> {
    return this.http
      .put<T>(this.actionUrl + id, JSON.stringify(itemToUpdate));
  }

  public delete<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + id);
  }


}


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    console.log(JSON.stringify(req.headers));


    return next.handle(req);
  }
}
