import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneriCrudService} from '../services/generi-crud.service';
import {RegistrationResponse} from '../model/registrationResponse';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends GeneriCrudService<RegistrationResponse> {
  constructor(httpClient: HttpClient,  translateServicem: TranslateService,
               snackBarm: MatSnackBar) {
    super(
      httpClient,
      'http://api.mlinzi.co.ke:8080/api',
      'auth/signup',
      translateServicem,
      snackBarm
    );
  }
}
