import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {RegistrationResponse} from '../model/registrationResponse';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecoverPassService extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'auth/reset',
      router
    );
  }
}
