import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../model/User';
import {GeneriCrudService} from '../services/generi-crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsereditService extends GeneriCrudService <User> {
  constructor(httpClient: HttpClient , router: Router) {
    super(
      httpClient,
      'user/edit',
      router);
  }
}
