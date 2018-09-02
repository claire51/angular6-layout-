import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Paymentresponse} from '../model/Paymentresponse';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends GeneriCrudService<Paymentresponse> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'payment/stkpush',
      router
    );
  }
}
