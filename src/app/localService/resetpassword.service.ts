import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RegistrationResponse} from '../model/registrationResponse';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'auth/reset',
      router
    );
  }
}
