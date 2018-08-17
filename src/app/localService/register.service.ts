import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneriCrudService} from '../services/generi-crud.service';
import {RegistrationResponse} from '../model/registrationResponse';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'auth/signup'
    );
  }
}
