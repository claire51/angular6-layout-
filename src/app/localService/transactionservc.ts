import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {Transactions} from '../model/Transactions';

@Injectable({
  providedIn: 'root'
})
export class Transactionservc extends GeneriCrudService<Transactions> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'transactions/create',
      router
    );
  }
}
