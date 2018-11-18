import {HttpClient} from '@angular/common/http';
import {RegistrationResponse} from '../model/registrationResponse';
import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';

@Injectable({
  providedIn: 'root'
})
export class Recoverpassword extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'auth/recovery'
    );
  }
}
