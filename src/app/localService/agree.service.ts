import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {RegistrationResponse} from '../model/registrationResponse';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgreeService extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'transactions/agree',
      router
    );
  }
}/**
 * Created by Kelvin on 12.9.18.
 */
