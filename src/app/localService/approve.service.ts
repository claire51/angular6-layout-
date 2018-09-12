import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RegistrationResponse} from '../model/registrationResponse';

@Injectable({
  providedIn: 'root'
})
export class ApproveService extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'transactions/approve',
      router
    );
  }
}/**
 * Created by Kelvin on 12.9.18.
 */
