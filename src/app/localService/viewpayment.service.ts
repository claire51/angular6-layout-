import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Payments} from '../model/Payments';

@Injectable({
  providedIn: 'root'
})
export class ViewpaymentService extends GeneriCrudService<Payments> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'payment/payments',
      router
    );
  }
}
