import {Injectable} from '@angular/core';
import {GeneriCrudService} from '../services/generi-crud.service';
import {Charges} from '../model/Charges';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
/**
 * Created by Kelvin on 30.8.18.
 */
@Injectable({
  providedIn: 'root'
})
export class CalculatorfeeService extends GeneriCrudService<Charges> {
  constructor(httpClient: HttpClient, router: Router) {
    super(
      httpClient,
      'charges/all',
      router
    );
  }
}
