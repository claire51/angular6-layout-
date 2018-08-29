import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Tradevalueedit} from '../model/Tradevalueedit';

@Injectable({
  providedIn: 'root'
})
export class Transactionedit extends GeneriCrudService<Tradevalueedit> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'auth/signup',
      router
    );
  }
}
