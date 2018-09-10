import {HttpClient} from '@angular/common/http';
import {RegistrationResponse} from '../model/registrationResponse';
import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Recoverpassword extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'auth/recovery',

      router
    );
  }
}
