import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ModelBase} from '../model/model.base';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string;

  constructor(private http: HttpClient) {
  }
  getAll() {
    console.log(this.url, 'url');
    return this.http.get(this.url)
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(this.url + id)
      .catch(this.handleError);
  }

  update(resource: ModelBase) {
    console.log(resource);
    return this.http.put(this.url + resource.id, JSON.stringify(resource))
      .catch(this.handleError);
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .catch(this.handleError);
  }

  handleError = (error: Response) => {

    if (error.status === 404) {
      return Observable.throw(new NotFoundError(error, this.resourceName));
    }

    if (error.status === 401) {
      return Observable.throw(new UnAuthorizedError(error, this.resourceName));
    }

    if (error.status === 400) {
      return Observable.throw(new BadRequestError(error, this.resourceName));
    }

    return Observable.throw(new UnknownError(error))

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
