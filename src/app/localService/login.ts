import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {Tokens} from '../model/Tokens';

@Injectable({
  providedIn: 'root'
})
export class Login extends GeneriCrudService<Tokens> {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'auth/login'
    );
  }
}
