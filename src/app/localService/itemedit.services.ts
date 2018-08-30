import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Item} from '../model/Items';

@Injectable({
  providedIn: 'root'
})
export class ItemeditServices extends GeneriCrudService<Item> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'transactions/editTradeItem',
      router
    );
  }
}
