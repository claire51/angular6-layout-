import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {CrudService} from '../services/crud.service';
@Injectable({
  providedIn: 'root'
})
export class UserdataService extends CrudService<User> {
  constructor(httpClient: HttpClient , router: Router) {
    super(
      httpClient,
      'user/users',
      router);
  }
}
