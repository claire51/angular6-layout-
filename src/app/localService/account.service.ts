import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Mlinziaccount} from '../model/Mlinziaccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends GeneriCrudService<Mlinziaccount> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'transactions/accounts',
      router
    );
  }
}
